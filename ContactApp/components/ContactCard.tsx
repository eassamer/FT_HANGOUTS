import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const ContactCard = ({
  Name = "El Mehdi Assamer",
  Number = "+212 6 00 00 00 00",
  mainColor = "#000",
  id = 1,
}: {
  Name?: string;
  Number?: string;
  Email?: string;
  Address?: string;
  Notes?: string;
  id?: number;
  mainColor?: string;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/Profile/${id}`);
      }}
      key={id}
      style={{ ...styles.container, backgroundColor: mainColor }}
    >
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
    borderRadius: 7,
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
