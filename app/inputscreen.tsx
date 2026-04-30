// import { router } from "expo-router";
// import React, { useState } from "react";
// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// export default function InputScreen() {
//   console.log(" INPUTSCREEN RENDERED");
//   // ✅ STATES
//   const [location] = useState("Karachi"); // fixed, user cannot edit
//   const [consumption, setConsumption] = useState("");
//   const [solarHours, setSolarHours] = useState("");
//   const [billOffset, setBillOffset] = useState("");
//   const [envFactor, setEnvFactor] = useState("");
//   const [isEditingConsumption, setIsEditingConsumption] = useState(false); //new for unit popup
//   const [unit, setUnit] = useState("kWh/yr");

//   // ✅ INTEGER ONLY (0–9)
//   const handleIntegerInput = (
//     text: string,
//     setter: (value: string) => void,
//   ) => {
//     const cleaned = text.replace(/[^0-9]/g, "");
//     setter(cleaned);
//   };

//   // ✅ DECIMAL ALLOWED (e.g. 25, 25.5)
//   const handleDecimalInput = (
//     text: string,
//     setter: (value: string) => void,
//   ) => {
//     let cleaned = text.replace(/[^0-9.]/g, "");

//     // ❗ prevent multiple dots
//     const parts = cleaned.split(".");
//     if (parts.length > 2) {
//       cleaned = parts[0] + "." + parts.slice(1).join("");
//     }

//     // ❗ prevent only "."
//     if (cleaned === ".") cleaned = "";

//     setter(cleaned);
//   };

//   const handleNext = () => {
//     console.log({
//       consumption,
//       location,
//       solarHours,
//       billOffset,
//       envFactor,
//       unit,
//     });
//   };

//   return (
//     <ScrollView style={styles.screen} contentContainerStyle={{ padding: 20 }}>
//       <View style={styles.card}>
//         <Text style={styles.header}>
//           Please fill out the following information
//         </Text>

//         {/* Electricity Consumption */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Electricity consumption</Text>

//           <View style={styles.row}>
//             {/* <TextInput
//               // style={[styles.input, { width: "20%" }]}
//               style={[styles.input, { flex: 2 }]}
//               keyboardType="number-pad"
//               value={consumption}
//               onChangeText={(t) => handleIntegerInput(t, setConsumption)}
//               placeholder="Enter value"
//             /> */}
//             {/* nnn */}
//             <TextInput
//               style={[styles.input, { flex: 2 }]}
//               keyboardType="number-pad"
//               placeholder="e.g 900"
//               value={
//                 isEditingConsumption
//                   ? consumption
//                   : consumption
//                     ? `${consumption} ${unit}`
//                     : ""
//               }
//               onFocus={() => setIsEditingConsumption(true)}
//               onBlur={() => setIsEditingConsumption(false)}
//               onChangeText={(text) =>
//                 setConsumption(text.replace(/[^0-9]/g, ""))
//               }
//             />
//             {/* nnn */}
//             <TouchableOpacity
//               style={styles.unitBox}
//               onPress={() =>
//                 setUnit(unit === "kWh/yr" ? "kWh/month" : "kWh/yr")
//               }
//             >
//               <Text style={styles.unitText}>{unit}▼</Text>
//             </TouchableOpacity>
//           </View>

//           {consumption !== "" && (
//             <Text style={{ marginTop: 6, color: "#555", fontSize: 12 }}>
//               {consumption} {unit}
//             </Text>
//           )}
//         </View>
//         {/* <Text style={styles.label}>Electricity consumption</Text>
//                 <View style={styles.row}>
//                   <TextInput
//                     style={styles.input}
//                     placeholder="eg. 40"
//                     placeholderTextColor="#9CA3AF"
//                     keyboardType="numeric"
//                     value={
//                       isEditingRoof
//                         ? roofAreaValue
//                         : roofAreaValue
//                           ? `${roofAreaValue} ${roofUnit}`
//                           : ""
//                     }
//                     onFocus={() => setIsEditingRoof(true)}
//                     onBlur={() => setIsEditingRoof(false)}
//                     onChangeText={(text) =>
//                       setRoofAreaValue(text.replace(/[^0-9.]/g, ""))
//                     }
//                   />

//                   <TouchableOpacity
//                     style={styles.unitBox}
//                     onPress={() => {
//                       setUnitTarget("roof");
//                       setUnitModalVisible(true);
//                     }}
//                   >
//                     <Text style={styles.unitText}>{roofUnit} ▼</Text>
//                   </TouchableOpacity>
//                 </View> */}

//         {/* Location */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Your location</Text>

//           <View
//             style={[styles.input, { width: "55%", justifyContent: "center" }]}
//           >
//             <Text style={{ color: "#777", fontSize: 14 }}>Karachi</Text>
//           </View>
//         </View>

//         {/* Solar Hours */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Solar hours per day</Text>
//           <TextInput
//             style={styles.input}
//             keyboardType="number-pad"
//             onChangeText={(t) => handleIntegerInput(t, setSolarHours)}
//             placeholder="hrs/day"
//           />
//         </View>

//         {/* Bill Offset */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Bill offset percentage</Text>
//           <TextInput
//             style={styles.input}
//             keyboardType="decimal-pad"
//             onChangeText={(t) => handleDecimalInput(t, setBillOffset)}
//             placeholder="%"
//           />
//         </View>

//         {/* Environmental Factor */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Environmental factor</Text>
//           <TextInput
//             style={styles.input}
//             keyboardType="decimal-pad"
//             onChangeText={(t) => handleDecimalInput(t, setEnvFactor)}
//             placeholder="%"
//           />
//         </View>
//         {/*
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => router.push("/welcome")}
//         >
//           <Text style={styles.buttonText}>Login</Text>
//         </TouchableOpacity> */}
//         <View style={styles.buttonWrapper}>
//           {/* <TouchableOpacity style={styles.button} onPress={handleNext}> */}
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => router.push("/roofinfo")}
//           >
//             <Text style={styles.buttonText}>Next</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {
//     backgroundColor: "#F2F2F2",
//   },
//   card: {
//     backgroundColor: "#F7F7F7",
//     borderRadius: 22,
//     padding: 20,
//   },
//   header: {
//     fontSize: 30,
//     fontWeight: "800",
//     marginBottom: 12,
//     color: "#111",
//   },
//   inputGroup: {
//     marginBottom: 14,
//   },
//   label: {
//     fontSize: 13,
//     marginBottom: 6,
//     color: "#333",
//   },
//   input: {
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 12,
//     paddingVertical: 12,
//     paddingHorizontal: 14,
//     fontSize: 14,
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },
//   unitBox: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 12,
//     paddingHorizontal: 14,
//     height: 48,
//     justifyContent: "center",
//     backgroundColor: "#fff",
//   },
//   unitText: {
//     fontSize: 12,
//     fontWeight: "600",
//   },

//   button: {
//     // backgroundColor: "#000",
//     // paddingVertical: 10, // ⬇️ pehle 14 tha
//     // paddingHorizontal: 24, // ⬇️ size chhota
//     // borderRadius: 12,
//     // alignItems: "center",

//     backgroundColor: "#000",
//     paddingVertical: 8, // ✅ chhota size
//     paddingHorizontal: 22, // ✅ chhota size
//     borderRadius: 12,
//     alignItems: "center",

//     alignSelf: "flex-end", // ✅ ✅ THIS IS TH
//   },

//   // buttonText: {
//   //   color: "#fff",
//   //   fontWeight: "600",
//   // },

//   buttonText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 14, // ⬇️ slightly smaller text
//   },

//   buttonWrapper: {
//     alignItems: "flex-end", // ✅ right side
//     marginTop: 10,
//   },
// });

import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function InputScreen() {
  console.log("✅ INPUTSCREEN RENDERED");

  const [location] = useState("Karachi");
  const [consumption, setConsumption] = useState("");
  const [solarHours, setSolarHours] = useState("");
  const [billOffset, setBillOffset] = useState("");
  const [envFactor, setEnvFactor] = useState("");
  const [unit, setUnit] = useState("kWh/yr");

  // integer only
  const handleIntegerInput = (text: string, setter: any) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    setter(cleaned);
  };

  // decimal allowed
  const handleDecimalInput = (text: string, setter: any) => {
    let cleaned = text.replace(/[^0-9.]/g, "");

    const parts = cleaned.split(".");
    if (parts.length > 2) {
      cleaned = parts[0] + "." + parts.slice(1).join("");
    }

    if (cleaned === ".") cleaned = "";

    setter(cleaned);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 20 }}>
      <View style={styles.card}>
        <Text style={styles.header}>
          Please fill out the following information
        </Text>

        {/* Consumption */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Electricity consumption</Text>

          <View style={styles.row}>
            <TextInput
              style={[styles.input, { flex: 2 }]}
              keyboardType="number-pad"
              placeholder="e.g 900"
              value={consumption} // ✅ PURE VALUE
              onChangeText={(t) => handleIntegerInput(t, setConsumption)}
            />

            <TouchableOpacity
              style={styles.unitBox}
              onPress={() =>
                setUnit(unit === "kWh/yr" ? "kWh/month" : "kWh/yr")
              }
            >
              <Text style={styles.unitText}>{unit} ▼</Text>
            </TouchableOpacity>
          </View>

          {/* Display separately */}
          {consumption !== "" && (
            <Text style={{ marginTop: 6, color: "#555", fontSize: 12 }}>
              {consumption} {unit}
            </Text>
          )}
        </View>

        {/* Location */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Your location</Text>
          <View
            style={[styles.input, { width: "55%", justifyContent: "center" }]}
          >
            <Text style={{ color: "#777" }}>{location}</Text>
          </View>
        </View>

        {/* Solar Hours */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Solar hours per day</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={solarHours}
            onChangeText={(t) => handleIntegerInput(t, setSolarHours)}
            placeholder="hrs/day"
          />
        </View>

        {/* Bill Offset */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bill offset percentage</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            value={billOffset}
            onChangeText={(t) => handleDecimalInput(t, setBillOffset)}
            placeholder="%"
          />
        </View>

        {/* Env Factor */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Environmental factor</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            value={envFactor}
            onChangeText={(t) => handleDecimalInput(t, setEnvFactor)}
            placeholder="%"
          />
        </View>

        {/* Button */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/roofinfo")}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F2F2F2",
  },
  card: {
    backgroundColor: "#F7F7F7",
    borderRadius: 22,
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 12,
    color: "#111",
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    marginBottom: 6,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  unitBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  unitText: {
    fontSize: 12,
    fontWeight: "600",
  },

  button: {
    // backgroundColor: "#000",
    // paddingVertical: 10, // ⬇️ pehle 14 tha
    // paddingHorizontal: 24, // ⬇️ size chhota
    // borderRadius: 12,
    // alignItems: "center",

    backgroundColor: "#000",
    paddingVertical: 8, // ✅ chhota size
    paddingHorizontal: 22, // ✅ chhota size
    borderRadius: 12,
    alignItems: "center",

    alignSelf: "flex-end", // ✅ ✅ THIS IS TH
  },

  // buttonText: {
  //   color: "#fff",
  //   fontWeight: "600",
  // },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14, // ⬇️ slightly smaller text
  },

  buttonWrapper: {
    alignItems: "flex-end", // ✅ right side
    marginTop: 10,
  },
});
