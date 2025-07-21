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
import { styles } from "../../styles/auth/VerifyCodeStyles";

type AuthStackParamList = { VerifyCode: { email: string } };
type Props = StackScreenProps<AuthStackParamList, "VerifyCode">;

export default function VerifyCodeScreen({ route }: Props) {
  const { email } = route.params;

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
          <Text style={styles.title}>Xác thực mã</Text>
          <Text style={styles.subtitle}>
            Mã xác thực đã được gửi đến {email}
          </Text>
          <View style={styles.codeInputContainer}>
            <TextInput
              style={styles.codeInput}
              maxLength={1}
              keyboardType="number-pad"
            />
            <TextInput
              style={styles.codeInput}
              maxLength={1}
              keyboardType="number-pad"
            />
            <TextInput
              style={styles.codeInput}
              maxLength={1}
              keyboardType="number-pad"
            />
            <TextInput
              style={styles.codeInput}
              maxLength={1}
              keyboardType="number-pad"
            />
          </View>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Xác nhận</Text>
          </TouchableOpacity>
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Không nhận được mã?</Text>
            <TouchableOpacity>
              <Text style={styles.resendLink}>Gửi lại</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
