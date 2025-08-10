import React, { useState, useMemo, useEffect, useCallback } from "react";
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
  TextInput,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { styles } from "../styles/CoursesListStyles";
import Icon from "react-native-vector-icons/Ionicons";
import { getCoursesApi } from "../services/api";

// Định nghĩa kiểu dữ liệu cho Course dựa trên backend
type Course = {
  _id: string;
  name: string;
  publisher: {
    name: string;
  };
  rating?: number;
  price: number;
  thumbnail?: { url: string };
  category: { name: string };
};

type CoursesStackParamList = {
  CoursesList: undefined;
  CourseDetail: { courseId: string };
};

type Props = StackScreenProps<CoursesStackParamList, "CoursesList">;

// Bỏ category filters hoàn toàn
const allCategories = ["All"]; // Sử dụng "All" thay vì "Tất cả"

export default function CoursesListScreen({ navigation }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSearch, setCurrentSearch] = useState(""); // <-- Thêm state mới để lưu từ khóa tìm kiếm hiện tại

  const fetchCourses = useCallback(
    async (pageToFetch: number, category: string, search: string) => {
      try {
        if (pageToFetch === 1) setLoading(true);
        else setIsFetchingMore(true);

        const params: {
          page: number;
          limit: number;
          category?: string;
          search?: string;
        } = {
          page: pageToFetch,
          limit,
        };

        if (search.length > 0) {
          params.search = search;
        }

        const response = await getCoursesApi(params);
        console.log("API Response:", response.data);

        if (response.data.success) {
          const newCourses = response.data.courses as Course[];
          setCourses((prevCourses) =>
            pageToFetch === 1 ? newCourses : [...prevCourses, ...newCourses]
          );
          setTotalPages(response.data.totalPages);
        } else {
          Alert.alert("Error", "Failed to fetch courses.");
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        Alert.alert("Error", "Could not load courses list.");
      } finally {
        setLoading(false);
        setIsFetchingMore(false);
      }
    },
    [limit]
  );

  useEffect(() => {
    // Chỉ gọi fetchCourses khi component được mount lần đầu hoặc khi currentSearch thay đổi
    setPage(1);
    setCourses([]);
    fetchCourses(1, activeCategory, currentSearch);
  }, [currentSearch, fetchCourses]);

  const handleSearch = () => {
    // Khi người dùng nhấn nút tìm kiếm, cập nhật currentSearch
    // Điều này sẽ kích hoạt useEffect để tải lại danh sách
    setCurrentSearch(searchQuery);
  };

  const handleLoadMore = () => {
    if (page < totalPages && !isFetchingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCourses(nextPage, activeCategory, currentSearch); // Dùng currentSearch để tìm kiếm
    }
  };

  const renderCourseItem: ListRenderItem<Course> = ({ item }) => {
    const imageUrl = item.thumbnail?.url || "https://placehold.co/400x225";
    return (
      <TouchableOpacity
        style={styles.courseCard}
        onPress={() =>
          navigation.navigate("CourseDetail", { courseId: item._id })
        }
      >
        <Image
          source={{ uri: imageUrl }}
          style={styles.courseImage}
          onError={(e) =>
            console.log("Image loading error:", e.nativeEvent.error)
          }
        />
        <View style={styles.courseDetails}>
          <Text style={styles.courseTitle} numberOfLines={2}>
            {item.name}
          </Text>
          <View style={styles.instructorInfo}>
            <Text style={styles.instructorName}>{item.publisher?.name}</Text>
          </View>
          <View style={styles.courseFooter}>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={14} color="#f5b324" />
              <Text style={styles.ratingText}>{item.rating || 0}</Text>
            </View>
            <Text style={styles.priceText}>
              {item.price
                ? `${item.price.toLocaleString("en-US")} VND`
                : "Free"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3858F8" />
        <Text style={styles.loadingText}>Loading courses...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for courses..."
          placeholderTextColor="#6B6B6B"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch} // Gọi hàm handleSearch khi nhấn nút
        >
          <Icon name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingMore ? (
            <ActivityIndicator size="small" color="#3858F8" />
          ) : null
        }
      />
    </View>
  );
}
