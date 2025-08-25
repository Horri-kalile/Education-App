import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import { useAuth } from "../context/AuthContext";

// Import screens
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ActivityDetailScreen from "../screens/ActivityDetailScreen";
import AddActivityScreen from "../screens/AddActivityScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home Stack for navigation within home section
const HomeStack: React.FC = () => {
  const { isAdmin } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen
        name="ActivityDetail"
        component={ActivityDetailScreen}
        options={{ animation: "slide_from_right" }}
      />
      {isAdmin && (
        <Stack.Screen
          name="AddActivity"
          component={AddActivityScreen}
          options={{ animation: "slide_from_bottom" }}
        />
      )}
    </Stack.Navigator>
  );
};

const MainTabNavigator: React.FC = () => {
  const { isAdmin } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#e0e0e0",
          paddingTop: 5,
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarActiveTintColor: "#667eea",
        tabBarInactiveTintColor: "#999",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: "Accueil",
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: 20, color }}>🏠</Text>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profil",
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: 20, color }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
