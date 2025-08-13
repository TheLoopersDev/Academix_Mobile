import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "../../styles/DoQuizStyle";

// quiz: Import API service
import { getAllQuestionsApi } from "../../services/api";

// ===== Types (align with your web types) =====
export type AnswerOptionData = { id: string; text: string };
export type QuestionData = {
  id?: string;
  _id?: string;
  questionId?: string;
  questionNumber: number;
  title: string;
  questionImage?: string;
  points?: number | string;
  options: AnswerOptionData[];
  choicesConfig: { isMultipleAnswer: boolean };
  correctAnswerIds?: string[]; // optional – for local result calc if needed
};

// ===== Constants =====
const TOTAL_TIME_MINUTES = 30; // 30 minutes

// ===== Helpers =====
const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const getQId = (q: QuestionData | any, idx: number) =>
  String(q?.id ?? q?._id ?? q?.questionId ?? idx);

// ===== Progress Bar =====
const ProgressBar: React.FC<{ progress: number; style?: any }> = ({
  progress,
  style,
}) => {
  return (
    <View style={[styles.progressOuter, style]}>
      <View
        style={[
          styles.progressInner,
          { width: `${Math.min(100, Math.max(0, progress))}%` },
        ]}
      />
    </View>
  );
};

// ===== Option Item =====
const OptionItem: React.FC<{
  option: AnswerOptionData;
  isSelected: boolean;
  onPress: (optionId: string) => void;
  isMultiple: boolean;
}> = ({ option, isSelected, onPress, isMultiple }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress(option.id)}
      style={styles.optionWrap}
    >
      {isSelected && <View style={styles.optionSelectedBar} />}

      <View style={styles.optionContent}>
        <Text
          style={[
            styles.optionText,
            isSelected ? styles.optionTextSelected : styles.optionTextIdle,
          ]}
        >
          {option.text}
        </Text>
        {isMultiple ? (
          <View
            style={[
              styles.checkboxBox,
              isSelected ? styles.checkboxBoxSelected : styles.checkboxBoxIdle,
            ]}
          >
            {isSelected && <View style={styles.checkboxTick} />}
          </View>
        ) : (
          <View
            style={[
              styles.radioOuter,
              isSelected ? styles.radioOuterSelected : styles.radioOuterIdle,
            ]}
          >
            {isSelected && <View style={styles.radioInner} />}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

// ===== Question List Grid (toggleable) =====
const QuestionGrid: React.FC<{
  total: number;
  currentIndex: number;
  completed: Set<number>;
  onSelect: (idx: number) => void;
}> = ({ total, currentIndex, completed, onSelect }) => {
  const data = useMemo(
    () => Array.from({ length: total }).map((_, i) => i),
    [total]
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(i) => `q-${i}`}
      numColumns={5}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      contentContainerStyle={{ paddingHorizontal: 4 }}
      renderItem={({ item: i }) => {
        const isCurrent = i === currentIndex;
        const isDone = completed.has(i);
        const variantStyle = isCurrent
          ? styles.qItemCurrent
          : isDone
          ? styles.qItemDone
          : styles.qItemIdle;

        return (
          <TouchableOpacity
            onPress={() => onSelect(i)}
            style={[styles.qItem, variantStyle]}
            activeOpacity={0.9}
          >
            <Text
              style={[
                styles.qItemText,
                isCurrent || isDone ? styles.qItemTextOn : styles.qItemTextOff,
              ]}
            >
              {i + 1}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

// ===== Navigation Types & useRoute typing =====
type DoQuizParams = { quizId: string; questions?: QuestionData[] };
type DoQuizRoute = { key: string; name: string; params?: DoQuizParams };

// ===== Main Screen =====
const DoQuizScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute() as unknown as DoQuizRoute;

  const { quizId } = route?.params || {};

  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Map<number, Set<string>>>(new Map());
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_TIME_MINUTES * 60);
  const [showGrid, setShowGrid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = useMemo(
    () => questions[currentIdx],
    [questions, currentIdx]
  );
  const isMultiple = !!currentQuestion?.choicesConfig?.isMultipleAnswer;

  const progress = useMemo(() => {
    const attempted = Array.from(answers.values()).filter(
      (s) => s.size > 0
    ).length;
    return questions.length
      ? Math.round((attempted / questions.length) * 100)
      : 0;
  }, [answers, questions.length]);

  useEffect(() => {
    if (!quizId) {
      setError("Không tìm thấy ID bài kiểm tra.");
      setLoading(false);
      return;
    }

    const fetchQuizQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        // Thay thế bằng API call thực tế của bạn
        const res: any = await getAllQuestionsApi(quizId);
        if (res.data.success) {
          // Xử lý dữ liệu trả về để phù hợp với kiểu QuestionData
          const formattedQuestions: QuestionData[] = res.data.questions.map(
            (q: any, index: number) => ({
              ...q,
              questionNumber: index + 1,
              // Đảm bảo các trường khác (title, options, choicesConfig) khớp với API response
            })
          );
          setQuestions(formattedQuestions);
        } else {
          setError(res.data.message || "Không thể tải câu hỏi.");
        }
      } catch (e) {
        console.error("Lỗi khi tải câu hỏi:", e);
        setError("Đã xảy ra lỗi khi tải câu hỏi.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuizQuestions();
  }, [quizId]);

  type IntervalId = ReturnType<typeof setInterval>;
  const timerRef = useRef<IntervalId | null>(null);
  useEffect(() => {
    if (questions.length === 0) return;

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  const formatTime = (total: number) => {
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${pad(m)}:${pad(s)}`;
  };

  const toggleSelect = useCallback(
    (optionId: string) => {
      setAnswers((prev) => {
        const clone = new Map(prev);
        const selected = new Set(clone.get(currentIdx) ?? []);
        if (isMultiple) {
          selected.has(optionId)
            ? selected.delete(optionId)
            : selected.add(optionId);
        } else {
          selected.clear();
          selected.add(optionId);
        }
        clone.set(currentIdx, selected);
        return clone;
      });
    },
    [currentIdx, isMultiple]
  );

  const completedSet = useMemo(() => {
    return new Set(
      Array.from(answers.entries())
        .filter(([, s]) => s.size > 0)
        .map(([i]) => i)
    );
  }, [answers]);

  const goPrev = () => setCurrentIdx((i) => Math.max(0, i - 1));
  const goNext = () =>
    setCurrentIdx((i) => Math.min(questions.length - 1, i + 1));

  const handleSubmit = (isTimeOut = false) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const payload = questions.map((q, idx) => ({
      questionId: getQId(q, idx),
      selectedOptionIds: Array.from(answers.get(idx) ?? []),
    }));

    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        "Quiz submitted",
        isTimeOut ? "Submitted due to time out." : "Submitted successfully."
      );
      void payload;
    }, 700);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Đang tải câu hỏi...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>{error}</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Bài kiểm tra không có câu hỏi.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      {/* Header */}
      <View style={styles.headerWrap}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backIcon}>{"‹"}</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Assignment</Text>
          <ProgressBar progress={progress} style={{ marginTop: 6 }} />
        </View>

        <View style={styles.timerPill}>
          <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
        </View>
      </View>

      {/* Question list toggle và Next button */}
      <View style={styles.topActionsRow}>
        <TouchableOpacity
          onPress={() => setShowGrid((v) => !v)}
          activeOpacity={0.9}
          style={styles.qListPill}
        >
          <Text style={styles.qListPillText}>Question list</Text>
        </TouchableOpacity>

        <View style={styles.navButtonsContainer}>
          {/* Previous Button */}
          <TouchableOpacity
            onPress={goPrev}
            activeOpacity={0.9}
            disabled={currentIdx === 0 || isSubmitting}
            style={[
              styles.qNavPill, // Base style for the button
              (currentIdx === 0 || isSubmitting) && styles.qNavPillDisabled,
              { marginRight: 8 }, // Add a small margin to separate the buttons
            ]}
          >
            <Text style={styles.qNavPillText}>Previous</Text>
          </TouchableOpacity>

          {/* Next Button */}
          <TouchableOpacity
            onPress={goNext}
            activeOpacity={0.9}
            disabled={currentIdx === questions.length - 1 || isSubmitting}
            style={[
              styles.qNavPill,
              (currentIdx === questions.length - 1 || isSubmitting) &&
                styles.qNavPillDisabled,
            ]}
          >
            <Text style={styles.qNavPillText}>Next </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Collapsible grid */}
      {showGrid && (
        <View style={styles.card}>
          <QuestionGrid
            total={questions.length}
            currentIndex={currentIdx}
            completed={completedSet}
            onSelect={(i) => {
              setCurrentIdx(i);
              setShowGrid(false);
            }}
          />
        </View>
      )}

      {/* Question card */}
      <View style={[styles.card, { flex: 1 }]}>
        {currentQuestion && (
          <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
            <Text style={styles.qNumber}>
              Question {currentQuestion.questionNumber}
            </Text>
            <Text style={styles.qTitle}>{currentQuestion.title}</Text>

            {!!currentQuestion.questionImage && (
              <Image
                source={{ uri: currentQuestion.questionImage }}
                style={styles.qImage}
                resizeMode="cover"
              />
            )}

            <View style={{ marginTop: 12 }}>
              {currentQuestion.options.map((opt) => (
                <OptionItem
                  key={opt.id}
                  option={opt}
                  isSelected={!!answers.get(currentIdx)?.has(opt.id)}
                  onPress={toggleSelect}
                  isMultiple={isMultiple}
                />
              ))}
            </View>
          </ScrollView>
        )}
      </View>

      {/* Bottom actions */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={goPrev}
          activeOpacity={0.9}
          disabled={currentIdx === 0 || isSubmitting}
          style={[
            styles.navBtn,
            styles.navBtnGhost,
            (currentIdx === 0 || isSubmitting) && styles.navBtnDisabled,
          ]}
        >
          <Text style={[styles.navBtnGhostText]}>Previous</Text>
        </TouchableOpacity>

        {/* Nút "Next" ở dưới đã bị xóa để tránh trùng lặp */}
      </View>

      <View style={[styles.bottomBar, { paddingTop: 0 }]}>
        <TouchableOpacity
          onPress={() => handleSubmit(false)}
          activeOpacity={0.9}
          disabled={isSubmitting}
          style={[styles.submitBtn, isSubmitting && styles.submitBtnDisabled]}
        >
          <Text style={styles.submitText}>
            {isSubmitting ? "Submitting…" : "Submit"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DoQuizScreen;

// src/screens/watch-course/DoQuizScreen.tsx
// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
//   FlatList,
//   ScrollView,
//   Image,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import styles from "../../styles/DoQuizStyle";

// // ===== Imports Redux & Types =====
// import {
//   useGetQuizByIdQuery,
//   useSubmitQuizMutation,
//   SubmitQuizPayload,
// } from "../../redux/features/quiz/quizApi";

// // ===== Types (align with your web types) =====
// export type AnswerOptionData = { id: string; text: string };
// export type QuestionData = {
//   id?: string;
//   _id?: string;
//   questionId?: string;
//   questionNumber: number;
//   title: string;
//   questionImage?: string;
//   points?: number | string;
//   options: AnswerOptionData[];
//   choicesConfig: { isMultipleAnswer: boolean };
//   correctAnswerIds?: string[]; // optional – for local result calc if needed
// };

// // ===== Constants =====
// const TOTAL_TIME_MINUTES = 30; // 30 minutes

// // ===== Helpers =====
// const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
// const getQId = (q: QuestionData | any, idx: number) =>
//   String(q?.id ?? q?._id ?? q?.questionId ?? idx);

// // ===== Progress Bar =====
// const ProgressBar: React.FC<{ progress: number; style?: any }> = ({
//   progress,
//   style,
// }) => {
//   return (
//     <View style={[styles.progressOuter, style]}>
//       <View
//         style={[
//           styles.progressInner,
//           { width: `${Math.min(100, Math.max(0, progress))}%` },
//         ]}
//       />
//     </View>
//   );
// };

// // ===== Option Item =====
// const OptionItem: React.FC<{
//   option: AnswerOptionData;
//   isSelected: boolean;
//   onPress: (optionId: string) => void;
//   isMultiple: boolean;
// }> = ({ option, isSelected, onPress, isMultiple }) => {
//   return (
//     <TouchableOpacity
//       activeOpacity={0.9}
//       onPress={() => onPress(option.id)}
//       style={styles.optionWrap}
//     >
//       {isSelected && <View style={styles.optionSelectedBar} />}
//       <View style={styles.optionContent}>
//         <Text
//           style={[
//             styles.optionText,
//             isSelected ? styles.optionTextSelected : styles.optionTextIdle,
//           ]}
//         >
//           {option.text}
//         </Text>
//         {isMultiple ? (
//           <View
//             style={[
//               styles.checkboxBox,
//               isSelected ? styles.checkboxBoxSelected : styles.checkboxBoxIdle,
//             ]}
//           >
//             {isSelected && <View style={styles.checkboxTick} />}
//           </View>
//         ) : (
//           <View
//             style={[
//               styles.radioOuter,
//               isSelected ? styles.radioOuterSelected : styles.radioOuterIdle,
//             ]}
//           >
//             {isSelected && <View style={styles.radioInner} />}
//           </View>
//         )}
//       </View>
//     </TouchableOpacity>
//   );
// };

// // ===== Question List Grid (toggleable) =====
// const QuestionGrid: React.FC<{
//   total: number;
//   currentIndex: number;
//   completed: Set<number>;
//   onSelect: (idx: number) => void;
// }> = ({ total, currentIndex, completed, onSelect }) => {
//   const data = useMemo(
//     () => Array.from({ length: total }).map((_, i) => i),
//     [total]
//   );
//   return (
//     <FlatList
//       data={data}
//       keyExtractor={(i) => `q-${i}`}
//       numColumns={5}
//       columnWrapperStyle={{ justifyContent: "space-between" }}
//       contentContainerStyle={{ paddingHorizontal: 4 }}
//       renderItem={({ item: i }) => {
//         const isCurrent = i === currentIndex;
//         const isDone = completed.has(i);
//         const variantStyle = isCurrent
//           ? styles.qItemCurrent
//           : isDone
//           ? styles.qItemDone
//           : styles.qItemIdle;

//         return (
//           <TouchableOpacity
//             onPress={() => onSelect(i)}
//             style={[styles.qItem, variantStyle]}
//             activeOpacity={0.9}
//           >
//             <Text
//               style={[
//                 styles.qItemText,
//                 isCurrent || isDone ? styles.qItemTextOn : styles.qItemTextOff,
//               ]}
//             >
//               {i + 1}
//             </Text>
//           </TouchableOpacity>
//         );
//       }}
//     />
//   );
// };

// // ===== Navigation Types & useRoute typing =====
// type DoQuizParams = { quizId: string; questions?: QuestionData[] };
// type DoQuizRoute = { key: string; name: string; params?: DoQuizParams };

// // ===== Main Screen =====
// const DoQuizScreen: React.FC = () => {
//   const navigation = useNavigation();
//   const route = useRoute() as unknown as DoQuizRoute;
//   const { quizId } = route?.params || {};
//   console.log("DoQuizScreen received quizId:", quizId);

//   // Redux hooks for fetching and submitting
//   const {
//     data: quizData,
//     isLoading: isFetchingQuestions,
//     error: fetchError,
//   } = useGetQuizByIdQuery(quizId || "", { skip: !quizId });
//   console.log("dât", quizData);

//   const [submitQuiz, { isLoading: isSubmitting }] = useSubmitQuizMutation();

//   const questions: QuestionData[] = useMemo(() => {
//     if (quizData?.quiz?.questions) {
//       return quizData.quiz.questions.map((q: any, index: number) => ({
//         ...q,
//         questionNumber: index + 1,
//       }));
//     }
//     return [];
//   }, [quizData]);

//   const [currentIdx, setCurrentIdx] = useState(0);
//   const [answers, setAnswers] = useState<Map<number, Set<string>>>(new Map());
//   const [secondsLeft, setSecondsLeft] = useState(TOTAL_TIME_MINUTES * 60);
//   const [showGrid, setShowGrid] = useState(false);

//   const currentQuestion = useMemo(
//     () => questions[currentIdx],
//     [questions, currentIdx]
//   );
//   const isMultiple = !!currentQuestion?.choicesConfig?.isMultipleAnswer;

//   const progress = useMemo(() => {
//     const attempted = Array.from(answers.values()).filter(
//       (s) => s.size > 0
//     ).length;
//     return questions.length
//       ? Math.round((attempted / questions.length) * 100)
//       : 0;
//   }, [answers, questions.length]);

//   // Handle Timer
//   type IntervalId = ReturnType<typeof setInterval>;
//   const timerRef = useRef<IntervalId | null>(null);
//   useEffect(() => {
//     if (questions.length === 0) return;

//     if (timerRef.current) clearInterval(timerRef.current);
//     timerRef.current = setInterval(() => {
//       setSecondsLeft((prev) => {
//         if (prev <= 1) {
//           if (timerRef.current !== null) {
//             clearInterval(timerRef.current);
//             timerRef.current = null;
//           }
//           handleSubmit(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => {
//       if (timerRef.current !== null) {
//         clearInterval(timerRef.current);
//         timerRef.current = null;
//       }
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [questions, quizId]);

//   const formatTime = (total: number) => {
//     const m = Math.floor(total / 60);
//     const s = total % 60;
//     return `${pad(m)}:${pad(s)}`;
//   };

//   const toggleSelect = useCallback(
//     (optionId: string) => {
//       setAnswers((prev) => {
//         const clone = new Map(prev);
//         const selected = new Set(clone.get(currentIdx) ?? []);
//         if (isMultiple) {
//           selected.has(optionId)
//             ? selected.delete(optionId)
//             : selected.add(optionId);
//         } else {
//           selected.clear();
//           selected.add(optionId);
//         }
//         clone.set(currentIdx, selected);
//         return clone;
//       });
//     },
//     [currentIdx, isMultiple]
//   );

//   const completedSet = useMemo(() => {
//     return new Set(
//       Array.from(answers.entries())
//         .filter(([, s]) => s.size > 0)
//         .map(([i]) => i)
//     );
//   }, [answers]);

//   const goPrev = () => setCurrentIdx((i) => Math.max(0, i - 1));
//   const goNext = () =>
//     setCurrentIdx((i) => Math.min(questions.length - 1, i + 1));

//   const handleSubmit = async (isTimeOut = false) => {
//     if (isSubmitting) return;

//     if (timerRef.current !== null) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//     }

//     // Fix 2: Thêm kiểm tra quizId trước khi gọi API
//     if (!quizId) {
//       Alert.alert("Lỗi", "Không tìm thấy ID bài kiểm tra.");
//       return;
//     }

//     const payload: SubmitQuizPayload = {
//       answers: questions.map((q, idx) => ({
//         questionId: getQId(q, idx),
//         selectedOptionIds: Array.from(answers.get(idx) ?? []),
//       })),
//       timeTakenSeconds: TOTAL_TIME_MINUTES * 60 - secondsLeft,
//       meta: {
//         submissionType: isTimeOut ? "time-out" : "manual",
//       },
//     };

//     try {
//       const result = await submitQuiz({ id: quizId, payload }).unwrap();
//       if (result?.score !== undefined && result?.isPassed !== undefined) {
//         Alert.alert(
//           "Kết quả bài kiểm tra",
//           `Bạn đã đạt được ${result.score} điểm! ` +
//             (result.isPassed
//               ? "Chúc mừng bạn đã vượt qua!"
//               : "Bạn chưa vượt qua. Hãy thử lại!"),
//           [
//             {
//               text: "OK",
//               onPress: () => {
//                 navigation.goBack();
//               },
//             },
//           ]
//         );
//       } else {
//         Alert.alert("Hoàn thành", "Bài kiểm tra đã được nộp thành công.");
//       }
//     } catch (apiError) {
//       console.error("Lỗi khi gửi bài kiểm tra:", apiError);
//       Alert.alert(
//         "Lỗi",
//         "Đã xảy ra lỗi khi gửi bài kiểm tra. Vui lòng thử lại."
//       );
//     }
//   };

//   if (isFetchingQuestions) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#2563eb" />
//         <Text style={styles.loadingText}>Đang tải câu hỏi...</Text>
//       </View>
//     );
//   }

//   if (fetchError) {
//     let errorMsg = "Đã xảy ra lỗi khi tải câu hỏi.";
//     if ("status" in fetchError) {
//       const apiError = fetchError as { data?: { message?: string } };
//       errorMsg = apiError.data?.message || errorMsg;
//     }
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={styles.loadingText}>{errorMsg}</Text>
//       </View>
//     );
//   }

//   if (questions.length === 0) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={styles.loadingText}>Bài kiểm tra không có câu hỏi.</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.screen}>
//       {/* Header */}
//       <View style={styles.headerWrap}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backBtn}
//         >
//           <Text style={styles.backIcon}>{"‹"}</Text>
//         </TouchableOpacity>
//         <View style={styles.headerCenter}>
//           <Text style={styles.headerTitle}>Assignment</Text>
//           <ProgressBar progress={progress} style={{ marginTop: 6 }} />
//         </View>
//         <View style={styles.timerPill}>
//           <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
//         </View>
//       </View>

//       {/* Question list toggle và Next button */}
//       <View style={styles.topActionsRow}>
//         <TouchableOpacity
//           onPress={() => setShowGrid((v) => !v)}
//           activeOpacity={0.9}
//           style={styles.qListPill}
//         >
//           <Text style={styles.qListPillText}>Question list</Text>
//         </TouchableOpacity>
//         <View style={styles.navButtonsContainer}>
//           <TouchableOpacity
//             onPress={goPrev}
//             activeOpacity={0.9}
//             disabled={currentIdx === 0 || isSubmitting}
//             style={[
//               styles.qNavPill,
//               (currentIdx === 0 || isSubmitting) && styles.qNavPillDisabled,
//               { marginRight: 8 },
//             ]}
//           >
//             <Text style={styles.qNavPillText}>Previous</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={goNext}
//             activeOpacity={0.9}
//             disabled={currentIdx === questions.length - 1 || isSubmitting}
//             style={[
//               styles.qNavPill,
//               (currentIdx === questions.length - 1 || isSubmitting) &&
//                 styles.qNavPillDisabled,
//             ]}
//           >
//             <Text style={styles.qNavPillText}>Next </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Collapsible grid */}
//       {showGrid && (
//         <View style={styles.card}>
//           <QuestionGrid
//             total={questions.length}
//             currentIndex={currentIdx}
//             completed={completedSet}
//             onSelect={(i) => {
//               setCurrentIdx(i);
//               setShowGrid(false);
//             }}
//           />
//         </View>
//       )}

//       {/* Question card */}
//       <View style={[styles.card, { flex: 1 }]}>
//         {currentQuestion && (
//           <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
//             <Text style={styles.qNumber}>
//               Question {currentQuestion.questionNumber}
//             </Text>
//             <Text style={styles.qTitle}>{currentQuestion.title}</Text>
//             {!!currentQuestion.questionImage && (
//               <Image
//                 source={{ uri: currentQuestion.questionImage }}
//                 style={styles.qImage}
//                 resizeMode="cover"
//               />
//             )}
//             <View style={{ marginTop: 12 }}>
//               {currentQuestion.options.map((opt) => (
//                 <OptionItem
//                   key={opt.id}
//                   option={opt}
//                   isSelected={!!answers.get(currentIdx)?.has(opt.id)}
//                   onPress={toggleSelect}
//                   isMultiple={isMultiple}
//                 />
//               ))}
//             </View>
//           </ScrollView>
//         )}
//       </View>

//       {/* Bottom actions */}
//       <View style={[styles.bottomBar, { paddingTop: 0 }]}>
//         <TouchableOpacity
//           onPress={() => handleSubmit(false)}
//           activeOpacity={0.9}
//           disabled={isSubmitting}
//           style={[styles.submitBtn, isSubmitting && styles.submitBtnDisabled]}
//         >
//           <Text style={styles.submitText}>
//             {isSubmitting ? "Submitting…" : "Submit"}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default DoQuizScreen;
