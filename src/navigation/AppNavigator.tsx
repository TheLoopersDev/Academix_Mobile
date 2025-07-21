import React, { useState } from "react";
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";

// Import các màn hình
import HomeScreen from "../screens/HomeScreen";
import CoursesListScreen from "../screens/CoursesListScreen";
import LectureListScreen from "../screens/LectureListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CourseDetailScreen from "../screens/CourseDetailScreen";
import InstructorDetailScreen from "../screens/InstructorDetailScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import VerifyCodeScreen from "../screens/auth/VerifyCodeScreen";
import CartScreen from "../screens/CartScreen"; // <-- Import CartScreen
import { useAuth } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";

// --- Định nghĩa kiểu dữ liệu ---
type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  VerifyCode: { email: string };
};

type HomeStackParamList = {
  HomeMain: undefined;
  CourseDetail: { courseId: string };
};

type CoursesStackParamList = {
  CoursesList: undefined;
  CourseDetail: { courseId: string };
};

type LectureStackParamList = {
  LectureList: undefined;
  InstructorDetail: { instructorId: string };
  CourseDetail: { courseId: string };
};

type MainTabParamList = {
  Home: undefined;
  Courses: undefined;
  Lectures: undefined;
  Cart: undefined; // <-- Thêm Cart vào đây
  Profile: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const HomeStackNavigator = createStackNavigator<HomeStackParamList>();
const CoursesStackNavigator = createStackNavigator<CoursesStackParamList>();
const LectureStackNavigator = createStackNavigator<LectureStackParamList>();

// --- Các Stack con ---
function HomeStack() {
  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStackNavigator.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
        options={{ title: "Chi tiết Khóa học" }}
      />
    </HomeStackNavigator.Navigator>
  );
}

function CoursesStack() {
  return (
    <CoursesStackNavigator.Navigator>
      <CoursesStackNavigator.Screen
        name="CoursesList"
        component={CoursesListScreen}
        options={{ headerShown: false }}
      />
      <CoursesStackNavigator.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
        options={{ title: "Chi tiết Khóa học" }}
      />
    </CoursesStackNavigator.Navigator>
  );
}

function LecturesStack() {
  return (
    <LectureStackNavigator.Navigator>
      <LectureStackNavigator.Screen
        name="LectureList"
        component={LectureListScreen}
        options={{ title: "Danh sách Giảng viên" }}
      />
      <LectureStackNavigator.Screen
        name="InstructorDetail"
        component={InstructorDetailScreen}
        options={{ title: "Chi tiết Giảng viên" }}
      />
      <LectureStackNavigator.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
        options={{ title: "Chi tiết Khóa học" }}
      />
    </LectureStackNavigator.Navigator>
  );
}

// --- Các luồng chính ---
function AuthFlow() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <AuthStack.Screen name="VerifyCode" component={VerifyCodeScreen} />
    </AuthStack.Navigator>
  );
}

function MainFlow() {
  return (
    <MainTab.Navigator
      screenOptions={({ route }: BottomTabScreenProps<MainTabParamList>) => ({
        tabBarIcon: ({
          focused,
          color,
          size,
        }: {
          focused: boolean;
          color: string;
          size: number;
        }) => {
          let iconName: string = "alert-circle-outline";
          if (route.name === "Home")
            iconName = focused ? "home" : "home-outline";
          else if (route.name === "Courses")
            iconName = focused ? "library" : "library-outline";
          else if (route.name === "Lectures")
            iconName = focused ? "people" : "people-outline";
          else if (route.name === "Cart")
            // <-- Thêm logic cho icon Cart
            iconName = focused ? "cart" : "cart-outline";
          else if (route.name === "Profile")
            iconName = focused ? "person" : "person-outline";
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#3858F8",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <MainTab.Screen name="Home" component={HomeStack} />
      <MainTab.Screen name="Courses" component={CoursesStack} />
      <MainTab.Screen name="Lectures" component={LecturesStack} />
      <MainTab.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerShown: true, title: "Giỏ hàng" }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: true, title: "Hồ sơ" }}
      />
    </MainTab.Navigator>
  );
}

// --- Navigator gốc ---
export default function AppNavigator() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return token ? <MainFlow /> : <AuthFlow />;
}
