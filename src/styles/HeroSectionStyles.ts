import { StyleSheet } from "react-native";
import { GlobalColors, Typography, Spacing, BorderRadius } from "./GlobalColors";

export const styles = StyleSheet.create({
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
});
