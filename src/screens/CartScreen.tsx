import React, { useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "../styles/CartStyles";
import { useCart, CartItem } from "../context/CartContext";
import Icon from "react-native-vector-icons/Ionicons";

const formatVND = (amount: number): string => {
  return `${amount.toLocaleString("vi-VN")} VNĐ`;
};

export default function CartScreen() {
  const { cartItems, loading, fetchCart, removeFromCart, updateQuantity } =
    useCart();

  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [])
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.courseId.price || 0) * item.quantity,
    0
  );
  const totalCost = subtotal;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
          {/* Sửa lỗi ở đây: Thêm optional chaining và fallback text */}
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
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Tiến hành thanh toán</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
