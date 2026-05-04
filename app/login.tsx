import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert, // ✅ 1. Added Alert import
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  console.log("✅ INDEX SCREEN RENDERED");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (text: string) => {
    setEmail(text);
    const regex = /\S+@\S+\.\S+/;

    if (text.length > 0 && !regex.test(text)) {
      setEmailError("Invalid email syntax");
    } else {
      setEmailError("");
    }
  };

  // ✅ 2. Created a separate handleLogin function for clarity
  const handleLogin = () => {
    if (email.length === 0) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    if (emailError) {
      Alert.alert(
        "Invalid Email",
        "Please enter a valid email address (e.g. user@example.com)",
      );
      return;
    }

    // If everything is fine, move to the next screen
    router.replace("/welcome");
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
          style={[styles.input, emailError ? styles.inputError : null]}
          value={email}
          onChangeText={validateEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter password"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
        />

        <Text style={styles.signup}>
          Don’t have an account?{" "}
          <Text
            style={styles.signupLink}
            onPress={() => router.replace("/signup")}
          >
            Sign up
          </Text>
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin} // ✅ 3. Hooked up the new function
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ... styles stay exactly the same ...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7ED321",
  },
  header: {
    height: "35%",
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
    transform: [{ scale: 1.2 }],
    zIndex: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 24,
    paddingTop: 140,
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
  inputError: {
    borderColor: "#FF3B30",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: -15,
    marginBottom: 10,
    marginLeft: 15,
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
