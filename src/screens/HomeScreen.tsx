import React, { useState, useEffect, useMemo } from "react";
import { ScrollView, View, ActivityIndicator, Text, Alert } from "react-native";
import HeroSection from "../components/home/HeroSection";
import CategoryList from "../components/home/CategoryList";
// Import component mới
import CourseListHome from "../components/home/CourseGrid";
// Import the new API function
import { getTopCoursesApi } from "../services/api";
// Import styles from the separate file
import { styles } from "../styles/HomeStyles";

// Import the local placeholder image
const COURSE_PLACEHOLDER_IMAGE = require("../assets/course1.png");

// Định nghĩa các interface giữ nguyên như trước
interface CourseThumbnail {
  public_id: string;
  url: string | { uri?: string; base64?: string } | null | undefined;
}
interface CourseCategory {
  name: string;
}
interface Course {
  _id: string;
  name: string;
  subTitle: string;
  thumbnail: CourseThumbnail | null | undefined;
  publisher: {
    name: string;
    avatar: string;
    email: string;
    profession: string;
  };
  category: CourseCategory | null | undefined;
  rating: number;
  price: number;
  estimatedPrice: number;
  purchased: number;
  duration: string;
  totalSections: number;
  totalLessons: number;
}
// Cập nhật interface CourseCardData cho phù hợp với CourseListHome
interface CourseCardData {
  id: string;
  title: string;
  imageUrl: string | number | null | undefined;
  price: string;
  rating: number;
  instructor: string;
}

// Hàm tiện ích getCourseImageUrl giữ nguyên logic đã sửa
const getCourseImageUrl = (
  course: Course
): string | number | null | undefined => {
  const url = course.thumbnail?.url;
  if (!url) {
    return COURSE_PLACEHOLDER_IMAGE;
  }
  if (typeof url === "string" && url.length > 0) {
    if (url.startsWith("data:image")) {
      return url;
    }
    return url;
  }
  if (typeof url === "object" && url !== null) {
    if (url.uri && typeof url.uri === "string" && url.uri.length > 0) {
      return url.uri;
    }
    if (url.base64 && typeof url.base64 === "string" && url.base64.length > 0) {
      return `data:image/jpeg;base64,${url.base64}`;
    }
  }
  return COURSE_PLACEHOLDER_IMAGE;
};

export default function HomeScreen() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopCourses = async () => {
      try {
        setLoading(true);
        const response = await getTopCoursesApi();
        if (response.data.success) {
          const fetchedCourses = response.data.courses;
          setCourses(fetchedCourses);
          const uniqueCategories: string[] = [
            ...new Set<string>(
              fetchedCourses
                .map((course: Course) => course.category?.name)
                .filter(Boolean) as string[]
            ),
          ];
          setCategories(["All", ...uniqueCategories]);
        } else {
          Alert.alert("Error", "Failed to fetch courses.");
          setError("Failed to fetch courses.");
        }
      } catch (err: unknown) {
        console.error("Error fetching top courses:", err);
        Alert.alert("Error", "An unexpected error occurred.");
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTopCourses();
  }, []);

  const courseCardData = useMemo(() => {
    return courses.map((course) => ({
      id: course._id,
      title: course.name,
      imageUrl: getCourseImageUrl(course),
      price: `$${course.price}`,
      rating: course.rating,
      instructor: course.publisher.name,
    }));
  }, [courses]);

  const coursesForCategoryList = useMemo(() => {
    if (activeCategory === "All") {
      return courses;
    }
    return courses.filter((course) => course.category?.name === activeCategory);
  }, [courses, activeCategory]);

  const courseCardDataForCategoryList = useMemo(() => {
    return coursesForCategoryList.map((course) => ({
      id: course._id,
      title: course.name,
      imageUrl: getCourseImageUrl(course),
      price: `$${course.price}`,
      rating: course.rating,
      instructor: course.publisher.name,
    }));
  }, [coursesForCategoryList]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3858F8" />
        <Text style={styles.loadingText}>Loading home page...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <HeroSection />
      <CategoryList
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Sử dụng CourseListHome thay thế cho CourseGrid */}
      <CourseListHome title="Top courses" courses={courseCardData} />
    </ScrollView>
  );
}
