import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ListRenderItem,
} from "react-native";
// Sử dụng styles từ CoursesListStyles để đảm bảo layout giống nhau
import { styles } from "../../styles/CoursesListStyles";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

// Import một ảnh placeholder mặc định
const PLACEHOLDER_IMAGE = require("../../assets/course1.png");

// Định nghĩa kiểu dữ liệu cho CourseCardData
export type CourseCardData = {
  id: string;
  title: string;
  imageUrl: string | number | null | undefined;
  price: string;
  rating: number;
  instructor: string;
};

interface CourseListHomeProps {
  title: string;
  courses: CourseCardData[];
}

export default function CourseListHome({
  title,
  courses,
}: CourseListHomeProps) {
  const navigation = useNavigation();

  const renderCourseItem: ListRenderItem<CourseCardData> = ({ item }) => {
    let imageSource;
    if (typeof item.imageUrl === "string" && item.imageUrl.length > 0) {
      imageSource = { uri: item.imageUrl };
    } else if (typeof item.imageUrl === "number") {
      imageSource = item.imageUrl;
    } else {
      imageSource = PLACEHOLDER_IMAGE;
    }

    return (
      <TouchableOpacity
        style={styles.courseCard}
        onPress={() =>
          navigation.navigate("CourseDetail", { courseId: item.id })
        }
      >
        <Image
          source={imageSource}
          style={styles.courseImage}
          onError={(e) =>
            console.log("Image loading error:", e.nativeEvent.error)
          }
          resizeMode="cover"
        />
        <View style={styles.courseDetails}>
          <Text style={styles.courseTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.instructorInfo}>
            <Text style={styles.instructorName}>{item.instructor}</Text>
          </View>
          <View style={styles.courseFooter}>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={14} color="#f5b324" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <Text style={styles.priceText}>{item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        // Vì component này được sử dụng trong ScrollView của HomeScreen, ta cần tắt cuộn của FlatList
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}
