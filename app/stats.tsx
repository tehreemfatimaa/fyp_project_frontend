//done
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  CheckCircle2,
  ChevronLeft,
  Clock,
  Laptop,
  Sun,
  XCircle,
  Zap,
} from "lucide-react-native";
import React from "react";
import {
  Image, // ✅ Image import karna zaroori hai
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// --- Sub-component: BottomIcon (Isay define karna zaroori tha) ---
interface BottomIconProps {
  imageSource: ImageSourcePropType;
  onPress: () => void;
  active: boolean;
}

const BottomIcon = ({ imageSource, onPress, active }: BottomIconProps) => (
  <TouchableOpacity style={styles.bottomIconContainer} onPress={onPress}>
    {active && <View style={styles.activeIndicator} />}
    <Image
      source={imageSource}
      style={[
        styles.bottomIconImage,
        { tintColor: active ? "#4caf50" : "#666" }, // Active hone par green, warna gray
      ]}
      resizeMode="contain"
    />
  </TouchableOpacity>
);

const StatisticsScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft color="black" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Statistics</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.subHeader}>Next hour Energy insights</Text>

        {/* Prediction Window Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Clock size={20} color="#666" />
            <Text style={styles.cardTitle}>Prediction Window</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Sun size={32} color="#FDB813" />
            <View style={styles.rowTextContainer}>
              <Text style={styles.boldText}>Next Hour: 4:00PM - 5:00PM</Text>
              <Text style={styles.grayText}>
                Estimated solar production: 0.22kW
              </Text>
            </View>
          </View>
        </View>

        {/* Estimated Load Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Zap size={20} color="#4CAF50" />
            <Text style={styles.cardTitle}>Estimated Load - Next hour</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.loadRow}>
            <Text style={styles.loadLabel}>Fans</Text>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: "70%", backgroundColor: "#C0FF00" },
                ]}
              />
            </View>
            <Text style={styles.loadValue}>160W</Text>
          </View>

          <View style={styles.loadRow}>
            <Text style={styles.loadLabel}>Lights</Text>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: "50%", backgroundColor: "#C0FF00" },
                ]}
              />
            </View>
            <Text style={styles.loadValue}>100W</Text>
          </View>

          <View style={styles.divider} />
          <Text style={styles.criticalLoad}>Critical Load: 260W</Text>
        </View>

        {/* Appliance Recommendation Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Laptop size={20} color="#666" />
            <Text style={styles.cardTitle}>
              Appliance Recommendation - Next hour
            </Text>
          </View>

          <View style={styles.recommendationItem}>
            <XCircle size={22} color="#FF5252" />
            <Text style={styles.recText}>AC - High load</Text>
            <Text style={[styles.recValue, { color: "#FF5252" }]}>1200W</Text>
          </View>

          <View style={styles.recommendationItem}>
            <XCircle size={22} color="#FF5252" />
            <Text style={styles.recText}>Washing Machine - High load</Text>
            <Text style={[styles.recValue, { color: "#FF5252" }]}>800W</Text>
          </View>

          <View style={styles.recommendationItem}>
            <CheckCircle2 size={22} color="#4CAF50" />
            <Text style={styles.recText}>Fans</Text>
          </View>

          <View style={styles.recommendationItem}>
            <CheckCircle2 size={22} color="#4CAF50" />
            <Text style={styles.recText}>Lights</Text>
          </View>
        </View>

        {/* Personalized Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>Recommendations</Text>
          <Text style={styles.tipsSubtitle}>
            Personalized tips for optimizing energy
          </Text>

          <View style={styles.tipCardBorder}>
            <View style={styles.tipCardInner}>
              <Text style={styles.tipText}>
                Solar generation is lower than critical load. Avoid running high
                power appliances this hour.
              </Text>
              <Text style={styles.todayLabel}>Today</Text>
            </View>
          </View>

          <LinearGradient
            colors={["#1B9C1B", "#C0FF00"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientTipCard}
          >
            <Text style={styles.gradientTipText}>
              Shift AC usage to 12-3pm. Expected Solar availability is higher at
              that time.
            </Text>
            <Text style={styles.todayLabelWhite}>Today</Text>
          </LinearGradient>
        </View>
      </ScrollView>

      {/* ✅ Consistent Bottom Bar */}
      <View style={styles.bottomBar}>
        <BottomIcon
          imageSource={require("../assets/images/home.png")}
          onPress={() => router.push("/estimatesolar-generation")}
          active={false}
        />
        <BottomIcon
          imageSource={require("../assets/images/bar-chart.png")}
          onPress={() => router.push("/stats")}
          active={true}
        />
        <BottomIcon
          imageSource={require("../assets/images/clock.png")}
          onPress={() => router.push("/usage")}
          active={false}
        />
        <BottomIcon
          imageSource={require("../assets/images/user.png")}
          onPress={() => router.push("/profile")}
          active={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 45,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  subHeader: {
    fontSize: 16,
    color: "#888",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowTextContainer: {
    marginLeft: 15,
  },
  boldText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
  },
  grayText: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  loadRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  loadLabel: {
    width: 50,
    fontSize: 14,
    color: "#444",
  },
  progressBarBg: {
    flex: 1,
    height: 10,
    backgroundColor: "#222",
    borderRadius: 5,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 5,
  },
  loadValue: {
    width: 45,
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  criticalLoad: {
    fontSize: 15,
    color: "#444",
    textAlign: "left",
    paddingLeft: 5,
  },
  recommendationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  recText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#444",
  },
  recValue: {
    fontWeight: "600",
    fontSize: 14,
  },
  tipsSection: {
    marginTop: 10,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  tipsSubtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 15,
  },
  tipCardBorder: {
    borderWidth: 2,
    borderColor: "#C0FF00",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  tipCardInner: {
    minHeight: 80,
    justifyContent: "space-between",
  },
  tipText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111",
    lineHeight: 20,
  },
  gradientTipCard: {
    borderRadius: 15,
    padding: 15,
    minHeight: 100,
    justifyContent: "space-between",
  },
  gradientTipText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    lineHeight: 20,
  },
  todayLabel: {
    color: "#AAA",
    fontSize: 12,
    marginTop: 10,
  },
  todayLabelWhite: {
    color: "rgba(0,0,0,0.5)",
    fontSize: 12,
    marginTop: 10,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  bottomIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: 60,
  },
  bottomIconImage: {
    width: 26,
    height: 26,
  },
  activeIndicator: {
    position: "absolute",
    top: 0,
    width: 35,
    height: 3,
    backgroundColor: "#4caf50",
    borderRadius: 2,
  },
});

export default StatisticsScreen;
