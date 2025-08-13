// styles/auth/DoQuizStyle.ts
import { StyleSheet } from "react-native";

export const PRIMARY = "#3858F8";
export const BG = "#FFFFFF"; // <-- nền trắng
export const TRACK = "#F7F8FA";
export const TEXT_MUTED = "#6B6B6B";

export default StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  qNavPill: {
    backgroundColor: "#e5e7eb",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  qNavPillText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4b5563",
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
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  backIcon: { fontSize: 22, color: PRIMARY, lineHeight: 22 },
  headerCenter: { flex: 1, marginHorizontal: 12 },
  headerTitle: { fontSize: 18, fontWeight: "700", color: PRIMARY },

  timerPill: {
    paddingHorizontal: 12,
    height: 36,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  timerText: { fontSize: 14, fontWeight: "600", color: "#0D0D0D" },

  topActions: { paddingHorizontal: 16, paddingTop: 8 },
  qListPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  qListPillText: { color: PRIMARY, fontWeight: "600" },

  card: {
    marginTop: 12,
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },

  qNumber: { fontSize: 18, fontWeight: "700", color: PRIMARY },
  qTitle: { marginTop: 10, fontSize: 16, fontWeight: "600", color: "#0D0D0D" },
  qImage: {
    marginTop: 12,
    width: "100%",
    height: 180,
    borderRadius: 12,
    backgroundColor: "#eee",
  },

  optionWrap: {
    position: "relative",
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 1,
  },
  optionSelectedBar: {
    position: "absolute",
    left: 6,
    top: 6,
    bottom: 6,
    width: 6,
    borderRadius: 8,
    backgroundColor: PRIMARY,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  optionText: { flex: 1, fontSize: 15, fontWeight: "500", marginRight: 12 },
  optionTextIdle: { color: TEXT_MUTED },
  optionTextSelected: { color: "#0D0D0D" },

  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: { borderColor: PRIMARY },
  radioOuterIdle: { borderColor: "#D9D9D9" },
  radioInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: PRIMARY,
  },

  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxBoxSelected: { borderColor: PRIMARY, backgroundColor: PRIMARY },
  checkboxBoxIdle: { borderColor: "#D9D9D9", backgroundColor: "#FFFFFF" },
  checkboxTick: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: "#FFFFFF",
  },

  progressOuter: {
    height: 10,
    width: "100%",
    borderRadius: 999,
    backgroundColor: TRACK,
    overflow: "hidden",
  },
  progressInner: {
    height: "100%",
    backgroundColor: PRIMARY,
    borderRadius: 999,
  },

  bottomBar: { paddingHorizontal: 16, paddingTop: 10 },
  navBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  navBtnGhost: {
    borderWidth: 1,
    borderColor: PRIMARY,
    marginHorizontal: 4,
    backgroundColor: "#FFFFFF",
  },
  navBtnDisabled: { opacity: 0.5 },
  navBtnGhostText: { color: PRIMARY, fontWeight: "600" },

  submitBtn: {
    height: 52,
    borderRadius: 12,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  submitBtnDisabled: { opacity: 0.6 },
  submitText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },

  qItem: {
    width: "18%",
    aspectRatio: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  qItemIdle: { backgroundColor: TRACK },
  qItemCurrent: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: PRIMARY,
  },
  qItemDone: { backgroundColor: PRIMARY },
  qItemText: { fontSize: 14, fontWeight: "600" },
  qItemTextOn: { color: "#FFFFFF" },
  qItemTextOff: { color: TEXT_MUTED },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#4B5563",
  },
});
