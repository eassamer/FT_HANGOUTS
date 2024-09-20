import { ContactsContext } from "@/components/ContactsContext";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from "reanimated-color-picker";

export default function Settings() {
  const { mainColor, changeColor } = useContext(ContactsContext);
  const [showModal, setShowModal] = useState(false);
  const onSelectColor = ({ hex }: { hex: string }) => {
    // do something with the selected color.
    console.log(hex);
    changeColor(hex);
    console.log(mainColor);
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
        <Text style={styles.textTest}>Settings</Text>
        <View style={styles.hiddenView}></View>
      </View>
      <View style={styles.settingsSection}>
        <Text style={styles.ThemeTitle}>Change Theme :</Text>
        <View style={styles.ThemePick}>
          <View>
            <Text style={styles.themeText}>
              Color :{" "}
              <span
                style={{
                  padding: 5,
                  backgroundColor: mainColor,
                  color: "#fff",
                  borderRadius: 5,
                }}
              >
                {mainColor}
              </span>
            </Text>
          </View>
          <TouchableOpacity
            style={{ ...styles.themeButton }}
            onPress={() => setShowModal(true)}
          >
            <Text style={{ color: "white" }}>Change Theme</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={showModal} animationType="slide">
          <View
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingVertical: 20,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Select a Color
            </Text>
            <ColorPicker
              style={{ width: "60%", height: "50%", display: "flex", gap: 5 }}
              value={mainColor}
              onComplete={onSelectColor}
            >
              <Preview />
              <Panel1 />
              <HueSlider />
              <Swatches />
            </ColorPicker>

            <TouchableOpacity
              style={{
                backgroundColor: "#149921",
                padding: 10,
                borderRadius: 5,
                width: "60%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
              onPress={() => setShowModal(false)}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
  themeButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#1f1c1c",
  },
  themeText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "semibold",
  },
  settingsSection: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 10,
    padding: 20,
  },
  ThemeTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  ThemePick: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    alignItems: "center",
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
  textTest: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    textAlign: "center",
  },
  hiddenView: {
    height: 1,
    width: 30,
  },
});
