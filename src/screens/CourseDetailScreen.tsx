import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { styles } from "../styles/CourseDetailStyles";
import Icon from "react-native-vector-icons/Ionicons";
import { getCourseDetailApi } from "../services/api";
import { useCart } from "@/context/CartContext";

// --- Detailed data types for Course ---
type Lesson = {
  _id: string;
  title: string;
  duration: string;
  isFree?: boolean;
};

type Section = {
  _id: string;
  title: string;
  lessons: Lesson[];
};

type Publisher = {
  name: string;
  avatar: { url: string };
  profession: string;
};

type CourseDetail = {
  _id: string;
  name: string;
  description: string;
  thumbnail: { url: string };
  price: number;
  estimatedPrice: number;
  level: string;
  totalLessons: number;
  durationText: string;
  purchased: number;
  topics: string[];
  sections: Section[];
  publisher: Publisher;
};

// --- Navigation Types ---
type CoursesStackParamList = {
  CoursesList: undefined;
  CourseDetail: { courseId: string };
};
type Props = StackScreenProps<CoursesStackParamList, "CourseDetail">;

// --- Sub-component for Accordion ---
const CourseContentSection = ({
  section,
  index,
}: {
  section: Section;
  index: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(index === 0);
  const totalLectures = section.lessons?.length ?? 0;

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={{ flex: 1, marginRight: 8 }}>
          <Text style={styles.accordionTitle}>{section.title}</Text>
          <Text
            style={styles.accordionMeta}
          >{`${totalLectures} Lectures`}</Text>
        </View>
        <Icon
          name={isExpanded ? "chevron-up-outline" : "chevron-down-outline"}
          size={24}
          color="#333"
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.lectureList}>
          {(section.lessons ?? []).map((lesson, lectureIndex) => (
            <View key={lesson._id} style={styles.lectureItem}>
              <View style={styles.lectureNumber}>
                <Text style={styles.lectureNumberText}>{lectureIndex + 1}</Text>
              </View>
              <Text style={styles.lectureTitle}>{lesson.title}</Text>
              <View style={styles.lectureMeta}>
                {lesson.isFree && (
                  <View style={styles.previewTag}>
                    <Text style={styles.previewText}>Preview</Text>
                  </View>
                )}
                <Text style={styles.durationText}>{lesson.duration}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

// --- Main Screen Component ---
export default function CourseDetailScreen({ route }: Props) {
  const { courseId } = route.params;
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        setLoading(true);
        const response = await getCourseDetailApi(courseId);
        if (response.data.success) {
          setCourse(response.data.course);
        }
      } catch (error) {
        console.error("Failed to fetch course detail:", error);
        Alert.alert("Error", "Failed to load course details.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetail();
  }, [courseId]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#3858F8"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  if (!course) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Course not found!</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <ImageBackground
          source={{ uri: course.thumbnail.url }}
          style={styles.headerImage}
        >
          <View style={styles.headerOverlay} />
          <Text style={styles.headerText}>{course.name}</Text>
        </ImageBackground>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{course.name}</Text>
          <View style={styles.instructorContainer}>
            <Image
              source={{ uri: course.publisher.avatar.url }}
              style={styles.instructorAvatar}
            />
            <View>
              <Text style={styles.instructorName}>{course.publisher.name}</Text>
              <Text style={styles.instructorTitle}>
                {course.publisher.profession}
              </Text>
            </View>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{course.totalLessons}</Text>
              <Text style={styles.statLabel}>Lessons</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{course.durationText}</Text>
              <Text style={styles.statLabel}>Duration</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{course.level}</Text>
              <Text style={styles.statLabel}>Level</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                {course.purchased.toLocaleString()}
              </Text>
              <Text style={styles.statLabel}>Students</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{course.description}</Text>

          <Text style={styles.sectionTitle}>What you'll learn</Text>
          {(course.topics ?? []).map((item, index) => (
            <View key={index} style={styles.includeItem}>
              <Icon name="checkmark-circle-outline" size={18} color="#3858F8" />
              <Text style={styles.includeText}>{item}</Text>
            </View>
          ))}

          <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
            Course Content
          </Text>
          {(course.sections ?? []).map((section, index) => (
            <CourseContentSection
              key={section._id}
              section={section}
              index={index}
            />
          ))}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.fabContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>
            {course.estimatedPrice.toLocaleString("vi-VN")} VND
          </Text>
          <Text style={styles.discountedPrice}>
            {course.price.toLocaleString("vi-VN")} VND
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => addToCart(course._id)} // Add onPress event
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
