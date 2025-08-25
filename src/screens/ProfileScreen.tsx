import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { useAuth } from "../context/AuthContext";

export default function ProfileScreen(): React.ReactElement {
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = async () => {
    console.log("ProfileScreen: handleLogout called");
    console.log("ProfileScreen: Current user before logout:", {
      hasUser: !!user,
      userEmail: user?.email,
    });

    // For web testing, let's try direct logout first
    if (Platform.OS === "web") {
      console.log("ProfileScreen: Direct logout for web");
      const result = await logout();
      console.log("ProfileScreen: Logout result:", result);

      // Add a small delay and check state again
      setTimeout(() => {
        console.log("ProfileScreen: Post-logout check - user state:", !!user);
      }, 200);

      if (result.success) {
        console.log("ProfileScreen: Logout successful");
      } else {
        console.error("ProfileScreen: Logout failed:", result.error);
        Alert.alert("Erreur", "Erreur lors de la déconnexion: " + result.error);
      }
      return;
    }

    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Déconnexion",
        style: "destructive",
        onPress: async () => {
          console.log("ProfileScreen: User confirmed logout");
          const result = await logout();
          if (!result.success) {
            Alert.alert(
              "Erreur",
              "Erreur lors de la déconnexion: " + result.error
            );
          }
        },
      },
    ]);
  };

  // Get user display name and email from Supabase user object
  // Normalize name to a safe string (avoid objects -> crash on charAt)
  const rawName =
    user?.user_metadata?.full_name ??
    user?.email?.split("@")[0] ??
    "Utilisateur";
  const displayName =
    typeof rawName === "string"
      ? rawName
      : Array.isArray(rawName)
      ? rawName.join(" ")
      : (() => {
          try {
            return String(rawName);
          } catch (e) {
            return "Utilisateur";
          }
        })();

  const userEmail = user?.email || "";

  console.log("ProfileScreen: User data:", {
    user: user?.email,
    displayName,
    isAdmin,
    isAdminType: typeof isAdmin,
    userID: user?.id,
  });

  // If user just logged out, avoid rendering stale UI
  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Profil</Text>
        </View>
        <View style={styles.content}>
          <Text style={{ textAlign: "center", color: "#666" }}>
            Déconnecté.
          </Text>
        </View>
      </View>
    );
  }

  const firstLetter =
    typeof displayName === "string" && displayName.length
      ? displayName.charAt(0).toUpperCase()
      : "?";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profil</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{firstLetter}</Text>
          </View>

          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.email}>{userEmail}</Text>
          <Text style={styles.role}>
            {isAdmin ? "👨‍🏫 Professeur (Admin)" : "👨‍🎓 Étudiant"}
          </Text>

          <View style={styles.userInfo}>
            <Text style={styles.infoLabel}>ID Utilisateur:</Text>
            <Text style={styles.infoValue}>
              {user?.id ? `${user.id.substring(0, 8)}...` : "-"}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>🚪 Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "white",
    padding: 20,
    paddingTop: 50,
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.1)",
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  profileCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
    elevation: 5,
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#667eea",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },
  role: {
    fontSize: 16,
    color: "#667eea",
    fontWeight: "600",
    marginBottom: 8,
  },
  classLevel: {
    fontSize: 14,
    color: "#888",
    fontWeight: "500",
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: "#f44336",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  userInfo: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    fontFamily: "monospace",
  },
});
