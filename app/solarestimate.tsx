import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SolarSystemEstimate() {
  // const navigation = useNavigation<any>();
  const router = useRouter();

  const [highlightBack, setHighlightBack] = useState(false);
  // ✅ FRONTEND DATA (will come from backend later)
  const data = {
    recommendedPanels: 10,
    systemSize: "4.2 kW",
    monthlyOutput: "480 kWh",
    savings: "PKR 6,200 / mo",
    installationCost: "PKR 450,000",
    monthlySavings: "PKR 6,200",
    payback: "5.6 years",
  };

  return (
    <View style={styles.container}>
      {/* CONTENT */}
      <View style={styles.content}>
        {/* CARD 1 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Solar system estimate</Text>
            <Image
              source={require("../assets/images/login.png")}
              style={styles.cardIcon}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.rows}>
            <Text style={styles.rowText}>
              Recommended panels:{" "}
              <Text style={styles.value}>{data.recommendedPanels ?? "--"}</Text>
            </Text>

            <Text style={styles.rowText}>
              System size:{" "}
              <Text style={styles.value}>{data.systemSize ?? "--"}</Text>
            </Text>

            <Text style={styles.rowText}>
              Expected monthly output:{" "}
              <Text style={styles.value}>{data.monthlyOutput ?? "--"}</Text>
            </Text>

            <Text style={styles.rowText}>
              Estimated savings:{" "}
              <Text style={styles.value}>{data.savings ?? "--"}</Text>
            </Text>
          </View>
        </View>

        {/* CARD 2 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>ROI estimate</Text>
            <Image
              source={require("../assets/images/login.png")}
              style={styles.cardIcon}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.rows}>
            <Text style={styles.rowText}>
              Installation cost:{" "}
              <Text style={styles.value}>{data.installationCost ?? "--"}</Text>
            </Text>

            <Text style={styles.rowText}>
              Monthly savings:{" "}
              <Text style={styles.value}>{data.monthlySavings ?? "--"}</Text>
            </Text>

            <Text style={styles.rowText}>
              Payback period:{" "}
              <Text style={styles.value}>{data.payback ?? "--"}</Text>
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonRow}>
        {/* BACK BUTTON */}
        <TouchableOpacity
          style={[styles.button, highlightBack && styles.backButtonActive]}
          onPress={() => {
            setHighlightBack(false); // reset UI
            router.push("/welcome"); // go to welcome screen
          }}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        {/* CONTINUE BUTTON */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setHighlightBack(true); // show hint (blue border on Back)
          }}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* FOOTER */}
      <View style={styles.footer} />
    </View>
  );
}

// const styles = StyleSheet.create({
//   /* ================= SCREEN ================= */
//   container: {
//     flex: 1,
//     backgroundColor: "#F9FAFB", // closer to figma
//     paddingHorizontal: 16,
//   },

//   /* ================= CONTENT ================= */
//   content: {
//     paddingTop: 12,
//     gap: 14,
//     paddingBottom: 110, // buttons space
//   },

//   /* ================= CARD ================= */
//   card: {
//     backgroundColor: "#ECEFF1",
//     borderRadius: 16,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     borderWidth: 1,
//     borderColor: "#D1D5DB",
//   },

//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   cardTitle: {
//     fontSize: 15,
//     fontWeight: "600",
//     color: "#111827",
//   },

//   cardIcon: {
//     width: 32,
//     height: 32,
//     resizeMode: "contain",
//   },

//   /* ================= DIVIDER ================= */
//   divider: {
//     height: 0.8,
//     backgroundColor: "#9CA3AF",
//     marginTop: 10,
//     marginBottom: 12,
//     marginHorizontal: -16,
//   },

//   /* ================= ROWS ================= */
//   rows: {
//     gap: 8,
//   },

//   rowText: {
//     fontSize: 13.5,
//     lineHeight: 19,
//     color: "#374151",
//   },

//   value: {
//     color: "#16A34A",
//     fontWeight: "700",
//   },

//   /* ================= BUTTONS ================= */
//   buttonRow: {
//     position: "absolute",
//     bottom: 44,
//     left: 16,
//     right: 16,
//     flexDirection: "row",
//     gap: 8,
//   },

//   button: {
//     flex: 1,
//     height: 40,
//     backgroundColor: "#000000",
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   buttonText: {
//     color: "#FFFFFF",
//     fontSize: 13,
//     fontWeight: "600",
//   },

//   backButtonActive: {
//     borderWidth: 2,
//     borderColor: "#2563EB",
//   },

//   /* ================= FOOTER ================= */
//   footer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 30,
//     backgroundColor: "#E5E7EB",
//     borderTopWidth: 0.5,
//     borderTopColor: "#9CA3AF",
//   },
// });

const styles = StyleSheet.create({
  /* ================= SCREEN ================= */
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
  },

  /* ================= CONTENT ================= */
  // content: {
  //   flexGrow: 1,
  //   paddingTop: 16,
  //   gap: 20,
  //   paddingBottom: 140, // button + footer balance
  // },
  content: {
    flexGrow: 1,
    paddingTop: 50,
    gap: 20,
    paddingBottom: 140,
  },

  /* ================= CARD ================= */
  card: {
    backgroundColor: "#ECEFF1",
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 18,

    borderWidth: 1,
    borderColor: "#D1D5DB",
    minHeight: 240, // 🔑 makes container big like Figma
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    lineHeight: 22,
  },

  cardIcon: {
    width: 44,
    height: 44,
    resizeMode: "contain",
  },

  /* ================= DIVIDER ================= */
  divider: {
    height: 1,
    backgroundColor: "#9CA3AF",
    marginTop: 10, // pehle 14

    marginBottom: 16,
    marginHorizontal: -20,
  },

  /* ================= ROWS ================= */
  rows: {
    gap: 12, // more vertical spread
  },

  rowText: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 22,
    color: "#111827",
    // color: "#374151",
  },

  value: {
    color: "#16A34A",
    fontWeight: "700",
  },

  /* ================= BUTTONS ================= */
  buttonRow: {
    position: "absolute",
    bottom: 50,
    // left: 16,
    right: 16,
    flexDirection: "row",
    gap: 10,
  },

  button: {
    width: 110,
    height: 44,
    backgroundColor: "#000000",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 34, //space from bottom
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 13.5,
    fontWeight: "600",
  },

  backButtonActive: {
    borderWidth: 2,
    borderColor: "#2563EB",
  },

  /* ================= FOOTER ================= */
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#E5E7EB",
    borderTopWidth: 0.5,
    borderTopColor: "#9CA3AF",
  },
});
