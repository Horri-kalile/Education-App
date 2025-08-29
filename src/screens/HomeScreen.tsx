import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { useActivities } from "../context/ActivitiesContext";
import ActivityFilter from "../components/ActivityFilter";

export default function HomeScreen(): React.ReactElement {
  const { user, isAdmin } = useAuth();
  const { activities, isLoading, fetchActivities, filterActivities } =
    useActivities();
  const navigation = useNavigation<any>();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);

  useEffect(() => {
    console.log("HomeScreen: Auth state:", {
      user: user?.email,
      isAdmin,
      activitiesCount: activities?.length || 0,
    });
  }, [user, isAdmin, activities]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchActivities(selectedCategoryId, selectedLevelId);
    setRefreshing(false);
  };

  const handleFilterChange = (
    categoryId: string | null,
    levelId: string | null
  ) => {
    setSelectedCategoryId(categoryId);
    setSelectedLevelId(levelId);
    filterActivities(categoryId, levelId);
  };
  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
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
        {/* Only show filter for students */}
        {!isAdmin && (
          <ActivityFilter
            onFilterChange={handleFilterChange}
            selectedCategoryId={selectedCategoryId}
            selectedLevelId={selectedLevelId}
          />
        )}

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
                {isAdmin && <Text style={styles.createdByText}>Par vous</Text>}
              </View>

              <Text style={styles.activityTitle}>{activity.title}</Text>
              <Text style={styles.activityDescription}>
                {activity.description}
              </Text>

              {/* Category and Level badges */}
              <View style={styles.badgeContainer}>
                {activity.categories && (
                  <View style={styles.categoryBadge}>
                    <Text style={styles.badgeText}>
                      📚 {activity.categories.name}
                    </Text>
                  </View>
                )}
                {activity.levels && (
                  <View style={styles.levelBadge}>
                    <Text style={styles.badgeText}>
                      🎓 {activity.levels.name}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.dateText}>
                  Créée le {formatDate(activity.created_at)}
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
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 12,
  },
  createdByText: {
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
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
    gap: 8,
  },
  categoryBadge: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  levelBadge: {
    backgroundColor: "#F0FDF4",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#374151",
  },
});
