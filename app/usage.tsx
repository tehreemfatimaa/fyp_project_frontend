//done
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
console.log("appliance usage");

const { width } = Dimensions.get("window");

const APPLIANCE_IMAGES: { [key: string]: any } = {
  fan: require("../assets/images/ceiling.png"),
  // ac: require("../assets/images/air-conditioner.png"),r
  light: require("../assets/images/lamp.png"),
  microwave: require("../assets/images/oven.png"),
  fridge: require("../assets/images/refrigerator.png"),
  tv: require("../assets/images/smart-tv.png"),
  washingmachine: require("../assets/images/washing-machine.png"),
  iron: require("../assets/images/iron.png"),
  default: require("../assets/images/others.png"),
};

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

export default function UsageScreen() {
  const router = useRouter();
  const [applianceData, setApplianceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setTimeout(() => {
        setApplianceData([
          {
            id: "1",
            name: "Fans",
            usage: "10-11 hours",
            energy: "180.0",
            imageKey: "fan",
          },
          {
            id: "2",
            name: "Air Conditioner",
            usage: "6-8 hours",
            energy: "170.0",
            imageKey: "ac",
          },
          {
            id: "3",
            name: "Lights",
            usage: "10-12 hours",
            energy: "120.0",
            imageKey: "light",
          },
          {
            id: "4",
            name: "Microwave",
            usage: "15-30 min",
            energy: "101.0",
            imageKey: "microwave",
          },
          {
            id: "5",
            name: "Refrigerator",
            usage: "12-15 hours",
            energy: "100.0",
            imageKey: "fridge",
          },
          {
            id: "6",
            name: "LED TV",
            usage: "2-3 hours",
            energy: "90.0",
            imageKey: "tv",
          },
          {
            id: "7",
            name: "Washing Machine",
            usage: "2-3 hours",
            energy: "90.0",
            imageKey: "washingmachine",
          },
          {
            id: "8",
            name: "Iron",
            usage: "2-3 hours",
            energy: "90.0",
            imageKey: "iron",
          },
          {
            id: "9",
            name: "Other Appliances",
            usage: "2-3 hours",
            energy: "90.0",
            imageKey: "default",
          },
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FBFBFB" }}>
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ChevronLeft color="black" size={28} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Usage</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollPadding}
        >
          {/* CHART CARD */}
          <View style={styles.topCard}>
            <Text style={styles.cardHeader}>Most used appliances</Text>

            <View style={styles.chartContainer}>
              {/* DONUT CHART SIDE */}
              <View style={styles.mockChartCircle}>
                <View style={styles.chartInner}>
                  <Image
                    source={require("../assets/images/bolt.png")}
                    style={styles.boltIcon}
                  />
                </View>
              </View>

              {/* LEGEND SIDE */}
              <View style={styles.legendContainer}>
                <LegendItem color="#4CAF50" label="Fans" />
                <LegendItem color="#F44336" label="AC" />
                <LegendItem color="#81D4FA" label="Lights" />
                <LegendItem color="#E6EE9C" label="Others" />
              </View>
            </View>
          </View>

          <Text style={styles.sectionLabel}>Total Usage</Text>

          {loading ? (
            <ActivityIndicator
              size="large"
              color="#2ECC71"
              style={{ marginTop: 50 }}
            />
          ) : (
            applianceData.map((item) => (
              <View key={item.id} style={styles.applianceCard}>
                <View style={styles.row}>
                  <View style={styles.iconCircle}>
                    <Image
                      source={
                        APPLIANCE_IMAGES[item.imageKey] ||
                        APPLIANCE_IMAGES.default
                      }
                      style={styles.applianceIconImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.infoCol}>
                    <Text style={styles.nameText}>{item.name}</Text>
                    <Text style={styles.usageText}>
                      Usage hours: {item.usage}
                    </Text>
                  </View>
                </View>
                <View style={styles.energyCol}>
                  <Text style={styles.energyValueText}>{item.energy}</Text>
                  <Text style={styles.unitText}>kW</Text>
                </View>
              </View>
            ))
          )}

          {/* Updated View my appliances button */}
          <TouchableOpacity
            style={styles.viewAppliancesBtn}
            onPress={() => router.push("/my-appliances")} // This adds the navigation logic
          >
            <Text style={styles.viewAppliancesText}>
              View my appliances {">"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>

      {/* BOTTOM BAR */}
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
          active={true}
        />
        <BottomIcon
          imageSource={require("../assets/images/user.png")}
          onPress={() => router.push("/profile")}
          active={false}
        />
      </View>
    </View>
  );
}

// Small helper for the Legend
const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendColor, { backgroundColor: color }]} />
    <Text style={styles.legendLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: { marginRight: 10 },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#000" },
  scrollPadding: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 120 },
  topCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 24,
    marginBottom: 25,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardHeader: {
    fontSize: 22,
    color: "#4F4F4F",
    fontWeight: "600",
    marginBottom: 20,
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mockChartCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 20,
    borderColor: "#4CAF50",
    borderTopColor: "#E6EE9C",
    borderRightColor: "#81D4FA",
    borderLeftColor: "#F44336",
    alignItems: "center",
    justifyContent: "center",
  },
  chartInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  boltIcon: { width: 30, height: 30, tintColor: "#000" },
  legendContainer: { flex: 1, marginLeft: 25, gap: 12 },
  legendItem: { flexDirection: "row", alignItems: "center" },
  legendColor: { width: 18, height: 18, borderRadius: 2, marginRight: 10 },
  legendLabel: { fontSize: 16, color: "#4F4F4F", fontWeight: "500" },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#8E8E93",
    marginBottom: 15,
    marginLeft: 5,
  },
  applianceCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
  },
  row: { flexDirection: "row", alignItems: "center" },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    justifyContent: "center",
  },
  applianceIconImage: { width: 28, height: 28 },
  infoCol: { marginLeft: 12 },
  nameText: { fontSize: 16, fontWeight: "700", color: "#333" },
  usageText: { fontSize: 12, color: "#BCBCBC", marginTop: 2 },
  energyCol: { flexDirection: "row", alignItems: "baseline" },
  energyValueText: { fontSize: 18, fontWeight: "bold", color: "#000" },
  unitText: { fontSize: 12, color: "#8E8E93", marginLeft: 2 },
  viewAppliancesBtn: { alignSelf: "flex-end", marginTop: 10, marginRight: 5 },
  viewAppliancesText: { color: "#2ECC71", fontWeight: "600", fontSize: 14 },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 85,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 15,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
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
