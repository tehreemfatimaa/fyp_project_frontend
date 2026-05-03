//done
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function LogoutScreen() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    // User ko wapas login screen par bhejne ke liye
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Visual Icon */}
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="logout-variant"
            size={80}
            color="#219410"
          />
        </View>

        {/* Message */}
        <Text style={styles.title}>Logged Out Successfully</Text>
        <Text style={styles.subtitle}>
          Thank you for using SolarApp. Your session has been safely ended.
        </Text>

        {/* Action Button */}
        <TouchableOpacity style={styles.loginBtn} onPress={handleLoginRedirect}>
          <Text style={styles.loginBtnText}>Go to Login</Text>
        </TouchableOpacity>

        {/* Subtle Footer */}
        <Text style={styles.footerText}>Securely signed out</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 30,
  },
  iconContainer: {
    width: 120,
    height: 120,
    backgroundColor: "#f0f9f0",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 40,
  },
  loginBtn: {
    backgroundColor: "#000",
    width: "100%",
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 20,
    fontSize: 12,
    color: "#999",
    letterSpacing: 1,
  },
});
