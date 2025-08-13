import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  ListRenderItem,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
// import { INSTRUCTORS } from "../../data/mockData"; // Removed as Instructors tab was deleted
import { styles } from "../styles/ProfileStyles";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth, User } from "../context/AuthContext";
import {
  updateUserInfoApi,
  updateAvatarApi,
  getMyPurchasedCoursesApi,
  getUserDashboardDataApi,
} from "../services/api";
import { useNavigation, NavigationProp } from "@react-navigation/native"; // Only import useNavigation and NavigationProp
import { StackNavigationProp } from "@react-navigation/stack";
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs"; // Import BottomTabScreenProps

// --- Data type definitions ---
// Redefine CoursesStackParamList (must match AppNavigator.tsx)
type CoursesStackParamList = {
  CoursesList: undefined;
  CourseDetail: { courseId: string };
  WatchCourse: { courseId: string };
};

// Redefine MainTabParamList (must match AppNavigator.tsx)
type MainTabParamList = {
  Home: undefined;
  Courses: CoursesStackParamList; // Courses tab will contain CoursesStack
  Lectures: undefined; // Keep Lectures in MainTabParamList if it still exists elsewhere in the app
  Cart: undefined;
  Profile: undefined;
};

// Props type for ProfileScreen (a screen of BottomTabNavigator)
type ProfileScreenProps = BottomTabScreenProps<MainTabParamList, "Profile">;

// Navigation type for MyCoursesTab, received from ProfileScreen
type MyCoursesTabNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  "Profile"
>;

// New purchased courses
type PurchasedCourse = {
  _id: string;
  name: string;
  thumbnail: { url: string };
  authorId: { name: string };
  progress?: number; // Add mock progress for display
};
// type InstructorType = (typeof INSTRUCTORS)[0]; // Removed as Instructors tab was deleted

type ProfileMenuItemProps = {
  icon: string;
  text: string;
  onPress: () => void;
};

// --- Component for menu item ---
const ProfileMenuItem = ({ icon, text, onPress }: ProfileMenuItemProps) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Icon name={icon} size={22} color="#c0392b" />
    <Text style={[styles.menuItemText, { color: "#c0392b" }]}>{text}</Text>
  </TouchableOpacity>
);

type EditInfoTabProps = {
  user: User;
  onLogoutPress: () => void;
};

// --- Child components for tabs ---
const EditInfoTab = ({ user, onLogoutPress }: EditInfoTabProps) => {
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user.address || "");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [loading, setLoading] = useState(false);
  const { refreshUser } = useAuth();

  console.log("dsadsad");

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await updateUserInfoApi({ name, address, phoneNumber });
      if (response.data.success) {
        await refreshUser();
        Alert.alert("Success", "Profile information has been updated.");
      }
    } catch (error) {
      Alert.alert("Error", "Could not update information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.contentContainer}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Full name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={user.email} editable={false} />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Phone number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />
      </View>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleUpdate}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Save changes</Text>
        )}
      </TouchableOpacity>
      <View style={{ marginTop: 24 }}>
        <ProfileMenuItem
          icon="log-out-outline"
          text="Logout"
          onPress={onLogoutPress}
        />
      </View>
    </View>
  );
};

// New purchased courses: Component for the "My Courses" tab
type MyCoursesTabProps = {
  HeaderAndTabs: React.ReactElement;
  navigation: MyCoursesTabNavigationProp; // Receive navigation prop
};

// Khai báo kiểu dữ liệu cho toàn bộ dashboard data
type UserDashboardData = {
  stats: {
    totalCourses: number;
    completedCourses: number;
    certificates: number;
    hoursSpent: number;
  };
  latestCourse: PurchasedCourse;
  relatedCourses: PurchasedCourse[];
  studentStats: any[]; // Thay thế bằng kiểu dữ liệu cụ thể nếu có
  upcomingExams: any[]; // Thay thế bằng kiểu dữ liệu cụ thể nếu có
};

const MyCoursesTab = ({ HeaderAndTabs, navigation }: MyCoursesTabProps) => {
  const [myCourses, setMyCourses] = useState<PurchasedCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Get user from auth context

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        setLoading(true);
        const response = await getMyPurchasedCoursesApi();
        if (response.data.success) {
          // Cập nhật cách lấy danh sách khóa học
          // Truy cập trực tiếp response.data.data, nếu nó không phải là mảng thì mặc định là []
          const purchasedCourses = Array.isArray(response.data.data)
            ? response.data.data
            : [];
          const coursesWithProgress = purchasedCourses.map(
            (c: PurchasedCourse) => ({
              ...c,
              progress: Math.floor(Math.random() * 100),
            })
          );
          setMyCourses(coursesWithProgress);
        } else {
          setMyCourses([]);
        }
      } catch (error) {
        console.error("Failed to fetch purchased courses:", error);
        Alert.alert("Error", "Could not load the list of purchased courses.");
        setMyCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, []);

  const handleCoursePress = (courseId: string) => {
    // Navigate to WatchCourseScreen via the "Courses" tab
    // navigate('Courses', ...) is the standard syntax for navigating between tabs and nested stacks
    navigation.navigate("Courses", {
      screen: "WatchCourse",
      params: { courseId },
    });
  };

  const renderCourseItem: ListRenderItem<PurchasedCourse> = ({ item }) => (
    <TouchableOpacity
      style={styles.courseCard}
      onPress={() => handleCoursePress(item._id)}
    >
      <Image source={{ uri: item.thumbnail.url }} style={styles.courseImage} />
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.courseInstructor}>By {item.authorId.name}</Text>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${item.progress || 0}%` },
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View>
        {HeaderAndTabs}
        <ActivityIndicator
          size="large"
          color="#3858F8"
          style={{ marginTop: 50 }}
        />
      </View>
    );
  }

  return (
    <FlatList
      key="courses-list"
      data={myCourses}
      renderItem={renderCourseItem}
      keyExtractor={(item) => item._id}
      ListHeaderComponent={HeaderAndTabs}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={() => (
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Text>You have not purchased any courses yet.</Text>
        </View>
      )}
      ListFooterComponent={
        loading ? (
          <ActivityIndicator
            size="large"
            color="#3858F8"
            style={{ marginTop: 50 }}
          />
        ) : null
      }
    />
  );
};

// --- Main component ---
export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  // Receive navigation prop
  const [activeTab, setActiveTab] = useState("info");
  const { user, logout, refreshUser } = useAuth();
  const [isUploading, setIsUploading] = useState(false);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: () => logout() },
    ]);
  };

  const handlePickAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets[0].base64) {
      setIsUploading(true);
      try {
        const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
        const response = await updateAvatarApi({ avatar: base64Image });
        if (response.data.success) {
          await refreshUser();
          Alert.alert("Success", "Profile picture has been updated.");
        }
      } catch (error) {
        Alert.alert("Error", "Could not update profile picture.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  if (!user) {
    return (
      <ActivityIndicator
        size="large"
        color="#3858F8"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  const HeaderAndTabs = (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePickAvatar} disabled={isUploading}>
          <Image
            source={
              user.avatar?.url
                ? { uri: user.avatar.url }
                : require("../assets/avatar-default.png")
            }
            style={styles.avatar}
          />
          {isUploading && (
            <ActivityIndicator
              style={{ position: "absolute", top: 40, left: 40 }}
              size="large"
            />
          )}
        </TouchableOpacity>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.title}>
          {user.role === "instructor" ? "Instructor" : "Student"}
        </Text>
        <TouchableOpacity style={styles.editButton} onPress={handlePickAvatar}>
          <Text style={styles.editButtonText}>Edit avatar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "info" && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab("info")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "info" && styles.tabTextActive,
            ]}
          >
            Information
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "courses" && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab("courses")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "courses" && styles.tabTextActive,
            ]}
          >
            My Courses
          </Text>
        </TouchableOpacity>
        {/* Removed "My Instructors" tab */}
        {/* <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "instructors" && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab("instructors")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "instructors" && styles.tabTextActive,
            ]}
          >
            My Instructors
          </Text>
        </TouchableOpacity> */}
      </View>
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "courses":
        return (
          <MyCoursesTab HeaderAndTabs={HeaderAndTabs} navigation={navigation} />
        ); // Pass navigation prop
      // Removed "instructors" case
      // case "instructors":
      //   return (
      //     <FlatList
      //       key="instructors-list"
      //       data={INSTRUCTORS}
      //       renderItem={renderInstructorItem}
      //       keyExtractor={(item) => item.id}
      //       numColumns={2}
      //       ListHeaderComponent={HeaderAndTabs}
      //       contentContainerStyle={styles.instructorListContainer}
      //     />
      //   );
      case "info":
      default:
        return (
          <ScrollView key="info-scroll">
            {HeaderAndTabs}
            <EditInfoTab user={user} onLogoutPress={handleLogout} />
          </ScrollView>
        );
    }
  };

  return <View style={styles.container}>{renderContent()}</View>;
}
