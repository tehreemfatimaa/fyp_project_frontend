//done
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
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
console.log("edit aapliance if u want");
const initialAppliances: Appliance[] = [
  {
    label: "Select fan type",
    options: ["A/C", "D/C", "Inverter"],
    power: "50",
  },
  {
    label: "Select LED bulb type",
    options: ["5W", "7W", "12W", "15W", "18W"],
    power: "50",
  },
  {
    label: "Select LED TV type",
    options: ['32"', '42"', '55"', '65"'],
    power: "100",
  },
  {
    label: "Select Refrigerator type",
    options: ["A/C", "Inverter"],
    power: "110",
  },
  {
    label: "Select Washing machine type",
    options: ["A/C", "Inverter"],
    power: "150",
  },
  {
    label: "Select iron type",
    options: ["Plastic body", "Metal body"],
    power: "18",
  },
  {
    label: "Select Split AC type",
    options: ["1.0 ton", "1.5 ton", "2.0 ton"],
    power: "150",
  },
  { label: "Select microwave type", options: ["Standard"], power: "100" },
];

const USAGE_OPTIONS = ["Morning", "Afternoon", "Evening", "Night"];

export default function ApplianceUsagePattern() {
  const router = useRouter();
  const [applianceList, setApplianceList] =
    useState<Appliance[]>(initialAppliances);
  const [selected, setSelected] = useState<(string | null)[]>(
    initialAppliances.map((a) => a.options[0]),
  );
  const [usage, setUsage] = useState<(string | null)[]>(
    initialAppliances.map(() => "Morning"),
  );
  const [quantity, setQuantity] = useState<number[]>(
    initialAppliances.map((_, i) => (i === 0 ? 6 : i === 1 ? 10 : 1)),
  );

  // State to track which item is being edited
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
    if (editingIndex !== index) return; // Lock if not editing
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
    newList.splice(index, 1);
    setApplianceList(newList);
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
      setUsage([...usage, newUsage || "Morning"]);
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
        <View style={styles.divider} />
      </View>

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
                  {/* edit here */}
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
                  <Text style={styles.label}>Power ratting (Watt)</Text>
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
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.saveMainText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Add Appliance Modal */}
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
                <Text style={styles.label}>power ratting (Watt)</Text>
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

      {/* Radio Button Selection Modal */}
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
        <Ionicons name="home-outline" size={24} color="black" />
        <Ionicons name="stats-chart-outline" size={24} color="black" />
        <Ionicons name="pie-chart-outline" size={24} color="black" />
        <Ionicons name="person-circle-outline" size={28} color="#28a745" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#f2f2f2",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginTop: 20,
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 15 },
  section: { paddingHorizontal: 20, marginBottom: 10, paddingVertical: 5 },
  editingSection: { backgroundColor: "#ffffff", borderRadius: 10 },
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
    // color: "#696767",
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
  sectionDivider: { height: 1, backgroundColor: "#b9b7b7", marginTop: 15 },
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
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
});
