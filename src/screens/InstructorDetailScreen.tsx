import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { styles } from "../styles/InstructorDetailStyles";
import Icon from "react-native-vector-icons/Ionicons";
import CourseGrid from "../components/home/CourseGrid";
import { getInstructorByIdApi } from "../services/api";

// --- Định nghĩa kiểu dữ liệu ---
type CourseSummary = {
  _id: string;
  name: string;
  thumbnail: { url: string };
  price: number;
  rating?: number;
};

type Instructor = {
  _id: string;
  name: string;
  profession?: string;
  avatar?: { url: string };
  introduce?: string;
  rating?: number;
  studentCount?: number;
  uploadedCourses?: CourseSummary[];
};

type LectureStackParamList = {
  LectureList: undefined;
  InstructorDetail: { instructorId: string };
  CourseDetail: { courseId: string };
};
type Props = StackScreenProps<LectureStackParamList, "InstructorDetail">;

export default function InstructorDetailScreen({ route }: Props) {
  const { instructorId } = route.params;
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        setLoading(true);
        const response = await getInstructorByIdApi(instructorId);

        if (response.data.success && response.data.data.user) {
          setInstructor(response.data.data.user);
        } else {
          console.log("API success but no user data found in response.");
        }
      } catch (error) {
        console.error("Failed to fetch instructor details:", error);
        Alert.alert("Lỗi", "Không thể tải thông tin giảng viên.");
      } finally {
        setLoading(false);
      }
    };
    fetchInstructor();
  }, [instructorId]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#3858F8"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  if (!instructor) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Not found instructors</Text>
      </View>
    );
  }

  console.log("Fetched instructor data:", instructor.uploadedCourses);

  const instructorCourses =
    instructor.uploadedCourses?.map((course) => ({
      id: course._id,
      title: course.name,
      imageUrl: course.thumbnail.url,
      price: course.price
        ? `${course.price.toLocaleString("vi-VN")} VNĐ`
        : "Free",
      rating: course.rating || 0,
      instructor: instructor.name,
      instructorAvatar: instructor.avatar?.url || "",
    })) || [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={
            instructor.avatar?.url
              ? { uri: instructor.avatar.url }
              : require("../assets/avatar-default.png")
          }
          style={styles.avatar}
        />
        <Text style={styles.name}>{instructor.name}</Text>
        <Text style={styles.title}>
          {instructor.profession || "Instructor"}
        </Text>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{instructor.rating || 0}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {(instructor.studentCount || 0).toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{instructorCourses.length}</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Icon name="logo-facebook" size={20} color="#3b5998" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Icon name="logo-twitter" size={20} color="#1DA1F2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Icon name="logo-instagram" size={20} color="#C13584" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.aboutContainer}>
        <Text style={styles.sectionTitle}>About me</Text>
        <Text style={styles.aboutText}>
          {instructor.introduce || "Chưa có thông tin giới thiệu."}
        </Text>
      </View>

      <View style={styles.coursesContainer}>
        <CourseGrid title="Các khóa học của tôi" courses={instructorCourses} />
      </View>
    </ScrollView>
  );
}
