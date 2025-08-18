// styles/auth/DoQuizStyle.ts
import { StyleSheet } from "react-native";
import { GlobalColors, Typography, Spacing, BorderRadius } from "./GlobalColors";

// Warm Academic Theme Colors
export const PRIMARY = GlobalColors.primary; // Coral red
export const SECONDARY = GlobalColors.secondary; // Mint green
export const BG = GlobalColors.background; // Light background
export const CARD_BG = GlobalColors.card; // White card background
export const SURFACE = GlobalColors.warmBeige; // Warm beige surface
export const TEXT_PRIMARY = GlobalColors.textPrimary; // Dark text
export const TEXT_SECONDARY = GlobalColors.textSecondary; // Medium text
export const TEXT_MUTED = GlobalColors.textMuted; // Light text
export const ACCENT = GlobalColors.accent; // Warm orange accent
export const WARNING = GlobalColors.warning; // Orange warning
export const ERROR = GlobalColors.error; // Red error
export const TRACK = GlobalColors.borderLight; // Light progress track

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BG,
  },
  qNavPill: {
    backgroundColor: SURFACE,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: GlobalColors.border,
    shadowColor: GlobalColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  qNavPillText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: TEXT_PRIMARY,
    letterSpacing: Typography.letterSpacing.wide,
  },
  qNavPillDisabled: {
    opacity: 0.5,
  },
  topActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: BG,
  },
  navButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerWrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
    backgroundColor: GlobalColors.surface,
    borderBottomWidth: 1,
    borderBottomColor: GlobalColors.borderLight,
    shadowColor: GlobalColors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.xl,
    backgroundColor: GlobalColors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: GlobalColors.border,
    shadowColor: GlobalColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  backIcon: {
    fontSize: 24,
    color: PRIMARY,
    lineHeight: 24
  },
  headerCenter: { flex: 1, marginHorizontal: Spacing.md },
  headerTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: TEXT_PRIMARY,
    letterSpacing: Typography.letterSpacing.wide,
  },

  timerPill: {
    paddingHorizontal: Spacing.lg,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: GlobalColors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: GlobalColors.border,
    shadowColor: GlobalColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  timerText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: PRIMARY,
    letterSpacing: Typography.letterSpacing.wide,
  },

  topActions: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    backgroundColor: BG,
  },
  qListPill: {
    alignSelf: "flex-start",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: GlobalColors.surface,
    borderWidth: 1,
    borderColor: GlobalColors.border,
    shadowColor: GlobalColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  qListPillText: {
    color: PRIMARY,
    fontWeight: Typography.fontWeight.bold,
    fontSize: Typography.fontSize.base,
    letterSpacing: Typography.letterSpacing.wide,
  },

  card: {
    marginTop: Spacing.lg,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius["2xl"],
    backgroundColor: GlobalColors.surface,
    padding: Spacing["2xl"],
    borderWidth: 1,
    borderColor: GlobalColors.border,
    shadowColor: GlobalColors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  qNumber: {
    fontSize: Typography.fontSize["2xl"],
    fontWeight: Typography.fontWeight.extrabold,
    color: PRIMARY,
    letterSpacing: Typography.letterSpacing.wide,
  },
  qTitle: {
    marginTop: Spacing.md,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: TEXT_PRIMARY,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.lg,
    letterSpacing: Typography.letterSpacing.normal,
  },
  qImage: {
    marginTop: Spacing.lg,
    width: "100%",
    height: 220,
    borderRadius: BorderRadius.xl,
    backgroundColor: GlobalColors.lightBeige,
    borderWidth: 1,
    borderColor: GlobalColors.border,
  },

  optionWrap: {
    position: "relative",
    width: "100%",
    backgroundColor: GlobalColors.surface,
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: GlobalColors.border,
    shadowColor: GlobalColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  optionSelectedBar: {
    position: "absolute",
    left: Spacing.sm,
    top: Spacing.sm,
    bottom: Spacing.sm,
    width: 4,
    borderRadius: BorderRadius.sm,
    backgroundColor: PRIMARY,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },

  optionText: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    marginRight: Spacing.md,
    lineHeight: Typography.lineHeight.normal * Typography.fontSize.base,
  },
  optionTextIdle: { color: TEXT_SECONDARY },
  optionTextSelected: {
    color: TEXT_PRIMARY,
    fontWeight: Typography.fontWeight.semibold
  },

  radioOuter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: { borderColor: PRIMARY },
  radioOuterIdle: { borderColor: GlobalColors.border },
  radioInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: PRIMARY,
  },

  checkboxBox: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxBoxSelected: {
    borderColor: PRIMARY,
    backgroundColor: PRIMARY
  },
  checkboxBoxIdle: {
    borderColor: GlobalColors.border,
    backgroundColor: "transparent"
  },
  checkboxTick: {
    width: 14,
    height: 14,
    borderRadius: BorderRadius.sm,
    backgroundColor: GlobalColors.textLight,
  },

  progressOuter: {
    height: 12,
    width: "100%",
    borderRadius: BorderRadius.md,
    backgroundColor: GlobalColors.borderLight,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: GlobalColors.border,
  },
  progressInner: {
    height: "100%",
    backgroundColor: PRIMARY,
    borderRadius: BorderRadius.md,
  },

  bottomBar: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.lg,
    backgroundColor: GlobalColors.surface,
    borderTopWidth: 1,
    borderTopColor: GlobalColors.borderLight,
    shadowColor: GlobalColors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navBtn: {
    flex: 1,
    height: 56,
    borderRadius: BorderRadius.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  navBtnGhost: {
    borderWidth: 2,
    borderColor: PRIMARY,
    marginHorizontal: Spacing.sm,
    backgroundColor: "transparent",
  },
  navBtnDisabled: { opacity: 0.5 },
  navBtnGhostText: {
    color: PRIMARY,
    fontWeight: Typography.fontWeight.bold,
    fontSize: Typography.fontSize.base,
    letterSpacing: Typography.letterSpacing.wide,
  },

  submitBtn: {
    height: 60,
    borderRadius: BorderRadius.xl,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitBtnDisabled: { opacity: 0.6 },
  submitText: {
    color: GlobalColors.textLight,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.extrabold,
    letterSpacing: Typography.letterSpacing.wide,
  },

  qItem: {
    width: "18%",
    aspectRatio: 1,
    borderRadius: BorderRadius.xl,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Spacing.sm,
    borderWidth: 1,
  },
  qItemIdle: {
    backgroundColor: GlobalColors.borderLight,
    borderColor: GlobalColors.border,
  },
  qItemCurrent: {
    backgroundColor: GlobalColors.surface,
    borderWidth: 2,
    borderColor: PRIMARY,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  qItemDone: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },
  qItemText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: Typography.letterSpacing.wide,
  },
  qItemTextOn: { color: GlobalColors.textLight },
  qItemTextOff: { color: TEXT_MUTED },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BG,
  },
  loadingText: {
    marginTop: Spacing.lg,
    fontSize: Typography.fontSize.base,
    color: TEXT_SECONDARY,
    fontWeight: Typography.fontWeight.medium,
  },
});
