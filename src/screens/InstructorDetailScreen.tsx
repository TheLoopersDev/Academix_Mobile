import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { INSTRUCTORS, COURSES } from "../data/mockData";
import { styles } from "../styles/InstructorDetailStyles";
import Icon from "react-native-vector-icons/Ionicons";
import CourseGrid from "../components/home/CourseGrid";

// --- Types ---
type LectureStackParamList = {
  LectureList: undefined;
  InstructorDetail: { instructorId: string };
  CourseDetail: { courseId: string }; // <-- Thêm CourseDetail
};
type Props = StackScreenProps<LectureStackParamList, "InstructorDetail">;

export default function InstructorDetailScreen({ route }: Props) {
  const { instructorId } = route.params;
  const instructor = INSTRUCTORS.find((i) => i.id === instructorId);
  const instructorCourses = COURSES.filter(
    (c) => c.instructor === instructor?.name
  );

  if (!instructor) {
    return (
      <View>
        <Text>Không tìm thấy giảng viên!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: instructor.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{instructor.name}</Text>
        <Text style={styles.title}>{instructor.title}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{instructor.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {instructor.studentCount.toLocaleString()}
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
        <Text style={styles.sectionTitle}>Về tôi</Text>
        <Text style={styles.aboutText}>{instructor.aboutMe}</Text>
      </View>

      <View style={styles.coursesContainer}>
        <CourseGrid title="Các khóa học của tôi" courses={instructorCourses} />
      </View>
    </ScrollView>
  );
}
