// styles/auth/DoQuizStyle.ts
import { StyleSheet } from "react-native";

// Academic Dark Theme Colors
export const PRIMARY = "#1E40AF"; // Deep blue - academic primary
export const SECONDARY = "#7C3AED"; // Purple accent
export const BG = "#0F172A"; // Dark slate background
export const CARD_BG = "#1E293B"; // Slate card background
export const SURFACE = "#334155"; // Surface color
export const TEXT_PRIMARY = "#F8FAFC"; // Light text
export const TEXT_SECONDARY = "#CBD5E1"; // Muted text
export const TEXT_MUTED = "#64748B"; // Very muted text
export const ACCENT = "#10B981"; // Success green
export const WARNING = "#F59E0B"; // Warning amber
export const ERROR = "#EF4444"; // Error red
export const TRACK = "#475569"; // Progress track

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BG,
  },
  qNavPill: {
    backgroundColor: SURFACE,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#475569",
  },
  qNavPillText: {
    fontSize: 14,
    fontWeight: "600",
    color: TEXT_SECONDARY,
  },
  qNavPillDisabled: {
    opacity: 0.5,
  },
  topActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: BG,
  },
  navButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerWrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: BG,
    borderBottomWidth: 1,
    borderBottomColor: SURFACE,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CARD_BG,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: SURFACE,
  },
  backIcon: { fontSize: 22, color: TEXT_PRIMARY, lineHeight: 22 },
  headerCenter: { flex: 1, marginHorizontal: 12 },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: TEXT_PRIMARY,
    letterSpacing: 0.5,
  },

  timerPill: {
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 20,
    backgroundColor: CARD_BG,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: SURFACE,
  },
  timerText: {
    fontSize: 14,
    fontWeight: "700",
    color: TEXT_PRIMARY,
    letterSpacing: 0.5,
  },

  topActions: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: BG,
  },
  qListPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: SURFACE,
  },
  qListPillText: {
    color: PRIMARY,
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.3,
  },

  card: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 20,
    backgroundColor: CARD_BG,
    padding: 20,
    borderWidth: 1,
    borderColor: SURFACE,
  },

  qNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: PRIMARY,
    letterSpacing: 0.5,
  },
  qTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "600",
    color: TEXT_PRIMARY,
    lineHeight: 26,
    letterSpacing: 0.3,
  },
  qImage: {
    marginTop: 16,
    width: "100%",
    height: 200,
    borderRadius: 16,
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: "#475569",
  },

  optionWrap: {
    position: "relative",
    width: "100%",
    backgroundColor: SURFACE,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#475569",
  },
  optionSelectedBar: {
    position: "absolute",
    left: 8,
    top: 8,
    bottom: 8,
    width: 4,
    borderRadius: 2,
    backgroundColor: PRIMARY,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    marginRight: 12,
    lineHeight: 22,
  },
  optionTextIdle: { color: TEXT_SECONDARY },
  optionTextSelected: { color: TEXT_PRIMARY, fontWeight: "600" },

  radioOuter: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: { borderColor: PRIMARY },
  radioOuterIdle: { borderColor: TEXT_MUTED },
  radioInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: PRIMARY,
  },

  checkboxBox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxBoxSelected: { borderColor: PRIMARY, backgroundColor: PRIMARY },
  checkboxBoxIdle: { borderColor: TEXT_MUTED, backgroundColor: "transparent" },
  checkboxTick: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: TEXT_PRIMARY,
  },

  progressOuter: {
    height: 12,
    width: "100%",
    borderRadius: 6,
    backgroundColor: TRACK,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#475569",
  },
  progressInner: {
    height: "100%",
    backgroundColor: PRIMARY,
    borderRadius: 6,
  },

  bottomBar: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: BG,
    borderTopWidth: 1,
    borderTopColor: SURFACE,
  },
  navBtn: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  navBtnGhost: {
    borderWidth: 2,
    borderColor: PRIMARY,
    marginHorizontal: 6,
    backgroundColor: "transparent",
  },
  navBtnDisabled: { opacity: 0.5 },
  navBtnGhostText: {
    color: PRIMARY,
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.3,
  },

  submitBtn: {
    height: 56,
    borderRadius: 16,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  submitBtnDisabled: { opacity: 0.6 },
  submitText: {
    color: TEXT_PRIMARY,
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  qItem: {
    width: "18%",
    aspectRatio: 1,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    borderWidth: 1,
  },
  qItemIdle: {
    backgroundColor: TRACK,
    borderColor: "#475569",
  },
  qItemCurrent: {
    backgroundColor: CARD_BG,
    borderWidth: 2,
    borderColor: PRIMARY,
  },
  qItemDone: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },
  qItemText: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  qItemTextOn: { color: TEXT_PRIMARY },
  qItemTextOff: { color: TEXT_MUTED },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BG,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: TEXT_SECONDARY,
    fontWeight: "500",
  },
});
