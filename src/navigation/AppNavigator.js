import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

// Import screens and navigators
import LoginScreen from "../screens/LoginScreen";
import MainTabNavigator from "./MainTabNavigator";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user, isLoading, isAuthenticated, isAdmin } = useAuth();

  console.log("AppNavigator: Current state:", {
    hasUser: !!user,
    userEmail: user?.email,
    isLoading,
    isAuthenticated,
    isAdmin,
    timestamp: new Date().toISOString(),
  }); // Debug

  // Add effect to track when authentication state changes
  React.useEffect(() => {
    console.log("AppNavigator: Authentication state changed:", {
      isAuthenticated,
      userExists: !!user,
      userEmail: user?.email,
      isLoading,
    });
  }, [isAuthenticated, user?.email, isLoading]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#f5f5f5" },
        }}
      >
        {!isAuthenticated ? (
          // Authentication stack
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ animationTypeForReplace: "pop" }}
          />
        ) : (
          // Main app stack with tab navigation - skip class selection for now
          <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});
