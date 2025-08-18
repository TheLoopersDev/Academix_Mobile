import { StyleSheet } from "react-native";
import { GlobalColors, Typography, Spacing, BorderRadius } from "./GlobalColors";

export const styles = StyleSheet.create({
  categories: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg
  },
  categoryButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
    backgroundColor: GlobalColors.borderLight,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: GlobalColors.border,
  },
  categoryButtonActive: {
    backgroundColor: GlobalColors.primary,
    borderColor: GlobalColors.primary,
  },
  categoryText: {
    color: GlobalColors.textSecondary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
  },
  categoryTextActive: {
    color: GlobalColors.textLight,
    fontWeight: Typography.fontWeight.semibold,
  },
});
