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
  disabledButton: {
    backgroundColor: "#9ca3af",
  },
});
