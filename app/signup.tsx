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

  const handleSignUp = () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    Alert.alert("Success", "Account created successfully 🚀", [
      {
        text: "OK",
        onPress: () => router.push("/inputscreen"),
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
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />

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
              onPress={() => router.push("/")}
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
    flex: 1,
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

  // ✅ NORMAL
  signInLink: {
    color: "#7ED321",
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },

  // ✅ ACTIVE (ONLY TEXT)
  signInLinkActive: {
    backgroundColor: "#7ED321",
    borderWidth: 1,
    borderColor: "#7ED321",
    color: "#fff",
  },

  buttonText: {
    // color: "#fff",
    color: "#000",
    fontWeight: "700",
    fontSize: 14,
  },

  input: {
    height: 45, // ✅ IMPORTANT
    borderWidth: 1,
    borderColor: "#7ED321",
    backgroundColor: "#FFF",
    borderRadius: 25,
    paddingHorizontal: 12,
    marginBottom: 12,
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
