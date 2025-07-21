import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  ListRenderItem,
  ActivityIndicator,
  Alert,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { CATEGORIES } from "../data/mockData"; // Giữ lại để lọc
import { styles } from "../styles/CoursesListStyles";
import Icon from "react-native-vector-icons/Ionicons";
import { getCoursesApi } from "../services/api"; // <-- Import hàm API

// Định nghĩa kiểu dữ liệu cho Khóa học dựa trên backend
type Course = {
  _id: string;
  name: string;
  instructor: string; // Hoặc một object nếu được populate
  ratings?: number;
  price: number;
  thumbnail?: { url: string };
  category: string;
  // Thêm các trường khác nếu cần
};

type CoursesStackParamList = {
  CoursesList: undefined;
  CourseDetail: { courseId: string };
};

type Props = StackScreenProps<CoursesStackParamList, "CoursesList">;

export default function CoursesListScreen({ navigation }: Props) {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await getCoursesApi();
        if (response.data.success) {
          setAllCourses(response.data.courses);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        Alert.alert("Lỗi", "Không thể tải danh sách khóa học.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    if (activeCategory === "Tất cả") {
      return allCourses;
    }
    return allCourses.filter((course) => course.category === activeCategory);
  }, [activeCategory, allCourses]);

  const renderCourseItem: ListRenderItem<Course> = ({ item }) => (
    <TouchableOpacity
      style={styles.courseCard}
      onPress={() =>
        navigation.navigate("CourseDetail", { courseId: item._id })
      }
    >
      <Image
        source={{ uri: item.thumbnail?.url || "https://placehold.co/400x225" }}
        style={styles.courseImage}
      />
      <View style={styles.courseDetails}>
        <Text style={styles.courseTitle} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.instructorInfo}>
          {/* Giả sử instructor là string, nếu là object thì cần thay đổi */}
          <Text style={styles.instructorName}>{item.instructor}</Text>
        </View>
        <View style={styles.courseFooter}>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={14} color="#f5b324" />
            <Text style={styles.ratingText}>{item.ratings || 0}</Text>
          </View>
          <Text style={styles.priceText}>
            {item.price.toLocaleString("vi-VN")} VNĐ
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#3858F8"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredCourses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryFilterContainer}
          >
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
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
        }
      />
    </View>
  );
}
