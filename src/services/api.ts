import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor để tự động đính kèm token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("access_token");
    console.log("Current token:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Các hàm gọi API
export const loginUserApi = (data: { email: string; password: string }) =>
  apiClient.post("/users/login", data);
export const logoutUserApi = () => apiClient.get("/users/logout");
export const getUserInfoApi = () => apiClient.get("/users/me");
export const getInstructors = () => apiClient.get("/users/get-instructors");
export const getCoursesApi = () => apiClient.get("/courses");
export const getCourseDetailApi = (courseId: string) =>
  apiClient.get(`/courses/course-data/${courseId}`);

export const getCartApi = () => apiClient.get("/cart/cart-items");
// Thêm khóa học vào giỏ
export const addToCartApi = (courseId: string) =>
  apiClient.post("/cart/add-to-cart", { courseId });
// Xóa khóa học khỏi giỏ
export const removeFromCartApi = (courseId: string) =>
  apiClient.delete(`/cart/remove/${courseId}`);
// Cập nhật số lượng
export const updateCartQuantityApi = (courseId: string, quantity: number) =>
  apiClient.put("/cart/update-quantity", { courseId, quantity });

export default apiClient;
