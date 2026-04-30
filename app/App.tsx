// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import React from "react";

// import InstallSolar from "./install-solar";
// import RoofInfo from "./roofinfo";

// export type RootStackParamList = {
//   InstallSolar: undefined;
//   RoofInfo: undefined;
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="InstallSolar">
//         <Stack.Screen name="InstallSolar" component={InstallSolar} />
//         <Stack.Screen name="RoofInfo" component={RoofInfo} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AnalyzingScreen from "./analyzing-screen"; // ✅ FIXED FILE NAME
import InstallSolar from "./install-solar";
import RoofInfo from "./roofinfo";

export type RootStackParamList = {
  InstallSolar: undefined;
  RoofInfo: undefined;
  AnalyzingScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InstallSolar">
        <Stack.Screen name="InstallSolar" component={InstallSolar} />
        <Stack.Screen name="RoofInfo" component={RoofInfo} />

        <Stack.Screen
          name="AnalyzingScreen"
          component={AnalyzingScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
