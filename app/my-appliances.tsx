import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
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
  { label: "Select microwave type", options: ["Standard"], power: "1200" },
];

const USAGE_OPTIONS = [
  "Morning(6am-12pm)",
  "Afternoon(12pm-4pm)",
  "Evening(4pm-8pm)",
  "Night(8pm-6am)",
];

const BottomIcon = ({ imageSource, onPress, active }: any) => (
  <TouchableOpacity style={styles.bottomIconContainer} onPress={onPress}>
    {active && <View style={styles.activeIndicator} />}
    <Image
      source={imageSource}
      style={[
        styles.bottomIconImage,
        { tintColor: active ? "#2ECC71" : "#888" },
      ]}
      resizeMode="contain"
    />
  </TouchableOpacity>
);

export default function ApplianceUsagePattern() {
  const router = useRouter();
  const [applianceList, setApplianceList] =
    useState<Appliance[]>(initialAppliances);
  const [selected, setSelected] = useState<(string | null)[]>(
    initialAppliances.map((a) => a.options[0]),
  );
  const [usage, setUsage] = useState<(string | null)[]>(
    initialAppliances.map(() => "Morning(6am-12pm)"),
  );
  const [quantity, setQuantity] = useState<number[]>(
    initialAppliances.map((_, i) => (i === 0 ? 6 : i === 1 ? 10 : 1)),
  );

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"options" | "usage">("options");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPower, setNewPower] = useState("");
  const [newQty, setNewQty] = useState(0);
  const [newUsage, setNewUsage] = useState<string | null>(null);
  const [usagePickerVisible, setUsagePickerVisible] = useState(false);

  const toggleEdit = (index: number) => {
    setEditingIndex(editingIndex === index ? null : index);
  };

  const openModal = (index: number, type: "options" | "usage") => {
    if (editingIndex !== index) return;
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
    if (editingIndex !== index) return;
    const newQtyArr = [...quantity];
    if (type === "inc") newQtyArr[index]++;
    else if (type === "dec" && newQtyArr[index] > 0) newQtyArr[index]--;
    setQuantity(newQtyArr);
  };

  const handleDelete = (index: number) => {
    const newList = [...applianceList];
    const newSelected = [...selected];
    const newUsageArr = [...usage];
    const newQtyArr = [...quantity];

    newList.splice(index, 1);
    newSelected.splice(index, 1);
    newUsageArr.splice(index, 1);
    newQtyArr.splice(index, 1);

    setApplianceList(newList);
    setSelected(newSelected);
    setUsage(newUsageArr);
    setQuantity(newQtyArr);
    setEditingIndex(null);
  };

  const handleDoneAdd = () => {
    if (newName.trim()) {
      const newAppliance: Appliance = {
        label: newName,
        options: [newName],
        isCustom: true,
        power: newPower || "0",
      };
      setApplianceList([...applianceList, newAppliance]);
      setSelected([...selected, newName]);
      setUsage([...usage, newUsage || "Morning(6am-12pm)"]);
      setQuantity([...quantity, newQty]);
      closeAddModal();
    }
  };

  const closeAddModal = () => {
    setNewName("");
    setNewPower("");
    setNewQty(0);
    setNewUsage(null);
    setAddModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Appliances</Text>
      </View>
      <View style={styles.headerDivider} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {applianceList.map((item, index) => {
          const isEditing = editingIndex === index;
          return (
            <View
              key={index}
              style={[styles.section, isEditing && styles.editingSection]}
            >
              <View style={styles.row}>
                <View style={styles.left}>
                  <Text style={styles.label}>{item.label}</Text>
                  <TouchableOpacity
                    style={[styles.dropdown, !isEditing && styles.lockedBg]}
                    onPress={() => openModal(index, "options")}
                  >
                    <Text style={styles.dropdownText}>{selected[index]}</Text>
                    <Ionicons
                      name="chevron-down"
                      size={16}
                      color={isEditing ? "black" : "#999"}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.center}>
                  <Text style={styles.label}></Text>
                  <View
                    style={[styles.qtyContainer, !isEditing && styles.lockedBg]}
                  >
                    <TouchableOpacity
                      onPress={() => updateQuantity(index, "dec")}
                    >
                      <Text style={styles.qtySymbol}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyValue}>{quantity[index]}</Text>
                    <TouchableOpacity
                      onPress={() => updateQuantity(index, "inc")}
                    >
                      <Text style={styles.qtySymbol}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.right}>
                  <Text style={styles.label}>Power rating (Watt)</Text>
                  <View
                    style={[styles.powerInput, !isEditing && styles.lockedBg]}
                  >
                    <Text style={styles.powerText}>{item.power || "0"}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.usageRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>usage hours</Text>
                  <TouchableOpacity
                    style={[
                      styles.dropdown,
                      { width: "60%" },
                      !isEditing && styles.lockedBg,
                    ]}
                    onPress={() => openModal(index, "usage")}
                  >
                    <Text style={styles.dropdownText}>{usage[index]}</Text>
                    <Ionicons
                      name="chevron-down"
                      size={16}
                      color={isEditing ? "black" : "#999"}
                    />
                  </TouchableOpacity>
                </View>
                {/* FIXED: Changed from <div> to <View> */}
                <View style={styles.actionIcons}>
                  <TouchableOpacity onPress={() => toggleEdit(index)}>
                    <MaterialCommunityIcons
                      name="pencil-outline"
                      size={24}
                      color={isEditing ? "#28a745" : "black"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(index)}>
                    <MaterialCommunityIcons
                      name="trash-can-outline"
                      size={24}
                      color="#d9534f"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.divider} />
            </View>
          );
        })}

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setAddModalVisible(true)}
        >
          <Text style={styles.addText}>+Add</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.saveMainBtn}
          onPress={() => router.push("/estimatesolar-generation")}
        >
          <Text style={styles.saveMainText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={addModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.addPopup}>
            <Text style={styles.popupTitle}>
              <Text style={{ color: "#28a745" }}>+</Text> Add Appliance
            </Text>
            <View style={styles.popupDivider} />
            <View style={styles.row}>
              <View style={{ flex: 1.5 }}>
                <Text style={styles.label}>Appliance name</Text>
                <TextInput
                  style={styles.popupInput}
                  value={newName}
                  onChangeText={setNewName}
                  placeholder="Enter name"
                />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.label}></Text>
                <View style={styles.qtyContainer}>
                  <TouchableOpacity
                    onPress={() => setNewQty(Math.max(0, newQty - 1))}
                  >
                    <Text>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyValue}>{newQty}</Text>
                  <TouchableOpacity onPress={() => setNewQty(newQty + 1)}>
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={[styles.row, { marginTop: 15 }]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>usage hours</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setUsagePickerVisible(true)}
                >
                  <Text
                    style={[
                      styles.dropdownText,
                      { color: newUsage ? "black" : "grey" },
                    ]}
                  >
                    {newUsage || "Select Hour"}
                  </Text>
                  <Ionicons name="chevron-down" size={14} color="black" />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.label}>power rating (Watt)</Text>
                <TextInput
                  style={styles.popupInput}
                  keyboardType="numeric"
                  value={newPower}
                  onChangeText={setNewPower}
                  placeholder="0"
                />
              </View>
            </View>
            <View style={styles.popupFooterButtons}>
              <TouchableOpacity onPress={closeAddModal} style={styles.blackBtn}>
                <Text style={styles.whiteBtnText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDoneAdd} style={styles.blackBtn}>
                <Text style={styles.whiteBtnText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
              renderItem={({ item }) => {
                const isSelected = usagePickerVisible
                  ? newUsage === item
                  : modalType === "options"
                    ? selected[activeIndex!] === item
                    : usage[activeIndex!] === item;
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
                    <MaterialCommunityIcons
                      name={isSelected ? "radiobox-marked" : "radiobox-blank"}
                      size={22}
                      color={isSelected ? "#171717" : "grey"}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>

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
  screen: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 15 },
  headerDivider: { height: 1, backgroundColor: "#eee", width: "100%" },
  section: { paddingHorizontal: 20, marginBottom: 10, paddingVertical: 5 },
  editingSection: { backgroundColor: "#f9f9f9", borderRadius: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  usageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 10,
  },
  left: { flex: 2 },
  center: { flex: 1, alignItems: "center", marginHorizontal: 5 },
  right: { flex: 1 },
  label: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#7a7a7a",
    marginBottom: 4,
  },
  dropdown: {
    backgroundColor: "#eee",
    height: 38,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  lockedBg: { backgroundColor: "#f5f5f5", opacity: 0.7 },
  dropdownText: { fontSize: 12, color: "#333232", fontWeight: "600" },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    height: 38,
    paddingHorizontal: 5,
    width: "100%",
    justifyContent: "space-between",
  },
  qtySymbol: {
    fontSize: 18,
    color: "#2b2c2b",
    fontWeight: "bold",
    paddingHorizontal: 5,
  },
  qtyValue: { fontSize: 13, fontWeight: "bold" },
  powerInput: {
    backgroundColor: "#eee",
    height: 38,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  powerText: { fontSize: 12, fontWeight: "bold" },
  actionIcons: {
    flexDirection: "row",
    width: 65,
    justifyContent: "space-between",
  },
  divider: { height: 1, backgroundColor: "#ddd", marginTop: 15 },
  addBtn: {
    backgroundColor: "#28a745",
    width: 80,
    height: 35,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 10,
  },
  addText: { color: "#fff", fontWeight: "bold" },
  saveMainBtn: {
    backgroundColor: "#000",
    width: "40%",
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30,
  },
  saveMainText: { color: "#fff", fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  addPopup: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  popupTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  popupDivider: { height: 1, backgroundColor: "#eee", marginBottom: 15 },
  popupInput: {
    backgroundColor: "#f0f0f0",
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 13,
  },
  popupFooterButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 25,
  },
  blackBtn: {
    backgroundColor: "#000",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  whiteBtnText: { color: "#fff", fontWeight: "bold" },
  modalContent: {
    width: "75%",
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
    borderBottomColor: "#f0f0f0",
  },
  modalItemText: { fontSize: 15 },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: "100%",
  },
  bottomIconImage: { width: 24, height: 24 },
  activeIndicator: {
    position: "absolute",
    top: 0,
    width: 30,
    height: 4,
    backgroundColor: "#2ECC71",
    borderRadius: 2,
  },
});
