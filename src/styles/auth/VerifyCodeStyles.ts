import { StyleSheet } from "react-native";
import { styles as loginStyles } from "./LoginStyles";

export const styles = StyleSheet.create({
  ...loginStyles,
  title: {
    ...loginStyles.title,
    fontSize: 28,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B6B6B",
    marginBottom: 32,
    textAlign: "center",
    paddingHorizontal: 16,
  },
  codeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  codeInput: {
    width: 50,
    height: 60,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#fff",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  resendText: {
    color: "#333",
  },
  resendLink: {
    color: "#3858F8",
    fontWeight: "bold",
    marginLeft: 4,
  },
});
