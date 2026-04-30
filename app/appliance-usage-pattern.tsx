import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
type Appliance = {
  label: string;
  options: string[];
};

// power rating watt idhr sy aay ga
const WATT_MAP: Record<string, number> = {
  fan: 75,
  bulb: 12,
  tv: 120,
  refrigerator: 200,
  washingmachine: 500,
  iron: 1000,
  splitac: 1500,
  inverterac: 1200,
  microwave: 900,
};

const appliances: Appliance[] = [
  { label: "Select fan type", options: ["A/C", "D/C", "Inverter"] },
  { label: "Select LED bulb type", options: ["5W", "7W", "12W", "15W", "18W"] },
  { label: "Select LED TV type", options: ['32"', '42"', '55"', '65"', '75"'] },
  { label: "Select Refrigerator type", options: ["A/C", "Inverter"] },
  {
    label: "Select Washing machine type",
    options: ["A/C", "Inverter"],
  },
  { label: "Select iron type", options: ["Plastic body", "Metal body"] },
  {
    label: "Select Split AC type",
    options: ["1.0 ton", "1.5 ton", "2.0 ton", "4.0 ton"],
  },
  { label: "Select inverter AC type", options: ["1 ton", "1.5 ton"] },

  { label: "Select microwave type", options: ["Standard", "Grill"] },
];

const usageOptions = ["Morning", "Evening", "Night", "Morning, Evening"];

const pickerStyle: any = {
  backgroundColor: "transparent",
  ...(Platform.OS === "android" && { borderWidth: 0, elevation: 0 }),
  ...(Platform.OS === "web" && {
    outline: "none",
    borderWidth: 0,
    boxShadow: "none",
    appearance: "none",
  }),
};

export default function ApplianceUsagePattern() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(appliances.map(() => ""));
  const [usage, setUsage] = useState<string[]>(appliances.map(() => ""));
  const [quantity, setQuantity] = useState<number[]>(appliances.map(() => 0));

  const [powerRatings, setPowerRatings] = useState<number[]>(
    appliances.map(() => 0),
  );
  const [addPowerRating, setAddPowerRating] = useState(0);

  const [addModalVisible, setAddModalVisible] = useState(false);
  // ✅ Add‑modal specific state
  const [addQty, setAddQty] = useState(0);

  const [addUsage, setAddUsage] = useState("");
  const [addUsageTouched, setAddUsageTouched] = useState(false);
  const [addUsageModalOpen, setAddUsageModalOpen] = useState(false);
  // ✅ Appliance name state (alphabet only)
  const [addApplianceName, setAddApplianceName] = useState("");

  // ✅ track manual user selection
  const [selectedTouched, setSelectedTouched] = useState<boolean[]>(
    appliances.map(() => false),
  );
  const [usageTouched, setUsageTouched] = useState<boolean[]>(
    appliances.map(() => false),
  );

  // ✅ MOVE IT HERE
  const [usageModalIndex, setUsageModalIndex] = useState<number | null>(null);
  const [typeModalIndex, setTypeModalIndex] = useState<number | null>(null);

  useEffect(() => {
    // ✅ First option selected by default (radio filled)
    setSelected(appliances.map((item) => item.options[0]));

    // ✅ Keep placeholder text LIGHT initially
    setSelectedTouched(appliances.map(() => false));

    // ✅ Usage hours default (already correct)
    setUsage(appliances.map(() => "Morning (6am–12pm)"));
    // ✅ Add‑modal default usage
    setAddUsage("Morning (6am–12pm)");
    setAddUsageTouched(false);
  }, []);
  // for alphabet only no numeric

  // ✅ Allow only alphabets and spaces
  const onlyAlphabets = (text: string) => {
    return text.replace(/[^a-zA-Z\s]/g, "");
  };

  const calculatePower = (name: string, qty: number) => {
    if (!name || qty === 0) return 0;

    const key = name.toLowerCase().replace(/\s/g, "");
    const baseWatt = WATT_MAP[key] || 0;

    return baseWatt * qty;
  };

  const updateQuantity = (index: number, type: "inc" | "dec") => {
    const updated = [...quantity];
    if (type === "inc") updated[index]++;
    if (type === "dec" && updated[index] > 0) updated[index]--;
    setQuantity(updated);

    const updatedPower = [...powerRatings];
    updatedPower[index] = calculatePower(selected[index], updated[index]);
    setPowerRatings(updatedPower);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <ScrollView
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>Appliances and usage pattern</Text>
            <View style={styles.sectionDivider} />
            <Text style={styles.note}>
              Note: Each company's appliances have separate watts, so these are
              average watts for all of them.
            </Text>
            <View style={styles.divider} />
          </View>

          {/* FORM */}
          {appliances.map((item, index) => (
            <View key={index} style={styles.section}>
              <View style={styles.row}>
                {/* LEFT */}

                <View style={styles.left}>
                  <Text style={styles.label}>{item.label}</Text>

                  {index === appliances.length - 1 ? (
                    // ✅ MICROWAVE (NON-EDITABLE)
                    <View style={styles.dropdown}>
                      <Text style={{ color: "#9e9e9e" }}>Standard</Text>
                    </View>
                  ) : (
                    // ✅ ALL OTHER APPLIANCES
                    <>
                      <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() => setTypeModalIndex(index)}
                      >
                        <Text
                          style={[
                            pickerStyle,
                            {
                              color: selectedTouched[index]
                                ? "#000"
                                : "#9e9e9e",
                            },
                          ]}
                        >
                          {selected[index] || "Select"}
                        </Text>
                      </TouchableOpacity>

                      <Text style={styles.dropdownArrow}>▾</Text>
                    </>
                  )}
                </View>

                {/* CENTER */}
                <View style={styles.center}>
                  {/* <Text style={styles.label}>Qty</Text> */}
                  <View style={styles.qtyBox}>
                    <TouchableOpacity
                      onPress={() => updateQuantity(index, "dec")}
                    >
                      <Text style={styles.qtyBtn}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyValue}>{quantity[index]}</Text>
                    <TouchableOpacity
                      onPress={() => updateQuantity(index, "inc")}
                    >
                      <Text style={styles.qtyBtn}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* RIGHT */}
                <View style={styles.right}>
                  <Text style={styles.label}>Power rating (Watts)</Text>
                  {/* <TextInput style={styles.input} value="0" editable={false} /> */}
                  <TextInput
                    style={styles.input}
                    value={`${powerRatings[index]} W`}
                    editable={false}
                  />
                </View>
              </View>

              {/* USAGE HOURS */}
              <View style={[styles.row2, { width: "44%" }]}>
                <Text style={styles.label}>usage hours</Text>

                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setUsageModalIndex(index)}
                >
                  <Text
                    style={[
                      pickerStyle,
                      { color: usageTouched[index] ? "#000" : "#9e9e9e" },
                    ]}
                  >
                    {usage[index] || "Select"}
                  </Text>
                  {/* <Text style={styles.dropdownArrow}>▾</Text> */}
                </TouchableOpacity>
                <Text style={styles.dropdownArrow}>▾</Text>
              </View>
              <View style={styles.sectionDivider} />
            </View>
          ))}

          {/* ADD BUTTON */}
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => setAddModalVisible(true)}
          >
            <Text style={[styles.addText, { width: "40%" }]}>+ Add</Text>
          </TouchableOpacity>

          {/* PROGRESS INDICATOR */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar} />
          </View>

          {/* FOOTER */}

          <View style={styles.footerFixed}>
            <View style={styles.footerRightGroup}>
              <TouchableOpacity
                style={styles.footerBtn}
                onPress={() => router.back()}
              >
                <Text style={styles.footerBtnText}>Back</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity style={styles.footerBtn}>
                <Text style={styles.footerBtnText}>Continue</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.footerBtn}
                onPress={() => router.push("/data-analyzingscreen")}
              >
                <Text style={styles.footerBtnText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {usageModalIndex !== null && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select one or more</Text>

              {[
                "Morning (6am–12pm)",
                "Afternoon (12pm–4pm)",
                "Evening (4pm–8pm)",
                "Night (8pm–6am)",
              ].map((opt) => {
                const isSelected = usage[usageModalIndex] === opt;

                return (
                  <TouchableOpacity
                    key={opt}
                    style={styles.modalOption}
                    onPress={() => {
                      const u = [...usage];
                      u[usageModalIndex] = opt;
                      setUsage(u);

                      const t = [...usageTouched];
                      t[usageModalIndex] = true;
                      setUsageTouched(t);

                      setUsageModalIndex(null);
                    }}
                  >
                    {/* TEXT LEFT */}
                    <Text style={styles.modalOptionText}>{opt}</Text>

                    {/* RADIO RIGHT */}
                    <View
                      style={[
                        styles.radioOuter,
                        isSelected && styles.radioOuterActive,
                      ]}
                    >
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
        {/* usageModal index */}
        {typeModalIndex !== null && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select appliance type</Text>

              {appliances[typeModalIndex].options.map((opt) => {
                const isSelected = selected[typeModalIndex] === opt;

                return (
                  <TouchableOpacity
                    key={opt}
                    style={styles.modalOption}
                    onPress={() => {
                      const s = [...selected];
                      s[typeModalIndex] = opt;
                      setSelected(s);

                      const t = [...selectedTouched];
                      t[typeModalIndex] = true;
                      setSelectedTouched(t);

                      setTypeModalIndex(null);
                    }}
                  >
                    {/* TEXT */}
                    <Text style={styles.modalOptionText}>{opt}</Text>

                    {/* RADIO */}
                    <View
                      style={[
                        styles.radioOuter,
                        isSelected && styles.radioOuterActive,
                      ]}
                    >
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* +add button open */}

        {addModalVisible && (
          <View style={styles.modalOverlay}>
            <View style={styles.addModalBox}>
              {/* ❌ Close button (Top Right) */}
              <TouchableOpacity
                style={styles.closeBtnTop}
                onPress={() => setAddModalVisible(false)}
              >
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>

              <Text style={styles.addModalTitle}>+ Add Appliance</Text>
              <View style={[styles.sectionDivider, { width: "100%" }]} />
              {/* ROW 1: Appliance name + Quantity */}
              <View style={styles.modalRow}>
                <View style={{ flex: 2 }}>
                  <Text style={styles.label}>Appliance name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter name"
                    placeholderTextColor="#9e9e9e"
                    value={addApplianceName}
                    onChangeText={(text) =>
                      setAddApplianceName(onlyAlphabets(text))
                    }
                  />
                </View>

                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.label}></Text>
                  <View style={[styles.qtyBox, { width: "25%" }]}>
                    {/* <View style={styles.qtyBox}> */}
                    <TouchableOpacity
                      onPress={() => setAddQty(Math.max(0, addQty - 1))}
                    >
                      <Text style={styles.qtyBtn}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.qtyValue}>{addQty}</Text>

                    <TouchableOpacity onPress={() => setAddQty(addQty + 1)}>
                      <Text style={styles.qtyBtn}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* ROW 2: Usage hours + Power rating */}
              <View style={[styles.modalRow, { marginTop: 12 }]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Usage hours</Text>

                  <View style={{ position: "relative" }}>
                    <TouchableOpacity
                      style={styles.dropdown}
                      onPress={() => setAddUsageModalOpen(true)}
                    >
                      <Text
                        style={[
                          pickerStyle,
                          { color: addUsageTouched ? "#000" : "#9e9e9e" },
                        ]}
                      >
                        {addUsage}
                      </Text>
                    </TouchableOpacity>

                    {/* Dropdown arrow */}
                    <Text style={styles.dropdownArrow}>▾</Text>
                  </View>
                </View>

                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.label}>Power rating (Watts)</Text>
                  {/* <TextInput
                    style={styles.input}
                    placeholder="0"
                    placeholderTextColor="#9e9e9e"
                    keyboardType="numeric"
                  /> */}
                  <TextInput
                    style={styles.input}
                    value={`${addPowerRating} W`}
                    editable={false}
                    pointerEvents="none"
                  />
                </View>
              </View>
            </View>
          </View>
        )}
        {addUsageModalOpen && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select usage hours</Text>

              {[
                "Morning (6am–12pm)",
                "Afternoon (12pm–4pm)",
                "Evening (4pm–8pm)",
                "Night (8pm–6am)",
              ].map((opt) => {
                const isSelected = addUsage === opt;

                return (
                  <TouchableOpacity
                    key={opt}
                    style={styles.modalOption}
                    onPress={() => {
                      setAddUsage(opt);
                      setAddUsageTouched(true);
                      setAddUsageModalOpen(false);
                    }}
                  >
                    <Text style={styles.modalOptionText}>{opt}</Text>

                    <View
                      style={[
                        styles.radioOuter,
                        isSelected && styles.radioOuterActive,
                      ]}
                    >
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#e9ecef", padding: 12 },
  card: {
    flex: 1,
    backgroundColor: "#f7f8fa",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#dcdfe3",
    overflow: "hidden",
  },
  //   header: { padding: 16 },
  header: {
    backgroundColor: "#f7f8fa",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
    zIndex: 10,
    elevation: 4, // Android sticky rendering fix
  },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 6 },
  note: { color: "#1aa34a", fontSize: 13 },
  divider: { height: 1, backgroundColor: "#e0e3e7", marginTop: 12 },
  sectionDivider: {
    height: 1,
    backgroundColor: "#e0e3e7",
    marginTop: 12,
    marginBottom: 16,
    width: 1200,
  },
  section: { paddingHorizontal: 16, marginBottom: 20 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  left: { flex: 2, marginRight: 8 },
  center: { flex: 1, alignItems: "center" },
  right: { flex: 1.5, marginLeft: 8 },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: "#2f2f2f",
    fontWeight: "bold",
  },

  dropdown: {
    backgroundColor: "#f0f1f3",
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    paddingRight: 36,
  },
  dropdownArrow: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -6 }],
    fontSize: 18,
    color: "#9e9e9e",
    pointerEvents: "none",
  },
  qtyBox: {
    flexDirection: "row",
    backgroundColor: "#f3eeee",

    borderRadius: 10,
    paddingHorizontal: 8,
    height: 40,
    alignItems: "center",
    marginTop: 19,
  },
  qtyBtn: { fontSize: 18, paddingHorizontal: 8 },
  qtyValue: { fontSize: 14, marginHorizontal: 6 },
  input: {
    backgroundColor: "#f0f1f3",
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
  },
  row2: { marginTop: 10 },
  addBtn: {
    marginHorizontal: 20,
    backgroundColor: "#1aa34a",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    width: 200,
    marginTop: 10,
  },
  addText: { color: "#fff", fontWeight: "600" },

  progressContainer: {
    marginTop: 14,
    alignItems: "center",
  },

  progressBar: {
    width: 50,
    height: 8,
    backgroundColor: "#1aa34a",
    borderRadius: 10,
  },

  footerFixed: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  footerRightGroup: {
    flexDirection: "row",
    alignSelf: "flex-end", // ✅ pushes buttons to RIGHT
  },

  footerBtn: {
    backgroundColor: "#000",
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 26,
    minWidth: 90,
    alignItems: "center",
    marginLeft: 8, // ✅ gap between Back & Continue
  },

  footerBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },

  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },

  modalTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1aa34a",
    marginBottom: 12,
  },

  modalOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalOptionText: {
    fontSize: 14,
    color: "#000",
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#ccc",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  radioOuterActive: {
    borderColor: "#151616",
    // borderColor: "#1aa34a",
  },

  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#151616",
    // backgroundColor: "#1aa34a",
  },
  addModalBox: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },

  addModalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1aa34a",
    marginBottom: 12,
  },
  modalRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  modalBtnRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 18,
  },
  addModalFooter: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  closeBtnTop: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 20,
  },

  closeBtnText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});
