import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ListRenderItem,
} from "react-native";
import { styles } from "../../styles/CourseGridStyles"; // Đảm bảo đường dẫn đúng
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

// --- Định nghĩa kiểu dữ liệu mới, đơn giản và có thể tái sử dụng ---
export type CourseCardData = {
  id: string;
  title: string;
  imageUrl: string;
  price: string;
  rating: number;
  instructor: string;
  instructorAvatar: string;
};

interface CourseGridProps {
  title: string;
  courses: CourseCardData[]; // <-- Sử dụng kiểu dữ liệu mới
}

export default function CourseGrid({ title, courses }: CourseGridProps) {
  const navigation = useNavigation();

  const renderCourseItem: ListRenderItem<CourseCardData> = ({ item }) => (
    <TouchableOpacity
      style={styles.courseCard}
      // Điều hướng đến CourseDetail, truyền courseId
      onPress={() => navigation.navigate("CourseDetail", { courseId: item.id })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.courseImage} />
      <View style={styles.courseDetails}>
        <Text style={styles.courseTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.instructorInfo}>
          <Image
            source={{ uri: item.instructorAvatar }}
            style={styles.instructorAvatar}
          />
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        scrollEnabled={false} // Tắt cuộn nếu được lồng trong ScrollView
      />
    </View>
  );
}
