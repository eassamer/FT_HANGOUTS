import { Contact, ContactsContext } from "@/components/ContactsContext";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { AiOutlineMore } from "react-icons/ai";

export default function AddContact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const { addContact, mainColor } = useContext(ContactsContext);

  const handleSave = () => {
    if (name === "" || phone === "" || email === "") {
      alert("Please enter a name and phone number.");
      return;
    }
    const newContact: Contact = { id: 0, name, phone, email, address, notes };
    addContact(newContact);
    router.push("/home");
  };
  return (
    <View style={styles.container}>
      <View style={{ ...styles.headerSection, backgroundColor: mainColor }}>
        <TouchableOpacity
          onPress={() => {
            router.push("/home");
          }}
        >
          <IoCaretBackCircleOutline color="white" size={45} />
        </TouchableOpacity>
        <Text style={styles.textTest}>ADD CONTACT</Text>
        <View style={styles.hiddenView}></View>
      </View>
      <View style={styles.bodySection}>
        <View style={styles.DataSection}>
          <View style={styles.element}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              aria-required="true"
              placeholder="Enter Name"
              style={styles.input}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={styles.element}>
            <Text style={styles.label}>Phone:</Text>
            <TextInput
              aria-required="true"
              placeholder="Enter Phone"
              style={styles.input}
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
          </View>
          <View style={styles.element}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              aria-required="true"
              placeholder="Enter Email"
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.element}>
            <Text style={styles.label}>Address:</Text>
            <TextInput
              placeholder="Enter Address"
              style={styles.input}
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
          </View>
          <View style={styles.element}>
            <Text style={styles.label}>Notes:</Text>
            <TextInput
              placeholder="Enter Notes"
              style={styles.input}
              value={notes}
              onChangeText={(text) => setNotes(text)}
            />
          </View>
        </View>
        <View style={styles.ButtonsSection}>
          <TouchableOpacity
            style={styles.AddContactButton}
            onPress={() => {
              handleSave();
            }}
          >
            <Text style={styles.EditText}>Add Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  element: {
    width: "100%",
    height: "auto",
  },
  input: {
    marginTop: 5,
    width: "100%",
    borderWidth: 1,
    height: 40,
    borderColor: "#000",
    borderRadius: 4,
    padding: 10,
    letterSpacing: 1.5,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    color: "#898789",
    letterSpacing: 1.5,
  },
  DataSection: {
    width: "100%",
    gap: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  EditButton: {
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
  AddContactButton: {
    backgroundColor: "#149921",
    borderRadius: 10,
    width: "80%",
    paddingVertical: 15,
    display: "flex",
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  EditText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  ButtonsSection: {
    position: "absolute",
    bottom: 100,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  bodySection: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    paddingVertical: 40,
    gap: 30,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  hiddenView: {
    height: 1,
    width: 30,
  },
  headerSection: {
    width: "100%",
    padding: 20,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#3e43e3",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    color: "#3e43e3",
    fontSize: 20,
    fontWeight: "bold",
  },
  value: {
    color: "#000",
  },
  textTest: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    textAlign: "center",
  },
});
