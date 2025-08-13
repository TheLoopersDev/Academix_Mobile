import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { AuthProvider } from "./context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { CartProvider } from "./context/CartContext";
import { View, StyleSheet } from "react-native";
import Header from "./components/Header";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
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
    </Provider>
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
