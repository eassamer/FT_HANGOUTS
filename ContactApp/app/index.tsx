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
  const [email, setEmail] = useState("");
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

  const handleLogin = () => {
    if (email === "admin" && password === "admin") {
      router.push("/home");
    } else {
      setErrorMessage("Invalid Email or Password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Welcome To 42Contacts</Text>
      <TextInput
        onChangeText={setEmail}
        value={email}
        style={styles.loginInput}
        placeholder="Enter Email"
      />
      <TextInput
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        style={styles.loginInput}
        placeholder="Enter Password"
      />
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.errorMsg}>{errorMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    gap: 30,
  },
  errorMsg: {
    color: "red",
    fontSize: 16,
    fontWeight: "semibold",
  },
  headText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  loginInput: {
    width: "100%",
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
