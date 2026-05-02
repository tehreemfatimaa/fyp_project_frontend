//done
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    ImageSourcePropType,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// --- BottomIcon Component ---
interface BottomIconProps {
  imageSource: ImageSourcePropType;
  onPress: () => void;
  active: boolean;
}

const BottomIcon = ({ imageSource, onPress, active }: BottomIconProps) => (
  <TouchableOpacity style={styles.bottomIconContainer} onPress={onPress}>
    {active && <View style={styles.activeIndicator} />}
    <Image
      source={imageSource}
      style={[
        styles.bottomIconImage,
        { tintColor: active ? "#4caf50" : "#666" },
      ]}
      resizeMode="contain"
    />
  </TouchableOpacity>
);

export default function SolarDetailsScreen() {
  const [systemSize, setSystemSize] = useState("3kW");
  const [panelType, setPanelType] = useState("Monocrystalline");
  const [inverterType, setInverterType] = useState("on-grid");
  const [batteryCapacity, setBatteryCapacity] = useState("100");

  const [panelModalVisible, setPanelModalVisible] = useState(false);
  const [inverterModalVisible, setInverterModalVisible] = useState(false);

  const panelOptions = ["Monocrystalline", "Polycrystalline"];
  const inverterOptions = ["On-Grid", "Hybrid", "Off-Grid"];

  // ✅ Save and Navigate Logic
  const handleSave = () => {
    // Console mein data check karne ke liye
    console.log("Saving Solar Details:", {
      systemSize,
      panelType,
      inverterType,
      batteryCapacity,
    });

    // Confirmation Alert
    Alert.alert("Success", "Solar details updated successfully!", [
      {
        text: "OK",
        onPress: () => router.push("/profile"), // Profile par wapis bhejne ke liye
      },
    ]);
  };

  const SelectionModal = ({
    visible,
    setVisible,
    options,
    selectedValue,
    onSelect,
  }: any) => (
    <Modal transparent={true} visible={visible} animationType="fade">
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setVisible(false)}
      >
        <View style={styles.modalContent}>
          {options.map((option: string, index: number) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionRow,
                index !== options.length - 1 && styles.borderBottom,
              ]}
              onPress={() => {
                onSelect(option);
                setVisible(false);
              }}
            >
              <Text style={styles.optionText}>{option}</Text>
              <MaterialCommunityIcons
                name={
                  selectedValue.toLowerCase() === option.toLowerCase()
                    ? "radiobox-marked"
                    : "radiobox-blank"
                }
                size={24}
                color="black"
              />
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Solar Details</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.inputLabel}>Solar System size(kW)</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={systemSize}
            onChangeText={setSystemSize}
            keyboardType="numeric"
          />
        </View>

        <Text style={styles.inputLabel}>Panel type</Text>
        <TouchableOpacity
          style={styles.inputWrapper}
          onPress={() => setPanelModalVisible(true)}
        >
          <Text style={styles.inputText}>{panelType}</Text>
          <Ionicons name="chevron-down" size={20} color="black" />
        </TouchableOpacity>

        <Text style={styles.inputLabel}>Inverter type</Text>
        <TouchableOpacity
          style={styles.inputWrapper}
          onPress={() => setInverterModalVisible(true)}
        >
          <Text style={styles.inputText}>{inverterType}</Text>
          <Ionicons name="chevron-down" size={20} color="black" />
        </TouchableOpacity>

        <Text style={styles.inputLabel}>Battery capacity(kWh)</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={batteryCapacity}
            onChangeText={setBatteryCapacity}
            keyboardType="numeric"
          />
        </View>

        {/* ✅ Updated Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.8}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modals */}
      <SelectionModal
        visible={panelModalVisible}
        setVisible={setPanelModalVisible}
        options={panelOptions}
        selectedValue={panelType}
        onSelect={setPanelType}
      />
      <SelectionModal
        visible={inverterModalVisible}
        setVisible={setInverterModalVisible}
        options={inverterOptions}
        selectedValue={inverterType}
        onSelect={setInverterType}
      />

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <BottomIcon
          imageSource={require("../assets/images/home.png")}
          onPress={() => router.push("/estimatesolar-generation")}
          active={false}
        />
        <BottomIcon
          imageSource={require("../assets/images/bar-chart.png")}
          onPress={() => router.push("/stats")}
          active={false}
        />
        <BottomIcon
          imageSource={require("../assets/images/clock.png")}
          onPress={() => router.push("/usage")}
          active={false}
        />
        <BottomIcon
          imageSource={require("../assets/images/user.png")}
          onPress={() => router.push("/profile")}
          active={true}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginTop: 30,
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 22, fontWeight: "bold", marginLeft: 10 },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 120 },
  inputLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
    marginTop: 20,
  },
  inputWrapper: {
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: { flex: 1, fontSize: 14, color: "#666", fontWeight: "600" },
  inputText: { fontSize: 14, color: "#666", fontWeight: "600" },
  saveButton: {
    backgroundColor: "#000",
    height: 50,
    width: 130,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 60,
  },
  saveButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 15,
    paddingVertical: 10,
    elevation: 10,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: "#EEE" },
  optionText: { fontSize: 18, fontWeight: "500" },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 75,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    elevation: 20,
  },
  bottomIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
  },
  bottomIconImage: { width: 26, height: 26 },
  activeIndicator: {
    position: "absolute",
    top: 0,
    width: 35,
    height: 3,
    backgroundColor: "#4caf50",
  },
});
