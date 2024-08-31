const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
const corsOptions = {
  origin: "http://localhost:8081", // The origin of your Expo app
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type",
};

app.use(cors(corsOptions));
// Initialize SQLite Database
const db = new sqlite3.Database("contacts.db");

// Create the contacts table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phone TEXT,
      email TEXT,
      address TEXT,
      notes TEXT
    )
  `);
});

// Get all contacts
app.get("/contacts", (req, res) => {
  db.all("SELECT * FROM contacts", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ contacts: rows });
    console.log("get contacts called");
  });
});

// Create a new contact
app.post("/contacts", (req, res) => {
  const { name, phone, email, address, notes } = req.body;
  const stmt = db.prepare(
    "INSERT INTO contacts (name, phone, email, address, notes) VALUES (?, ?, ?, ?, ?)"
  );
  stmt.run([name, phone, email, address, notes], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ contact: { id: this.lastID, ...req.body } });
  });
  stmt.finalize();
  console.log("post contacts called");
});

// Edit a contact
app.put("/contacts/:id", (req, res) => {
  const { id } = req.params;
  const { name, phone, email, address, notes } = req.body;
  db.run(
    "UPDATE contacts SET name = ?, phone = ?, email = ?, address = ?, notes = ? WHERE id = ?",
    [name, phone, email, address, notes, id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ updated: this.changes });
      console.log("put contacts called");
    }
  );
});

// Delete a contact
app.delete("/contacts/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM contacts WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      // No rows affected, contact might not exist
      res.status(404).json({ error: "Contact not found" });
    } else {
      res.json({ deleted: this.changes });
      console.log("delete contacts called");
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
