import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { SAMPLE_ACTIVITIES } from "../data/sampleData";

export default function HomeScreen({ navigation }) {
  const { user, isAdmin } = useAuth();
  const [activities, setActivities] = useState(SAMPLE_ACTIVITIES);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    console.log("HomeScreen: Auth state:", {
      user: user?.email,
      isAdmin,
    });
  }, [user, isAdmin]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setActivities(SAMPLE_ACTIVITIES);
      setRefreshing(false);
    }, 1000);
  };
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getSubjectColor = (subject) => {
    const colors = {
      Mathématiques: "#2196F3",
      Histoire: "#FF9800",
      Français: "#4CAF50",
      Sciences: "#9C27B0",
    };
    return colors[subject] || "#666";
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          {isAdmin
            ? "👨‍🏫 Espace Professeur"
            : `👋 Bonjour ${user?.email?.split("@")[0] || "Utilisateur"}`}
        </Text>
        {isAdmin && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("AddActivity")}
          >
            <Text style={styles.addButtonText}>+ Nouvelle activité</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.sectionTitle}>
          {isAdmin ? "Toutes les activités" : "Vos activités"}
        </Text>

        {activities.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              {isAdmin
                ? "Aucune activité créée. Appuyez sur le bouton + pour créer votre première activité."
                : "Aucune activité disponible pour le moment."}
            </Text>
          </View>
        ) : (
          activities.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              style={styles.activityCard}
              onPress={() =>
                navigation.navigate("ActivityDetail", { activity })
              }
            >
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.subjectBadge,
                    { backgroundColor: getSubjectColor(activity.subject) },
                  ]}
                >
                  <Text style={styles.subjectText}>{activity.subject}</Text>
                </View>
                {isAdmin && (
                  <Text style={styles.classLevelText}>
                    {activity.classLevel}
                  </Text>
                )}
              </View>

              <Text style={styles.activityTitle}>{activity.title}</Text>
              <Text style={styles.activityDescription}>
                {activity.description}
              </Text>

              <View style={styles.cardFooter}>
                <Text style={styles.dateText}>
                  Créée le {formatDate(activity.createdAt)}
                </Text>
                <Text style={styles.viewText}>Voir →</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
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
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  classText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#667eea",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
  activityCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    boxShadow: "0px 1px 2.22px rgba(0, 0, 0, 0.22)",
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  subjectBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  subjectText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  classLevelText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  activityDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 15,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 12,
    color: "#999",
  },
  viewText: {
    fontSize: 14,
    color: "#667eea",
    fontWeight: "500",
  },
});
