import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { supabase } from "../lib/supabase";

interface Level {
  id: string;
  name: string;
}

const LevelsScreen: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("levels")
        .select("id, name")
        .order("name");

      if (error) {
        console.error("Error fetching levels:", error);
      } else {
        setLevels(data || []);
      }
    } catch (error) {
      console.error("Exception fetching levels:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLevels();
    setRefreshing(false);
  };

  const handleLevelPress = (level: Level) => {
    // Navigate to activities filtered by this level
    navigation.navigate("LevelActivities", {
      levelId: level.id,
      levelName: level.name,
    });
  };

  const getLevelIcon = (levelName: string): string => {
    const iconMap: { [key: string]: string } = {
      "1ère année": "1️⃣",
      "2ème année": "2️⃣",
      "3ème année": "3️⃣",
      Bac: "🎓",
    };
    return iconMap[levelName] || "📖";
  };

  const getLevelColor = (index: number): string => {
    const colors = [
      "#22C55E", // Green for 1ère année
      "#3B82F6", // Blue for 2ème année
      "#F59E0B", // Orange for 3ème année
      "#EF4444", // Red for Bac
    ];
    return colors[index % colors.length];
  };

  const getLevelDescription = (levelName: string): string => {
    const descriptions: { [key: string]: string } = {
      "1ère année": "Concepts de base et initiation",
      "2ème année": "Développement des compétences",
      "3ème année": "Perfectionnement et approfondissement",
      Bac: "Préparation aux examens finaux",
    };
    return descriptions[levelName] || "Niveau académique";
  };

  if (isLoading && levels.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement des niveaux...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>🎓 Niveaux Académiques</Text>
            <Text style={styles.headerSubtitle}>
              Choisissez votre niveau d'études
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.grid}>
          {levels.map((level, index) => (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.levelCard,
                { backgroundColor: getLevelColor(index) },
              ]}
              onPress={() => handleLevelPress(level)}
            >
              <View style={styles.cardContent}>
                <Text style={styles.levelIcon}>{getLevelIcon(level.name)}</Text>
                <Text style={styles.levelName}>{level.name}</Text>
                <Text style={styles.levelDescription}>
                  {getLevelDescription(level.name)}
                </Text>
                <Text style={styles.levelArrow}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {levels.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              Aucun niveau disponible pour le moment.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  header: {
    backgroundColor: "white",
    padding: 20,
    paddingTop: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  menuButton: {
    marginRight: 15,
    padding: 5,
    marginTop: 5,
  },
  menuIcon: {
    fontSize: 24,
    color: "#333",
    fontWeight: "bold",
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  levelCard: {
    width: "48%",
    borderRadius: 16,
    marginBottom: 15,
    minHeight: 160,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  levelIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  levelName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 5,
  },
  levelDescription: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: 10,
  },
  levelArrow: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
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
});

export default LevelsScreen;
