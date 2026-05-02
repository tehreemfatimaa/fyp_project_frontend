//done
import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";

export default function InstallSolar() {
  const router = useRouter();

  const [consumption, setConsumption] = useState("");
  const [location, setLocation] = useState("");
  const [solarHours, setSolarHours] = useState("");
  const [billOffset, setBillOffset] = useState("");
  const [envFactor, setEnvFactor] = useState("");

  const [unit, setUnit] = useState("kWh/yr");
  const [open, setOpen] = useState(false);

  const options = ["kWh/yr", "kWh/mo", "kWh/day"];

  const selectUnit = (value: string) => {
    setUnit(value);
    setOpen(false);
  };

  return (
    <View style={styles.screen}>
      {/* MAIN CARD */}
      <View style={styles.card}>
        {/* TITLE CONTAINER (Figma style section) */}
        <View style={styles.headerBox}>
          <Text style={styles.title}>
            Please fill out the following information
          </Text>
        </View>

        {/* INPUT SECTION */}
        <Text style={styles.label}>Electricity consumption</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="8990"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={consumption}
            onChangeText={setConsumption}
          />

          <TouchableOpacity
            style={styles.unitButton}
            onPress={() => setOpen(true)}
          >
            <Text style={styles.unitText}>{unit}</Text>
            <Text style={styles.arrow}>▼</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Your location</Text>
        <TextInput
          style={styles.input}
          placeholder="Karachi"
          placeholderTextColor="#9CA3AF"
          value={location}
          onChangeText={setLocation}
        />

        <Text style={styles.label}>Solar hours per day</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="5"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={solarHours}
            onChangeText={setSolarHours}
          />
          <Text style={styles.suffix}>hrs/day</Text>
        </View>

        <Text style={styles.label}>Bill offset percentage</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="80"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={billOffset}
            onChangeText={setBillOffset}
          />
          <Text style={styles.suffix}>%</Text>
        </View>

        <Text style={styles.label}>Environmental factor</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="80"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={envFactor}
            onChangeText={setEnvFactor}
          />
          <Text style={styles.suffix}>%</Text>
        </View>

        {/* PROGRESS BAR */}
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/roofinfo")}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* DROPDOWN MODAL (unchanged logic) */}
      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.dropdown}>
            {options.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.option}
                onPress={() => selectUnit(item)}
              >
                <Text style={styles.radio}>{unit === item ? "●" : "○"}</Text>
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  // SCREEN BACKGROUND (Figma light gray)
  screen: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    padding: 16,
  },

  // MAIN CARD (this is the missing Figma structure)
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
  },

  // HEADER BOX (your "title container")
  headerBox: {
    backgroundColor: "#F3F4F6",
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  label: {
    fontSize: 13,
    marginTop: 15,
    marginBottom: 5,
    color: "#374151",
  },

  input: {
    backgroundColor: "#F1F1F1",
    padding: 12,
    borderRadius: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  suffix: {
    fontSize: 13,
    color: "#555",
  },

  progressBar: {
    marginTop: 25,
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressFill: {
    width: "40%",
    height: "100%",
    backgroundColor: "#22C55E",
  },

  button: {
    marginTop: 20,
    backgroundColor: "#111827",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  unitButton: {
    backgroundColor: "#111827",
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
  },

  unitText: { color: "#fff" },
  arrow: { color: "#fff" },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  dropdown: {
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
  },

  option: {
    flexDirection: "row",
    paddingVertical: 10,
  },

  radio: {
    marginRight: 10,
  },
});
