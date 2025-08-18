import { StyleSheet, Dimensions } from "react-native";
import { GlobalColors, Typography, Spacing, BorderRadius } from "./GlobalColors";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2; // 16 padding, 8*2 margin

export const styles = StyleSheet.create({
  // HomeScreen styles
  container: {
    flex: 1,
    backgroundColor: GlobalColors.background,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalColors.background,
  },
  loadingText: {
    marginTop: Spacing.md,
    fontSize: Typography.fontSize.base,
    color: GlobalColors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
  errorText: {
    marginTop: Spacing.md,
    fontSize: Typography.fontSize.base,
    color: GlobalColors.error,
    fontWeight: Typography.fontWeight.medium,
  },

  // HeroSection styles
  hero: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.xl,
    backgroundColor: GlobalColors.surface,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    borderRadius: BorderRadius["2xl"],
    shadowColor: GlobalColors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  heroTitle: {
    fontSize: Typography.fontSize["3xl"],
    fontWeight: Typography.fontWeight.extrabold,
    color: GlobalColors.primary,
    marginBottom: Spacing.sm,
    letterSpacing: Typography.letterSpacing.wide,
  },
  heroDesc: {
    color: GlobalColors.textSecondary,
    marginBottom: Spacing.lg,
    fontSize: Typography.fontSize.base,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
  },
  heroButton: {
    backgroundColor: GlobalColors.primary,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.xl,
    alignSelf: "flex-start",
    shadowColor: GlobalColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  heroButtonText: {
    color: GlobalColors.textLight,
    fontWeight: Typography.fontWeight.bold,
    fontSize: Typography.fontSize.base,
    letterSpacing: Typography.letterSpacing.wide,
  },
  heroImage: {
    width: 120,
    height: 120,
    marginLeft: Spacing.md,
    resizeMode: "contain"
  },

  // CourseGrid styles
  courseGridContainer: {
    paddingHorizontal: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSize["2xl"],
    fontWeight: Typography.fontWeight.bold,
    color: GlobalColors.textPrimary,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    letterSpacing: Typography.letterSpacing.wide,
  },
  courseCard: {
    backgroundColor: GlobalColors.surface,
    borderRadius: BorderRadius.xl,
    width: cardWidth,
    margin: Spacing.sm,
    borderWidth: 1,
    borderColor: GlobalColors.border,
    shadowColor: GlobalColors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  courseImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
  },
  courseDetails: {
    padding: Spacing.lg,
  },
  courseTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: GlobalColors.textPrimary,
    marginBottom: Spacing.sm,
    height: 44, // Limit to 2 lines
    lineHeight: Typography.lineHeight.normal * Typography.fontSize.base,
  },
  instructorInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  instructorAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: GlobalColors.border,
  },
  instructorName: {
    fontSize: Typography.fontSize.sm,
    color: GlobalColors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
  courseFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: Spacing.xs,
    fontSize: Typography.fontSize.sm,
    color: GlobalColors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
  priceText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: GlobalColors.primary,
    letterSpacing: Typography.letterSpacing.wide,
  },
});
