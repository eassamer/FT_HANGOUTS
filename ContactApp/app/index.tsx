import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  if (isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.headText}>Welcome To 42Contacts</Text>
        <TouchableOpacity
          onPress={() => {
            router.push("/home");
          }}
          style={styles.loginButton}
        >
          <Text style={styles.loginText}>HomePage</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const Login = async () => {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        phone: phone,
        password: password,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = () => {
    if (phone.length === 10 && password.length > 8) {
      Login();
      setIsLoggedIn(true);
    } else setErrorMessage("Invalid Credentials");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Welcome To 42Contacts</Text>
      <TextInput
        onChangeText={(value) => {
          if (value.length > 10) {
            setErrorMessage("Phone number should be less than 10 digits");
          } else {
            setErrorMessage("");
          }
          setPhone(value);
        }}
        value={phone}
        style={styles.loginInput}
        placeholder="Enter Phone Number"
      />
      <TextInput
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        style={styles.loginInput}
        placeholder="Enter Password"
      />
      <Text style={styles.errorMsg}>{errorMessage}</Text>
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.signupLink}>
        Don't have an account?{" "}
        <Text
          style={styles.signUpTitle}
          onPress={() => {
            router.push("/SignUp");
          }}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  signupLink: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    gap: 20,
  },
  errorMsg: {
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
  },
  headText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  loginInput: {
    width: "80%",
    borderWidth: 1,
    height: 40,
    borderColor: "#000",
    borderRadius: 4,
    padding: 10,
    letterSpacing: 1.5,
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#000",
    borderRadius: 10,
    width: "80%",
    paddingVertical: 15,
    display: "flex",
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
