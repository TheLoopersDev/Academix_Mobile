// src/data/mockData.ts

export const CATEGORIES = [
  "Tất cả",
  "Phát triển Di động",
  "Phát triển Web",
  "Thiết kế UI/UX",
  "Marketing",
];

// Dữ liệu cho danh sách bài giảng
export const LECTURES = [
  {
    id: "l1",
    courseId: "c1",
    title: "Bài 1: Giới thiệu và Cài đặt Môi trường",
    duration: "25m",
    isCompleted: true,
    instructorAvatar: "https://placehold.co/40x40/EFEFEF/333?text=A",
  },
  {
    id: "l2",
    courseId: "c1",
    title: "Bài 2: Các Component Cơ bản và JSX",
    duration: "45m",
    isCompleted: true,
    instructorAvatar: "https://placehold.co/40x40/EFEFEF/333?text=A",
  },
  {
    id: "l3",
    courseId: "c1",
    title: "Bài 3: Styling trong React Native",
    duration: "35m",
    isCompleted: false,
    instructorAvatar: "https://placehold.co/40x40/EFEFEF/333?text=A",
  },
  {
    id: "l4",
    courseId: "c2",
    title: "Bài 1: Ôn tập về Variables và Data Types",
    duration: "20m",
    isCompleted: true,
    instructorAvatar: "./assets/course1.png",
  },
  {
    id: "l5",
    courseId: "c2",
    title: "Bài 2: Tìm hiểu về Promises",
    duration: "40m",
    isCompleted: false,
    instructorAvatar: "https://placehold.co/40x40/EFEFEF/333?text=B",
  },
  {
    id: "l6",
    courseId: "c3",
    title: "Bài 1: Tổng quan về JavaScript hiện đại",
    duration: "30m",
    isCompleted: true,
    instructorAvatar: "https://placehold.co/40x40/EFEFEF/333?text=C",
  },
];
export const INSTRUCTORS = [
  {
    id: "i1",
    name: "Đào Tuấn Kiệt",
    title: "UX/UI Designer",
    avatar: "https://placehold.co/100x100/EFEFEF/333?text=A",
    rating: 4.8,
    studentCount: 1250,
    aboutMe:
      "One day Vako had enough with the 9-to-5 grind, or more like 5-to-9 in his case, and quit his job, or more like got himself fired from his own startup.",
    socialLinks: { facebook: "#", twitter: "#", instagram: "#" },
  },
  {
    id: "i2",
    name: "Lê Xuân Huy",
    title: "Web Designer & Best-Selling Instructor",
    avatar: "https://placehold.co/100x100/EFEFEF/333?text=B",
    rating: 4.9,
    studentCount: 4886,
    aboutMe:
      "He decided to work on his dream, be his own boss, travel the world, only do the work he enjoyed, and make a lot more money in the process.",
    socialLinks: { facebook: "#", twitter: "#", instagram: "#" },
  },
  // ... (Cập nhật tương tự cho các giảng viên khác)
];

// Dữ liệu cho người dùng
export const USER_PROFILE = {
  firstName: "Tuấn Kiệt",
  lastName: "Đào",
  birthday: "18/10/2004",
  email: "daotuankiet123@gmail.com",
  phone: "0123 456 789",
  avatarUrl: "https://placehold.co/150x150/EFEFEF/333?text=A",
};
export const MY_COURSES = [
  {
    id: "c1",
    title: "Khóa học Thiết kế Giao diện (App/Website)",
    instructor: "Đào Tuấn Kiệt",
    imageUrl: "https://placehold.co/400x225/3858F8/FFFFFF?text=UI/UX",
    progress: 80, // % hoàn thành
  },
  {
    id: "c2",
    title: "React Native Toàn Tập",
    instructor: "Lê Xuân Huy",
    imageUrl: "https://placehold.co/400x225/f0db4f/000000?text=RN",
    progress: 45,
  },
];

// Dữ liệu cho các bài giảng đang học
export const MY_LECTURES = [
  {
    id: "l3",
    courseId: "c1",
    title: "Bài 3: Styling trong React Native",
    duration: "35m",
    isCompleted: false,
  },
  {
    id: "l5",
    courseId: "c2",
    title: "Bài 2: Tìm hiểu về Promises",
    duration: "40m",
    isCompleted: false,
  },
];
