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
import { GlobalColors, Typography, Spacing, BorderRadius } from "../../styles/GlobalColors";
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
    backgroundColor: GlobalColors.background,
  },
  scrollContent: {
    padding: Spacing.xl,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  errorText: {
    fontSize: Typography.fontSize.lg,
    color: GlobalColors.textSecondary,
    marginTop: Spacing.lg,
    marginBottom: Spacing["2xl"],
    fontWeight: Typography.fontWeight.medium,
    textAlign: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing["4xl"],
  },
  title: {
    fontSize: Typography.fontSize["4xl"],
    fontWeight: Typography.fontWeight.extrabold,
    color: GlobalColors.textPrimary,
    marginTop: Spacing.lg,
    letterSpacing: Typography.letterSpacing.wide,
    textAlign: "center",
  },
  subtitle: {
    fontSize: Typography.fontSize.lg,
    color: GlobalColors.textSecondary,
    marginTop: Spacing.sm,
    fontWeight: Typography.fontWeight.medium,
    textAlign: "center",
  },
  scoreCard: {
    backgroundColor: GlobalColors.surface,
    borderRadius: BorderRadius["2xl"],
    padding: Spacing["3xl"],
    marginBottom: Spacing["2xl"],
    borderWidth: 1,
    borderColor: GlobalColors.border,
    shadowColor: GlobalColors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  scoreHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  scoreTitle: {
    fontSize: Typography.fontSize["2xl"],
    fontWeight: Typography.fontWeight.bold,
    color: GlobalColors.textPrimary,
    letterSpacing: Typography.letterSpacing.wide,
  },
  scorePercentage: {
    fontSize: Typography.fontSize["5xl"],
    fontWeight: Typography.fontWeight.extrabold,
    letterSpacing: Typography.letterSpacing.wide,
  },
  scoreDetails: {
    marginBottom: Spacing.xl,
  },
  scoreText: {
    fontSize: Typography.fontSize.lg,
    color: GlobalColors.textSecondary,
    marginBottom: Spacing.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  scoreSubtext: {
    fontSize: Typography.fontSize.base,
    color: GlobalColors.textMuted,
    fontWeight: Typography.fontWeight.normal,
  },
  statusBadge: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    alignSelf: "center",
  },
  statusText: {
    color: GlobalColors.textLight,
    fontWeight: Typography.fontWeight.extrabold,
    fontSize: Typography.fontSize.base,
    letterSpacing: Typography.letterSpacing.wide,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: GlobalColors.surface,
    borderRadius: BorderRadius["2xl"],
    padding: Spacing["2xl"],
    marginBottom: Spacing["4xl"],
    borderWidth: 1,
    borderColor: GlobalColors.border,
    shadowColor: GlobalColors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: Typography.fontSize["3xl"],
    fontWeight: Typography.fontWeight.extrabold,
    color: GlobalColors.textPrimary,
    marginTop: Spacing.sm,
    letterSpacing: Typography.letterSpacing.wide,
  },
  statLabel: {
    fontSize: Typography.fontSize.sm,
    color: GlobalColors.textMuted,
    marginTop: Spacing.sm,
    fontWeight: Typography.fontWeight.medium,
    letterSpacing: Typography.letterSpacing.wide,
  },
  buttonContainer: {
    gap: Spacing.lg,
  },
  button: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing["3xl"],
    borderRadius: BorderRadius.xl,
    alignItems: "center",
    shadowColor: GlobalColors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: GlobalColors.primary,
  },
  secondaryButton: {
    backgroundColor: GlobalColors.surface,
    borderWidth: 2,
    borderColor: GlobalColors.primary,
  },
  buttonText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: Typography.letterSpacing.wide,
  },
  primaryButtonText: {
    color: GlobalColors.textLight,
  },
  secondaryButtonText: {
    color: GlobalColors.primary,
  },
});

export default QuizResultScreen;
