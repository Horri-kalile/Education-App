import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useAuth } from "../context/AuthContext";

export default function AddActivityScreen({ navigation, route }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Mathématiques");
  const [description, setDescription] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [correction, setCorrection] = useState("");
  const [saving, setSaving] = useState(false);
  const editingActivity = route?.params?.activity || null;
  const { isAdmin } = useAuth();

  const subjects = ["Mathématiques", "Histoire", "Français", "Sciences"];

  useEffect(() => {
    if (editingActivity) {
      setTitle(editingActivity.title);
      setSubject(editingActivity.subject);
      setDescription(editingActivity.description);
      setHtmlContent(editingActivity.htmlContent);
      setCorrection(editingActivity.correction);
    }
  }, [editingActivity]);

  const handleSave = async () => {
    if (!isAdmin) {
      Alert.alert(
        "Accès refusé",
        "Vous n'êtes pas autorisé à créer ou modifier des activités."
      );
      return;
    }
    if (!title || !htmlContent) {
      Alert.alert("Erreur", "Titre et contenu HTML sont obligatoires");
      return;
    }

    setSaving(true);

    // Simulate save to local data
    setTimeout(() => {
      setSaving(false);
      if (editingActivity) {
        Alert.alert("Succès", "Activité mise à jour", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert("Succès", "Activité créée", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      }
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Annuler</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {editingActivity ? "Modifier activité" : "Nouvelle activité"}
        </Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {saving ? "..." : "Enregistrer"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formSection}>
          <Text style={styles.label}>Titre *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Série 1: Les fonctions"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Matière</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={subject}
              onValueChange={setSubject}
              style={styles.picker}
            >
              {subjects.map((subj) => (
                <Picker.Item key={subj} label={subj} value={subj} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description courte de l'activité"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Contenu HTML *</Text>
          <Text style={styles.hint}>
            Saisissez le contenu de l'activité en HTML
          </Text>
          <TextInput
            style={[styles.input, styles.htmlInput]}
            placeholder="<h2>Titre de l'exercice</h2><p>Contenu...</p>"
            value={htmlContent}
            onChangeText={setHtmlContent}
            multiline
            numberOfLines={8}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Correction (optionnel)</Text>
          <Text style={styles.hint}>Saisissez la correction en HTML</Text>
          <TextInput
            style={[styles.input, styles.htmlInput]}
            placeholder="<h2>Correction</h2><p>Réponses...</p>"
            value={correction}
            onChangeText={setCorrection}
            multiline
            numberOfLines={8}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  formSection: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  hint: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: "white",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  htmlInput: {
    height: 150,
    textAlignVertical: "top",
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    fontSize: 14,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "white",
  },
  picker: {
    height: 50,
  },
});
