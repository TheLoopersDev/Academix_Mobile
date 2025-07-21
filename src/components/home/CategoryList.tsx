import React from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import { styles } from "../../styles/CategoryListStyles";

interface CategoryListProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}
export default function CategoryList({
  categories,
  activeCategory,
  setActiveCategory,
}: CategoryListProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categories}
    >
      {/* Thêm key={category} vào đây */}
      {categories.map((category) => (
        <TouchableOpacity
          key={category} // ✅ THÊM DÒNG NÀY
          style={[
            styles.categoryButton,
            activeCategory === category && styles.categoryButtonActive,
          ]}
          onPress={() => setActiveCategory(category)}
        >
          <Text
            style={[
              styles.categoryText,
              activeCategory === category && styles.categoryTextActive,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
