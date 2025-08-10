import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { StackScreenProps } from "@react-navigation/stack";
import { Video, ResizeMode } from "expo-av";

// Import styles từ tệp riêng biệt
import styles from "../../styles/WatchCourseStyles";

// Import API services
import {
  getCourseDetailApi,
  updateLessonCompletionStatusApi,
} from "../../services/api";

const { width } = Dimensions.get("window");

// Định nghĩa kiểu cho props của ProgressCircle
interface ProgressCircleProps {
  progress: number;
}

// Định nghĩa kiểu cho các phần con của bài học (subLessons)
interface SubLesson {
  _id: string;
  title: string;
  type: "Video" | "Document" | null;
  duration: string;
  url?: string;
  isCompleted?: boolean;
}

// Định nghĩa kiểu cho một bài học (Lesson)
interface Lesson {
  _id: string;
  title: string;
  videoUrl?: { url: string };
  documentUrl?: { url: string };
  duration: string;
  isCompleted: boolean;
  lectures?: number;
  isSection?: boolean;
  subLessons?: SubLesson[];
}

// Định nghĩa kiểu cho một phần (Section) của khóa học
interface CourseSection {
  _id: string;
  title: string;
  lessons: Lesson[];
}

// Định nghĩa kiểu cho dữ liệu khóa học
interface CourseData {
  _id: string;
  title: string;
  demoUrl?: { url: string };
  sections: CourseSection[];
}

// Định nghĩa kiểu cho tham số route của màn hình này
type WatchCourseScreenRouteParams = {
  courseId: string;
};

// Định nghĩa kiểu cho Stack Navigator chứa màn hình này
type CoursesStackParamList = {
  CoursesList: undefined;
  CourseDetail: { courseId: string };
  WatchCourse: WatchCourseScreenRouteParams;
};

// Định nghĩa kiểu props cho WatchCourseScreen
type WatchCourseScreenProps = StackScreenProps<
  CoursesStackParamList,
  "WatchCourse"
>;

// Component chính cho màn hình Watch Course
const WatchCourseScreen = ({ route }: WatchCourseScreenProps) => {
  const { courseId } = route.params;

  const [activeTab, setActiveTab] = useState("Lesson");
  const [course, setCourse] = useState<CourseData | null>(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const hasUpdatedProgress = useRef(false);
  const videoRef = useRef<Video>(null);
  const allLessons = useRef<Lesson[]>([]); // Ref mới để lưu danh sách lessons phẳng // Logic fetch dữ liệu khóa học và khởi tạo

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res: any = await getCourseDetailApi(courseId);
        if (res.data.success) {
          const fetchedCourse: CourseData = res.data.course;
          setCourse(fetchedCourse); // Tạo danh sách lessons phẳng sau khi fetch data và gán kiểu dữ liệu

          allLessons.current = fetchedCourse.sections.flatMap(
            (section: CourseSection) => section.lessons
          ); // Logic set video đầu tiên

          if (
            fetchedCourse.sections.length > 0 &&
            fetchedCourse.sections[0].lessons.length > 0
          ) {
            const firstLesson = fetchedCourse.sections[0].lessons[0];
            if (firstLesson.videoUrl?.url) {
              setCurrentVideoUrl(firstLesson.videoUrl.url);
              setCurrentLessonId(firstLesson._id);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch course:", error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]); // Logic kiểm tra tiến độ video và gọi API

  useEffect(() => {
    const interval = setInterval(async () => {
      if (videoRef.current) {
        const status = await videoRef.current.getStatusAsync();
        if (status.isLoaded) {
          const { positionMillis, durationMillis, isPlaying } = status;
          if (
            isPlaying &&
            durationMillis &&
            positionMillis / durationMillis >= 0.8 &&
            currentLessonId &&
            !hasUpdatedProgress.current
          ) {
            hasUpdatedProgress.current = true;
            markLessonCompleted(currentLessonId);

            updateLessonCompletionStatusApi(courseId, currentLessonId, true)
              .then(() => {
                console.log("Tiến độ đã được cập nhật thành công trên server.");
              })
              .catch((error) => {
                console.error("Lỗi khi cập nhật tiến độ:", error);
                hasUpdatedProgress.current = false;
              });
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentLessonId]); // Logic xử lý sự kiện bấm vào bài học, đã được sửa lỗi số lượng tham số

  const handleLessonClick = useCallback(
    (url: string | undefined, lessonId: string, isLocked: boolean) => {
      if (isLocked) {
        Alert.alert(
          "Bài học bị khóa",
          "Bạn cần hoàn thành bài học trước để có thể xem bài học này."
        );
        return;
      }

      if (url) {
        setCurrentVideoUrl(url);
        setCurrentLessonId(lessonId);
        hasUpdatedProgress.current = false;
      } else {
        console.warn("Bài học không có video URL:", lessonId);
        setCurrentVideoUrl(null);
        setCurrentLessonId(lessonId);
      }
    },
    []
  );

  const markLessonCompleted = (idToMark: string) => {
    setCourse((prevCourse) => {
      if (!prevCourse) return prevCourse;

      const updatedSections = prevCourse.sections.map(
        (section: CourseSection) => ({
          ...section,
          lessons: section.lessons.map((lesson) =>
            lesson._id === idToMark ? { ...lesson, isCompleted: true } : lesson
          ),
        })
      ); // Cập nhật lại danh sách lessons phẳng sau khi state được thay đổi

      allLessons.current = updatedSections.flatMap(
        (section: CourseSection) => section.lessons
      );

      return { ...prevCourse, sections: updatedSections };
    });
  };

  const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress }) => {
    let backgroundColor = styles.progressCircle0.backgroundColor;
    if (progress > 0 && progress < 100) {
      backgroundColor = styles.progressCircleInProgress.backgroundColor;
    } else if (progress === 100) {
      backgroundColor = styles.progressCircleCompleted.backgroundColor;
    }

    return (
      <View style={[styles.progressCircle, { backgroundColor }]}>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Đang tải khóa học...</Text>
      </View>
    );
  }

  if (!course) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Không tìm thấy khóa học.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContainer}>
        <View style={styles.videoPlaceholder}>
          {currentVideoUrl ? (
            <Video
              ref={videoRef}
              source={{ uri: currentVideoUrl }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              style={styles.videoPlayer}
              shouldPlay
            />
          ) : (
            <Text style={styles.videoPlaceholderText}>
              Không có video để phát
            </Text>
          )}
        </View>

        <View style={styles.headerContent}>
          <Text style={styles.headerSubtitle}>NHỮNG KHÓA HỌC</Text>
          <Text style={styles.headerTitle}>{course.title}</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.tabNavigation}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "Lesson" && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab("Lesson")}
          >
            <Icon
              name="book"
              size={18}
              color={activeTab === "Lesson" ? "#2563eb" : "#6b7280"}
            />

            <Text
              style={[
                styles.tabText,
                activeTab === "Lesson" && styles.tabTextActive,
              ]}
            >
              Lesson
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "Lesson" && (
          <View style={styles.lessonList}>
            {course.sections.map((section: CourseSection) => (
              <View key={section._id} style={styles.lessonCard}>
                <View style={styles.lessonCardHeader}>
                  <View style={styles.lessonInfo}>
                    <Text style={styles.lessonTitle}>{section.title}</Text>
                  </View>

                  <Icon name="chevron-down" size={16} color="#9ca3af" />
                </View>

                <View style={styles.subLessonsContainer}>
                  {section.lessons.map((lesson: Lesson) => {
                    // Logic xác định trạng thái khóa của bài học
                    const lessonIndex = allLessons.current.findIndex(
                      (l) => l._id === lesson._id
                    );
                    const isFirstLesson = lessonIndex === 0;
                    const previousLesson = allLessons.current[lessonIndex - 1];
                    const isLocked =
                      !isFirstLesson && !previousLesson?.isCompleted;
                    return (
                      <TouchableOpacity
                        key={lesson._id}
                        style={[
                          styles.subLessonItem,
                          currentLessonId === lesson._id &&
                            styles.activeLessonItem,
                          isLocked && styles.lockedLessonItem,
                        ]}
                        onPress={() =>
                          handleLessonClick(
                            lesson.videoUrl?.url,
                            lesson._id,
                            isLocked
                          )
                        }
                        disabled={isLocked}
                      >
                        <View style={styles.subLessonLeft}>
                          {isLocked ? (
                            <Icon
                              name="lock"
                              size={16}
                              color="#9ca3af"
                              style={styles.subLessonIcon}
                            />
                          ) : lesson.isCompleted ? (
                            <Icon
                              name="check-circle"
                              size={16}
                              color="#2563eb"
                              style={styles.subLessonIcon}
                            />
                          ) : (
                            <Icon
                              name="play-circle"
                              size={16}
                              color="#4b5563"
                              style={styles.subLessonIcon}
                            />
                          )}

                          <Text
                            style={[
                              styles.subLessonTitle,
                              isLocked && styles.lockedText,
                            ]}
                          >
                            {lesson.title}
                          </Text>
                        </View>

                        <View style={styles.subLessonRight}>
                          {lesson.documentUrl?.url ? (
                            <View style={styles.documentTag}>
                              <Text style={styles.documentTagText}>
                                Document
                              </Text>
                            </View>
                          ) : lesson.videoUrl?.url ? (
                            <View style={styles.videoTag}>
                              <Text style={styles.videoTagText}>Video</Text>
                            </View>
                          ) : null}

                          <Text style={styles.subLessonDuration}>
                            {lesson.duration}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default WatchCourseScreen;
