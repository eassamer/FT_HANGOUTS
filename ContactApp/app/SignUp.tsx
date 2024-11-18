import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [isRegistred, setisRegistred] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (isRegistred) {
    return (
      <View style={styles.container}>
        <Text style={styles.headText}>Welcome To 42Contacts</Text>
        <TouchableOpacity
          onPress={() => {
            router.push("/home");
          }}
          style={styles.signUpButton}
        >
          <Text style={styles.signUpText}>HomePage</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const SignUp = async () => {
    try {
      const res = await axios.post("http://localhost:3000/register", {
        phone: phone,
        password: password,
      });
      console.log(res.headers["set-cookie"]);
      setisRegistred(true);
    } catch (error: any) {
      setErrorMessage(error.response.data.message as string);
      console.log(error.response.data.message);
    }
  };
  const handleSignUp = () => {
    // check if phone number is valid
    if (phone.length !== 10) {
      setErrorMessage("Phone number should be 10 digits");
      return;
    }
    if (password.length > 8) {
      // check if Password is strong
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          password
        )
      ) {
        setErrorMessage("Password should be Valid");
        return;
      }
      SignUp();
      setisRegistred(true);
    } else setErrorMessage("Password should be at least 8 characters");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Sign Up</Text>
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
        style={styles.signUp}
        placeholder="Enter Phone Number"
      />
      <TextInput
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        style={styles.signUp}
        placeholder="Enter Password"
      />
      <Text style={styles.errorMsg}>{errorMessage}</Text>
      <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.signupLink}>
        Already have an account?{" "}
        <Text
          style={styles.signUpTitle}
          onPress={() => {
            router.push("/");
          }}
        >
          Login
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
  signUp: {
    width: "80%",
    borderWidth: 1,
    height: 40,
    borderColor: "#000",
    borderRadius: 4,
    padding: 10,
    letterSpacing: 1.5,
    fontWeight: "bold",
  },
  signUpButton: {
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
  signUpText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
