import { StyleSheet, Dimensions, StatusBar } from "react-native";
import { GlobalColors, Typography, Spacing, BorderRadius } from "./GlobalColors";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.background,
  },
  headerContainer: {
    backgroundColor: GlobalColors.primary,
    paddingTop: StatusBar.currentHeight || 40,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
    borderBottomLeftRadius: BorderRadius["3xl"],
    borderBottomRightRadius: BorderRadius["3xl"],
    overflow: "hidden",
    position: "relative",
  },
  videoPlaceholder: {
    width: "100%",
    height: width * 0.5,
    backgroundColor: GlobalColors.textSecondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.xl,
  },
  videoPlaceholderText: {
    color: GlobalColors.textLight,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    textAlign: "center",
  },
  headerContent: {
    paddingTop: Spacing.md,
  },
  headerSubtitle: {
    color: GlobalColors.textLight,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    opacity: 0.8,
    marginBottom: Spacing.xs,
  },
  headerTitle: {
    color: GlobalColors.textLight,
    fontSize: Typography.fontSize["3xl"],
    fontWeight: Typography.fontWeight.extrabold,
    lineHeight: Typography.lineHeight.tight * Typography.fontSize["3xl"],
    marginBottom: Spacing.md,
    letterSpacing: Typography.letterSpacing.wide,
  },
  headerTagline: {
    color: GlobalColors.textLight,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
  },
  scrollViewContent: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    marginTop: -Spacing.xl,
  },
  tabNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: GlobalColors.surface,
    borderRadius: BorderRadius.xl,
    shadowColor: GlobalColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    padding: Spacing.xs,
    marginBottom: Spacing.xl,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    flexDirection: "row",
    marginHorizontal: 2,
  },
  tabButtonActive: {
    backgroundColor: "#e0f2fe", // light blue
    borderBottomWidth: 2,
    borderColor: "#2563eb",
  },
  tabText: {
    color: "#6b7280", // gray
    fontSize: 13,
    fontWeight: "500",
    marginLeft: 5,
  },
  tabTextActive: {
    color: "#2563eb", // dark blue
  },
  lessonList: {
    marginBottom: 20,
  },
  lessonCard: {
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    padding: 20,
    marginBottom: 15,
  },
  lessonCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  lessonInfo: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  iconMargin: {
    marginRight: 10,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151", // gray-800
    flexShrink: 1,
  },
  lessonDetails: {
    fontSize: 13,
    color: "#6b7280", // gray-500
    marginTop: 5,
    marginLeft: 30, // Align with title
  },
  bullet: {
    marginHorizontal: 5,
  },
  progressCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  progressCircle0: {
    backgroundColor: "#9ca3af", // gray for 0%
  },
  progressCircleInProgress: {
    backgroundColor: "#4CAF50", // Green for in-progress
  },
  progressCircleCompleted: {
    backgroundColor: "#2563eb", // Blue for completed (though checkmark is used)
  },
  progressText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
  },
  subLessonsContainer: {
    marginLeft: 30, // Indent sub-lessons
    borderLeftWidth: 2,
    borderColor: "#e5e7eb", // gray-200
    paddingLeft: 15,
    paddingVertical: 10,
    marginTop: 10,
  },
  subLessonItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 5, // Thêm padding để dễ bấm hơn
  },
  activeLessonItem: {
    // Style cho bài học đang được chọn
    backgroundColor: "#f0f8ff", // Màu nền nhẹ khi chọn
    borderRadius: 8,
  },
  subLessonLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  subLessonNumber: {
    fontSize: 13,
    color: "#6b7280",
    marginRight: 10,
  },
  subLessonIcon: {
    // Style cho icon hoàn thành trong sub-lesson
    marginRight: 10,
  },
  subLessonTitle: {
    fontSize: 14,
    color: "#374151",
    flexShrink: 1,
  },
  subLessonRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  documentTag: {
    backgroundColor: "#dbeafe", // blue-100
    borderRadius: 9999, // full rounded
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 10,
  },
  documentTagText: {
    color: "#2563eb", // blue-600
    fontSize: 10,
    fontWeight: "600",
  },
  videoTag: {
    // Style cho tag Video
    backgroundColor: "#ffe0b2", // Orange-ish
    borderRadius: 9999,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 10,
  },
  videoTagText: {
    // Style cho text trong tag Video
    color: "#ef6c00", // Darker orange
    fontSize: 10,
    fontWeight: "600",
  },
  subLessonDuration: {
    fontSize: 13,
    color: "#6b7280",
  },
  quizSectionPlaceholder: {
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200, // Minimum height for placeholder
  },
  quizSectionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
  },
  otherTabPlaceholder: {
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 150,
  },
  otherTabText: {
    fontSize: 16,
    color: "#6b7280",
  },
  // Thêm các style cho trạng thái tải
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#374151",
  },
  videoPlayer: {
    width: "100%",
    height: "100%", // Hoặc một chiều cao cố định nếu bạn muốn
  },

  lockedLessonItem: {
    backgroundColor: "#f3f4f6", // Light gray background for locked items
    opacity: 0.7,
  },
  lockedText: {
    color: "#9ca3af", // Gray text for locked items
    fontStyle: "italic",
  },
});

export default styles;
