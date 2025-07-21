import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutUserApi, getUserInfoApi } from "../services/api";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: { url: string };
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  login: (newToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const processTokenChange = async () => {
      if (token) {
        try {
          const response = await getUserInfoApi();
          if (response.data.success) {
            setUser(response.data.user);
          }
        } catch (error) {
          console.error("Failed to fetch user info, logging out.", error);
          await logout();
        }
      } else {
        setUser(null);
      }
    };

    if (!isLoading) {
      processTokenChange();
    }
  }, [token, isLoading]);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken: string | null = null;
      try {
        userToken = await AsyncStorage.getItem("access_token");
      } catch (e) {
        /* Lỗi đọc token */
      }
      setToken(userToken);
      setIsLoading(false);
    };
    bootstrapAsync();
  }, []);

  const login = async (newToken: string) => {
    if (newToken) {
      await AsyncStorage.setItem("access_token", newToken);
      setToken(newToken);
    }
  };

  const logout = async () => {
    try {
      await logoutUserApi();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      await AsyncStorage.removeItem("access_token");
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
