import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
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
  isCustom?: boolean;
  power?: string;
};

const WATTAGE_DATA: Record<string, string> = {
  "A/C": "75",
  "D/C": "50",
  Inverter: "45",
  "5W": "5",
  "7W": "7",
  "12W": "12",
  "15W": "15",
  "18W": "18",
  '32"': "40",
  '42"': "60",
  '55"': "80",
  '65"': "120",
  "A/C (Fridge)": "250",
  "Inverter (Fridge)": "150",
  "A/C (WM)": "500",
  "Inverter (WM)": "300",
  "Plastic body": "1000",
  "Metal body": "1200",
  "1.0 ton": "1200",
  "1.5 ton": "1800",
  "2.0 ton": "2400",
  "1 ton": "1000",
  "1.5 ton (Inv)": "1400",
  Standard: "1200",
};

const initialAppliances: Appliance[] = [
  {
    label: "Select fan type",
    options: ["A/C", "D/C", "Inverter"],
    power: "75",
  },
  {
    label: "Select LED bulb type",
    options: ["5W", "7W", "12W", "15W", "18W"],
    power: "5",
  },
  {
    label: "Select LED TV type",
    options: ['32"', '42"', '55"', '65"'],
    power: "40",
  },
  {
    label: "Select Refrigerator type",
    options: ["A/C", "Inverter"],
    power: "250",
  },
  {
    label: "Select Washing machine type",
    options: ["A/C", "Inverter"],
    power: "500",
  },
  {
    label: "Select iron type",
    options: ["Plastic body", "Metal body"],
    power: "1000",
  },
  {
    label: "Select Split AC type",
    options: ["1.0 ton", "1.5 ton", "2.0 ton"],
    power: "1200",
  },
  {
    label: "Select inverter AC type",
    options: ["1 ton", "1.5 ton"],
    power: "1000",
  },
  { label: "Select microwave type", options: ["Standard"], power: "1200" },
];

const USAGE_OPTIONS = [
  "Morning(6am-12pm)",
  "Afternoon(12pm-4pm)",
  "Evening(4pm-8pm)",
  "Night(8pm-6am)",
];

export default function ApplianceUsagePattern() {
  const router = useRouter();
  const [applianceList, setApplianceList] =
    useState<Appliance[]>(initialAppliances);

  // Initializing selected with empty strings so placeholder stays grey
  const [selected, setSelected] = useState<(string | null)[]>(
    initialAppliances.map((item) =>
      item.label === "Select microwave type" ? "Standard" : "",
    ),
  );

  const [usage, setUsage] = useState<(string | null)[]>(
    initialAppliances.map(() => null),
  );
  const [quantity, setQuantity] = useState<number[]>(
    initialAppliances.map(() => 0),
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"options" | "usage">("options");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPower, setNewPower] = useState("");
  const [newQty, setNewQty] = useState(0);
  const [newUsage, setNewUsage] = useState<string | null>(null);
  const [usagePickerVisible, setUsagePickerVisible] = useState(false);

  const openModal = (index: number, type: "options" | "usage") => {
    if (
      type === "options" &&
      applianceList[index].label === "Select microwave type"
    )
      return;
    setActiveIndex(index);
    setModalType(type);
    setModalVisible(true);
  };

  const handleSelect = (value: string) => {
    if (activeIndex !== null) {
      if (modalType === "options") {
        const newSelected = [...selected];
        newSelected[activeIndex] = value;
        setSelected(newSelected);

        const newList = [...applianceList];
        let lookupKey = value;

        if (newList[activeIndex].label.includes("Refrigerator"))
          lookupKey = value === "A/C" ? "A/C (Fridge)" : "Inverter (Fridge)";
        if (newList[activeIndex].label.includes("Washing machine"))
          lookupKey = value === "A/C" ? "A/C (WM)" : "Inverter (WM)";
        if (
          newList[activeIndex].label.includes("inverter AC") &&
          value === "1.5 ton"
        )
          lookupKey = "1.5 ton (Inv)";

        newList[activeIndex].power = WATTAGE_DATA[lookupKey] || "0";
        setApplianceList(newList);
      } else {
        const newUsageArr = [...usage];
        newUsageArr[activeIndex] = value;
        setUsage(newUsageArr);
      }
    }
    setModalVisible(false);
  };

  const updateQuantity = (index: number, type: "inc" | "dec") => {
    const newQtyArr = [...quantity];
    if (type === "inc") newQtyArr[index]++;
    else if (type === "dec" && newQtyArr[index] > 0) newQtyArr[index]--;
    setQuantity(newQtyArr);
  };

  const handleDoneAdd = () => {
    if (newName.trim()) {
      const newAppliance: Appliance = {
        label: newName,
        options: ["Custom"],
        isCustom: true,
        power: newPower || "0",
      };
      setApplianceList([...applianceList, newAppliance]);
      setSelected([...selected, "Custom"]);
      setUsage([...usage, newUsage || USAGE_OPTIONS[0]]);
      setQuantity([...quantity, newQty]);

      setNewName("");
      setNewPower("");
      setNewQty(0);
      setNewUsage(null);
      setAddModalVisible(false);
    }
  };

  const handleCloseAdd = () => {
    setNewName("");
    setNewPower("");
    setNewQty(0);
    setNewUsage(null);
    setAddModalVisible(false);
  };

  const renderRadioIcon = (isSelected: boolean) => (
    <View
      style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}
    >
      {isSelected && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <View style={styles.stickyHeader}>
          <Text style={styles.title}>Appliances and usage pattern</Text>
          <View style={styles.divider} />
          <Text style={styles.note}>
            Note: Each company's appliances have separate watts, so these are
            average watts for all of them.
          </Text>
          <View style={styles.divider} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {applianceList.map((item, index) => {
            const isMicrowave = item.label === "Select microwave type";
            const currentSelected = selected[index];
            const currentUsage = usage[index];

            return (
              <View key={index} style={styles.section}>
                <View style={styles.row}>
                  <View style={styles.left}>
                    <Text style={styles.label}>
                      {item.isCustom ? "Appliance name:" : item.label}
                    </Text>
                    <TouchableOpacity
                      style={[
                        styles.dropdown,
                        (isMicrowave || item.isCustom) && {
                          backgroundColor: "#e8e8e8",
                        },
                      ]}
                      onPress={() => openModal(index, "options")}
                      disabled={isMicrowave || item.isCustom}
                    >
                      <Text
                        style={[
                          styles.dropdownText,
                          currentSelected !== ""
                            ? styles.textBlack
                            : styles.textGrey,
                        ]}
                      >
                        {item.isCustom
                          ? item.label
                          : isMicrowave
                            ? "Standard"
                            : currentSelected !== ""
                              ? currentSelected
                              : item.options[0]}
                      </Text>
                      {!isMicrowave && !item.isCustom && (
                        <Text style={styles.arrow}>▼</Text>
                      )}
                    </TouchableOpacity>
                  </View>

                  <View style={styles.center}>
                    <View style={styles.qtyContainer}>
                      <TouchableOpacity
                        onPress={() => updateQuantity(index, "dec")}
                        style={styles.qtyBtn}
                      >
                        <Text style={styles.darkText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyValue}>{quantity[index]}</Text>
                      <TouchableOpacity
                        onPress={() => updateQuantity(index, "inc")}
                        style={styles.qtyBtn}
                      >
                        <Text style={styles.darkText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.right}>
                    <Text style={styles.label}>Power rating(Watts)</Text>
                    <View style={styles.powerInput}>
                      <Text
                        style={[
                          currentSelected !== ""
                            ? styles.textBlack
                            : styles.textGrey,
                          { fontWeight: "bold" },
                        ]}
                      >
                        {currentSelected !== "" ? item.power : "0"}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.row2}>
                  <Text style={styles.label}>usage hours</Text>
                  <TouchableOpacity
                    style={[styles.dropdown, { width: "50%" }]}
                    onPress={() => openModal(index, "usage")}
                  >
                    <Text
                      style={[
                        styles.dropdownText,
                        currentUsage ? styles.textBlack : styles.textGrey,
                      ]}
                    >
                      {currentUsage || USAGE_OPTIONS[0]}
                    </Text>
                    <Text style={styles.arrow}>▼</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.sectionDivider} />
              </View>
            );
          })}

          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => setAddModalVisible(true)}
          >
            <Text style={styles.addText}>+Add</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => router.back()}
            >
              <Text style={styles.btnTextWhite}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.continueBtn}
              onPress={() => router.push("/data-analyzingscreen")}
            >
              <Text style={styles.btnTextWhite}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Add Appliance Modal */}
      <Modal visible={addModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.addPopup}>
            <Text style={styles.popupTitle}>
              <Text style={{ color: "#28a745" }}>+</Text> Add Appliance
            </Text>
            <View style={styles.divider} />
            <View style={styles.row}>
              <View style={{ flex: 2 }}>
                <Text style={styles.label}>Appliance name</Text>
                <TextInput
                  style={styles.popupInput}
                  value={newName}
                  onChangeText={setNewName}
                  placeholder="e.g. Curler"
                />
              </View>
              <View style={[styles.center, { flex: 1, marginTop: 15 }]}>
                <View style={styles.qtyContainer}>
                  <TouchableOpacity
                    onPress={() => setNewQty(Math.max(0, newQty - 1))}
                    style={styles.qtyBtn}
                  >
                    <Text>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyValue}>{newQty}</Text>
                  <TouchableOpacity
                    onPress={() => setNewQty(newQty + 1)}
                    style={styles.qtyBtn}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={[styles.row, { marginTop: 15 }]}>
              <View style={{ flex: 1.2 }}>
                <Text style={styles.label}>usage hours</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setUsagePickerVisible(true)}
                >
                  <Text
                    style={[
                      styles.dropdownText,
                      newUsage ? styles.textBlack : styles.textGrey,
                      { fontSize: 11 },
                    ]}
                    numberOfLines={1}
                  >
                    {newUsage || USAGE_OPTIONS[0]}
                  </Text>
                  <Text style={styles.arrow}>▼</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.label}>Power rating(Watts)</Text>
                <TextInput
                  style={styles.popupInput}
                  keyboardType="numeric"
                  value={newPower}
                  onChangeText={setNewPower}
                  placeholder="0"
                />
              </View>
            </View>

            <View
              style={[
                styles.row,
                { marginTop: 20, justifyContent: "space-between" },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.doneBtn,
                  { backgroundColor: "#000", alignSelf: "auto" },
                ]}
                onPress={handleCloseAdd}
              >
                <Text style={styles.btnTextWhite}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.doneBtn, { alignSelf: "auto" }]}
                onPress={handleDoneAdd}
              >
                <Text style={styles.btnTextWhite}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Dropdown Modal */}
      <Modal
        visible={modalVisible || usagePickerVisible}
        transparent
        animationType="fade"
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => {
            setModalVisible(false);
            setUsagePickerVisible(false);
          }}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={
                usagePickerVisible
                  ? USAGE_OPTIONS
                  : modalType === "options" && activeIndex !== null
                    ? applianceList[activeIndex].options
                    : USAGE_OPTIONS
              }
              renderItem={({ item, index: itemIdx }) => {
                let isSelected = false;
                if (usagePickerVisible) {
                  isSelected =
                    newUsage === item || (!newUsage && itemIdx === 0);
                } else if (modalType === "options" && activeIndex !== null) {
                  // Radio remains filled for index 0 if nothing selected
                  isSelected =
                    selected[activeIndex] === item ||
                    (selected[activeIndex] === "" && itemIdx === 0);
                } else if (modalType === "usage" && activeIndex !== null) {
                  isSelected =
                    usage[activeIndex] === item ||
                    (!usage[activeIndex] && itemIdx === 0);
                }

                return (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      if (usagePickerVisible) {
                        setNewUsage(item);
                        setUsagePickerVisible(false);
                      } else handleSelect(item);
                    }}
                  >
                    <Text
                      style={[
                        styles.modalItemText,
                        isSelected && { fontWeight: "bold" },
                      ]}
                    >
                      {item}
                    </Text>
                    {renderRadioIcon(isSelected)}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#ffffff" },
  card: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 30,
    marginTop: 30,
    marginBottom: 30,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  stickyHeader: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 15,
    paddingTop: 20,
    zIndex: 10,
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#000" },
  note: {
    color: "#28a745",
    fontSize: 12,
    marginVertical: 8,
    fontWeight: "500",
  },
  divider: { height: 1, backgroundColor: "#ddd", marginVertical: 5 },
  sectionDivider: { height: 1, backgroundColor: "#e0e0e0", marginTop: 15 },
  section: { marginBottom: 10, paddingHorizontal: 15 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  row2: { marginTop: 10 },
  left: { flex: 2 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  right: { flex: 1.5 },
  label: { fontSize: 13, fontWeight: "bold", color: "#000", marginBottom: 5 },
  dropdown: {
    backgroundColor: "#dcdcdc",
    height: 38,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  dropdownText: { fontSize: 13, fontWeight: "bold" },
  textBlack: { color: "#000" },
  textGrey: { color: "#7a7a7a" },
  arrow: { fontSize: 12, color: "#000" },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 30,
  },
  qtyBtn: { paddingHorizontal: 8 },
  qtyValue: {
    fontSize: 14,
    fontWeight: "bold",
    minWidth: 15,
    textAlign: "center",
  },
  darkText: { color: "#000", fontWeight: "bold" },
  powerInput: {
    backgroundColor: "#dcdcdc",
    height: 38,
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  addBtn: {
    backgroundColor: "#28a745",
    width: 80,
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
    marginLeft: 15,
  },
  addText: { color: "#fff", fontWeight: "bold" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    marginTop: 20,
  },
  backBtn: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 25,
  },
  continueBtn: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 25,
  },
  btnTextWhite: { color: "#fff", fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    maxHeight: "50%",
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalItemText: { fontSize: 16, color: "#000" },
  radioCircle: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  radioCircleSelected: { backgroundColor: "#fff" },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
  addPopup: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
  },
  popupTitle: { fontSize: 18, fontWeight: "bold" },
  popupInput: {
    backgroundColor: "#e0e0e0",
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 13,
  },
  doneBtn: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignSelf: "flex-end",
    marginTop: 20,
  },
});
