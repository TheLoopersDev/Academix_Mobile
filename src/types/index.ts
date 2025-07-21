export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number; // in hours
  price: number;
  imageUrl: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  enrolledCourses: string[]; // array of course IDs
}

export interface APIResponse<T> {
  data: T;
  message: string;
  success: boolean;
}