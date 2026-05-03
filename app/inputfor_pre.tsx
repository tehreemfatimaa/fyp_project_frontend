// //done
// import { router } from "expo-router";
// import React, { useState } from "react";
// import {
//     Modal,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native";
// console.log("inputfor_pre");
// export default function InputScreen() {
//   const [location] = useState("Karachi");
//   const [consumption, setConsumption] = useState("");
//   const [solarHours, setSolarHours] = useState("");
//   const [billOffset, setBillOffset] = useState("");
//   const [envFactor, setEnvFactor] = useState("");
//   const [unit, setUnit] = useState("kWh/yr");
//   const [modalVisible, setModalVisible] = useState(false);

//   const units = ["kWh/yr", "kWh/mo", "kWh/day"];

//   const handleIntegerInput = (text: string, setter: any) => {
//     const cleaned = text.replace(/[^0-9]/g, "");
//     setter(cleaned);
//   };

//   const handleDecimalInput = (text: string, setter: any) => {
//     let cleaned = text.replace(/[^0-9.]/g, "");
//     const parts = cleaned.split(".");
//     if (parts.length > 2) cleaned = parts[0] + "." + parts.slice(1).join("");
//     if (cleaned === ".") cleaned = "";
//     setter(cleaned);
//   };

//   return (
//     <ScrollView style={styles.screen} contentContainerStyle={{ padding: 20 }}>
//       <View style={styles.card}>
//         <Text style={styles.header}>
//           Please fill out the following information
//         </Text>
//         <View style={styles.separator} />

//         {/* Consumption */}
//         {/*    <View style={styles.inputGroup}>
//           <Text style={styles.label}>Electricity consumption</Text>
//           <View style={styles.row}>
//             <TextInput
//               style={[styles.input, { flex: 1 }]}
//               keyboardType="number-pad"
//               placeholder="eg.900"
//               placeholderTextColor="#999"
//               value={consumption}
//               onChangeText={(t) => handleIntegerInput(t, setConsumption)}
//             />
//             <TouchableOpacity
//               style={styles.unitBox}
//               onPress={() => setModalVisible(true)}
//             >
//               <Text style={styles.unitText}>{unit} ∨</Text>
//             </TouchableOpacity>
//           </View>
//         </View>  */}
//         {/* Consumption */}
//         {/* Consumption */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Electricity consumption</Text>
//           <View style={styles.row}>
//             <View
//               style={{
//                 flex: 1,
//                 flexDirection: "row",
//                 alignItems: "center",
//                 backgroundColor: "#DEDEDE",
//                 borderRadius: 10,
//                 paddingHorizontal: 12,
//                 height: 45, // Keep height consistent
//               }}
//             >
//               <TextInput
//                 style={{
//                   // Removed flex: 1 to prevent it from pushing the unit away
//                   backgroundColor: "transparent",
//                   paddingHorizontal: 0,
//                   fontSize: 14,
//                   color: "#333",
//                   minWidth: 50, // Ensures there is space to click even if empty
//                 }}
//                 keyboardType="number-pad"
//                 placeholder="eg.900"
//                 placeholderTextColor="#999"
//                 value={consumption}
//                 onChangeText={(t) => handleIntegerInput(t, setConsumption)}
//               />
//               {consumption.length > 0 && (
//                 <Text style={{ color: "#555", fontSize: 14, marginLeft: 4 }}>
//                   {unit}
//                 </Text>
//               )}
//             </View>

//             <TouchableOpacity
//               style={styles.unitBox}
//               onPress={() => setModalVisible(true)}
//             >
//               <Text style={styles.unitText}>{unit} ∨</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Location - Locked to Karachi */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Your location</Text>
//           <View style={styles.disabledInput}>
//             <Text style={styles.disabledText}>{location}</Text>
//           </View>
//         </View>

//         {/* Solar Hours */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Solar hours per day</Text>
//           <View style={styles.row}>
//             <TextInput
//               style={[styles.input, { flex: 1 }]}
//               keyboardType="decimal-pad"
//               value={solarHours}
//               onChangeText={(t) => handleDecimalInput(t, setSolarHours)}
//               placeholder="5.1"
//               placeholderTextColor="#999"
//             />
//             <Text style={styles.sideLabel}>hrs/day</Text>
//           </View>
//         </View>

//         {/* Bill Offset */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Bill offset percentage</Text>
//           <View style={styles.row}>
//             <TextInput
//               style={[styles.input, { flex: 1 }]}
//               keyboardType="decimal-pad"
//               value={billOffset}
//               onChangeText={(t) => handleDecimalInput(t, setBillOffset)}
//               placeholder="80"
//               placeholderTextColor="#999"
//             />
//             <Text style={styles.sideLabel}>%</Text>
//           </View>
//         </View>

//         {/* Env Factor */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Environmental factor</Text>
//           <View style={styles.row}>
//             <TextInput
//               style={[styles.input, { flex: 1 }]}
//               keyboardType="decimal-pad"
//               value={envFactor}
//               onChangeText={(t) => handleDecimalInput(t, setEnvFactor)}
//               placeholder="80"
//               placeholderTextColor="#999"
//             />
//             <Text style={styles.sideLabel}>%</Text>
//           </View>
//         </View>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => router.push("/roofinfo")}
//         >
//           <Text style={styles.buttonText}>Next</Text>
//         </TouchableOpacity>

//         <View style={styles.progressContainer}>
//           <View style={styles.progressBar}>
//             <View style={styles.progressFill} />
//           </View>
//         </View>
//       </View>

//       {/* Unit Selector Modal */}
//       <Modal visible={modalVisible} transparent animationType="fade">
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           onPress={() => setModalVisible(false)}
//         >
//           <View style={styles.modalContent}>
//             {units.map((item) => (
//               <TouchableOpacity
//                 key={item}
//                 style={styles.modalOption}
//                 onPress={() => {
//                   setUnit(item);
//                   setModalVisible(false);
//                 }}
//               >
//                 <Text style={styles.modalOptionText}>{item}</Text>
//                 <View style={styles.radioOuter}>
//                   {unit === item && <View style={styles.radioInner} />}
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   screen: { flex: 1, backgroundColor: "#E5E5E5" },
//   card: {
//     backgroundColor: "#F5F5F5",
//     borderRadius: 30,
//     padding: 25,
//     marginTop: 40,
//     elevation: 5,
//   },
//   header: { fontSize: 24, fontWeight: "bold", color: "#000", marginBottom: 15 },
//   separator: { height: 1, backgroundColor: "#DDD", marginBottom: 20 },
//   inputGroup: { marginBottom: 18 },
//   label: { fontSize: 16, fontWeight: "bold", color: "#000", marginBottom: 8 },
//   row: { flexDirection: "row", alignItems: "center", gap: 10 },
//   input: {
//     backgroundColor: "#DEDEDE",
//     borderRadius: 10,
//     padding: 12,
//     fontSize: 14,
//     color: "#333",
//   },
//   disabledInput: {
//     backgroundColor: "#DEDEDE",
//     borderRadius: 10,
//     padding: 12,
//     width: "100%",
//   },
//   disabledText: { color: "#333", fontSize: 14 },
//   unitBox: {
//     backgroundColor: "#000",
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     height: 45,
//     justifyContent: "center",
//   },
//   unitText: { color: "#FFF", fontSize: 13, fontWeight: "600" },
//   sideLabel: { fontWeight: "bold", width: 60 },
//   button: {
//     backgroundColor: "#000",
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     borderRadius: 25,
//     alignSelf: "flex-end",
//     marginTop: 10,
//   },
//   buttonText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
//   progressContainer: { alignItems: "center", marginTop: 30 },
//   progressBar: {
//     width: 50,
//     height: 8,
//     backgroundColor: "#000",
//     borderRadius: 5,
//     overflow: "hidden",
//   },
//   progressFill: { width: "50%", height: "100%", backgroundColor: "#28a745" },
//   // Modal Styles
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     backgroundColor: "#FFF",
//     width: "80%",
//     borderRadius: 15,
//     padding: 10,
//   },
//   modalOption: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: "#EEE",
//   },
//   modalOptionText: { fontSize: 18, fontWeight: "600" },
//   radioOuter: {
//     height: 24,
//     width: 24,
//     borderRadius: 12,
//     borderWidth: 2,
//     borderColor: "#000",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   radioInner: {
//     height: 12,
//     width: 12,
//     borderRadius: 6,
//     backgroundColor: "#000",
//   },
// });

//without back button

// import { router } from "expo-router";
// import React, { useState } from "react";
// import {
//     Modal,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native";

// console.log("inputfor_pre");

// export default function InputScreen() {
//   const [location] = useState("Karachi");
//   const [consumption, setConsumption] = useState("");
//   const [solarHours, setSolarHours] = useState("");
//   const [billOffset, setBillOffset] = useState("");
//   const [envFactor, setEnvFactor] = useState("");
//   const [unit, setUnit] = useState("");
//   const [modalVisible, setModalVisible] = useState(false);

//   const units = ["kWh/yr", "kWh/mo", "kWh/day"];

//   const handleIntegerInput = (text: string, setter: any) => {
//     const cleaned = text.replace(/[^0-9]/g, "");
//     setter(cleaned);
//   };

//   const handleDecimalInput = (text: string, setter: any) => {
//     let cleaned = text.replace(/[^0-9.]/g, "");
//     const parts = cleaned.split(".");
//     if (parts.length > 2) cleaned = parts[0] + "." + parts.slice(1).join("");
//     if (cleaned === ".") cleaned = "";
//     setter(cleaned);
//   };

//   return (
//     <ScrollView style={styles.screen} contentContainerStyle={{ padding: 20 }}>
//       <View style={styles.card}>
//         <Text style={styles.header}>
//           Please fill out the following information
//         </Text>
//         <View style={styles.separator} />

//         {/* Consumption */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Electricity consumption</Text>
//           <View style={styles.row}>
//             <View
//               style={{
//                 flex: 1,
//                 flexDirection: "row",
//                 alignItems: "center",
//                 backgroundColor: "#DEDEDE",
//                 borderRadius: 10,
//                 paddingHorizontal: 12,
//                 height: 45,
//                 justifyContent: "flex-start", // Keeps everything to the left
//               }}
//             >
//               <TextInput
//                 style={{
//                   backgroundColor: "transparent",
//                   paddingHorizontal: 0,
//                   fontSize: 14,
//                   color: "#333",
//                   // No flex: 1 here so it doesn't push the unit away
//                 }}
//                 keyboardType="number-pad"
//                 placeholder="eg.900"
//                 placeholderTextColor="#999"
//                 value={consumption}
//                 onChangeText={(t) => handleIntegerInput(t, setConsumption)}
//               />
//               {consumption.length > 0 && unit.length > 0 && (
//                 <Text
//                   style={{
//                     color: "#333",
//                     fontSize: 14,
//                     marginLeft: 8,
//                     fontWeight: "500",
//                   }}
//                 >
//                   {unit}
//                 </Text>
//               )}
//             </View>

//             <TouchableOpacity
//               style={styles.unitBox}
//               onPress={() => setModalVisible(true)}
//             >
//               <Text style={styles.unitText}>
//                 {unit ? `${unit} ∨` : "Select ∨"}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Your Location */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Your location</Text>
//           <View style={styles.disabledInput}>
//             <Text style={styles.disabledText}>{location}</Text>
//           </View>
//         </View>

//         {/* Solar Hours */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Solar hours per day</Text>
//           <View style={styles.row}>
//             <TextInput
//               style={[styles.input, { flex: 1 }]}
//               keyboardType="decimal-pad"
//               value={solarHours}
//               onChangeText={(t) => handleDecimalInput(t, setSolarHours)}
//               placeholder="5.1"
//               placeholderTextColor="#999"
//             />
//             <Text style={styles.sideLabel}>hrs/day</Text>
//           </View>
//         </View>

//         {/* Bill Offset */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Bill offset percentage</Text>
//           <View style={styles.row}>
//             <TextInput
//               style={[styles.input, { flex: 1 }]}
//               keyboardType="decimal-pad"
//               value={billOffset}
//               onChangeText={(t) => handleDecimalInput(t, setBillOffset)}
//               placeholder="80"
//               placeholderTextColor="#999"
//             />
//             <Text style={styles.sideLabel}>%</Text>
//           </View>
//         </View>

//         {/* Environmental Factor */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Environmental factor</Text>
//           <View style={styles.row}>
//             <TextInput
//               style={[styles.input, { flex: 1 }]}
//               keyboardType="decimal-pad"
//               value={envFactor}
//               onChangeText={(t) => handleDecimalInput(t, setEnvFactor)}
//               placeholder="80"
//               placeholderTextColor="#999"
//             />
//             <Text style={styles.sideLabel}>%</Text>
//           </View>
//         </View>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => router.push("/roofinfo")}
//         >
//           <Text style={styles.buttonText}>Next</Text>
//         </TouchableOpacity>

//         <View style={styles.progressContainer}>
//           <View style={styles.progressBar}>
//             <View style={styles.progressFill} />
//           </View>
//         </View>
//       </View>

//       <Modal visible={modalVisible} transparent animationType="fade">
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           onPress={() => setModalVisible(false)}
//         >
//           <View style={styles.modalContent}>
//             {units.map((item) => (
//               <TouchableOpacity
//                 key={item}
//                 style={styles.modalOption}
//                 onPress={() => {
//                   setUnit(item);
//                   setModalVisible(false);
//                 }}
//               >
//                 <Text style={styles.modalOptionText}>{item}</Text>
//                 <View style={styles.radioOuter}>
//                   {unit === item && <View style={styles.radioInner} />}
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   screen: { flex: 1, backgroundColor: "#E5E5E5" },
//   card: {
//     backgroundColor: "#F5F5F5",
//     borderRadius: 30,
//     padding: 25,
//     marginTop: 40,
//     elevation: 5,
//   },
//   header: { fontSize: 24, fontWeight: "bold", color: "#000", marginBottom: 15 },
//   separator: { height: 1, backgroundColor: "#DDD", marginBottom: 20 },
//   inputGroup: { marginBottom: 18 },
//   label: { fontSize: 16, fontWeight: "bold", color: "#000", marginBottom: 8 },
//   row: { flexDirection: "row", alignItems: "center", gap: 10 },
//   input: {
//     backgroundColor: "#DEDEDE",
//     borderRadius: 10,
//     padding: 12,
//     fontSize: 14,
//     color: "#333",
//   },
//   disabledInput: {
//     backgroundColor: "#DEDEDE",
//     borderRadius: 10,
//     padding: 12,
//     width: "100%",
//   },
//   disabledText: { color: "#333", fontSize: 14 },
//   unitBox: {
//     backgroundColor: "#000",
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     height: 45,
//     justifyContent: "center",
//   },
//   unitText: { color: "#FFF", fontSize: 13, fontWeight: "600" },
//   sideLabel: { fontWeight: "bold", width: 60 },
//   button: {
//     backgroundColor: "#000",
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     borderRadius: 25,
//     alignSelf: "flex-end",
//     marginTop: 10,
//   },
//   buttonText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
//   progressContainer: { alignItems: "center", marginTop: 30 },
//   progressBar: {
//     width: 50,
//     height: 8,
//     backgroundColor: "#000",
//     borderRadius: 5,
//     overflow: "hidden",
//   },
//   progressFill: { width: "50%", height: "100%", backgroundColor: "#28a745" },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     backgroundColor: "#FFF",
//     width: "80%",
//     borderRadius: 15,
//     padding: 10,
//   },
//   modalOption: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: "#EEE",
//   },
//   modalOptionText: { fontSize: 18, fontWeight: "600" },
//   radioOuter: {
//     height: 24,
//     width: 24,
//     borderRadius: 12,
//     borderWidth: 2,
//     borderColor: "#000",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   radioInner: {
//     height: 12,
//     width: 12,
//     borderRadius: 6,
//     backgroundColor: "#000",
//   },
// });

import { router } from "expo-router";
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

console.log("inputfor_pre");

export default function InputScreen() {
  const [location] = useState("Karachi");
  const [consumption, setConsumption] = useState("");
  const [solarHours, setSolarHours] = useState("");
  const [billOffset, setBillOffset] = useState("");
  const [envFactor, setEnvFactor] = useState("");
  const [unit, setUnit] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const units = ["kwh/yr", "kwh/mo", "kwh/day"];

  const handleIntegerInput = (text: string, setter: any) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    setter(cleaned);
  };

  const handleDecimalInput = (text: string, setter: any) => {
    let cleaned = text.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) cleaned = parts[0] + "." + parts.slice(1).join("");
    if (cleaned === ".") cleaned = "";
    setter(cleaned);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 20 }}>
      <View style={styles.card}>
        <Text style={styles.header}>
          Please fill out the following information
        </Text>
        <View style={styles.separator} />

        {/* Consumption */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Electricity consumption</Text>
          <View style={styles.row}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#DEDEDE",
                borderRadius: 10,
                paddingHorizontal: 12,
                height: 45,
                justifyContent: "flex-start",
              }}
            >
              <TextInput
                style={{
                  backgroundColor: "transparent",
                  paddingHorizontal: 0,
                  fontSize: 14,
                  color: "#333",
                }}
                keyboardType="number-pad"
                placeholder="eg.900"
                placeholderTextColor="#999"
                value={consumption}
                onChangeText={(t) => handleIntegerInput(t, setConsumption)}
              />
              {consumption.length > 0 && unit.length > 0 && (
                <Text
                  style={{
                    color: "#333",
                    fontSize: 14,
                    marginLeft: 8,
                    fontWeight: "500",
                  }}
                >
                  {unit}
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.unitBox}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.unitText}>
                {unit ? `${unit} ▼` : "kwh/mo ▼"}
                {/* {unit ? `${unit} ∨` : "Select ∨"} */}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Your Location */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Your location</Text>
          <View style={styles.disabledInput}>
            <Text style={styles.disabledText}>{location}</Text>
          </View>
        </View>

        {/* Solar Hours */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Solar hours per day</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              keyboardType="decimal-pad"
              value={solarHours}
              onChangeText={(t) => handleDecimalInput(t, setSolarHours)}
              placeholder="5.1"
              placeholderTextColor="#999"
            />
            <Text style={styles.sideLabel}>hrs/day</Text>
          </View>
        </View>

        {/* Bill Offset */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bill offset percentage</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              keyboardType="decimal-pad"
              value={billOffset}
              onChangeText={(t) => handleDecimalInput(t, setBillOffset)}
              placeholder="80"
              placeholderTextColor="#999"
            />
            <Text style={styles.sideLabel}>%</Text>
          </View>
        </View>

        {/* Environmental Factor */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Environmental factor</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              keyboardType="decimal-pad"
              value={envFactor}
              onChangeText={(t) => handleDecimalInput(t, setEnvFactor)}
              placeholder="80"
              placeholderTextColor="#999"
            />
            <Text style={styles.sideLabel}>%</Text>
          </View>
        </View>

        {/* ✅ Button Row: Back and Next */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => router.push("/welcome")}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/roofinfo")}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </View>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {units.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.modalOption}
                onPress={() => {
                  setUnit(item);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalOptionText}>{item}</Text>
                <View style={styles.radioOuter}>
                  {unit === item && <View style={styles.radioInner} />}
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
  screen: { flex: 1, backgroundColor: "#E5E5E5" },
  card: {
    backgroundColor: "#F5F5F5",
    borderRadius: 30,
    padding: 25,
    marginTop: 40,
    elevation: 5,
  },
  header: { fontSize: 24, fontWeight: "bold", color: "#000", marginBottom: 15 },
  separator: { height: 1, backgroundColor: "#DDD", marginBottom: 20 },
  inputGroup: { marginBottom: 18 },
  label: { fontSize: 16, fontWeight: "bold", color: "#000", marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  input: {
    backgroundColor: "#DEDEDE",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: "#333",
  },
  disabledInput: {
    backgroundColor: "#DEDEDE",
    borderRadius: 10,
    padding: 12,
    width: "100%",
  },
  disabledText: { color: "#333", fontSize: 14 },
  unitBox: {
    backgroundColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 45,
    justifyContent: "center",
  },
  unitText: { color: "#FFF", fontSize: 13, fontWeight: "600" },
  sideLabel: { fontWeight: "bold", width: 60 },

  // ✅ Navigation Button Styles
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  backButton: {
    // backgroundColor: "transparent",

    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,

    backgroundColor: "#000",
  },

  buttonText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
  backButtonText: { color: "#ffffff", fontWeight: "bold", fontSize: 16 },

  progressContainer: { alignItems: "center", marginTop: 30 },
  progressBar: {
    width: 50,
    height: 8,
    backgroundColor: "#000",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressFill: { width: "50%", height: "100%", backgroundColor: "#28a745" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFF",
    width: "80%",
    borderRadius: 15,
    padding: 10,
  },
  modalOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  modalOptionText: { fontSize: 18, fontWeight: "600" },
  radioOuter: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#000",
  },
});
