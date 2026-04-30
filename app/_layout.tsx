// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
// import { Stack } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import "react-native-reanimated";

// import { useColorScheme } from "@/hooks/use-color-scheme";

// export default function RootLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//       <Stack
//         screenOptions={{
//           headerShown: false,
//         }}
//       >
//         {/* Root screen */}
//         <Stack.Screen name="index" />
//         {/* Your existing auth screen */}
//         <Stack.Screen name="signup" />
//         {/* NEW SCREEN (auto used by router.push("/inputscreen")) */}
//         <Stack.Screen name="inputscreen" />
//         <Stack.Screen name="analyzing-screen" /> {/* ✅ ADD THIS */}
//         {/* Tabs if you are using them */}
//         <Stack.Screen name="(tabs)" />
//         <Stack.Screen name="profile" />
//       </Stack>

//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
