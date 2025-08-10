import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Linking, // Import Linking
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "../styles/CartStyles";
import { useCart, CartItem } from "../context/CartContext";
import Icon from "react-native-vector-icons/Ionicons";
import { createPaymentLinkApi } from "../services/api"; // Import API function

const formatVND = (amount: number): string => {
  return `${amount.toLocaleString("vi-VN")} VND`;
};

export default function CartScreen() {
  const { cartItems, loading, fetchCart, removeFromCart, updateQuantity } =
    useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false); // Add checkout loading state

  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [])
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.courseId.price || 0) * item.quantity,
    0
  );
  const totalCost = subtotal; // Remove shipping fee if not needed
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Add checkout handler function
  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const courseIds = cartItems.map((item) => item.courseId._id);
      const response = await createPaymentLinkApi({
        amount: totalCost,
        description: "Course payment", // Brief description
        courseIds: courseIds,
      });

      if (response.data.checkoutUrl) {
        // Open the payment link in the browser
        await Linking.openURL(response.data.checkoutUrl);
      } else {
        throw new Error("Did not receive a payment link.");
      }
    } catch (error) {
      console.error("Failed to create payment link:", error);
      Alert.alert(
        "Error",
        "Failed to create a payment request. Please try again."
      );
    } finally {
      setIsCheckingOut(false);
    }
  };

  console.log("Cart Items:", cartItems);

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItemContainer}>
      <Image
        source={{ uri: item.courseId.thumbnail.url }}
        style={styles.itemImage}
      />
      <View style={styles.itemDetails}>
        <View>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.courseId.name}
          </Text>
          <Text style={styles.itemAuthor}>
            By {item.courseId.author?.name || "Unknown Author"}
          </Text>
          <TouchableOpacity onPress={() => removeFromCart(item.courseId._id)}>
            <Text style={styles.itemRemove}>Remove</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemPrice}>{formatVND(item.courseId.price)}</Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#3858F8"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Icon name="cart-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Text style={styles.emptySubtext}>
            Add some courses to get started!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>{totalItems} courses</Text>
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item._id}
      />
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{formatVND(subtotal)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatVND(totalCost)}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
          disabled={isCheckingOut}
        >
          {isCheckingOut ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
