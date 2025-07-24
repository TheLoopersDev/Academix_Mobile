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
import { INSTRUCTORS } from "../data/mockData"; // Dùng cho tab Giảng viên
import { styles } from "../styles/ProfileStyles";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth, User } from "../context/AuthContext";
import {
  updateUserInfoApi,
  updateAvatarApi,
  getMyPurchasedCoursesApi,
} from "../services/api";

// --- Định nghĩa kiểu dữ liệu ---
//Purchase courses mới
type PurchasedCourse = {
  _id: string;
  name: string;
  thumbnail: { url: string };
  authorId: { name: string };
  progress?: number; // Thêm progress giả để hiển thị
};
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
  user: User;
  onLogoutPress: () => void;
};

// --- Các component con cho các tab ---
const EditInfoTab = ({ user, onLogoutPress }: EditInfoTabProps) => {
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user.address || "");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [loading, setLoading] = useState(false);
  const { refreshUser } = useAuth();

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await updateUserInfoApi({ name, address, phoneNumber });
      if (response.data.success) {
        await refreshUser();
        Alert.alert("Thành công", "Đã cập nhật thông tin hồ sơ.");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể cập nhật thông tin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.contentContainer}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Họ và tên</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={user.email} editable={false} />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Địa chỉ</Text>
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
          <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
        )}
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
};

//Purchase courses mới: Component cho tab "Khóa học của tôi"
type MyCoursesTabProps = {
  HeaderAndTabs: React.ReactElement;
};

const MyCoursesTab = ({ HeaderAndTabs }: MyCoursesTabProps) => {
  const [myCourses, setMyCourses] = useState<PurchasedCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        setLoading(true);
        const response = await getMyPurchasedCoursesApi();
        if (response.data.success) {
          const coursesWithProgress = response.data.data.course.map(
            (c: PurchasedCourse) => ({
              ...c,
              progress: Math.floor(Math.random() * 100),
            })
          );
          setMyCourses(coursesWithProgress);
        }
      } catch (error) {
        console.error("Failed to fetch purchased courses:", error);
        Alert.alert("Lỗi", "Không thể tải danh sách khóa học đã mua.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, []);

  const renderCourseItem: ListRenderItem<PurchasedCourse> = ({ item }) => (
    <TouchableOpacity style={styles.courseCard}>
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
        // Sửa lỗi ở đây: Không render lại HeaderAndTabs
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Text>Bạn chưa mua khóa học nào.</Text>
        </View>
      )}
      // Thêm một View bao bọc FlatList để xử lý trường hợp loading
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
  const { user, logout, refreshUser } = useAuth();
  const [isUploading, setIsUploading] = useState(false);

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      { text: "OK", onPress: () => logout() },
    ]);
  };

  const handlePickAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Xin lỗi, chúng tôi cần quyền truy cập thư viện ảnh để thực hiện việc này!"
      );
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
          Alert.alert("Thành công", "Đã cập nhật ảnh đại diện.");
        }
      } catch (error) {
        Alert.alert("Lỗi", "Không thể cập nhật ảnh đại diện.");
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
      //Purchase courses mới
      case "courses":
        return <MyCoursesTab HeaderAndTabs={HeaderAndTabs} />;
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
