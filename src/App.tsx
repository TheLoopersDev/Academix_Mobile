import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { AuthProvider } from "./context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { CartProvider } from "./context/CartContext";
import { View, StyleSheet } from "react-native";
import Header from "./components/Header";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        {/* <-- Thêm CartProvider vào đây */}
        <NavigationContainer>
          <View style={styles.container}>
            <Header /> {/* Thêm component Header vào đây */}
            <View style={styles.content}>
              <AppNavigator />
            </View>
          </View>
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
