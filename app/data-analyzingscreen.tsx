// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import React, { useEffect } from "react";
// import { Animated, StyleSheet, Text, View } from "react-native";

// type Props = {
//   filledLinesCount: number;
// };

// export default function DataAnalyzingScreen({ filledLinesCount }: Props) {
//   const router = useRouter();
//   const animation = new Animated.Value(0);

//   // Animate bars
//   useEffect(() => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(animation, {
//           toValue: 1,
//           duration: 700,
//           useNativeDriver: true,
//         }),
//         Animated.timing(animation, {
//           toValue: 0,
//           duration: 700,
//           useNativeDriver: true,
//         }),
//       ]),
//     ).start();
//   }, []);

//   // ✅ Leave screen ONLY when 5 lines are filled
//   useEffect(() => {
//     if (filledLinesCount >= 5) {
//       router.replace("/next-screen"); // change route if needed
//     }
//   }, [filledLinesCount]);

//   return (
//     <LinearGradient colors={["#C8F7C5", "#2ECC40"]} style={styles.container}>
//       <Text style={styles.text}>...Analyzing your data</Text>

//       <View style={styles.barContainer}>
//         {[0, 1, 2, 3, 4].map((i) => (
//           <Animated.View
//             key={i}
//             style={[
//               styles.bar,
//               {
//                 opacity: animation.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [0.3 + i * 0.1, 1],
//                 }),
//               },
//             ]}
//           />
//         ))}
//       </View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 14,
//     color: "#000",
//     marginBottom: 10,
//   },
//   barContainer: {
//     flexDirection: "row",
//     gap: 4,
//   },
//   bar: {
//     width: 6,
//     height: 10,
//     backgroundColor: "#000",
//     borderRadius: 2,
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

export default function DataAnalyzingScreen() {
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
      router.replace("/estimatesolar-generation"); // removes this screen from stack
    }, 2000);

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
