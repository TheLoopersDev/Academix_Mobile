import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";

interface QuizResult {
  totalQuestions: number;
  attemptedQuestions: number;
  correctQuestions: number;
  incorrectQuestions: number;
  skippedQuestions: number;
  totalScore: number;
  maxPossibleScore: number;
  overallStatus: "completed" | "time-out";
  isPassed: boolean;
  score: number;
  passingScore: number;
  breakdown?: Array<{
    questionNumber: number;
    questionId: string;
    status: "correct" | "incorrect" | "skipped";
    pointsEarned: number;
    maxPoints: number;
    userSelectedOptionIds: string[];
    correctAnswerIds: string[];
  }>;
}

type CoursesStackParamList = {
  CoursesList: undefined;
  CourseDetail: { courseId: string };
  WatchCourse: { courseId: string };
  DoQuiz: { quizId: string };
  QuizResult: {
    result: any;
    quizName?: string;
    isTimeOut?: boolean;
    quizId?: string;
  };
  QuizDetail: {
    result: any;
    quizName?: string;
  };
};

type QuizResultRoute = {
  key: string;
  name: string;
  params?: {
    result: QuizResult;
    quizName?: string;
    isTimeOut?: boolean;
    quizId?: string;
  };
};

type QuizResultScreenNavigationProp = StackNavigationProp<CoursesStackParamList, 'QuizResult'>;

const QuizResultScreen: React.FC = () => {
  const navigation = useNavigation() as QuizResultScreenNavigationProp;
  const route = useRoute() as unknown as QuizResultRoute;

  const { result, quizName = "Quiz", isTimeOut = false, quizId } = route?.params || {};

  console.log("QuizResultScreen received result:", result);
  console.log("QuizResultScreen received quizId:", quizId);
  console.log("QuizResultScreen received all params:", route?.params);

  // Extract the actual quiz result data if it's nested
  const quizResult = result?.data || result;
  console.log("Extracted quiz result:", quizResult);

  if (!quizResult) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Icon name="alert-circle" size={64} color="#ef4444" />
          <Text style={styles.errorText}>No quiz results found</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.pop(2)}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const percentage = Math.round((quizResult.totalScore / quizResult.maxPossibleScore) * 100);
  // Use our own calculation since backend might have different logic
  const isPassed = percentage >= quizResult.passingScore;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Icon
            name={isPassed ? "checkmark-circle" : "close-circle"}
            size={80}
            color={isPassed ? "#10b981" : "#ef4444"}
          />
          <Text style={styles.title}>
            {isTimeOut ? "Time's Up!" : "Quiz Completed!"}
          </Text>
          <Text style={styles.subtitle}>{quizName}</Text>
        </View>

        {/* Score Summary */}
        <View style={styles.scoreCard}>
          <View style={styles.scoreHeader}>
            <Text style={styles.scoreTitle}>Your Score</Text>
            <Text style={[styles.scorePercentage, { color: isPassed ? "#10b981" : "#ef4444" }]}>
              {percentage}%
            </Text>
          </View>
          
          <View style={styles.scoreDetails}>
            <Text style={styles.scoreText}>
              {quizResult.correctQuestions} out of {quizResult.totalQuestions} correct
            </Text>
            <Text style={styles.scoreSubtext}>
              Points: {quizResult.totalScore}/{quizResult.maxPossibleScore}
            </Text>
            <Text style={styles.scoreSubtext}>
              Passing Score: {quizResult.passingScore}%
            </Text>
          </View>

          <View style={[styles.statusBadge, { backgroundColor: isPassed ? "#10b981" : "#ef4444" }]}>
            <Text style={styles.statusText}>
              {isPassed ? "PASSED" : "FAILED"}
            </Text>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Icon name="checkmark-circle" size={24} color="#10b981" />
            <Text style={styles.statNumber}>{quizResult.correctQuestions}</Text>
            <Text style={styles.statLabel}>Correct</Text>
          </View>

          <View style={styles.statItem}>
            <Icon name="close-circle" size={24} color="#ef4444" />
            <Text style={styles.statNumber}>{quizResult.incorrectQuestions}</Text>
            <Text style={styles.statLabel}>Incorrect</Text>
          </View>

          <View style={styles.statItem}>
            <Icon name="remove-circle" size={24} color="#6b7280" />
            <Text style={styles.statNumber}>{quizResult.skippedQuestions}</Text>
            <Text style={styles.statLabel}>Skipped</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => {
              // Navigate back to course - go back 2 screens to reach WatchCourseScreen
              // DoQuizScreen -> QuizResultScreen -> back to WatchCourseScreen
              navigation.pop(2);
            }}
          >
            <Text style={[styles.buttonText, styles.primaryButtonText]}>
              Back to Course
            </Text>
          </TouchableOpacity>

          {quizResult.breakdown && (
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => {
                navigation.navigate("QuizDetail", {
                  result: quizResult,
                  quizName: "Quiz Details",
                  quizId,
                });
              }}
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                View Details
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A", // Dark slate background
  },
  scrollContent: {
    padding: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#CBD5E1", // Light muted text
    marginTop: 16,
    marginBottom: 24,
    fontWeight: "500",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#F8FAFC", // Light text
    marginTop: 16,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 18,
    color: "#CBD5E1", // Light muted text
    marginTop: 8,
    fontWeight: "500",
  },
  scoreCard: {
    backgroundColor: "#1E293B", // Card background
    borderRadius: 20,
    padding: 28,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#334155",
  },
  scoreHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  scoreTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#F8FAFC", // Light text
    letterSpacing: 0.3,
  },
  scorePercentage: {
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  scoreDetails: {
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 18,
    color: "#CBD5E1", // Light muted text
    marginBottom: 6,
    fontWeight: "500",
  },
  scoreSubtext: {
    fontSize: 16,
    color: "#64748B", // Very muted text
    fontWeight: "400",
  },
  statusBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    alignSelf: "center",
  },
  statusText: {
    color: "#F8FAFC",
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.3,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1E293B", // Card background
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#334155",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "800",
    color: "#F8FAFC", // Light text
    marginTop: 8,
    letterSpacing: 0.5,
  },
  statLabel: {
    fontSize: 14,
    color: "#64748B", // Very muted text
    marginTop: 6,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 16,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#1E40AF", // Deep blue primary
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#1E40AF",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  primaryButtonText: {
    color: "#F8FAFC", // Light text
  },
  secondaryButtonText: {
    color: "#1E40AF", // Primary color
  },
});

export default QuizResultScreen;
