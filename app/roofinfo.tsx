//og
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
console.log("roofinfo.tsx");
type UnitType = "sq.m" | "sq.ft" | "sq.yd";
type PowerUnitType = "W" | "kW";
type UnitTarget = "roof" | "panel" | "power" | null;
type DropdownTarget = "roofType" | "orientation" | null;

export default function RoofInfo() {
  const router = useRouter();

  // Form State (Khali rakha hai taake placeholder nazar aaye)
  const [roofAreaValue, setRoofAreaValue] = useState("");
  const [panelArea, setPanelArea] = useState("");
  const [powerOutput, setPowerOutput] = useState("");

  const [roofUnit, setRoofUnit] = useState<UnitType | null>(null);
  const [panelUnit, setPanelUnit] = useState<UnitType | null>(null);
  const [powerUnit, setPowerUnit] = useState<PowerUnitType | null>(null);
  const [roofType, setRoofType] = useState<string>("");
  const [orientation, setOrientation] = useState<string>("");

  // Modal Control State
  const [unitModalVisible, setUnitModalVisible] = useState(false);
  const [unitTarget, setUnitTarget] = useState<UnitTarget>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownTarget, setDropdownTarget] = useState<DropdownTarget>(null);
  const [tempSelection, setTempSelection] = useState<string>("");

  const unitOptions = [
    { label: "sq. m", value: "sq.m" },
    { label: "sq. ft", value: "sq.ft" },
    { label: "sq. yd", value: "sq.yd" },
  ];

  const powerOptions = [
    { label: "W", value: "W" },
    { label: "kW", value: "kW" },
  ];

  const roofTypeOptions = [
    { label: "Flat", value: "Flat" },
    { label: "Slop", value: "Slop" },
  ];

  const orientationOptions = [
    { label: "South", value: "South" },
    { label: "North", value: "North" },
    { label: "East", value: "East" },
    { label: "West", value: "West" },
  ];

  // Open Handlers
  const openUnitModal = (target: UnitTarget) => {
    setUnitTarget(target);
    const firstVal =
      target === "power" ? powerOptions[0].value : unitOptions[0].value;
    setTempSelection(firstVal);
    setUnitModalVisible(true);
  };

  const openDropdownModal = (target: DropdownTarget) => {
    setDropdownTarget(target);
    const firstVal =
      target === "roofType"
        ? roofTypeOptions[0].value
        : orientationOptions[0].value;
    setTempSelection(firstVal);
    setDropdownVisible(true);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.headerBox}>
          <Text style={styles.title}>
            Estimate required roof area and orientation
          </Text>
        </View>
        <View style={styles.separator} />

        <View style={styles.section}>
          {/* ROOF AREA */}
          <Text style={styles.label}>Your roof area</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="eg. 40"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={
                roofAreaValue
                  ? roofUnit
                    ? `${roofAreaValue} ${roofUnit}`
                    : roofAreaValue
                  : ""
              }
              onChangeText={setRoofAreaValue}
            />
            <TouchableOpacity
              style={styles.unitBox}
              onPress={() => openUnitModal("roof")}
            >
              <Text style={styles.unitText}>{roofUnit || "sq.m"} ▼</Text>
            </TouchableOpacity>
          </View>

          {/* PANEL AREA */}
          <Text style={styles.label}>Area of one panel</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="eg. 18"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={
                panelArea
                  ? panelUnit
                    ? `${panelArea} ${panelUnit}`
                    : panelArea
                  : ""
              }
              onChangeText={setPanelArea}
            />
            <TouchableOpacity
              style={styles.unitBox}
              onPress={() => openUnitModal("panel")}
            >
              <Text style={styles.unitText}>{panelUnit || "sq.m"} ▼</Text>
            </TouchableOpacity>
          </View>

          {/* POWER OUTPUT PER PANEL */}
          <Text style={styles.label}>Power output per panel</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="eg. 100"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={
                powerOutput
                  ? powerUnit
                    ? `${powerOutput} ${powerUnit}`
                    : powerOutput
                  : ""
              }
              onChangeText={setPowerOutput}
            />
            <TouchableOpacity
              style={styles.unitBox}
              onPress={() => openUnitModal("power")}
            >
              <Text style={styles.unitText}>{powerUnit || "W"} ▼</Text>
            </TouchableOpacity>
          </View>

          {/* ROOF TYPE */}
          <Text style={styles.label}>Roof type</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="eg. Flat"
              placeholderTextColor="#9CA3AF"
              value={roofType}
              editable={false}
            />
            <TouchableOpacity
              style={styles.unitBox}
              onPress={() => openDropdownModal("roofType")}
            >
              <Text style={styles.unitText}>{roofType || "Flat"} ▼</Text>
            </TouchableOpacity>
          </View>

          {/* ORIENTATION */}
          <Text style={styles.label}>Orientation</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="eg. South"
              placeholderTextColor="#9CA3AF"
              value={orientation}
              editable={false}
            />
            <TouchableOpacity
              style={styles.unitBox}
              onPress={() => openDropdownModal("orientation")}
            >
              <Text style={styles.unitText}>{orientation || "South"} ▼</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => router.push("/analyzing-screen")}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerIndicator} />
      </View>

      <Modal
        visible={unitModalVisible || dropdownVisible}
        transparent
        animationType="fade"
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => {
            setUnitModalVisible(false);
            setDropdownVisible(false);
          }}
        >
          <View style={styles.centerModal}>
            {(unitTarget
              ? unitTarget === "power"
                ? powerOptions
                : unitOptions
              : dropdownTarget === "roofType"
                ? roofTypeOptions
                : orientationOptions
            ).map((item) => (
              <TouchableOpacity
                key={item.value}
                style={styles.optionRow}
                onPress={() => {
                  if (unitTarget === "roof")
                    setRoofUnit(item.value as UnitType);
                  else if (unitTarget === "panel")
                    setPanelUnit(item.value as UnitType);
                  else if (unitTarget === "power")
                    setPowerOutput((prev) => prev); // ensures input stays active
                  if (unitTarget === "power")
                    setPowerUnit(item.value as PowerUnitType);
                  else if (dropdownTarget === "roofType")
                    setRoofType(item.value);
                  else if (dropdownTarget === "orientation")
                    setOrientation(item.value);
                  setUnitModalVisible(false);
                  setDropdownVisible(false);
                }}
              >
                <Text style={styles.optionText}>{item.label}</Text>
                <View style={styles.radioOuter}>
                  {tempSelection === item.value && (
                    <View style={styles.radioInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E5E7EB" },
  content: { padding: 12, paddingTop: 30, paddingBottom: 30 },
  card: {
    backgroundColor: "#F3F4F6",
    borderRadius: 35,
    padding: 24,
    minHeight: 720,
    elevation: 5,
  },
  headerBox: { paddingVertical: 10, marginBottom: 8 },
  title: { fontSize: 24, fontWeight: "800", color: "#000", lineHeight: 30 },
  separator: { height: 1, backgroundColor: "#D1D5DB", marginBottom: 20 },
  section: { marginTop: 0 },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
    marginTop: 15,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  unitBox: {
    width: 100,
    height: 48,
    backgroundColor: "#000",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
  unitText: { color: "#fff", fontWeight: "600", fontSize: 13 },
  buttonRow: {
    flexDirection: "row",
    marginTop: 40,
    justifyContent: "flex-end",
    gap: 15,
  },
  backButton: {
    width: 110,
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  submitButton: {
    width: 110,
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  footerIndicator: {
    width: 60,
    height: 8,
    backgroundColor: "#22C55E",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  centerModal: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#EEE",
  },
  optionText: { fontSize: 16, fontWeight: "500" },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
});
