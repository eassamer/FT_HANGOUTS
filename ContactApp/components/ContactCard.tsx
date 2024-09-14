import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const ContactCard = ({
  Name = "El Mehdi Assamer",
  Number = "+212 6 00 00 00 00",
  Email = "3nqFP@example.com",
  Address = "Cite 1er Novembre, Rabat",
  Notes = "Lorem ipsum dolor sit amet",
  id = 1,
}: {
  Name?: string;
  Number?: string;
  Email?: string;
  Address?: string;
  Notes?: string;
  id?: number;
}) => {
  return (
    <TouchableOpacity onPress={() => {}} key={id} style={styles.container}>
      <Text style={styles.Name}>{Name}</Text>
      <Text style={styles.subTitle}>{Number}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 5,
    alignItems: "flex-start",
    backgroundColor: "#3e43e3",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  Name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  subTitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "semibold",
  },
});
