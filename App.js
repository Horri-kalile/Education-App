import React from "react";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./src/context/AuthContext";
import { ActivitiesProvider } from "./src/context/ActivitiesContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  console.log("App.js loading with full navigation...");

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ActivitiesProvider>
          <AppNavigator />
          <StatusBar style="auto" />
        </ActivitiesProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
