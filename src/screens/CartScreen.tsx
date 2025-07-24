import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Linking, // <-- 1. Import Linking
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "../styles/CartStyles";
import { useCart, CartItem } from "../context/CartContext";
import Icon from "react-native-vector-icons/Ionicons";
import { createPaymentLinkApi } from "../services/api"; // <-- 2. Import hàm API

const formatVND = (amount: number): string => {
  return `${amount.toLocaleString("vi-VN")} VNĐ`;
};

export default function CartScreen() {
  const { cartItems, loading, fetchCart, removeFromCart, updateQuantity } =
    useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false); // <-- 3. Thêm state loading cho checkout

  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [])
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.courseId.price || 0) * item.quantity,
    0
  );
  const totalCost = subtotal; // Bỏ shipping fee nếu không cần
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // --- 4. Thêm hàm xử lý thanh toán ---
  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const courseIds = cartItems.map((item) => item.courseId._id);
      const response = await createPaymentLinkApi({
        amount: totalCost,
        description: "Thanh toan khoa hoc", // Mô tả ngắn gọn
        courseIds: courseIds,
      });

      if (response.data.checkoutUrl) {
        // Mở link thanh toán bằng trình duyệt
        await Linking.openURL(response.data.checkoutUrl);
      } else {
        throw new Error("Không nhận được link thanh toán.");
      }
    } catch (error) {
      console.error("Failed to create payment link:", error);
      Alert.alert("Lỗi", "Không thể tạo yêu cầu thanh toán. Vui lòng thử lại.");
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
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() =>
                updateQuantity(item.courseId._id, item.quantity - 1)
              }
              style={styles.quantityButton}
            >
              <Icon name="remove-outline" size={18} color="#333" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() =>
                updateQuantity(item.courseId._id, item.quantity + 1)
              }
              style={styles.quantityButton}
            >
              <Icon name="add-outline" size={18} color="#333" />
            </TouchableOpacity>
          </View>
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
          <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống</Text>
          <Text style={styles.emptySubtext}>
            Hãy thêm vài khóa học để bắt đầu nhé!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
        <Text style={styles.headerSubtitle}>{totalItems} khóa học</Text>
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item._id}
      />
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Tóm tắt đơn hàng</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tạm tính</Text>
          <Text style={styles.summaryValue}>{formatVND(subtotal)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Tổng cộng</Text>
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
            <Text style={styles.checkoutButtonText}>Tiến hành thanh toán</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
