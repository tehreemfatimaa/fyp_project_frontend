// import { LinearGradient } from "expo-linear-gradient";
// import React, { useEffect, useRef } from "react";
// import {
//   Animated,
//   Easing,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";

// // Number of animated bars
// const BAR_COUNT = 5;

// export default function AnalyzingScreen() {
//   // Create animated values for each bar
//   const animations = useRef(
//     Array.from({ length: BAR_COUNT }, () => new Animated.Value(0)),
//   ).current;

//   useEffect(() => {
//     // Create looping staggered animation
//     const loopAnimation = () => {
//       const sequences = animations.map((anim, index) =>
//         Animated.sequence([
//           Animated.delay(index * 120), // stagger effect
//           Animated.timing(anim, {
//             toValue: 1,
//             duration: 400,
//             easing: Easing.ease,
//             useNativeDriver: true,
//           }),
//           Animated.timing(anim, {
//             toValue: 0,
//             duration: 400,
//             easing: Easing.ease,
//             useNativeDriver: true,
//           }),
//         ]),
//       );

//       Animated.loop(Animated.parallel(sequences)).start();
//     };

//     loopAnimation();
//   }, []);

//   return (
//     <LinearGradient
//       colors={["#A7F3D0", "#059669"]} // light → deep green
//       style={styles.container}
//     >
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.centerContent}>
//           {/* TEXT */}
//           <Text style={styles.title}>Analyzing your data</Text>

//           {/* CUSTOM LOADER */}
//           <View style={styles.loaderContainer}>
//             {animations.map((anim, index) => {
//               const animatedStyle = {
//                 transform: [
//                   {
//                     scaleY: anim.interpolate({
//                       inputRange: [0, 1],
//                       outputRange: [0.4, 1.4], // bar height animation
//                     }),
//                   },
//                 ],
//                 opacity: anim.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [0.5, 1],
//                 }),
//               };

//               return (
//                 <Animated.View
//                   key={index}
//                   style={[styles.bar, animatedStyle]}
//                 />
//               );
//             })}
//           </View>
//         </View>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },

//   safeArea: {
//     flex: 1,
//   },

//   centerContent: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   title: {
//     color: "#FFFFFF",
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 20,
//   },

//   loaderContainer: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//     gap: 6,
//   },

//   bar: {
//     width: 6,
//     height: 30,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 3,
//   },
// });

import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router"; // ✅ ADDED

// Number of animated bars
const BAR_COUNT = 5;

export default function AnalyzingScreen() {
  const router = useRouter(); // ✅ ADDED

  // Create animated values for each bar
  const animations = useRef(
    Array.from({ length: BAR_COUNT }, () => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    // Create looping staggered animation
    const loopAnimation = () => {
      const sequences = animations.map((anim, index) =>
        Animated.sequence([
          Animated.delay(index * 120), // stagger effect
          Animated.timing(anim, {
            toValue: 1,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
      );

      Animated.loop(Animated.parallel(sequences)).start();
    };

    loopAnimation();
  }, []);

  // ✅ ADDED: Auto navigate after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/solarestimate"); // removes this screen from stack
    }, 3000);

    return () => clearTimeout(timer); // cleanup
  }, []);

  return (
    <LinearGradient colors={["#A7F3D0", "#059669"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContent}>
          {/* TEXT */}
          <Text style={styles.title}>Analyzing your data</Text>

          {/* CUSTOM LOADER */}
          <View style={styles.loaderContainer}>
            {animations.map((anim, index) => {
              const animatedStyle = {
                transform: [
                  {
                    scaleY: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.4, 1.4],
                    }),
                  },
                ],
                opacity: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                }),
              };

              return (
                <Animated.View
                  key={index}
                  style={[styles.bar, animatedStyle]}
                />
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },

  loaderContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
  },

  bar: {
    width: 6,
    height: 30,
    backgroundColor: "#FFFFFF",
    borderRadius: 3,
  },
});
