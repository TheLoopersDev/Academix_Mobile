import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Alert } from "react-native";
import {
  getCartApi,
  addToCartApi,
  removeFromCartApi,
  updateCartQuantityApi,
} from "../services/api";
import { useAuth } from "./AuthContext";

// Định nghĩa kiểu dữ liệu dựa trên response của backend
export interface CartItem {
  _id: string;
  courseId: {
    _id: string;
    name: string;
    price: number;
    thumbnail: { url: string };
    author: { name: string };
  };
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  loading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (courseId: string) => Promise<void>;
  removeFromCart: (courseId: string) => Promise<void>;
  updateQuantity: (courseId: string, newQuantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await getCartApi();
      if (response.data.success && response.data.cart) {
        setCartItems(response.data.cart.items);
      } else {
        setCartItems([]); // Nếu không có giỏ hàng, trả về mảng rỗng
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [token]);

  const addToCart = async (courseId: string) => {
    try {
      const response = await addToCartApi(courseId);
      if (response.data.success) {
        Alert.alert("Thành công", "Đã thêm khóa học vào giỏ hàng.");
        await fetchCart();
      }
    } catch (error: any) {
      Alert.alert(
        "Lỗi",
        error.response?.data?.message || "Không thể thêm vào giỏ hàng."
      );
    }
  };

  const removeFromCart = async (courseId: string) => {
    try {
      const response = await removeFromCartApi(courseId);
      if (response.data.success) {
        await fetchCart();
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể xóa khóa học.");
    }
  };

  const updateQuantity = async (courseId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateCartQuantityApi(courseId, newQuantity);
      await fetchCart();
    } catch (error) {
      Alert.alert("Lỗi", "Không thể cập nhật số lượng.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        fetchCart,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
