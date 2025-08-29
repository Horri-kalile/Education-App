import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../context/AuthContext";

// Import screens
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ActivityDetailScreen from "../screens/ActivityDetailScreen";
import AddActivityScreen from "../screens/AddActivityScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import LevelsScreen from "../screens/LevelsScreen";
import AllActivitiesScreen from "../screens/AllActivitiesScreen";
import CategoryActivitiesScreen from "../screens/CategoryActivitiesScreen";
import LevelActivitiesScreen from "../screens/LevelActivitiesScreen";
import CustomDrawerContent from "../components/CustomDrawerContent";

const Drawer = createDrawerNavigator();
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

// Categories Stack for navigation within categories section
const CategoriesStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CategoriesMain" component={CategoriesScreen} />
      <Stack.Screen
        name="CategoryActivities"
        component={CategoryActivitiesScreen}
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="ActivityDetail"
        component={ActivityDetailScreen}
        options={{ animation: "slide_from_right" }}
      />
    </Stack.Navigator>
  );
};

// Levels Stack for navigation within levels section
const LevelsStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LevelsMain" component={LevelsScreen} />
      <Stack.Screen
        name="LevelActivities"
        component={LevelActivitiesScreen}
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="ActivityDetail"
        component={ActivityDetailScreen}
        options={{ animation: "slide_from_right" }}
      />
    </Stack.Navigator>
  );
};

// All Activities Stack for navigation within activities section
const AllActivitiesStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AllActivitiesMain" component={AllActivitiesScreen} />
      <Stack.Screen
        name="ActivityDetail"
        component={ActivityDetailScreen}
        options={{ animation: "slide_from_right" }}
      />
    </Stack.Navigator>
  );
};

const MainDrawerNavigator: React.FC = () => {
  const { isAdmin } = useAuth();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerPosition: "left",
        drawerStyle: {
          width: 280,
        },
        overlayColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          drawerLabel: "Accueil",
        }}
      />

      <Drawer.Screen
        name="Categories"
        component={CategoriesStack}
        options={{
          drawerLabel: "Catégories",
        }}
      />

      <Drawer.Screen
        name="Levels"
        component={LevelsStack}
        options={{
          drawerLabel: "Niveaux",
        }}
      />

      <Drawer.Screen
        name="AllActivities"
        component={AllActivitiesStack}
        options={{
          drawerLabel: "Activités",
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerLabel: "Profil",
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
