// correct code with out blue pop up

import { useRouter } from "expo-router"; //chnage
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

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  InstallSolar: undefined;
  RoofInfo: undefined;
  AnalyzingScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "RoofInfo">;

type UnitType = "sq.m" | "sq.ft" | "sq.yd";
type PowerUnitType = "W" | "kW";
type UnitTarget = "roof" | "panel" | "power" | null;
type DropdownTarget = "roofType" | "orientation" | null;

export default function RoofInfo() {
  console.log("✅ ROOFINFO RENDERED");
  const router = useRouter(); // ✅ ADDED (from code 1 logic change)

  const navigation = useNavigation<NavigationProp>();

  const [roofAreaValue, setRoofAreaValue] = useState("");
  const [panelArea, setPanelArea] = useState("");
  const [powerOutput, setPowerOutput] = useState("");

  const [roofUnit, setRoofUnit] = useState<UnitType>("sq.m");
  const [panelUnit, setPanelUnit] = useState<UnitType>("sq.m");
  const [powerUnit, setPowerUnit] = useState<PowerUnitType>("W");

  const [isEditingRoof, setIsEditingRoof] = useState(false);
  const [isEditingPanel, setIsEditingPanel] = useState(false);
  const [isEditingPower, setIsEditingPower] = useState(false);

  const [unitModalVisible, setUnitModalVisible] = useState(false);
  const [unitTarget, setUnitTarget] = useState<UnitTarget>(null);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownTarget, setDropdownTarget] = useState<DropdownTarget>(null);

  const [roofType, setRoofType] = useState<string>("");
  const [orientation, setOrientation] = useState<string>("");

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

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.headerBox}>
          <Text style={styles.title}>
            Estimate required roof area and orientation
          </Text>
        </View>

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
                isEditingRoof
                  ? roofAreaValue
                  : roofAreaValue
                    ? `${roofAreaValue} ${roofUnit}`
                    : ""
              }
              onFocus={() => setIsEditingRoof(true)}
              onBlur={() => setIsEditingRoof(false)}
              onChangeText={(text) =>
                setRoofAreaValue(text.replace(/[^0-9.]/g, ""))
              }
            />

            <TouchableOpacity
              style={styles.unitBox}
              onPress={() => {
                setUnitTarget("roof");
                setUnitModalVisible(true);
              }}
            >
              <Text style={styles.unitText}>{roofUnit} ▼</Text>
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
                isEditingPanel
                  ? panelArea
                  : panelArea
                    ? `${panelArea} ${panelUnit}`
                    : ""
              }
              onFocus={() => setIsEditingPanel(true)}
              onBlur={() => setIsEditingPanel(false)}
              onChangeText={(text) =>
                setPanelArea(text.replace(/[^0-9.]/g, ""))
              }
            />

            <TouchableOpacity
              style={styles.unitBox}
              onPress={() => {
                setUnitTarget("panel");
                setUnitModalVisible(true);
              }}
            >
              <Text style={styles.unitText}>{panelUnit} ▼</Text>
            </TouchableOpacity>
          </View>

          {/* POWER OUTPUT */}
          <Text style={styles.label}>Power output per panel</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="eg. 100"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={
                isEditingPower
                  ? powerOutput
                  : powerOutput
                    ? `${powerOutput} ${powerUnit}`
                    : ""
              }
              onFocus={() => setIsEditingPower(true)}
              onBlur={() => setIsEditingPower(false)}
              onChangeText={(text) =>
                setPowerOutput(text.replace(/[^0-9.]/g, ""))
              }
            />

            <TouchableOpacity
              style={styles.unitBox}
              onPress={() => {
                setUnitTarget("power");
                setUnitModalVisible(true);
              }}
            >
              <Text style={styles.unitText}>{powerUnit} ▼</Text>
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
              onPress={() => {
                if (!roofType) setRoofType("Flat");
                setDropdownTarget("roofType");
                setDropdownVisible(true);
              }}
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
              onPress={() => {
                if (!orientation) setOrientation("South");
                setDropdownTarget("orientation");
                setDropdownVisible(true);
              }}
            >
              <Text style={styles.unitText}>{orientation || "South"} ▼</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* BUTTONS */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          {/* //comment it */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => router.push("/analyzing-screen")}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          {/* //comment it */}
          {/* <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity> */}
          {/* 2 correct */}
          {/* <TouchableOpacity
            style={styles.submitButton}
            onPress={() => navigation.replace("AnalyzingScreen")}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={styles.submitButton}
            // onPress={() => navigation.navigate("AnalyzingScreen")}
            onPress={() => {
              alert("Submit clicked"); // ✅ DEBUG TEST
            }}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity> */}
        </View>
      </View>

      {/* UNIT + DROPDOWN MODAL (FIXED LOGIC) */}
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
            {/* UNIT OPTIONS */}
            {unitTarget &&
              (unitTarget === "power" ? powerOptions : unitOptions).map(
                (item) => {
                  const current =
                    unitTarget === "roof"
                      ? roofUnit
                      : unitTarget === "panel"
                        ? panelUnit
                        : powerUnit;

                  return (
                    <TouchableOpacity
                      key={item.value}
                      style={styles.optionRow}
                      onPress={() => {
                        if (unitTarget === "roof")
                          setRoofUnit(item.value as UnitType);
                        if (unitTarget === "panel")
                          setPanelUnit(item.value as UnitType);
                        if (unitTarget === "power")
                          setPowerUnit(item.value as PowerUnitType);

                        setUnitModalVisible(false);
                        setUnitTarget(null);
                      }}
                    >
                      <Text style={styles.optionText}>{item.label}</Text>
                      <View style={styles.radioOuter}>
                        {current === item.value && (
                          <View style={styles.radioInner} />
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                },
              )}

            {/* DROPDOWN OPTIONS */}
            {dropdownTarget &&
              (dropdownTarget === "roofType"
                ? roofTypeOptions
                : orientationOptions
              ).map((item) => {
                const current =
                  dropdownTarget === "roofType"
                    ? roofType || "Flat"
                    : orientation || "South";

                return (
                  <TouchableOpacity
                    key={item.value}
                    style={styles.optionRow}
                    onPress={() => {
                      if (dropdownTarget === "roofType")
                        setRoofType(item.value);
                      if (dropdownTarget === "orientation")
                        setOrientation(item.value);

                      setDropdownVisible(false);
                      setDropdownTarget(null);
                    }}
                  >
                    <Text style={styles.optionText}>{item.label}</Text>
                    <View style={styles.radioOuter}>
                      {current === item.value && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F8FA" },
  content: { padding: 16 },
  card: { backgroundColor: "#fff", borderRadius: 20, padding: 16 },
  headerBox: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 12,
    marginBottom: 14,
  },
  title: { fontSize: 15, fontWeight: "600" },
  section: { marginTop: 10 },
  label: { fontSize: 12, marginTop: 12 },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  input: {
    flex: 1,
    height: 42,
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  unitBox: {
    width: 90,
    height: 42,
    backgroundColor: "#111827",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  unitText: { color: "#fff" },
  buttonRow: { flexDirection: "row", marginTop: 18, gap: 10 },
  backButton: {
    flex: 1,
    backgroundColor: "#111827",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#111827",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  centerModal: {
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    alignItems: "center",
  },
  optionText: { fontSize: 13 },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#111827",
  },
});

//  thoray issues

// import React, { useState } from "react";
// import {
//   Modal,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// import { useRouter } from "expo-router";

// type UnitType = "sq.m" | "sq.ft" | "sq.yd";
// type PowerUnitType = "W" | "kW";
// type UnitTarget = "roof" | "panel" | "power" | null;
// type DropdownTarget = "roofType" | "orientation" | null;

// export default function RoofInfo() {
//   const router = useRouter();

//   const [roofAreaValue, setRoofAreaValue] = useState("");
//   const [panelArea, setPanelArea] = useState("");
//   const [powerOutput, setPowerOutput] = useState("");

//   const [roofUnit, setRoofUnit] = useState<UnitType>("sq.m");
//   const [panelUnit, setPanelUnit] = useState<UnitType>("sq.m");
//   const [powerUnit, setPowerUnit] = useState<PowerUnitType>("W");

//   const [isEditingRoof, setIsEditingRoof] = useState(false);
//   const [isEditingPanel, setIsEditingPanel] = useState(false);
//   const [isEditingPower, setIsEditingPower] = useState(false);

//   const [unitModalVisible, setUnitModalVisible] = useState(false);
//   const [unitTarget, setUnitTarget] = useState<UnitTarget>(null);

//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [dropdownTarget, setDropdownTarget] = useState<DropdownTarget>(null);

//   const [roofType, setRoofType] = useState<string>("");
//   const [orientation, setOrientation] = useState<string>("");

//   const unitOptions = [
//     { label: "sq. m", value: "sq.m" },
//     { label: "sq. ft", value: "sq.ft" },
//     { label: "sq. yd", value: "sq.yd" },
//   ];

//   const powerOptions = [
//     { label: "W", value: "W" },
//     { label: "kW", value: "kW" },
//   ];

//   const roofTypeOptions = [
//     { label: "Flat", value: "Flat" },
//     { label: "Slop", value: "Slop" },
//   ];

//   const orientationOptions = [
//     { label: "South", value: "South" },
//     { label: "North", value: "North" },
//     { label: "East", value: "East" },
//     { label: "West", value: "West" },
//   ];

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.content}>
//       <View style={styles.card}>
//         <View style={styles.headerBox}>
//           <Text style={styles.title}>
//             Estimate required roof area and orientation
//           </Text>
//         </View>

//         <View style={styles.section}>
//           {/* ROOF AREA */}
//           <Text style={styles.label}>Your roof area</Text>
//           <View style={styles.row}>
//             <TextInput
//               style={styles.input}
//               placeholder="eg. 40"
//               placeholderTextColor="#9CA3AF"
//               keyboardType="numeric"
//               value={
//                 isEditingRoof
//                   ? roofAreaValue
//                   : roofAreaValue
//                     ? `${roofAreaValue} ${roofUnit}`
//                     : ""
//               }
//               onFocus={() => setIsEditingRoof(true)}
//               onBlur={() => setIsEditingRoof(false)}
//               onChangeText={(text) =>
//                 setRoofAreaValue(text.replace(/[^0-9.]/g, ""))
//               }
//             />

//             <TouchableOpacity
//               style={styles.unitBox}
//               onPress={() => {
//                 setUnitTarget("roof");
//                 setUnitModalVisible(true);
//               }}
//             >
//               <Text style={styles.unitText}>{roofUnit} ▼</Text>
//             </TouchableOpacity>
//           </View>

//           {/* PANEL AREA */}
//           <Text style={styles.label}>Area of one panel</Text>
//           <View style={styles.row}>
//             <TextInput
//               style={styles.input}
//               placeholder="eg. 18"
//               placeholderTextColor="#9CA3AF"
//               keyboardType="numeric"
//               value={
//                 isEditingPanel
//                   ? panelArea
//                   : panelArea
//                     ? `${panelArea} ${panelUnit}`
//                     : ""
//               }
//               onFocus={() => setIsEditingPanel(true)}
//               onBlur={() => setIsEditingPanel(false)}
//               onChangeText={(text) =>
//                 setPanelArea(text.replace(/[^0-9.]/g, ""))
//               }
//             />

//             <TouchableOpacity
//               style={styles.unitBox}
//               onPress={() => {
//                 setUnitTarget("panel");
//                 setUnitModalVisible(true);
//               }}
//             >
//               <Text style={styles.unitText}>{panelUnit} ▼</Text>
//             </TouchableOpacity>
//           </View>

//           {/* POWER OUTPUT */}
//           <Text style={styles.label}>Power output per panel</Text>
//           <View style={styles.row}>
//             <TextInput
//               style={styles.input}
//               placeholder="eg. 100"
//               placeholderTextColor="#9CA3AF"
//               keyboardType="numeric"
//               value={
//                 isEditingPower
//                   ? powerOutput
//                   : powerOutput
//                     ? `${powerOutput} ${powerUnit}`
//                     : ""
//               }
//               onFocus={() => setIsEditingPower(true)}
//               onBlur={() => setIsEditingPower(false)}
//               onChangeText={(text) =>
//                 setPowerOutput(text.replace(/[^0-9.]/g, ""))
//               }
//             />

//             <TouchableOpacity
//               style={styles.unitBox}
//               onPress={() => {
//                 setUnitTarget("power");
//                 setUnitModalVisible(true);
//               }}
//             >
//               <Text style={styles.unitText}>{powerUnit} ▼</Text>
//             </TouchableOpacity>
//           </View>

//           {/* ROOF TYPE */}
//           <Text style={styles.label}>Roof type</Text>
//           <View style={styles.row}>
//             <TextInput style={styles.input} value={roofType} editable={false} />

//             <TouchableOpacity
//               style={styles.unitBox}
//               onPress={() => {
//                 if (!roofType) setRoofType("Flat");
//                 setDropdownTarget("roofType");
//                 setDropdownVisible(true);
//               }}
//             >
//               <Text style={styles.unitText}>{roofType || "Flat"} ▼</Text>
//             </TouchableOpacity>
//           </View>

//           {/* ORIENTATION */}
//           <Text style={styles.label}>Orientation</Text>
//           <View style={styles.row}>
//             <TextInput
//               style={styles.input}
//               value={orientation}
//               editable={false}
//             />

//             <TouchableOpacity
//               style={styles.unitBox}
//               onPress={() => {
//                 if (!orientation) setOrientation("South");
//                 setDropdownTarget("orientation");
//                 setDropdownVisible(true);
//               }}
//             >
//               <Text style={styles.unitText}>{orientation || "South"} ▼</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* BUTTONS */}
//         <View style={styles.buttonRow}>
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => router.back()}
//           >
//             <Text style={styles.buttonText}>Back</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.submitButton}
//             onPress={() => router.push("/analyzing-screen")}
//           >
//             <Text style={styles.buttonText}>Submit</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* MODAL */}
//       <Modal
//         visible={unitModalVisible || dropdownVisible}
//         transparent
//         animationType="fade"
//       >
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           onPress={() => {
//             setUnitModalVisible(false);
//             setDropdownVisible(false);
//           }}
//         >
//           <View style={styles.centerModal}>
//             {/* UNIT OPTIONS */}
//             {unitTarget &&
//               (unitTarget === "power" ? powerOptions : unitOptions).map(
//                 (item) => (
//                   <TouchableOpacity
//                     key={item.value}
//                     style={styles.optionRow}
//                     onPress={() => {
//                       if (unitTarget === "roof")
//                         setRoofUnit(item.value as UnitType);
//                       if (unitTarget === "panel")
//                         setPanelUnit(item.value as UnitType);
//                       if (unitTarget === "power")
//                         setPowerUnit(item.value as PowerUnitType);

//                       setUnitModalVisible(false);
//                       setUnitTarget(null);
//                     }}
//                   >
//                     <Text style={styles.optionText}>{item.label}</Text>
//                   </TouchableOpacity>
//                 ),
//               )}

//             {/* DROPDOWN */}
//             {dropdownTarget &&
//               (dropdownTarget === "roofType"
//                 ? roofTypeOptions
//                 : orientationOptions
//               ).map((item) => (
//                 <TouchableOpacity
//                   key={item.value}
//                   style={styles.optionRow}
//                   onPress={() => {
//                     if (dropdownTarget === "roofType") setRoofType(item.value);
//                     if (dropdownTarget === "orientation")
//                       setOrientation(item.value);

//                     setDropdownVisible(false);
//                     setDropdownTarget(null);
//                   }}
//                 >
//                   <Text style={styles.optionText}>{item.label}</Text>
//                 </TouchableOpacity>
//               ))}
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </ScrollView>
//   );
// }
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F7F8FA" },
//   content: { padding: 16 },
//   card: { backgroundColor: "#fff", borderRadius: 20, padding: 16 },
//   headerBox: {
//     backgroundColor: "#F3F4F6",
//     padding: 12,
//     borderRadius: 12,
//     marginBottom: 14,
//   },
//   title: { fontSize: 15, fontWeight: "600" },
//   section: { marginTop: 10 },
//   label: { fontSize: 12, marginTop: 12 },
//   row: { flexDirection: "row", alignItems: "center", gap: 10 },
//   input: {
//     flex: 1,
//     height: 42,
//     backgroundColor: "#F9FAFB",
//     borderRadius: 10,
//     borderWidth: 1,
//     paddingHorizontal: 10,
//   },
//   unitBox: {
//     width: 90,
//     height: 42,
//     backgroundColor: "#111827",
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   unitText: { color: "#fff" },
//   buttonRow: { flexDirection: "row", marginTop: 18, gap: 10 },
//   backButton: {
//     flex: 1,
//     backgroundColor: "#111827",
//     padding: 12,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   submitButton: {
//     flex: 1,
//     backgroundColor: "#111827",
//     padding: 12,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   buttonText: { color: "#fff" },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   centerModal: {
//     width: "70%",
//     backgroundColor: "#fff",
//     borderRadius: 14,
//     padding: 14,
//   },
//   optionRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 12,
//     alignItems: "center",
//   },
//   optionText: { fontSize: 13 },
//   radioOuter: {
//     width: 18,
//     height: 18,
//     borderRadius: 9,
//     borderWidth: 2,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   radioInner: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "#111827",
//   },
// });
