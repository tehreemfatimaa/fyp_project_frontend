//done
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    ImageSourcePropType,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// --- BottomIcon Component ---
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
        { tintColor: active ? "#4caf50" : "#666" },
      ]}
      resizeMode="contain"
    />
  </TouchableOpacity>
);

export default function AccountScreen() {
  // States for user data
  const [fullName, setFullName] = useState("User");
  const [email, setEmail] = useState("User123@gmail.com");
  const [password, setPassword] = useState("**********");

  // ✅ Email Validation Logic (Regex)
  const validateEmail = (text: string) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(text);
  };

  // ✅ Handle Save Button Click
  const handleSave = () => {
    // 1. Check if fields are empty
    if (!fullName.trim() || !email.trim()) {
      Alert.alert("Missing Info", "Please fill in your name and email.");
      return;
    }

    // 2. Check Email Syntax (@ aur . check karega)
    if (!validateEmail(email)) {
      Alert.alert(
        "Invalid Syntax",
        "Please enter a valid email address (e.g., user@example.com)",
      );
      return;
    }

    // 3. Success Logic
    console.log("Saving Data...", { fullName, email });

    Alert.alert("Success", "Your profile has been updated!", [
      {
        text: "OK",
        onPress: () => router.push("/profile"), // Wapis Profile page par bhej dega
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Avatar */}
        <View style={styles.avatarSection}>
          <Ionicons name="person-circle" size={100} color="black" />
          <Text style={styles.avatarLabel}>{fullName}</Text>
        </View>

        {/* Input Fields */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Full Name"
            />
          </View>

          <Text style={styles.inputLabel}>Email</Text>
          <View style={[styles.inputWrapper]}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Email Address"
            />
          </View>

          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Password"
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.8}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
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
          active={false}
        />
        <BottomIcon
          imageSource={require("../assets/images/clock.png")}
          onPress={() => router.push("/usage")}
          active={false}
        />
        <BottomIcon
          imageSource={require("../assets/images/user.png")}
          onPress={() => router.push("/profile")}
          active={true}
        />
      </View>
    </SafeAreaView>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: 30,
    paddingBottom: 10,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 120,
  },
  avatarSection: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  avatarLabel: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 5,
  },
  inputGroup: {
    marginBottom: 40,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
    marginTop: 15,
  },
  inputWrapper: {
    backgroundColor: "#F9F9F9",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 45,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    fontSize: 14,
    color: "#666",
  },
  saveButton: {
    backgroundColor: "#000",
    height: 50,
    width: 120,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    elevation: 5,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 75,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
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
