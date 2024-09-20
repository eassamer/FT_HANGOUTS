import { ContactsContext } from "@/components/ContactsContext";
import { router, useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { AiOutlineMore } from "react-icons/ai";

export default function ProfileContact() {
  const { id } = useLocalSearchParams();
  const { getContactById, mainColor, deleteContact } =
    useContext(ContactsContext);

  const contactSelected = getContactById(Number(id));

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
        <Text style={styles.textTest}>Profile</Text>
        <View style={styles.hiddenView}></View>
      </View>
      <View style={styles.bodySection}>
        <View style={styles.DataSection}>
          <Text style={styles.title}>
            Full Name: <span style={styles.value}>{contactSelected?.name}</span>
          </Text>
          <Text style={styles.title}>
            Email: <span style={styles.value}>{contactSelected?.email}</span>
          </Text>
          <Text style={styles.title}>
            Phone: <span style={styles.value}>{contactSelected?.phone}</span>
          </Text>
          <Text style={styles.title}>
            Address:{" "}
            <span style={styles.value}>{contactSelected?.address}</span>
          </Text>
          <Text style={styles.title}>
            Notes: <span style={styles.value}>{contactSelected?.notes}</span>
          </Text>
        </View>
        <View style={styles.ButtonsSection}>
          <TouchableOpacity
            style={styles.EditButton}
            onPress={() => {
              router.push(`/Edit/${id}`);
            }}
          >
            <Text style={styles.EditText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.DeleteButton}
            onPress={() => {
              deleteContact(Number(id));
              router.push(`/home`);
            }}
          >
            <Text style={styles.EditText}>Delete Profile</Text>
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
  DataSection: {
    width: "100%",
    display: "flex",
    gap: 30,
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
  DeleteButton: {
    backgroundColor: "#b83030",
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
