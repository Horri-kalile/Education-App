import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";
import { supabase } from "../lib/supabase";

interface Category {
  id: string;
  name: string;
}

interface Level {
  id: string;
  name: string;
}

interface FilterProps {
  onFilterChange: (categoryId: string | null, levelId: string | null) => void;
  selectedCategoryId: string | null;
  selectedLevelId: string | null;
}

const ActivityFilter: React.FC<FilterProps> = ({
  onFilterChange,
  selectedCategoryId,
  selectedLevelId,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showLevelModal, setShowLevelModal] = useState(false);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      setIsLoading(true);

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categories")
        .select("id, name")
        .order("name");

      // Fetch levels
      const { data: levelsData, error: levelsError } = await supabase
        .from("levels")
        .select("id, name")
        .order("name");

      if (categoriesError) {
        console.error("Error fetching categories:", categoriesError);
      } else {
        setCategories(categoriesData || []);
      }

      if (levelsError) {
        console.error("Error fetching levels:", levelsError);
      } else {
        setLevels(levelsData || []);
      }
    } catch (error) {
      console.error("Exception fetching filter options:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryPress = (categoryId: string) => {
    const newCategoryId = selectedCategoryId === categoryId ? null : categoryId;
    onFilterChange(newCategoryId, selectedLevelId);
    setShowCategoryModal(false);
  };

  const handleLevelPress = (levelId: string) => {
    const newLevelId = selectedLevelId === levelId ? null : levelId;
    onFilterChange(selectedCategoryId, newLevelId);
    setShowLevelModal(false);
  };

  const clearAllFilters = () => {
    onFilterChange(null, null);
  };

  const getSelectedCategoryName = () => {
    const category = categories.find((c) => c.id === selectedCategoryId);
    return category ? category.name : "Toutes les catégories";
  };

  const getSelectedLevelName = () => {
    const level = levels.find((l) => l.id === selectedLevelId);
    return level ? level.name : "Tous les niveaux";
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement des filtres...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        {/* Category Dropdown */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowCategoryModal(true)}
        >
          <Text
            style={styles.dropdownText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            📚 {getSelectedCategoryName()}
          </Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>

        {/* Level Dropdown */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowLevelModal(true)}
        >
          <Text
            style={styles.dropdownText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            🎓 {getSelectedLevelName()}
          </Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>

        {/* Clear Button */}
        {(selectedCategoryId || selectedLevelId) && (
          <TouchableOpacity
            style={styles.clearButtonCompact}
            onPress={clearAllFilters}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Category Modal */}
      <Modal
        visible={showCategoryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowCategoryModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choisir une catégorie</Text>
            <ScrollView style={styles.modalList}>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  onFilterChange(null, selectedLevelId);
                  setShowCategoryModal(false);
                }}
              >
                <Text
                  style={[
                    styles.modalItemText,
                    !selectedCategoryId && styles.modalItemSelected,
                  ]}
                >
                  Toutes les catégories
                </Text>
              </TouchableOpacity>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.modalItem}
                  onPress={() => handleCategoryPress(category.id)}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      selectedCategoryId === category.id &&
                        styles.modalItemSelected,
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Level Modal */}
      <Modal
        visible={showLevelModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLevelModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowLevelModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choisir un niveau</Text>
            <ScrollView style={styles.modalList}>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  onFilterChange(selectedCategoryId, null);
                  setShowLevelModal(false);
                }}
              >
                <Text
                  style={[
                    styles.modalItemText,
                    !selectedLevelId && styles.modalItemSelected,
                  ]}
                >
                  Tous les niveaux
                </Text>
              </TouchableOpacity>
              {levels.map((level) => (
                <TouchableOpacity
                  key={level.id}
                  style={styles.modalItem}
                  onPress={() => handleLevelPress(level.id)}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      selectedLevelId === level.id && styles.modalItemSelected,
                    ]}
                  >
                    {level.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  loadingContainer: {
    padding: 16,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 14,
    color: "#666",
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  dropdownButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dropdownText: {
    fontSize: 14,
    color: "#374151",
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 12,
    color: "#6b7280",
    marginLeft: 8,
  },
  clearButtonCompact: {
    backgroundColor: "#ef4444",
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  clearButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
    paddingTop: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1f2937",
  },
  modalList: {
    maxHeight: 300,
  },
  modalItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  modalItemText: {
    fontSize: 16,
    color: "#374151",
  },
  modalItemSelected: {
    color: "#3b82f6",
    fontWeight: "600",
  },
});

export default ActivityFilter;
