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
      console.error("Error fetching filter options:", error);
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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Filtres</Text>
        {(selectedCategoryId || selectedLevelId) && (
          <TouchableOpacity onPress={clearAllFilters}>
            <Text style={styles.clearButton}>Effacer tout</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Catégories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
            contentContainerStyle={styles.scrollContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => handleCategoryPress(category.id)}
                style={[
                  styles.filterChip,
                  selectedCategoryId === category.id
                    ? styles.selectedCategoryChip
                    : styles.unselectedChip,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedCategoryId === category.id
                      ? styles.selectedText
                      : styles.unselectedText,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Levels Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎓 Niveaux</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
            contentContainerStyle={styles.scrollContent}
          >
            {levels.map((level) => (
              <TouchableOpacity
                key={level.id}
                onPress={() => handleLevelPress(level.id)}
                style={[
                  styles.filterChip,
                  selectedLevelId === level.id
                    ? styles.selectedLevelChip
                    : styles.unselectedChip,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedLevelId === level.id
                      ? styles.selectedText
                      : styles.unselectedText,
                  ]}
                >
                  {level.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Active Filters Summary */}
        {(selectedCategoryId || selectedLevelId) && (
          <View style={styles.activeFiltersContainer}>
            <Text style={styles.activeFiltersTitle}>Filtres actifs:</Text>
            <View style={styles.activeFiltersContent}>
              {selectedCategoryId && (
                <View style={styles.activeFilter}>
                  <Text style={styles.activeFilterText}>
                    📚{" "}
                    {categories.find((c) => c.id === selectedCategoryId)?.name}
                  </Text>
                </View>
              )}
              {selectedLevelId && (
                <View style={styles.activeFilter}>
                  <Text style={styles.activeFilterText}>
                    🎓 {levels.find((l) => l.id === selectedLevelId)?.name}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: "white",
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  loadingText: {
    color: "#6B7280",
    textAlign: "center",
  },
  container: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  clearButton: {
    color: "#2563EB",
    fontWeight: "500",
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  horizontalScroll: {
    flexDirection: "row",
  },
  scrollContent: {
    paddingRight: 16,
  },
  filterChip: {
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  selectedCategoryChip: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
  selectedLevelChip: {
    backgroundColor: "#10B981",
    borderColor: "#10B981",
  },
  unselectedChip: {
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
  },
  chipText: {
    fontSize: 14,
    fontWeight: "500",
  },
  selectedText: {
    color: "white",
  },
  unselectedText: {
    color: "#374151",
  },
  activeFiltersContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
  },
  activeFiltersTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E40AF",
    marginBottom: 4,
  },
  activeFiltersContent: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  activeFilter: {
    marginRight: 8,
    marginBottom: 4,
  },
  activeFilterText: {
    fontSize: 12,
    color: "#2563EB",
  },
});

export default ActivityFilter;
