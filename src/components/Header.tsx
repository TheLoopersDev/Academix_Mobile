import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { GlobalColors } from "../styles/GlobalColors";

// Import hình ảnh logo từ thư mục assets
// Vui lòng thay đổi đường dẫn này thành đường dẫn thực tế của logo của bạn
const logo = require("../assets/image.png");

const Header = () => {
  return (
    <View style={styles.header}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 60,
    backgroundColor: GlobalColors.surface,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: GlobalColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 100,
    borderBottomWidth: 1,
    borderBottomColor: GlobalColors.borderLight,
  },
  logo: {
    height: 45,
    width: 45,
  },
});

export default Header;
