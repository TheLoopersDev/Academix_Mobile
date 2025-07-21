import React, { useState, useMemo } from "react";
import { ScrollView, View } from "react-native";
import HeroSection from "../components/home/HeroSection";
import CategoryList from "../components/home/CategoryList";
import CourseGrid from "../components/home/CourseGrid";
import { COURSES, CATEGORIES } from "../data/mockData";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  const filteredCourses = useMemo(() => {
    if (activeCategory === "Tất cả") {
      return COURSES;
    }
    return COURSES.filter((course) => course.category === activeCategory);
  }, [activeCategory]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F7F8FA" }}>
      {/* Giả sử bạn đã có component HeroSection */}
      <HeroSection />

      <CategoryList
        categories={CATEGORIES}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <CourseGrid title="Yop courses" courses={filteredCourses} />
    </ScrollView>
  );
}
