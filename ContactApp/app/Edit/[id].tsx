// AddContact.js
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Contact, ContactsContext } from "../../components/ContactsContext";
import { router, useLocalSearchParams } from "expo-router";

export default function EditContact() {
  const { id } = useLocalSearchParams();
  const { getContactById, updateContact } = useContext(ContactsContext);
  const contactSelected = getContactById(Number(id));
  const [name, setName] = useState(contactSelected?.name);
  const [phone, setPhone] = useState(contactSelected?.phone);
  const [email, setEmail] = useState(contactSelected?.email);
  const [address, setAddress] = useState(contactSelected?.address);
  const [notes, setNotes] = useState(contactSelected?.notes);

  const handleSave = () => {
    if (name === "" || phone === "") {
      alert("Please enter a name and phone number.");
      return;
    }

    const newContact: Contact = {
      id: Number(id),
      name: name as string,
      phone: phone as string,
      email: email as string,
      address: address as string,
      notes: notes as string,
    };
    updateContact(Number(id), newContact);
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>BACK</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Phone:</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} />

      <Text style={styles.label}>Email:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Notes:</Text>
      <TextInput style={styles.input} value={notes} onChangeText={setNotes} />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Contact</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  button: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#007bff",
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});
