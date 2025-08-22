import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import RenderHtml from "react-native-render-html";
import { useAuth } from "../context/AuthContext";

const { width } = Dimensions.get("window");

export default function ActivityDetailScreen({ route, navigation }) {
  const { activity } = route.params;
  const { isAdmin } = useAuth();
  const [showCorrection, setShowCorrection] = useState(false);

  const htmlSource = {
    html: showCorrection ? activity.correction : activity.htmlContent,
  };

  const tagsStyles = {
    body: {
      fontFamily: "System",
      fontSize: 16,
      lineHeight: 24,
      color: "#333",
    },
    h1: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 16,
    },
    h2: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 12,
    },
    h3: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 10,
    },
    p: {
      marginBottom: 12,
      lineHeight: 22,
    },
    ol: {
      marginBottom: 12,
    },
    ul: {
      marginBottom: 12,
    },
    li: {
      marginBottom: 6,
    },
    strong: {
      fontWeight: "bold",
    },
    table: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 4,
      marginVertical: 10,
    },
    th: {
      backgroundColor: "#f8f9fa",
      fontWeight: "bold",
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    },
    td: {
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    blockquote: {
      borderLeftWidth: 4,
      borderLeftColor: "#ddd",
      paddingLeft: 16,
      marginLeft: 0,
      marginVertical: 12,
      fontStyle: "italic",
    },
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

  const handleDelete = async () => {
    if (!isAdmin) return;
    Alert.alert(
      "Supprimer l'activité",
      "Êtes-vous sûr de vouloir supprimer cette activité ? Cette action ne peut pas être annulée.",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            // Simulate delete from local data
            Alert.alert("Succès", "Activité supprimée avec succès", [
              { text: "OK", onPress: () => navigation.goBack() },
            ]);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Retour</Text>
        </TouchableOpacity>

        <View
          style={[
            styles.subjectBadge,
            { backgroundColor: getSubjectColor(activity.subject) },
          ]}
        >
          <Text style={styles.subjectText}>{activity.subject}</Text>
        </View>
      </View>

      {/* Activity Info */}
      <View style={styles.activityInfo}>
        <Text style={styles.activityTitle}>{activity.title}</Text>
        <Text style={styles.activityDescription}>{activity.description}</Text>
        <View style={styles.metaInfo}>
          <Text style={styles.classLevel}>Classe: {activity.classLevel}</Text>
          <Text style={styles.date}>
            Créée le {formatDate(activity.createdAt)}
          </Text>
        </View>
      </View>

      {/* Toggle Correction Button */}
      <View style={styles.toggleSection}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            showCorrection && styles.toggleButtonActive,
          ]}
          onPress={() => setShowCorrection(!showCorrection)}
        >
          <Text
            style={[
              styles.toggleButtonText,
              showCorrection && styles.toggleButtonTextActive,
            ]}
          >
            {showCorrection ? "📚 Voir l'énoncé" : "✅ Voir la correction"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* HTML Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.htmlContainer}>
          <RenderHtml
            contentWidth={width - 40}
            source={htmlSource}
            tagsStyles={tagsStyles}
          />
        </View>
      </ScrollView>

      {/* Admin Actions */}
      {isAdmin && (
        <View style={styles.adminActions}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("AddActivity", { activity })}
          >
            <Text style={styles.editButtonText}>✏️ Modifier</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>🗑️ Supprimer</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    paddingTop: 50,
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.1)",
    elevation: 5,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: "#667eea",
    fontWeight: "500",
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
  activityInfo: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 10,
  },
  activityTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  activityDescription: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
    marginBottom: 15,
  },
  metaInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  classLevel: {
    fontSize: 14,
    color: "#999",
    fontWeight: "500",
  },
  date: {
    fontSize: 14,
    color: "#999",
  },
  toggleSection: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 10,
  },
  toggleButton: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e9ecef",
  },
  toggleButtonActive: {
    backgroundColor: "#e3f2fd",
    borderColor: "#2196F3",
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#495057",
  },
  toggleButtonTextActive: {
    color: "#1976D2",
  },
  content: {
    flex: 1,
  },
  htmlContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 10,
    marginTop: 0,
    borderRadius: 8,
  },
  adminActions: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 20,
    justifyContent: "space-around",
  },
  editButton: {
    backgroundColor: "#667eea",
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
