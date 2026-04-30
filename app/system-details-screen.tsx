import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SystemDetailsScreen() {
  const [solarSize, setSolarSize] = useState("");

  const [panelArea, setPanelArea] = useState("");
  const [powerOutput, setPowerOutput] = useState("");

  const [hasBattery, setHasBattery] = useState(false);
  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [unit, setUnit] = useState("sq. m");
  const [unitSelected, setUnitSelected] = useState(false);
  const [powerUnitSelected, setPowerUnitSelected] = useState(false);
  const [unitModalVisible, setUnitModalVisible] = useState(false);
  const [panelModalVisible, setPanelModalVisible] = useState(false);
  const [inverterModalVisible, setInverterModalVisible] = useState(false);
  const [panelType, setPanelType] = useState("Monocrystalline");
  const [inverterType, setInverterType] = useState("On-grid");
  const [panelTouched, setPanelTouched] = useState(false);
  const [inverterTouched, setInverterTouched] = useState(false);
  // const displayPanelArea = panelArea ? `${panelArea} ${unit}` : "";
  const rightDisplay = panelArea.length > 0 ? `${unit}` : "sq. m";
  const [powerUnit, setPowerUnit] = useState("W");
  const router = useRouter();
  const [powerUnitModalVisible, setPowerUnitModalVisible] = useState(false);
  // ✅ PANEL QUANTITY STATE (ADD HERE)
  const [panelQuantity, setPanelQuantity] = useState(0);

  // ✅ HANDLERS (ADD HERE)
  const increasePanel = () => setPanelQuantity((prev) => prev + 1);
  const decreasePanel = () =>
    setPanelQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  const rightValueDisplay =
    panelArea.length > 0 ? `${panelArea} ${unit}` : unit;

  const panelAreaDisplay =
    panelArea.length === 0
      ? ""
      : unitSelected
        ? `${panelArea} ${unit}`
        : panelArea;

  const powerOutputDisplay =
    powerOutput.length === 0
      ? ""
      : powerUnitSelected
        ? `${powerOutput} ${powerUnit}`
        : powerOutput;

  // ✅ numbers only helper
  const onlyNumbers = (text: string) => text.replace(/[^0-9]/g, "");

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>Please enter your System details</Text>

        <View style={styles.card}>
          {/* Solar Size */}
          <Text style={styles.label}>Solar System size (kW)</Text>
          <TextInput
            value={solarSize}
            onChangeText={(t) => setSolarSize(onlyNumbers(t))}
            keyboardType="numeric"
            placeholder="e.g. 35kw"
            placeholderTextColor="#B0B0B0"
            //changing by me Solar System size
            style={[styles.input, { width: "75%" }]}
          />

          {/* Panel Type */}
          <Text style={styles.label}>Panel type</Text>
          {/* changing by me Panel type */}
          <View style={[styles.pickerWrapper, { width: "75%" }]}>
            <View pointerEvents="none">
              {/*  */}
              <Picker
                selectedValue={panelType}
                onValueChange={() => {}}
                style={[
                  styles.picker,
                  { color: panelTouched ? "#111" : "#B0B0B0" },
                ]}
              >
                <Picker.Item label="Monocrystalline" value="" />
                <Picker.Item label="Monocrystalline" value="Monocrystalline" />
                <Picker.Item label="Polycrystalline" value="Polycrystalline" />
              </Picker>
            </View>
            <Pressable
              style={styles.arrowClickArea}
              onPress={() => setPanelModalVisible(true)}
            />
          </View>

          {/* Area */}

          <Text style={styles.label}>Area of one panel</Text>

          <View style={styles.row}>
            <TextInput
              value={panelAreaDisplay}
              onChangeText={(text) => {
                // extract only number part (ignore unit if user somehow types it)
                const numeric = text.replace(/[^0-9]/g, "");
                setPanelArea(numeric);
              }}
              keyboardType="numeric"
              placeholder="e.g. 18 "
              placeholderTextColor="#B0B0B0"
              //changing by me Area of one panel
              // style={[styles.input, styles.flexInput]}

              style={[styles.input, { width: "62%" }]}
            />
            {/* ✅ PANEL QUANTITY CONTROL (ADD HERE) */}
            {/* changing by me counter  */}
            <View style={[styles.counterContainer, { width: 80 }]}>
              <Pressable style={styles.counterBtn} onPress={decreasePanel}>
                <Text style={styles.counterText}>−</Text>
              </Pressable>

              <Text style={styles.counterValue}>{panelQuantity}</Text>

              <Pressable style={styles.counterBtn} onPress={increasePanel}>
                <Text style={styles.counterText}>+</Text>
              </Pressable>
            </View>
            <View style={styles.unitButton}>
              <Text style={styles.unitText}>{unit}</Text>

              <Pressable onPress={() => setUnitModalVisible(true)} hitSlop={10}>
                <Text style={styles.unitArrow}> ▼</Text>
              </Pressable>
            </View>
          </View>

          {/* Power Output */}
          <Text style={styles.label}>Power output per panel</Text>
          {/* changing by me  Power Output */}
          <View style={[styles.row, { width: "75%" }]}>
            <TextInput
              value={powerOutputDisplay}
              onChangeText={(t) => setPowerOutput(onlyNumbers(t))}
              keyboardType="numeric"
              placeholder="e.g. 100"
              placeholderTextColor="#B0B0B0"
              style={[styles.input, styles.flexInput]}
            />

            <View style={styles.unitButton}>
              <Text style={styles.unitText}>{powerUnit}</Text>

              <Pressable
                onPress={() => setPowerUnitModalVisible(true)}
                hitSlop={10}
              >
                <Text style={styles.unitArrow}> ▼</Text>
              </Pressable>
            </View>
          </View>
          {/* Inverter Type */}
          <Text style={styles.label}>Inverter type</Text>
          {/* changing by me Inverter type */}
          <View style={[styles.pickerWrapper, { width: "75%" }]}>
            <View pointerEvents="none">
              <Picker
                selectedValue={inverterType}
                onValueChange={() => {}}
                style={[
                  styles.picker,
                  { color: inverterTouched ? "#111" : "#B0B0B0" },
                ]}
              >
                <Picker.Item label="On-grid" value="" />
                <Picker.Item label="On-grid" value="On-grid" />
                <Picker.Item label="Hybrid" value="Hybrid" />
                <Picker.Item label="Off-grid" value="Off-grid" />
              </Picker>
            </View>
            <Pressable
              style={styles.arrowClickArea}
              onPress={() => setInverterModalVisible(true)}
            />
          </View>

          {/* Battery */}
          {/* switch button */}
          {/* <View style={[styles.switchRow, { width: "20%" }]}> */}
          <Text style={styles.label}>Do you have battery?</Text>
          {/* switch button shift */}
          <View style={[styles.switchRow, { width: "20%" }]}>
            <Switch value={hasBattery} onValueChange={setHasBattery} />
          </View>

          {hasBattery && (
            <>
              <Text style={styles.label}>Battery capacity (kWh)</Text>
              <TextInput
                value={batteryCapacity}
                onChangeText={(t) => setBatteryCapacity(onlyNumbers(t))}
                keyboardType="numeric"
                placeholder="100"
                placeholderTextColor="#B0B0B0"
                //changing by me
                style={[styles.input, { width: "75%" }]}
              />
            </>
          )}
        </View>

        {/* Progress */}

        <View style={styles.progressBg}>
          <View style={styles.progressFill} />
        </View>

        <View style={styles.nextButtonContainer}>
          {/* <Pressable style={styles.nextButton}> */}
          <Pressable
            style={styles.nextButton}
            onPress={() => router.push("/appliance-usage-pattern")}
          >
            <Text style={styles.nextText}>Next</Text>
          </Pressable>
        </View>
      </View>

      {/* Panel Modal */}
      <Modal transparent animationType="fade" visible={panelModalVisible}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setPanelModalVisible(false)}
        >
          <View style={styles.modalCard}>
            {["Monocrystalline", "Polycrystalline"].map((item) => (
              <Pressable
                key={item}
                style={styles.modalRow}
                onPress={() => {
                  setPanelType(item);
                  setPanelTouched(true); // 👈 ADD THIS
                  setPanelModalVisible(false);
                }}
              >
                <Text style={styles.modalText}>{item}</Text>
                <View
                  style={[
                    styles.radioOuter,
                    panelType === item && styles.radioOuterActive,
                  ]}
                >
                  {panelType === item && <View style={styles.radioInner} />}
                </View>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* Inverter Modal */}
      <Modal transparent animationType="fade" visible={inverterModalVisible}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setInverterModalVisible(false)}
        >
          <View style={styles.modalCard}>
            {["On-grid", "Hybrid", "Off-grid"].map((item) => (
              <Pressable
                key={item}
                style={styles.modalRow}
                onPress={() => {
                  setInverterType(item);
                  setInverterTouched(true); // 👈 ADD THIS
                  setInverterModalVisible(false);
                }}
              >
                <Text style={styles.modalText}>{item}</Text>
                <View
                  style={[
                    styles.radioOuter,
                    inverterType === item && styles.radioOuterActive,
                  ]}
                >
                  {inverterType === item && <View style={styles.radioInner} />}
                </View>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* Unit Modal */}
      <Modal transparent animationType="fade" visible={unitModalVisible}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setUnitModalVisible(false)}
        >
          <View style={styles.modalCard}>
            {["sq. m", "sq. ft", "sq. yd"].map((item) => (
              <Pressable
                key={item}
                style={styles.modalRow}
                onPress={() => {
                  setUnit(item);
                  setUnitSelected(true); // 👈 ADD THIS
                  setUnitModalVisible(false);
                }}
              >
                <Text style={styles.modalText}>{item}</Text>
                <View
                  style={[
                    styles.radioOuter,
                    unit === item && styles.radioOuterActive,
                  ]}
                >
                  {unit === item && <View style={styles.radioInner} />}
                </View>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
      {/* Power Unit Modal */}
      <Modal transparent animationType="fade" visible={powerUnitModalVisible}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setPowerUnitModalVisible(false)}
        >
          <View style={styles.modalCard}>
            {["W", "kW"].map((item) => (
              <Pressable
                key={item}
                style={styles.modalRow}
                onPress={() => {
                  setPowerUnit(item);
                  setPowerUnitSelected(true); // 👈 ADD THIS
                  setPowerUnitModalVisible(false);
                }}
              >
                <Text style={styles.modalText}>{item}</Text>

                <View
                  style={[
                    styles.radioOuter,
                    powerUnit === item && styles.radioOuterActive,
                  ]}
                >
                  {powerUnit === item && <View style={styles.radioInner} />}
                </View>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

/* styles unchanged */
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f4f5f7",
  },

  content: {
    flex: 1,

    padding: 14,

    justifyContent: "flex-start",
  },

  title: {
    fontSize: 22,
    // fontWeight: "600",
    fontWeight: "600",
    marginBottom: 10,

    color: "#111",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,

    padding: 12,
  },

  label: {
    marginTop: 6,

    marginBottom: 3,

    color: "#333",
    fontSize: 14,
  },

  input: {
    height: 34,

    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#eee",
    fontSize: 14,
    color: "#111",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  flexInput: {
    flex: 1,
    // flex: 0.6,
  },
  unitButton: {
    height: 34,
    width: 85,
    // width: 70,
    paddingHorizontal: 14,
    backgroundColor: "#000",
    borderRadius: 10,
    // justifyContent: "center",
    // alignItems: "center",

    flexDirection: "row", // ✅ ADD THIS
    alignItems: "center", // ✅ ADD THIS
    justifyContent: "center", // ✅ ADD THI
  },
  unitText: {
    color: "#fff",
    fontSize: 12,
  },

  //   /* ✅ Picker fixed */
  pickerWrapper: {
    height: 34,

    backgroundColor: "#f9f9f9",
    borderRadius: 8,

    borderWidth: 1,
    borderColor: "#eee",
    overflow: "hidden",
    justifyContent: "center",
  },

  picker: {
    height: 34,

    // fontSize: 13,
    fontSize: 14,
    color: "#B0B0B0",
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingLeft: 10,
  },

  switchRow: {
    marginTop: 10,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  progressBg: {
    height: 5,
    // height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    marginTop: 12,

    overflow: "hidden",
  },

  progressFill: {
    width: "30%",
    height: "100%",
    backgroundColor: "#22c55e",
  },

  nextButtonContainer: {
    alignItems: "flex-end",
    marginTop: 10,
  },

  nextButton: {
    backgroundColor: "#000",
    paddingHorizontal: 22,

    paddingVertical: 10,

    borderRadius: 30,
  },

  nextText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  pickerText: {
    fontSize: 13,
    color: "#111",
    paddingLeft: 10,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 8,
  },

  modalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  modalText: {
    fontSize: 14,
    color: "#111",
    fontWeight: "500",
  },

  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: "#aaa",
    justifyContent: "center",
    alignItems: "center",
  },

  radioOuterActive: {
    borderColor: "#000",
  },

  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#000",
  },
  //new added for arrow only
  arrowClickArea: {
    position: "absolute",
    right: 0,
    height: "100%",
    width: 40, // only arrow area
  },
  unitArrow: {
    color: "#fff",
    fontSize: 10,
    marginLeft: 6,
  },
  // ✅ PANEL COUNTER STYLES (ADD HERE)
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 6,
    height: 34,
    width: 80,
  },

  counterBtn: {
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  counterText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },

  counterValue: {
    marginHorizontal: 6,
    fontSize: 14,
    fontWeight: "500",
    color: "#111",
  },
});
