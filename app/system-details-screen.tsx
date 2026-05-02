//done
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
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
  const [panelType, setPanelType] = useState("Monocrystalline");
  const [inverterType, setInverterType] = useState("on-grid");
  const [powerUnit, setPowerUnit] = useState("W");
  const [panelQuantity, setPanelQuantity] = useState(0);

  // Selection states for gray/dark text logic
  const [isPanelSelected, setIsPanelSelected] = useState(false);
  const [isInverterSelected, setIsInverterSelected] = useState(false);

  // Modal visibility
  const [unitModalVisible, setUnitModalVisible] = useState(false);
  const [panelModalVisible, setPanelModalVisible] = useState(false);
  const [inverterModalVisible, setInverterModalVisible] = useState(false);
  const [powerUnitModalVisible, setPowerUnitModalVisible] = useState(false);

  const router = useRouter();

  const increasePanel = () => setPanelQuantity((prev) => prev + 1);
  const decreasePanel = () =>
    setPanelQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.screen}
    >
      <View style={styles.cardWrapper}>
        <View style={styles.mainCard}>
          <Text style={styles.title}>
            Please enter your System{"\n"}details
          </Text>
          <View style={styles.separator} />

          {/* 1. Solar System Size */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Solar System size(kW)</Text>
            <TextInput
              value={solarSize}
              onChangeText={setSolarSize}
              keyboardType="numeric"
              placeholder="eg.3kW"
              placeholderTextColor="#999"
              style={[styles.fullInput, solarSize ? styles.darkText : null]}
            />
          </View>

          {/* 2. Panel Type */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Panel type</Text>
            <Pressable
              style={styles.dropdownInput}
              onPress={() => setPanelModalVisible(true)}
            >
              <Text
                style={
                  isPanelSelected ? styles.darkText : styles.placeholderText
                }
              >
                {panelType}
              </Text>
              <Text style={styles.arrowIcon}>▼</Text>
            </Pressable>
          </View>

          {/* 3. Area of one panel */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Area of one panel</Text>
            <View style={styles.row}>
              <TextInput
                value={panelArea}
                onChangeText={setPanelArea}
                keyboardType="numeric"
                placeholder="eg.18"
                placeholderTextColor="#999"
                style={[
                  styles.fullInput,
                  { flex: 2.5 },
                  panelArea ? styles.darkText : null,
                ]}
              />
              <View style={styles.counterBox}>
                <Pressable onPress={decreasePanel} style={styles.counterBtn}>
                  <Text style={styles.counterIcon}>-</Text>
                </Pressable>
                <Text style={styles.counterVal}>{panelQuantity}</Text>
                <Pressable onPress={increasePanel} style={styles.counterBtn}>
                  <Text style={styles.counterIcon}>+</Text>
                </Pressable>
              </View>
              <Pressable
                style={styles.unitTagSmall}
                onPress={() => setUnitModalVisible(true)}
              >
                <Text style={styles.unitTagText}>{unit}</Text>
                <Text style={styles.unitTagArrow}>▼</Text>
              </Pressable>
            </View>
          </View>

          {/* 4. Power output per panel */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Power output per panel</Text>
            <View style={styles.row}>
              <TextInput
                value={powerOutput}
                onChangeText={setPowerOutput}
                keyboardType="numeric"
                placeholder="eg.100"
                placeholderTextColor="#999"
                style={[
                  styles.fullInput,
                  { flex: 1, marginRight: 10 },
                  powerOutput ? styles.darkText : null,
                ]}
              />
              <Pressable
                style={styles.unitTagSmall}
                onPress={() => setPowerUnitModalVisible(true)}
              >
                <Text style={styles.unitTagText}>{powerUnit}</Text>
                <Text style={styles.unitTagArrow}>▼</Text>
              </Pressable>
            </View>
          </View>

          {/* 5. Inverter type */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Inverter type</Text>
            <Pressable
              style={styles.dropdownInput}
              onPress={() => setInverterModalVisible(true)}
            >
              <Text
                style={
                  isInverterSelected ? styles.darkText : styles.placeholderText
                }
              >
                {inverterType}
              </Text>
              <Text style={styles.arrowIcon}>▼</Text>
            </Pressable>
          </View>

          {/* 6. Battery Question */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Do you have battery?</Text>
            <Switch
              value={hasBattery}
              onValueChange={setHasBattery}
              trackColor={{ false: "#999", true: "#28a745" }}
              thumbColor={"#fff"}
              style={styles.switchStyle}
            />
          </View>

          {/* 7. Battery Capacity */}
          {hasBattery && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Battery capacity(kWh)</Text>
              <TextInput
                value={batteryCapacity}
                onChangeText={setBatteryCapacity}
                keyboardType="numeric"
                placeholder="100"
                placeholderTextColor="#999"
                style={[
                  styles.fullInput,
                  { width: "45%" },
                  batteryCapacity ? styles.darkText : null,
                ]}
              />
            </View>
          )}

          <Pressable
            style={styles.nextButton}
            onPress={() => router.push("/appliance-usage-pattern")}
          >
            <Text style={styles.nextText}>Next</Text>
          </Pressable>
          <Pressable
            style={styles.backButton}
            onPress={() => router.push("/welcome")}
          >
            <Text style={styles.backText}>Back</Text>
          </Pressable>

          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </View>
        </View>
      </View>

      {/* Modals with custom Radio UI */}
      <SelectionModal
        visible={panelModalVisible}
        setVisible={setPanelModalVisible}
        options={["Monocrystalline", "Polycrystalline"]}
        selected={panelType}
        onSelect={(val: string) => {
          setPanelType(val);
          setIsPanelSelected(true);
        }}
      />
      <SelectionModal
        visible={inverterModalVisible}
        setVisible={setInverterModalVisible}
        options={["on-grid", "hybrid", "off-grid"]}
        selected={inverterType}
        onSelect={(val: string) => {
          setInverterType(val);
          setIsInverterSelected(true);
        }}
      />
      <SelectionModal
        visible={unitModalVisible}
        setVisible={setUnitModalVisible}
        options={["sq. m", "sq. ft"]}
        selected={unit}
        onSelect={setUnit}
      />
      <SelectionModal
        visible={powerUnitModalVisible}
        setVisible={setPowerUnitModalVisible}
        options={["W", "kW"]}
        selected={powerUnit}
        onSelect={setPowerUnit}
      />
    </KeyboardAvoidingView>
  );
}

function SelectionModal({
  visible,
  setVisible,
  options,
  selected,
  onSelect,
}: any) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <Pressable style={styles.modalOverlay} onPress={() => setVisible(false)}>
        <View style={styles.modalCard}>
          {options.map((o: string, index: number) => (
            <Pressable
              key={o}
              style={[
                styles.modalRow,
                index === options.length - 1 && { borderBottomWidth: 0 },
              ]}
              onPress={() => {
                onSelect(o);
                setVisible(false);
              }}
            >
              <Text style={styles.modalText}>{o}</Text>
              <View style={styles.radioOuter}>
                {selected === o && <View style={styles.radioInner} />}
              </View>
            </Pressable>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFF" },
  cardWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  mainCard: {
    backgroundColor: "#F2F2F2",
    borderRadius: 35,
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#000",
    marginBottom: 12,
    lineHeight: 26,
  },
  separator: { height: 1, backgroundColor: "#CCC", marginBottom: 12 },
  inputGroup: { marginBottom: 12 },
  label: { fontSize: 16, fontWeight: "700", color: "#000", marginBottom: 5 },
  fullInput: {
    backgroundColor: "#D9D9D9",
    height: 38,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  dropdownInput: {
    backgroundColor: "#D9D9D9",
    height: 38,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeholderText: { color: "#999", fontWeight: "600" },
  darkText: { color: "#000", fontWeight: "700" },
  arrowIcon: { fontSize: 16, color: "#000" },
  row: { flexDirection: "row", alignItems: "center" },
  unitTagSmall: {
    backgroundColor: "#000",
    height: 38,
    borderRadius: 8,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 70,
  },
  unitTagText: { color: "#FFF", fontSize: 12, fontWeight: "600" },
  unitTagArrow: { color: "#FFF", fontSize: 14, marginLeft: 3 },
  counterBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    height: 30,
    paddingHorizontal: 4,
    marginHorizontal: 6,
    borderWidth: 0.5,
    borderColor: "#BBB",
  },
  counterBtn: { paddingHorizontal: 6 },
  counterIcon: { fontSize: 16, color: "#444" },
  counterVal: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    minWidth: 14,
    textAlign: "center",
  },
  switchStyle: {
    alignSelf: "flex-start",
    transform: [{ scale: 0.95 }],
    marginLeft: -4,
  },
  nextButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 22,
    alignSelf: "flex-end",
    marginTop: 5,
  },
  backButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 22,
    marginTop: -42,
    alignSelf: "flex-start",
    // marginBottom: 40,
    // marginTop: 10,
  },

  nextText: { color: "#FFF", fontWeight: "bold", fontSize: 15 },
  backText: { color: "#FFF", fontWeight: "bold", fontSize: 15 },

  progressContainer: { marginTop: 20, alignItems: "center" },
  progressTrack: {
    width: 45,
    height: 7,
    backgroundColor: "#000",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: { width: "60%", height: "100%", backgroundColor: "#34C759" },

  // Modal & Radio Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 15,
    paddingVertical: 10,
    overflow: "hidden",
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  modalText: { fontSize: 18, fontWeight: "600", color: "#000" },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#000", // Yeh beech wala dot hai jo selected hone par dikhega
  },
});
