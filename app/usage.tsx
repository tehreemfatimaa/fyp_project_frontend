//done
import { useRouter } from "expo-router";
import {
  AirVent,
  ChevronLeft,
  Fan,
  Lightbulb,
  Microwave,
  Refrigerator,
  Tv,
  Zap,
} from "lucide-react-native";
import React from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle, G } from "react-native-svg";

const { width } = Dimensions.get("window");

const APPLIANCE_DATA = [
  { id: "1", name: "Fans", usage: "10-11 hours", energy: "180.0", icon: Fan },
  {
    id: "2",
    name: "Air Conditioner",
    usage: "6-8 hours",
    energy: "170.0",
    icon: AirVent,
  },
  {
    id: "3",
    name: "Lights",
    usage: "10-12 hours",
    energy: "120.0",
    icon: Lightbulb,
  },
  {
    id: "4",
    name: "Microwave",
    usage: "15-30 min",
    energy: "101.0",
    icon: Microwave,
  },
  {
    id: "5",
    name: "Refrigerator",
    usage: "12-15 hours",
    energy: "100.0",
    icon: Refrigerator,
  },
  { id: "6", name: "LED TV", usage: "2-3 hours", energy: "90.0", icon: Tv },
];

const LEGEND = [
  { label: "Fans", color: "#4CAF50" },
  { label: "AC", color: "#F44336" },
  { label: "Lights", color: "#4FC3F7" },
  { label: "Others", color: "#DCE775" },
];

// --- Custom Components ---

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
        { tintColor: active ? "#2ECC71" : "#666" },
      ]}
      resizeMode="contain"
    />
  </TouchableOpacity>
);

const DonutChart = () => {
  const radius = 35;
  const strokeWidth = 14;
  const center = 50;
  const circumference = 2 * Math.PI * radius;

  const sections = [
    { percent: 0.3, color: "#4CAF50" },
    { percent: 0.25, color: "#F44336" },
    { percent: 0.25, color: "#4FC3F7" },
    { percent: 0.2, color: "#DCE775" },
  ];

  let currentOffset = 0;

  return (
    <View style={styles.chartWrapper}>
      <View style={styles.svgContainer}>
        <Svg width="160" height="160" viewBox="0 0 100 100">
          <G rotation="-90" origin="50, 50">
            {sections.map((section, index) => {
              const strokeDashoffset =
                circumference - circumference * section.percent;
              const rotation = currentOffset * 360;
              currentOffset += section.percent;
              return (
                <Circle
                  key={index}
                  cx={center}
                  cy={center}
                  r={radius}
                  stroke={section.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  fill="transparent"
                  transform={`rotate(${rotation}, ${center}, ${center})`}
                />
              );
            })}
          </G>
        </Svg>
        <View style={styles.absoluteCenter}>
          <Zap size={35} color="black" fill="black" />
        </View>
      </View>

      <View style={styles.legendContainer}>
        {LEGEND.map((item, i) => (
          <View key={i} style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default function UsageScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ChevronLeft color="black" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Usage</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollPadding}
      >
        <View style={styles.topCard}>
          <Text style={styles.cardHeader}>Most used appliances</Text>
          <DonutChart />
        </View>

        <Text style={styles.sectionLabel}>Total Usage</Text>

        {APPLIANCE_DATA.map((item) => (
          <View key={item.id} style={styles.applianceCard}>
            <View style={styles.row}>
              <item.icon size={35} color="black" strokeWidth={1.5} />
              <View style={styles.infoCol}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.usageText}>Usage hours: {item.usage}</Text>
              </View>
            </View>
            <View style={styles.energyCol}>
              <Text style={styles.energyValueText}>{item.energy}</Text>
              <Text style={styles.unitText}>kW</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.viewMore}
          onPress={() => router.push("/my-appliances")}
        >
          <Text style={styles.viewMoreText}>View my appliances {">"}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ✅ CORRECTED BOTTOM BAR */}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: 30,
  },
  backButton: { marginRight: 8 },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#000" },
  scrollPadding: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 120 },
  topCard: {
    backgroundColor: "#FFF",
    borderRadius: 30,
    padding: 16,
    marginBottom: 25,
    elevation: 8,
  },
  cardHeader: {
    fontSize: 20,
    color: "#777",
    fontWeight: "600",
    marginBottom: 20,
  },
  chartWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  svgContainer: {
    width: 160,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  absoluteCenter: { position: "absolute" },
  legendContainer: { flex: 1, marginLeft: 25 },
  legendItem: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  legendBox: { width: 18, height: 18, borderRadius: 2, marginRight: 10 },
  legendText: { color: "#666", fontSize: 16, fontWeight: "500" },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#BBB",
    marginBottom: 15,
  },
  applianceCard: {
    backgroundColor: "#FFF",
    borderRadius: 30,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
    elevation: 4,
  },
  row: { flexDirection: "row", alignItems: "center" },
  infoCol: { marginLeft: 15 },
  nameText: { fontSize: 18, fontWeight: "bold", color: "#000" },
  usageText: { fontSize: 13, color: "#AAA", marginTop: 2 },
  energyCol: { flexDirection: "row", alignItems: "baseline" },
  energyValueText: { fontSize: 20, fontWeight: "bold", color: "#000" },
  unitText: { fontSize: 12, color: "#666", marginLeft: 2, fontWeight: "600" },
  viewMore: { alignSelf: "flex-end", marginTop: 5, marginBottom: 20 },
  viewMoreText: { color: "#4CAF50", fontWeight: "bold", fontSize: 15 },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 85,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 20,
    elevation: 20,
    borderWidth: 1,
    borderColor: "#F5F5F5",
  },
  bottomIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 65,
    height: "100%",
  },
  bottomIconImage: { width: 30, height: 30 },
  activeIndicator: {
    position: "absolute",
    top: 0,
    width: 35,
    height: 4,
    backgroundColor: "#2ECC71",
    borderRadius: 2,
  },
});
