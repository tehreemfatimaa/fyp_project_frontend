import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { API } from "../app/services/api.js";

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 LOGIN FUNCTION
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        email: email.trim(),
        password: password,
      });

      console.log("Login Response:", res.data);

      // ✅ Success Message
      if (Platform.OS === "web") {
        window.alert("Login successful 🚀");
      } else {
        Alert.alert("Success", "Login successful 🚀");
      }

      // ✅ Redirect to next screen
      setTimeout(() => {
        router.replace("/welcome"); // 👈 next screen
      }, 1000);

    } catch (error: any) {
      console.log("Login Error:", error);

      const message =
        error?.response?.data?.detail || "Login failed";

      if (Platform.OS === "web") {
        window.alert("Error: " + message);
      } else {
        Alert.alert("Error", message);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <Text style={styles.title}>
          AI Powered{"\n"}
          Solar Energy{"\n"}
          Optimizer
        </Text>

        <Image
          source={require("../assets/images/login.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* ================= CARD ================= */}
      <View style={styles.card}>
        <Text style={styles.loginText}>Login to Continue!</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter Email"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter password"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.signup}>
          Don’t have an account?{" "}
          <Text
            style={styles.signupLink}
            onPress={() => router.push("/signup")}
          >
            Sign up
          </Text>
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin} // 🔥 yahan change
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7ED321",
  },

  /* HEADER */
  header: {
    height: "35%", // was 32%
    paddingTop: 70,
    paddingHorizontal: 24,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 34,
    width: "65%",
  },

  image: {
    position: "absolute",
    right: -28,
    bottom: -90,

    width: 260,
    height: 260,
    transform: [{ scale: 1.2 }], // ⬅️ 1.1, 1.3 bhi try kar sakti h

    zIndex: 10, // ✅ ensures it stays above card
  },

  card: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 24,
    paddingTop: 140, // ✅ space for overlapping image
  },

  loginText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 6,
    color: "#000",
  },

  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#7ED321",
    borderRadius: 30,
    paddingHorizontal: 18,
    marginBottom: 18,
    backgroundColor: "#FFF",
  },

  signup: {
    textAlign: "center",
    fontSize: 12,
    color: "#777",
    marginTop: 5,
  },

  signupLink: {
    color: "#7ED321",
    fontWeight: "600",
  },

  button: {
    marginTop: 30,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 45,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },

  buttonText: {
    fontWeight: "700",
    fontSize: 14,
    color: "#000",
  },
});
