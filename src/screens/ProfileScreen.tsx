import React, { useState } from "react";
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
import { MY_COURSES, INSTRUCTORS } from "../data/mockData";
import { styles } from "../styles/ProfileStyles";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth, User } from "../context/AuthContext"; // Import User type

// --- Định nghĩa kiểu dữ liệu ---
type MyCourseType = (typeof MY_COURSES)[0];
type InstructorType = (typeof INSTRUCTORS)[0];

type ProfileMenuItemProps = {
  icon: string;
  text: string;
  onPress: () => void;
};

// --- Component cho menu item ---
const ProfileMenuItem = ({ icon, text, onPress }: ProfileMenuItemProps) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Icon name={icon} size={22} color="#c0392b" />
    <Text style={[styles.menuItemText, { color: "#c0392b" }]}>{text}</Text>
  </TouchableOpacity>
);

type EditInfoTabProps = {
  user: User; // <-- Thêm kiểu cho user
  onLogoutPress: () => void;
};

// --- Các component con cho các tab ---
const EditInfoTab = ({ user, onLogoutPress }: EditInfoTabProps) => (
  <View style={styles.contentContainer}>
    <View style={styles.formGroup}>
      <Text style={styles.label}>Họ và tên</Text>
      <TextInput style={styles.input} value={user.name} />
    </View>
    <View style={styles.formGroup}>
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={user.email} editable={false} />
    </View>
    <TouchableOpacity style={styles.saveButton}>
      <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
    </TouchableOpacity>
    <View style={{ marginTop: 24 }}>
      <ProfileMenuItem
        icon="log-out-outline"
        text="Đăng xuất"
        onPress={onLogoutPress}
      />
    </View>
  </View>
);

const renderCourseItem: ListRenderItem<MyCourseType> = ({ item }) => (
  <TouchableOpacity style={styles.courseCard}>
    <Image source={{ uri: item.imageUrl }} style={styles.courseImage} />
    <View style={styles.courseInfo}>
      <Text style={styles.courseTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.courseInstructor}>By {item.instructor}</Text>
      <View style={styles.progressBarBackground}>
        <View
          style={[styles.progressBarFill, { width: `${item.progress}%` }]}
        />
      </View>
    </View>
  </TouchableOpacity>
);

const renderInstructorItem: ListRenderItem<InstructorType> = ({ item }) => (
  <View style={styles.instructorCard}>
    <Image source={{ uri: item.avatar }} style={styles.instructorAvatar} />
    <Text style={styles.instructorName}>{item.name}</Text>
    <Text style={styles.instructorTitle}>{item.title}</Text>
    <View style={styles.statsContainer}>
      <View style={styles.stat}>
        <Icon name="star" size={14} color="#f5b324" />
        <Text style={styles.statText}> {item.rating}</Text>
      </View>
      <View style={styles.stat}>
        <Text style={styles.statText}>{item.studentCount}</Text>
        <Text style={styles.statLabel}>Students</Text>
      </View>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

// --- Component chính ---
export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState("info");
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      { text: "OK", onPress: () => logout() },
    ]);
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
        <Image
          source={
            user.avatar?.url
              ? { uri: user.avatar.url }
              : require("../assets/avatar-default.png")
          }
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.title}>
          {user.role === "instructor" ? "Instructor" : "Student"}
        </Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Chỉnh sửa ảnh</Text>
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
        <TouchableOpacity
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
        </TouchableOpacity>
      </View>
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "courses":
        return (
          <FlatList
            key="courses-list"
            data={MY_COURSES}
            renderItem={renderCourseItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={HeaderAndTabs}
            contentContainerStyle={styles.listContainer}
          />
        );
      case "instructors":
        return (
          <FlatList
            key="instructors-list"
            data={INSTRUCTORS}
            renderItem={renderInstructorItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            ListHeaderComponent={HeaderAndTabs}
            contentContainerStyle={styles.instructorListContainer}
          />
        );
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
