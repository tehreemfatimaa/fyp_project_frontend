import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background} />

      <Image
        source={require("../assets/images/welcomebackground.png")}
        style={styles.robot}
        resizeMode="contain"
      />

      <View style={styles.topTextContainer}>
        <View style={styles.welcomeBox}>
          <Text style={styles.smallText}>Welcome User!</Text>
        </View>
        <Text style={styles.bigText}>Start your Solar journey today!</Text>
      </View>
      {/* </View> */}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Select your Solar experience to begin.
        </Text>

        <TouchableOpacity
          style={[styles.button, selected === "new" && styles.selectedButton]}
          onPress={() => {
            handleSelect("new");
            router.push("/install-solar");
          }}
        >
          <Text style={styles.buttonText}>I want to install solar</Text>
        </TouchableOpacity>

        {/* ✅ NAVIGATION FIXED HERE */}
        <TouchableOpacity
          style={[
            styles.button,
            selected === "existing" && styles.selectedButton,
          ]}
          onPress={() => {
            handleSelect("existing");
            router.push("/system-details-screen");
          }}
        >
          <Text style={styles.buttonText}>I already have Solar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2F2F2F",
    paddingTop: 10,
  },

  background: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: "rgba(144,141,141,0.85)",
  },

  robot: {
    position: "absolute",
    width: width * 0.88,
    // width: width * 0.9,
    height: height * 0.85,
    // height: height * 0.65,
    top: height * 0.22,
    alignSelf: "center",
    opacity: 0.35,
  },
  topTextContainer: {
    position: "absolute",
    top: 30,
  },
  smallText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000",
    marginBottom: 6,
  },

  bigText: {
    marginTop: 18,
    fontSize: 30,
    marginLeft: 16,
    fontWeight: "800",
    color: "#000",
    lineHeight: 34,
  },

  welcomeBox: {
    backgroundColor: "#6E6E6E",
    borderRadius: 8,
    paddingVertical: 22,
    paddingHorizontal: 20,
  },
  card: {
    position: "absolute",
    top: height * 0.45,
    alignSelf: "center",
    width: width * 0.65,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 20,
  },
  cardTitle: {
    // textAlign: "center",
    fontSize: 15,
    color: "#000",
    fontWeight: "700",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  selectedButton: {
    backgroundColor: "#333",
  },
  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 90, // ✅ bigger footer
    // backgroundColor: "rgba(144, 141, 141, 0.8)", // ✅ SAME overlay feel
    borderTopWidth: 0.5,
    borderTopColor: "rgba(0,0,0,0.15)",
    backgroundColor: "#6E6E6E",
    // zIndex: 1,
  },
});

// import * as NavigationBar from "expo-navigation-bar";
// import { useRouter } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import React, { useEffect, useState } from "react";
// import {
//   Dimensions,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const { width, height } = Dimensions.get("screen"); // ✅ use screen

// export default function WelcomeScreen() {
//   const router = useRouter();
//   const [selected, setSelected] = useState<string | null>(null);

//   const handleSelect = (option: string) => {
//     setSelected(option);
//   };

//   useEffect(() => {
//     NavigationBar.setBackgroundColorAsync("rgba(144,141,141,0.85)");
//     NavigationBar.setButtonStyleAsync("dark");
//   }, []);

//   return (
//     <View style={styles.root}>
//       {/* ✅ Makes app draw behind system bars */}
//       <StatusBar translucent backgroundColor="transparent" style="dark" />

//       {/* ✅ Only respect TOP safe area */}
//       <SafeAreaView edges={["top"]} style={styles.container}>
//         {/* Background Image */}
//         <Image
//           source={require("../assets/images/welcomebackground.png")}
//           style={styles.robot}
//           resizeMode="contain"
//         />

//         {/* Top Text */}
//         <View style={styles.topTextContainer}>
//           <View style={styles.welcomeBox}>
//             <Text style={styles.smallText}>Welcome User!</Text>
//           </View>
//           <Text style={styles.bigText}>Start your Solar journey today!</Text>
//         </View>

//         {/* Card */}
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>
//             Select your Solar experience to begin.
//           </Text>

//           <TouchableOpacity
//             style={[styles.button, selected === "new" && styles.selectedButton]}
//             onPress={() => {
//               handleSelect("new");
//               router.push("/install-solar");
//             }}
//           >
//             <Text style={styles.buttonText}>I want to install solar</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.button,
//               selected === "existing" && styles.selectedButton,
//             ]}
//             onPress={() => {
//               handleSelect("existing");
//               router.push("/system-details-screen");
//             }}
//           >
//             <Text style={styles.buttonText}>I already have Solar</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Footer */}
//         <View style={styles.footer} />
//       </SafeAreaView>

//       {/* ✅ OVERLAY ON TOP OF EVERYTHING */}
//       <View pointerEvents="none" style={styles.overlay} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: "#2F2F2F",
//   },

//   container: {
//     flex: 1,
//   },

//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     // backgroundColor: "rgba(144,141,141,0.85)",
//     backgroundColor: "rgba(170,170,170,0.7)",
//     zIndex: 10,
//     elevation: 10, // ✅ Android
//   },

//   robot: {
//     position: "absolute",
//     width: width * 0.88,
//     height: height * 0.85,
//     top: height * 0.22,
//     alignSelf: "center",
//     opacity: 0.35,
//   },

//   topTextContainer: {
//     position: "absolute",
//     top: 30,
//   },

//   smallText: {
//     fontSize: 22,
//     fontWeight: "600",
//     color: "#000",
//     marginBottom: 6,
//   },

//   bigText: {
//     marginTop: 18,
//     fontSize: 30,
//     marginLeft: 16,
//     fontWeight: "800",
//     color: "#000",
//     lineHeight: 34,
//   },

//   welcomeBox: {
//     backgroundColor: "#6E6E6E",
//     borderRadius: 8,
//     paddingVertical: 22,
//     paddingHorizontal: 20,
//   },

//   card: {
//     position: "absolute",
//     top: height * 0.45,
//     alignSelf: "center",
//     width: width * 0.65,
//     backgroundColor: "#fff",
//     borderRadius: 25,
//     padding: 20,
//   },

//   cardTitle: {
//     fontSize: 15,
//     color: "#000",
//     fontWeight: "700",
//     marginBottom: 15,
//   },

//   button: {
//     backgroundColor: "#000",
//     paddingVertical: 12,
//     borderRadius: 20,
//     alignItems: "center",
//     marginBottom: 10,
//   },

//   selectedButton: {
//     backgroundColor: "#333",
//   },

//   buttonText: {
//     color: "#fff",
//     fontSize: 13,
//     fontWeight: "600",
//   },

//   footer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 90,
//     backgroundColor: "#6E6E6E",
//   },
// });
