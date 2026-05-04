
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function SignUpScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPressed, setIsPressed] = useState(false);

  // ✅ NEW STATE FOR ERROR
  const [emailError, setEmailError] = useState("");

  // ✅ REGEX FUNCTION
  const validateEmail = (text: string) => {
    setEmail(text);
    const regex = /\S+@\S+\.\S+/;
    if (text.length > 0 && !regex.test(text)) {
      setEmailError("Invalid email syntax");
    } else {
      setEmailError("");
    }
  };

  const handleSignUp = () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    // ✅ PREVENT SIGNUP IF EMAIL IS INVALID
    if (emailError) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    Alert.alert("Success", "Account created successfully 🚀", [
      {
        text: "OK",

        onPress: () => router.replace("/login"),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>
            AI Powered{"\n"}Solar Energy Optimizer
          </Text>

          <Image
            source={require("../assets/images/login.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* CARD */}
        <ScrollView
          contentContainerStyle={styles.card}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.heading}>Sign up to Continue!</Text>

          <Text style={styles.label}>Username</Text>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Email"
            value={email}
            // ✅ UPDATED ONCHANGETEXT
            onChangeText={validateEmail}
            // ✅ DYNAMIC STYLE FOR RED BORDER
            style={[styles.input, emailError ? styles.inputError : null]}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {/* ✅ ERROR MESSAGE DISPLAY */}
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />

          <Text style={styles.signInText}>
            Already have an account?{" "}
            <Text
              style={[styles.signInLink, isPressed && styles.signInLinkActive]}
              onPress={() => router.replace("/login")}
            >
              Log in
            </Text>
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSignUp}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// 🎨 STYLES
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#7ED321",
    height: "33%",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: "center",
    paddingHorizontal: 24,
    position: "relative",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 34,
    width: "65%",
  },
  image: {
    width: 260,
    height: 260,
    position: "absolute",
    right: -28,
    bottom: -80,
    zIndex: 10,
    transform: [{ scale: 1.2 }],
  },
  card: {
    // flex: 1, // Removed flex: 1 from ScrollView contentContainer to allow scrolling on small devices
    backgroundColor: "#fff",
    padding: 20,
    marginTop: -30,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 24,
    paddingTop: 140,
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 6,
    color: "#000",
  },
  signInText: {
    textAlign: "center",
    marginVertical: 10,
  },
  signInLink: {
    color: "#7ED321",
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  signInLinkActive: {
    backgroundColor: "#7ED321",
    borderWidth: 1,
    borderColor: "#7ED321",
    color: "#fff",
  },
  buttonText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 14,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#7ED321",
    backgroundColor: "#FFF",
    borderRadius: 25,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  // ✅ NEW ERROR STYLES
  inputError: {
    borderColor: "#FF3B30",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 10,
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
});
