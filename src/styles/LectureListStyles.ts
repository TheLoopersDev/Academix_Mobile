import { StyleSheet, Dimensions } from "react-native";
import { GlobalColors, Typography, Spacing, BorderRadius } from "./GlobalColors";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2; // 16 padding, 8*2 margin

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.background,
  },
  listContent: {
    padding: Spacing.sm,
  },
  instructorCard: {
    backgroundColor: GlobalColors.surface,
    borderRadius: BorderRadius["2xl"],
    width: cardWidth,
    margin: Spacing.sm,
    padding: Spacing.lg,
    alignItems: "center",
    elevation: 4,
    shadowColor: GlobalColors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    borderWidth: 1,
    borderColor: GlobalColors.border,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: Spacing.md,
    borderWidth: 2,
    borderColor: GlobalColors.borderLight,
  },
  name: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: GlobalColors.textPrimary,
    marginBottom: Spacing.xs,
    letterSpacing: Typography.letterSpacing.wide,
  },
  title: {
    fontSize: Typography.fontSize.xs,
    color: GlobalColors.textSecondary,
    marginBottom: Spacing.md,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  statText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  statLabel: {
    fontSize: 12,
    color: "gray",
    marginLeft: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    flex: 1,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#3858F8",
  },
  secondaryButton: {
    backgroundColor: "#F0F0F0",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "500",
  },
  primaryButtonText: {
    color: "#fff",
  },
  secondaryButtonText: {
    color: "#333",
  },
});
