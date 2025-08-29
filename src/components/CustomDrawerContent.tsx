import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useAuth } from "../context/AuthContext";

interface CustomDrawerContentProps {
  navigation: any;
  state: any;
}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({
  navigation,
  state,
}) => {
  const { user, isAdmin, logout } = useAuth();

  const menuItems = [
    {
      name: "Accueil",
      label: "🏠 Accueil",
      screen: "Home",
      description: "Page principale avec filtres",
    },
    {
      name: "Categories",
      label: "📚 Catégories",
      screen: "Categories",
      description: "Algorithmes par catégorie",
    },
    {
      name: "Levels",
      label: "🎓 Niveaux",
      screen: "Levels",
      description: "Exercices par niveau",
    },
    {
      name: "AllActivities",
      label: "📋 Activités",
      screen: "AllActivities",
      description: "Toutes les activités",
    },
    {
      name: "Profile",
      label: "👤 Profil",
      screen: "Profile",
      description: "Paramètres utilisateur",
    },
  ];

  const getActiveIndex = () => {
    return state.index;
  };

  const handleMenuPress = (screen: string, index: number) => {
    navigation.navigate(screen);
    navigation.closeDrawer();
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.closeDrawer();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EducationApp</Text>
        <Text style={styles.headerSubtitle}>Algorithmes & Programmation</Text>
        <View style={styles.userInfo}>
          <Text style={styles.userEmail}>
            {user?.email?.split("@")[0] || "Utilisateur"}
          </Text>
          <Text style={styles.userRole}>
            {isAdmin ? "👨‍🏫 Professeur" : "👨‍🎓 Étudiant"}
          </Text>
        </View>
      </View>

      {/* Menu Items */}
      <ScrollView style={styles.menuContainer}>
        {menuItems.map((item, index) => {
          const isActive = getActiveIndex() === index;

          return (
            <TouchableOpacity
              key={item.name}
              style={[styles.menuItem, isActive && styles.activeMenuItem]}
              onPress={() => handleMenuPress(item.screen, index)}
            >
              <View style={styles.menuItemContent}>
                <Text
                  style={[styles.menuLabel, isActive && styles.activeMenuLabel]}
                >
                  {item.label}
                </Text>
                <Text
                  style={[
                    styles.menuDescription,
                    isActive && styles.activeMenuDescription,
                  ]}
                >
                  {item.description}
                </Text>
              </View>
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪 Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e293b",
  },
  header: {
    padding: 24,
    paddingTop: 50,
    backgroundColor: "#0f172a",
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 16,
  },
  userInfo: {
    backgroundColor: "#334155",
    padding: 12,
    borderRadius: 8,
  },
  userEmail: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 2,
  },
  userRole: {
    fontSize: 12,
    color: "#94a3b8",
  },
  menuContainer: {
    flex: 1,
    paddingTop: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginHorizontal: 12,
    marginVertical: 2,
    borderRadius: 8,
  },
  activeMenuItem: {
    backgroundColor: "#334155",
  },
  menuItemContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#e2e8f0",
    marginBottom: 2,
  },
  activeMenuLabel: {
    color: "white",
    fontWeight: "600",
  },
  menuDescription: {
    fontSize: 12,
    color: "#94a3b8",
  },
  activeMenuDescription: {
    color: "#cbd5e1",
  },
  activeIndicator: {
    width: 4,
    height: 40,
    backgroundColor: "#667eea",
    borderRadius: 2,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: "#334155",
  },
  logoutButton: {
    backgroundColor: "#dc2626",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});

export default CustomDrawerContent;
