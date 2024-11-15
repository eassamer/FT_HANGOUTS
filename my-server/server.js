const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const Argon2 = require("argon2");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy; // <-- Import LocalStrategy here
const cookieParser = require("cookie-parser"); // <-- Import cookie-parser

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser()); // <-- Use cookie parser to read cookies
const corsOptions = {
  origin: "http://localhost:8081", // Adjust to your frontend origin
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type",
};
app.use(cors(corsOptions));

// Initialize SQLite Database
const db = new sqlite3.Database("contacts.db");

// Create users, contacts, and messages tables if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phone TEXT UNIQUE,
      password TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      name TEXT,
      phone TEXT,
      email TEXT,
      address TEXT,
      notes TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sender_id INTEGER,
      receiver_id INTEGER,
      message TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (sender_id) REFERENCES users(id),
      FOREIGN KEY (receiver_id) REFERENCES users(id)
    )
  `);
});

// Passport configuration (local strategy for login)
passport.use(
  "login",
  new LocalStrategy({ usernameField: "phone" }, (phone, password, done) => {
    db.get(
      "SELECT * FROM users WHERE phone = ?",
      [phone],
      async (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false, { message: "User not found" });

        try {
          if (await Argon2.verify(user.password, password)) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Invalid password" });
          }
        } catch (err) {
          return done(err);
        }
      }
    );
  })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  db.get("SELECT * FROM users WHERE id = ?", [id], (err, user) =>
    done(err, user)
  );
});

// Session setup for Passport (cookie-based authentication)
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Helper function to authenticate JWT token
const authenticate = (req, res, next) => {
  const token = req.cookies.token; // Check for token in cookies
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, "your_jwt_secret", (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Failed to authenticate token" });
    req.user = decoded; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  });
};

// Register a new user
app.post("/register", async (req, res) => {
  const { phone, password } = req.body;

  try {
    // Check if the user already exists
    db.get(
      "SELECT * FROM users WHERE phone = ?",
      [phone],
      async (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (user) {
          return res
            .status(400)
            .json({ message: "User with this phone already exists" });
        }

        // Hash the password using Argon2
        const hashedPassword = await Argon2.hash(password);

        // Insert the new user into the database
        const stmt = db.prepare(
          "INSERT INTO users (phone, password) VALUES (?, ?)"
        );
        stmt.run([phone, hashedPassword], function (err) {
          if (err) return res.status(500).json({ error: err.message });

          // Generate JWT token after successful registration
          const newUserId = this.lastID;
          const token = jwt.sign({ id: newUserId, phone }, "your_jwt_secret", {
            expiresIn: "1h",
          });

          // Send the JWT token as a cookie
          res.cookie("token", token, { httpOnly: true, secure: false }); // Set `secure: true` for production with HTTPS

          // Redirect the user to the homepage
          res.json({
            message: "User registered successfully",
            redirectUrl: "/homepage",
          });
        });
        stmt.finalize();
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login user
app.post(
  "/login",
  passport.authenticate("login", { session: false }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign(
      { id: user.id, phone: user.phone },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }); // Send the JWT token in a cookie
    delete user.password;
    console.log(user);
    res.json({ message: "Logged in successfully", user });
  }
);

// Get all contacts for the authenticated user
app.get("/contacts", authenticate, (req, res) => {
  const userId = req.user.id;

  db.all("SELECT * FROM contacts WHERE user_id = ?", [userId], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ contacts: rows });
  });
});

// Create a new contact
app.post("/contacts", authenticate, (req, res) => {
  const { name, phone, email, address, notes } = req.body;
  const userId = req.user.id;

  const stmt = db.prepare(
    "INSERT INTO contacts (user_id, name, phone, email, address, notes) VALUES (?, ?, ?, ?, ?, ?)"
  );
  stmt.run([userId, name, phone, email, address, notes], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ contact: { id: this.lastID, ...req.body } });
  });
  stmt.finalize();
});

// Edit a contact
app.put("/contacts/:id", authenticate, (req, res) => {
  const { id } = req.params;
  const { name, phone, email, address, notes } = req.body;
  const userId = req.user.id;

  db.run(
    "UPDATE contacts SET name = ?, phone = ?, email = ?, address = ?, notes = ? WHERE id = ? AND user_id = ?",
    [name, phone, email, address, notes, id, userId],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      if (this.changes === 0) {
        return res
          .status(404)
          .json({ error: "Contact not found or does not belong to user" });
      }
      res.json({ updated: this.changes });
    }
  );
});

// Delete a contact
app.delete("/contacts/:id", authenticate, (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  db.run(
    "DELETE FROM contacts WHERE id = ? AND user_id = ?",
    [id, userId],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      if (this.changes === 0) {
        return res
          .status(404)
          .json({ error: "Contact not found or does not belong to user" });
      }
      res.json({ deleted: this.changes });
    }
  );
});

// Send a message from one user to another
app.post("/messages", authenticate, (req, res) => {
  const { receiverPhone, message } = req.body;
  const senderId = req.user.id;

  db.get(
    "SELECT * FROM users WHERE phone = ?",
    [receiverPhone],
    (err, receiver) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!receiver)
        return res.status(404).json({ error: "Receiver not found" });

      const receiverId = receiver.id;
      const stmt = db.prepare(
        "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)"
      );
      stmt.run([senderId, receiverId, message], function (err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({
          message: "Message sent successfully",
          messageId: this.lastID,
        });
      });
      stmt.finalize();
    }
  );
});

// Get all messages between the authenticated user and another user
app.get("/messages/:contactId", authenticate, (req, res) => {
  const userId = req.user.id;
  const contactId = req.params.contactId;

  db.all(
    "SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)",
    [userId, contactId, contactId, userId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ messages: rows });
    }
  );
});

// Logout user and clear cookies
app.post("/logout", (req, res) => {
  res.clearCookie("token"); // Clear the token cookie
  res.json({ message: "Logged out successfully" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
