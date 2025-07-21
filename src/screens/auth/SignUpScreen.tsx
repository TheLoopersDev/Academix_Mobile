import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { styles } from "../../styles/auth/SignUpStyles";
import Icon from "react-native-vector-icons/Ionicons";

type AuthStackParamList = { Login: undefined; SignUp: undefined };
type Props = StackScreenProps<AuthStackParamList, "SignUp">;

export default function SignUpScreen({ navigation }: Props) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/login-bg.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>Tạo tài khoản</Text>
            <View style={styles.inputContainer}>
              <Icon name="person-outline" size={20} color="#888" />
              <TextInput style={styles.input} placeholder="Họ và tên" />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="mail-outline" size={20} color="#888" />
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={20} color="#888" />
              <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <Icon
                  name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Đăng ký</Text>
            </TouchableOpacity>
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Đã có tài khoản?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.signupLink}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
