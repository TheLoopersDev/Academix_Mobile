import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Enable cookies for refresh token
});

// Interceptor để tự động đính kèm token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("access_token");
    const refreshToken = await AsyncStorage.getItem("refresh_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add refresh token to headers if available
    if (refreshToken) {
      config.headers['X-Refresh-Token'] = refreshToken;
    }

    console.log("Request headers:", {
      Authorization: token ? "Bearer ***" : null,
      "X-Refresh-Token": refreshToken ? "***" : null,
      url: config.url
    });

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
export const getCoursesApi = (params = {}) => {
  return apiClient.get("/courses/pagination", { params });
};
export const getMyPurchasedCoursesApi = () =>
  apiClient.get("/courses/purchased/my-course");
export const getCourseDetailApi = (courseId: string) =>
  apiClient.get(`/courses/course-data/${courseId}`);

export const getCartApi = () => apiClient.get("/cart/cart-items");
// Thêm khóa học vào giỏ
export const addToCartApi = (courseId: string) =>
  apiClient.post("/cart/add-to-cart", { courseId });
// Xóa khóa học khỏi giỏ
export const removeFromCartApi = (courseId: string) =>
  apiClient.delete("/cart/remove-item", { data: { courseId } });
// Cập nhật số lượng
export const updateCartQuantityApi = (courseId: string, quantity: number) =>
  apiClient.put("/cart/update-quantity", { courseId, quantity });

export const updateUserInfoApi = (data: {
  name: string;
  address: string;
  phoneNumber: string;
}) => apiClient.put("/users/update-user", data);
export const updateAvatarApi = (data: { avatar: string }) =>
  apiClient.put("/users/update-avatar", data);
export const getInstructorByIdApi = (id: string) =>
  apiClient.get(`/users/${id}`);

export const createPaymentLinkApi = (data: {
  amount: number;
  description: string;
  courseIds: string[];
}) => apiClient.post("/payment/create-payment-link", data);

export const updateLessonCompletionStatusApi = (
  courseId: string,
  lessonId: string,
  isCompleted: boolean
) => {
  return apiClient.put(`/progress/update-lesson-completion/${courseId}`, {
    lessonId,
    isCompleted,
  });
};

// Hàm đăng ký người dùng đã được sửa để dùng apiClient
export const registrationUserApi = (
  name: string,
  email: string,
  password: string
) => {
  // Sử dụng apiClient.post và đường dẫn tương đối
  return apiClient.post("users/register", { name, email, password });
};

// Hàm kích hoạt tài khoản đã được sửa để dùng apiClient
export const activateUserApi = (
  activation_token: string,
  activation_code: string
) => {
  // Sử dụng apiClient.post và đường dẫn tương đối
  return apiClient.post("users/activate-user", {
    activation_token,
    activation_code,
  });
};

export const getTopCoursesApi = () => apiClient.get("/courses/top-courses");

export const getUserDashboardDataApi = (userId: string) =>
  apiClient.get(`/users/dashboard/${userId}`);

export const getAllQuestionsApi = (quizId: string) =>
  apiClient.get(`/quizzes/${quizId}/questions`);

export const getQuizAttemptsApi = (quizId: string) =>
  apiClient.get(`/quizzes/${quizId}/attempts`);

export const submitQuizApi = async (quizId: string, payload: {
  answers: { questionId: string; selectedOptionIds: string[] }[];
  timeTakenSeconds?: number;
  meta?: Record<string, unknown>;
  refreshToken?: string;
}) => {
  // Try to get refresh token from AsyncStorage if not provided
  let refreshToken = payload.refreshToken;
  if (!refreshToken) {
    try {
      const AsyncStorage = (await import("@react-native-async-storage/async-storage")).default;
      const storedToken = await AsyncStorage.getItem("refresh_token");
      refreshToken = storedToken || undefined;
    } catch (error) {
      console.log("Could not get refresh token:", error);
    }
  }

  console.log("Final payload being sent:", {
    ...payload,
    refreshToken: refreshToken ? "***" : null
  });

  // Create request config with refresh token in headers if available
  const config: any = {};
  if (refreshToken) {
    config.headers = {
      'X-Refresh-Token': refreshToken,
      'Refresh-Token': refreshToken, // Try both header formats
    };
  }

  // Remove refreshToken from payload to avoid sending it in body
  const { refreshToken: _, ...cleanPayload } = payload;

  return apiClient.post(`/quizzes/${quizId}/submit`, cleanPayload, config);
};

export default apiClient;
