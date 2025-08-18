import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
  Image,
  ActivityIndicator,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { styles } from "../styles/LectureListStyles";
import Icon from "react-native-vector-icons/Ionicons";
import { getInstructors } from "../services/api";

// --- Types ---
// Kiểu dữ liệu này khớp với dữ liệu từ MongoDB của bạn
type Instructor = {
  _id: string;
  name: string;
  avatar?: { url: string };
  profession?: string;
  // Các trường khác từ API có thể thêm vào đây
};

type LectureStackParamList = {
  LectureList: undefined;
  InstructorDetail: { instructorId: string };
};
type Props = StackScreenProps<LectureStackParamList, "LectureList">;

export default function LectureListScreen({ navigation }: Props) {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        setLoading(true);
        const response = await getInstructors();
        if (response.data && response.data.success) {
          setInstructors(response.data.instructors);
        }
      } catch (error) {
        console.error("Failed to fetch instructors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  const renderInstructorItem: ListRenderItem<Instructor> = ({ item }) => (
    <TouchableOpacity
      style={styles.instructorCard}
      onPress={() =>
        navigation.navigate("InstructorDetail", { instructorId: item._id })
      }
    >
      <Image
        source={
          item.avatar?.url
            ? { uri: item.avatar.url }
            : require("../assets/avatar-default.png")
        }
        style={styles.avatar}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.title}>{item.profession || "Instructor"}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#3858F8"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={instructors}
        renderItem={renderInstructorItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}
