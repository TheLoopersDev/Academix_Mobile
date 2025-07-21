import { StyleSheet } from "react-native";
import { styles as loginStyles } from "./LoginStyles"; // Kế thừa style từ Login

export const styles = StyleSheet.create({
  ...loginStyles, // Sao chép tất cả style từ Login
  // Bạn có thể ghi đè hoặc thêm style mới ở đây nếu cần
  title: {
    // Ví dụ: Thay đổi tiêu đề
    ...loginStyles.title,
    fontSize: 28,
    marginBottom: 24,
  },
});
