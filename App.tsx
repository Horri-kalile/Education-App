import React from "react";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./src/context/AuthContext";
import { ActivitiesProvider } from "./src/context/ActivitiesContext";
import AppNavigator from "./src/navigation/AppNavigator";
// import "./global.css"; // Temporarily disabled

const App: React.FC = () => {
  console.log("App.tsx loading with full navigation...");

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
};

export default App;
