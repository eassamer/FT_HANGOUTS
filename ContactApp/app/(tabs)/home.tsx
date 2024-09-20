import { ContactsContext } from "@/components/ContactsContext";
import axios from "axios";
import { router } from "expo-router";
import { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

// export default function Index() {
//   const { contacts, setContacts, deleteContact } = useContext(ContactsContext);

//   // api to getconstacts from server http://localhost:3000/contacts
//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/contacts");
//         console.log(response.data.contacts);
//         setContacts(response.data.contacts);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchContacts();
//   }, []);

//   const handleAddContact = () => {
//     router.push("/AddContact");
//   };

//   const handleEditContact = (id: number) => {
//     router.push(`/Edit/${id}`);
//   };

//   // display a flat list of contacts and just name and number with some styles
//   return (
//     <View style={styles.container}>
//       <Button title="Add Contact" onPress={handleAddContact} />
//       <FlatList
//         data={contacts}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.contactItem}>
//             <Text style={styles.contactName}>{item.name}</Text>
//             <Text>{item.phone}</Text>
//             <Text>{item.email}</Text>
//             <Text>{item.address}</Text>
//             <Text>{item.notes}</Text>
//             <View style={styles.buttonContainer}>
//               <TouchableOpacity
//                 style={styles.button}
//                 onPress={() => {
//                   handleEditContact(item.id);
//                 }}
//               >
//                 <Text style={styles.buttonText}>Edit</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.button}
//                 onPress={() => {
//                   deleteContact(item.id);
//                 }}
//               >
//                 <Text style={styles.buttonText}>Delete</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f5f5f5",
//     gap: 10,
//   },
//   contactItem: {
//     padding: 15,
//     marginBottom: 10,
//     backgroundColor: "#fff",
//     borderRadius: 5,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   contactName: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     marginTop: 10,
//   },
//   button: {
//     backgroundColor: "#007bff",
//     padding: 10,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

// redesign the mainPage
import { IoIosContact } from "react-icons/io";
import { ContactCard } from "@/components/ContactCard";
import { LuPlus } from "react-icons/lu";

export default function Index() {
  const { contacts, setContacts, mainColor } = useContext(ContactsContext);

  // api to getconstacts from server http://localhost:3000/contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/contacts");
        console.log(response.data.contacts);
        setContacts(response.data.contacts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContacts();
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.headerSection,
          backgroundColor: mainColor,
        }}
      >
        <IoIosContact size={40} color="#fff" />
        <Text style={styles.textTest}>Contacts App</Text>
      </View>
      <ScrollView style={styles.bodySection}>
        {contacts.map((contact) => (
          <ContactCard
            Name={contact.name}
            Email={contact.email}
            Number={contact.phone}
            Address={contact.address}
            Notes={contact.notes}
            id={contact.id}
            key={contact.id}
            mainColor={mainColor}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={{ ...styles.addButton, backgroundColor: mainColor }}
        onPress={() => {
          router.push("/AddContact");
        }}
      >
        <LuPlus size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    position: "relative",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: "#3e43e3",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerSection: {
    width: "100%",
    height: 70,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  textTest: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  bodySection: {
    width: "100%",
    height: "100%",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});
