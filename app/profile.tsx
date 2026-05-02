//done
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// --- Sub-components (Functionality unchanged) ---

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

const MenuItem = ({ icon, label, onPress }: MenuItemProps) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.menuItemLeft}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.menuLabel}>{label}</Text>
    </View>
    <Feather name="chevron-right" size={20} color="#000" />
  </TouchableOpacity>
);

// ✅ BottomIcon with the Green Indicator logic
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

// --- Main Screen ---

export default function ProfileScreen() {
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
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* User Info */}
        <View style={styles.userSection}>
          <Ionicons name="person-circle" size={60} color="black" />
          <Text style={styles.userName}>User</Text>
        </View>

        {/* Menu Items (Functional as before) */}
        <View style={styles.menuList}>
          <MenuItem
            label="Account"
            icon={<Feather name="user" size={20} color="black" />}
            onPress={() => router.push("/account")}
          />
          <MenuItem
            label="Solar Details"
            icon={
              <MaterialCommunityIcons
                name="solar-panel-large"
                size={20}
                color="black"
              />
            }
            onPress={() => router.push("/solar-details")}
          />
          <MenuItem
            label="My appliances"
            icon={
              <MaterialCommunityIcons
                name="fridge-outline"
                size={20}
                color="black"
              />
            }
            onPress={() => router.push("/my-appliances")}
          />
          <MenuItem
            label="About"
            icon={<Feather name="info" size={20} color="black" />}
            onPress={() => router.push("/about")}
          />
          <MenuItem
            label="Logout"
            icon={<Feather name="log-out" size={20} color="black" />}
            onPress={() => router.push("/logout")}
            // onPress={() => console.log("Logout Pressed")}
          />
        </View>
      </ScrollView>

      {/* ✅ UPDATED BOTTOM BAR - Consistent and Corrected */}
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
          active={true} // Highlighting Profile icon
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
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120, // Space for Bottom Bar
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 15,
  },
  menuList: {
    gap: 15,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 15,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },

  /* ✅ Uniform Bottom Bar Styling */
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
    backgroundColor: "#4caf50", // Correct Green
    borderRadius: 2,
  },
});
