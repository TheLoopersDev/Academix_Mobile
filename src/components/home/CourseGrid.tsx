import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ListRenderItem,
} from "react-native";
import { styles } from "../../styles/CourseGridStyles"; // Import styles for CourseGrid
import Icon from "react-native-vector-icons/Ionicons";
import { COURSES } from "../../data/mockData";
import { useNavigation } from "@react-navigation/native"; // <-- Import useNavigation

type Course = (typeof COURSES)[0];

interface CourseGridProps {
  title: string;
  courses: Course[];
}

export default function CourseGrid({ title, courses }: CourseGridProps) {
  const navigation = useNavigation(); // <-- Lấy đối tượng navigation

  const renderCourseItem: ListRenderItem<Course> = ({ item }) => (
    <TouchableOpacity
      style={styles.courseCard}
      // Khi nhấn, điều hướng đến CourseDetail và truyền courseId
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
        scrollEnabled={false}
      />
    </View>
  );
}
