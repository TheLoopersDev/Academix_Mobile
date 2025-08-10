import React from "react";
import { View, Image, StyleSheet } from "react-native";

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
    height: 60, // Chiều cao cố định cho header
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Căn giữa logo
    paddingHorizontal: 16,
    elevation: 4, // Shadow cho Android
    shadowColor: "#000", // Shadow cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 100,
  },
  logo: {
    height: 45, // Chiều cao của logo
    width: 45, // Chiều rộng của logo
  },
});

export default Header;
