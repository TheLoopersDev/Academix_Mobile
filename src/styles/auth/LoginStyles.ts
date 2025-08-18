import { StyleSheet, Dimensions } from "react-native";
import { GlobalColors, Typography, Spacing, BorderRadius } from "../GlobalColors";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(250, 250, 250, 0.85)",
  },
  formContainer: {
    paddingHorizontal: Spacing["2xl"],
    paddingTop: height * 0.1,
  },
  title: {
    fontSize: Typography.fontSize["4xl"],
    fontWeight: Typography.fontWeight.bold,
    color: GlobalColors.textPrimary,
    marginBottom: Spacing["4xl"],
    letterSpacing: Typography.letterSpacing.wide,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: GlobalColors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: GlobalColors.border,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    shadowColor: GlobalColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: Typography.fontSize.base,
    marginLeft: Spacing.md,
    color: GlobalColors.textPrimary,
  },
  forgotPassword: {
    textAlign: "right",
    color: GlobalColors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: Spacing["2xl"],
  },
  loginButton: {
    backgroundColor: "#5A5A5A",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 24,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#6B6B6B",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    marginBottom: 32,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "#333",
  },
  signupLink: {
    color: "#3858F8",
    fontWeight: "bold",
    marginLeft: 4,
  },
});
