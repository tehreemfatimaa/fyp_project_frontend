//done

import { Ionicons } from "@expo/vector-icons"; // Added Ionicons for consistency
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function AboutScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Updated Header with Ionicons Back Arrow consistent with Profile Screen */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.push("/profile")}
          style={styles.backBtn}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </Pressable>
        <Text style={styles.headerTitle}>About solarApp</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Local Image Section */}
        <View style={styles.logoContainer}>
          <Image
            // This pulls the image from your local system folder
            source={require("../assets/images/login.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.appName}>AI Powered Solar Optimizer</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        {/* Mission Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What is Solar Optimizer?</Text>
          <Text style={styles.description}>
            Your intelligent AI-powered companion designed to optimize solar
            energy consumption. This application provides advanced hourly
            forecasting to ensure you make the most of your generated power.
          </Text>
        </View>

        {/* Key AI Features */}
        <View style={styles.featuresCard}>
          <View style={styles.featureItemRow}>
            <Text style={styles.featureItem}>
              <Text style={styles.bold}>🤖 AI Predictions:</Text> Provides
              hourly forecasts to identify peak solar production periods and
              recommends the best times to run specific appliances.
            </Text>
          </View>

          <View style={styles.featureItemRow}>
            <Text style={styles.featureItem}>
              <Text style={styles.bold}>💡 Smart Advice:</Text> Suggests optimal
              windows for high-energy tasks, such as running the washing
              machine, to minimize energy waste.
            </Text>
          </View>

          <View style={styles.featureItemRow}>
            <Text style={styles.featureItem}>
              <Text style={styles.bold}>📉 Efficiency Tracking:</Text> Maximize
              your financial savings by synchronizing heavy device usage with
              peak solar output hours.
            </Text>
          </View>
        </View>

        <Text style={styles.footerText}>
          Developed for a Sustainable Future
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    marginTop: 30,
  },
  backBtn: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20, // Adjusted to match Profile Screen title size
    fontWeight: "bold",
    color: "#000000",
    marginLeft: 10,
  },
  scrollContent: {
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoImage: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },
  appName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#000",
    textAlign: "center",
  },
  version: {
    color: "#888",
    fontSize: 14,
    marginTop: 5,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: "#444",
  },
  featuresCard: {
    backgroundColor: "#F7F7F7",
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  featureItemRow: {
    marginBottom: 15,
  },
  featureItem: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
  },
  bold: {
    fontWeight: "800",
    color: "#000",
  },
  footerText: {
    textAlign: "center",
    color: "#AAAAAA",
    fontSize: 12,
    marginVertical: 20,
  },
});
