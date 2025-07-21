import { StyleSheet, Dimensions } from "react-native";

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
    backgroundColor: "rgba(247, 248, 250, 0.85)", // Màu nền mờ
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: height * 0.1, // Đẩy form xuống một chút
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0D0D0D",
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    marginLeft: 12,
  },
  forgotPassword: {
    textAlign: "right",
    color: "#333",
    fontWeight: "500",
    marginBottom: 24,
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
