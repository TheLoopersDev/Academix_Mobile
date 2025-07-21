import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { styles } from "../../styles/auth/ForgotPasswordStyles";
import Icon from "react-native-vector-icons/Ionicons";

type AuthStackParamList = {
  ForgotPassword: undefined;
  VerifyCode: { email: string };
};
type Props = StackScreenProps<AuthStackParamList, "ForgotPassword">;

export default function ForgotPasswordScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/login-bg.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View
          style={[styles.formContainer, { justifyContent: "center", flex: 1 }]}
        >
          <Text style={styles.title}>Quên mật khẩu</Text>
          <Text style={styles.subtitle}>
            Nhập email của bạn và chúng tôi sẽ gửi mã xác thực để đặt lại mật
            khẩu.
          </Text>
          <View style={styles.inputContainer}>
            <Icon name="mail-outline" size={20} color="#888" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
            />
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() =>
              navigation.navigate("VerifyCode", { email: "example@email.com" })
            }
          >
            <Text style={styles.loginButtonText}>Gửi mã</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
