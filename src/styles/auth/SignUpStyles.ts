import { StyleSheet } from "react-native";
import { styles as loginStyles } from "./LoginStyles";
import { GlobalColors, Typography, Spacing } from "../GlobalColors";

export const styles = StyleSheet.create({
  ...loginStyles,
  title: {
    ...loginStyles.title,
    fontSize: Typography.fontSize["3xl"],
    marginBottom: Spacing["2xl"],
  },

  disabledButton: {
    backgroundColor: GlobalColors.textMuted,
  },
});
