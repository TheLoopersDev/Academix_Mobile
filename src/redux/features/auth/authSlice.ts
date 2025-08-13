// src/lib/redux/features/auth/authSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "../../../types/user";

/** Storage keys */
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

/** Phân biệt môi trường */
const isWeb =
  typeof window !== "undefined" && typeof localStorage !== "undefined";

/** Helpers lưu/đọc cho Web & RN */
async function saveAuth(token: string | null, user: User | null) {
  try {
    if (isWeb) {
      if (token) localStorage.setItem(TOKEN_KEY, token);
      else localStorage.removeItem(TOKEN_KEY);

      if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
      else localStorage.removeItem(USER_KEY);
    } else {
      // RN
      const AsyncStorage = (
        await import("@react-native-async-storage/async-storage")
      ).default;
      if (token) await AsyncStorage.setItem(TOKEN_KEY, token);
      else await AsyncStorage.removeItem(TOKEN_KEY);
      if (user) await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
      else await AsyncStorage.removeItem(USER_KEY);
    }
  } catch (e) {
    console.error("saveAuth() error:", e);
  }
}

async function loadAuth(): Promise<{
  token: string | null;
  user: User | null;
}> {
  try {
    if (isWeb) {
      const token = localStorage.getItem(TOKEN_KEY);
      const userStr = localStorage.getItem(USER_KEY);
      return { token, user: userStr ? (JSON.parse(userStr) as User) : null };
    } else {
      const AsyncStorage = (
        await import("@react-native-async-storage/async-storage")
      ).default;
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      const userStr = await AsyncStorage.getItem(USER_KEY);
      return { token, user: userStr ? (JSON.parse(userStr) as User) : null };
    }
  } catch (e) {
    console.error("loadAuth() error:", e);
    return { token: null, user: null };
  }
}

/** Thunk hydrate: gọi 1 lần khi app mở */
export const hydrateAuth = createAsyncThunk("auth/hydrate", async () => {
  return await loadAuth(); // { token, user }
});

interface SetAuthStatePayload {
  token: string | null;
  user: User | null;
  isAuthenticated?: boolean; // không dùng, giữ để tương thích
}

type AuthState = {
  token: string | null;
  user: User | null;
  isLoggingOut: boolean;
  hydrated: boolean; // chặn API tới khi true (nếu muốn)
};

const initialState: AuthState = {
  token: null,
  user: null,
  isLoggingOut: false,
  hydrated: isWeb ? true : false, // web có thể sync ngay; RN cần hydrate
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      // fire and forget (không await trong reducer)
      void saveAuth(state.token, state.user);
    },
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      void saveAuth(state.token, state.user);
    },
    userLoggerIn: (
      state,
      action: PayloadAction<{ accessToken: string; user: User }>
    ) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
      state.isLoggingOut = false;
      void saveAuth(state.token, state.user);
    },
    userLoggerOut: (state) => {
      state.token = null;
      state.user = null;
      state.isLoggingOut = true;
      void saveAuth(null, null);
    },
    userResetToken: (state, action: PayloadAction<{ resetToken: string }>) => {
      state.token = action.payload.resetToken;
      void saveAuth(state.token, state.user);
    },
    setAuthState: (state, action: PayloadAction<SetAuthStatePayload>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      void saveAuth(state.token, state.user);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateAuth.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.hydrated = true;
    });
    builder.addCase(hydrateAuth.rejected, (state) => {
      state.hydrated = true; // tránh kẹt
    });
  },
});

export const {
  userRegistration,
  userLoggerIn,
  userLoggerOut,
  userResetToken,
  setUserInfo,
  setAuthState,
} = authSlice.actions;

export default authSlice.reducer;
