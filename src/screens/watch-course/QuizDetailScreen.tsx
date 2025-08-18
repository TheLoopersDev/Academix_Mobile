import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { getAllQuestionsApi } from "../../services/api";
import { QuestionData, AnswerOptionData } from "../../types/quizType";

interface QuestionBreakdown {
  questionId: string;
  questionNumber: number;
  status: "correct" | "incorrect" | "skipped";
  pointsEarned: number;
  maxPoints: number;
  userSelectedOptionIds: string[];
  correctAnswerIds: string[];
  questionText?: string;
  options?: AnswerOptionData[];
}

interface QuizDetailResult {
  totalQuestions: number;
  correctQuestions: number;
  incorrectQuestions: number;
  skippedQuestions: number;
  totalScore: number;
  maxPossibleScore: number;
  passingScore: number;
  breakdown: QuestionBreakdown[];
}

type QuizDetailRoute = {
  key: string;
  name: string;
  params?: {
    result: QuizDetailResult;
    quizName?: string;
    quizId?: string;
  };
};

const QuizDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute() as unknown as QuizDetailRoute;

  const { result, quizName = "Quiz Details", quizId } = route?.params || {};
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrichedBreakdown, setEnrichedBreakdown] = useState<QuestionBreakdown[]>([]);

  useEffect(() => {
    const fetchQuestionsAndEnrichBreakdown = async () => {
      console.log("QuizDetailScreen - Starting useEffect");
      console.log("QuizDetailScreen - result:", result);
      console.log("QuizDetailScreen - quizId:", quizId);

      if (!result || !result.breakdown) {
        console.log("QuizDetailScreen - No result or breakdown, setting loading false");
        setLoading(false);
        return;
      }

      if (!quizId) {
        console.log("QuizDetailScreen - No quizId, using fallback");
        setEnrichedBreakdown(result.breakdown);
        setLoading(false);
        return;
      }

      try {
        console.log("QuizDetailScreen - Fetching questions for quiz:", quizId);
        const questionsResponse = await getAllQuestionsApi(quizId);
        console.log("QuizDetailScreen - Fetched questions response:", questionsResponse);

        // Extract questions array from response
        const responseData = questionsResponse?.data?.data || questionsResponse?.data || questionsResponse;
        const questionsData = responseData?.questions || responseData;
        console.log("QuizDetailScreen - Response data:", responseData);
        console.log("QuizDetailScreen - Extracted questions array:", questionsData);
        console.log("QuizDetailScreen - Is questionsData an array?", Array.isArray(questionsData));

        setQuestions(questionsData);

        // Enrich breakdown with question text and options
        const enriched = result.breakdown.map((breakdownItem: any) => {
          // Try to find question by questionId first, then by questionNumber
          let question = null;
          if (Array.isArray(questionsData)) {
            // First try to find by _id
            question = questionsData.find((q: QuestionData) => q._id === breakdownItem.questionId);

            // If not found, try to find by questionNumber (convert questionId to number and add 1)
            if (!question) {
              const questionNumber = parseInt(breakdownItem.questionId) + 1;
              question = questionsData.find((q: QuestionData) => q.questionNumber === questionNumber);
            }
          }

          console.log(`QuizDetailScreen - Mapping question ${breakdownItem.questionId} (questionNumber: ${parseInt(breakdownItem.questionId) + 1}):`, question);

          return {
            ...breakdownItem,
            questionText: question?.title || `Question ${breakdownItem.questionNumber}`,
            options: question?.options || [],
          };
        });

        console.log("QuizDetailScreen - Enriched breakdown:", enriched);
        setEnrichedBreakdown(enriched);
      } catch (error) {
        console.error("QuizDetailScreen - Error fetching questions:", error);
        // Fallback to original breakdown without enrichment
        setEnrichedBreakdown(result.breakdown);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionsAndEnrichBreakdown();
  }, [result, quizId]);

  if (!result || !result.breakdown) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Quiz Details</Text>
        </View>
        
        <View style={styles.errorContainer}>
          <Icon name="alert-circle" size={64} color="#ef4444" />
          <Text style={styles.errorText}>No detailed results available</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const percentage = Math.round((result.totalScore / result.maxPossibleScore) * 100);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Quiz Details</Text>
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={styles.loadingText}>Loading question details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getOptionText = (optionId: string, options: AnswerOptionData[]) => {
    const option = options.find(opt => opt.id === optionId);
    return option?.text || `Option ${optionId}`;
  };

  const renderQuestionItem = ({ item, index }: { item: QuestionBreakdown; index: number }) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case "correct": return "#10b981";
        case "incorrect": return "#ef4444";
        case "skipped": return "#6b7280";
        default: return "#6b7280";
      }
    };

    const getStatusIcon = (status: string) => {
      switch (status) {
        case "correct": return "checkmark-circle";
        case "incorrect": return "close-circle";
        case "skipped": return "remove-circle";
        default: return "help-circle";
      }
    };

    return (
      <View style={styles.questionCard}>
        <View style={styles.questionHeader}>
          <View style={styles.questionNumber}>
            <Text style={styles.questionNumberText}>Q{item.questionNumber}</Text>
          </View>
          
          <View style={styles.questionStatus}>
            <Icon 
              name={getStatusIcon(item.status)} 
              size={20} 
              color={getStatusColor(item.status)} 
            />
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
          
          <View style={styles.questionScore}>
            <Text style={styles.scoreText}>
              {item.pointsEarned}/{item.maxPoints}
            </Text>
          </View>
        </View>

        {item.questionText && (
          <View style={styles.questionTextContainer}>
            <Text style={styles.questionText}>{item.questionText}</Text>
          </View>
        )}

        <View style={styles.answersContainer}>
          <Text style={styles.answersTitle}>Your Answer:</Text>
          {item.userSelectedOptionIds.length > 0 ? (
            <View style={styles.answersList}>
              {item.userSelectedOptionIds.map((optionId, idx) => (
                <View key={idx} style={styles.answerItem}>
                  <Icon name="person" size={16} color="#3b82f6" />
                  <Text style={styles.answerText}>
                    {getOptionText(optionId, item.options || [])}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noAnswerText}>No answer selected</Text>
          )}

          <Text style={styles.answersTitle}>Correct Answer:</Text>
          <View style={styles.answersList}>
            {item.correctAnswerIds.map((optionId, idx) => (
              <View key={idx} style={styles.answerItem}>
                <Icon name="checkmark" size={16} color="#10b981" />
                <Text style={styles.answerText}>
                  {getOptionText(optionId, item.options || [])}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quiz Details</Text>
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Score:</Text>
          <Text style={styles.summaryValue}>{percentage}%</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Points:</Text>
          <Text style={styles.summaryValue}>
            {result.totalScore}/{result.maxPossibleScore}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Correct:</Text>
          <Text style={[styles.summaryValue, { color: "#10b981" }]}>
            {result.correctQuestions}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Incorrect:</Text>
          <Text style={[styles.summaryValue, { color: "#ef4444" }]}>
            {result.incorrectQuestions}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Skipped:</Text>
          <Text style={[styles.summaryValue, { color: "#6b7280" }]}>
            {result.skippedQuestions}
          </Text>
        </View>
      </View>

      {/* Questions List */}
      <View style={styles.questionsContainer}>
        <Text style={styles.questionsTitle}>Question Breakdown</Text>
        {console.log("QuizDetailScreen - Rendering FlatList with data:", enrichedBreakdown)}
        <FlatList
          data={enrichedBreakdown}
          renderItem={renderQuestionItem}
          keyExtractor={(item) => item.questionId}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.questionsList}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No questions to display</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A", // Dark slate background
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#1E293B", // Card background
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  backButton: {
    marginRight: 16,
    padding: 8,
    backgroundColor: "#334155",
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#F8FAFC", // Light text
    flex: 1,
    letterSpacing: 0.5,
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
    textAlign: "center",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#1E40AF", // Deep blue primary
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 16,
  },
  buttonText: {
    color: "#F8FAFC", // Light text
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  summaryCard: {
    backgroundColor: "#1E293B", // Card background
    margin: 20,
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 18,
    color: "#CBD5E1", // Light muted text
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F8FAFC", // Light text
    letterSpacing: 0.3,
  },
  questionsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  questionsTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#F8FAFC", // Light text
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  questionsList: {
    paddingBottom: 20,
  },
  questionCard: {
    backgroundColor: "#1E293B", // Card background
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  questionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  questionNumber: {
    backgroundColor: "#334155", // Surface color
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 16,
  },
  questionNumberText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#F8FAFC", // Light text
    letterSpacing: 0.3,
  },
  questionStatus: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  questionScore: {
    backgroundColor: "#334155", // Surface color
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#F8FAFC", // Light text
    letterSpacing: 0.3,
  },
  questionTextContainer: {
    marginBottom: 16,
  },
  questionText: {
    fontSize: 18,
    color: "#F8FAFC", // Light text
    lineHeight: 26,
    fontWeight: "500",
  },
  answersContainer: {
    borderTopWidth: 1,
    borderTopColor: "#334155",
    paddingTop: 16,
  },
  answersTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#CBD5E1", // Light muted text
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  answersList: {
    marginBottom: 16,
  },
  answerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  answerText: {
    fontSize: 16,
    color: "#F8FAFC", // Light text
    marginLeft: 12,
    fontWeight: "500",
  },
  noAnswerText: {
    fontSize: 16,
    color: "#64748B", // Very muted text
    fontStyle: "italic",
    marginBottom: 16,
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    color: "#CBD5E1", // Light muted text
    marginTop: 16,
    textAlign: "center",
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#CBD5E1", // Light muted text
    textAlign: "center",
    fontWeight: "500",
  },
});

export default QuizDetailScreen;
