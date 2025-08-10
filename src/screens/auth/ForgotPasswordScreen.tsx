import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Alert,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { styles } from "../../styles/auth/ForgotPasswordStyles";
import Icon from "react-native-vector-icons/Ionicons";

// Import API service
// import { forgotPasswordApi } from "../../services/api"; // Assuming you have a forgotten password API

type AuthStackParamList = {
  ForgotPassword: undefined;
  VerifyCode: { email: string };
};
type Props = StackScreenProps<AuthStackParamList, "ForgotPassword">;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }
    // TODO: Add email validation regex if needed

    setLoading(true);
    try {
      // Assuming a forgot password API that sends a code to the email
      // await forgotPasswordApi(email);
      Alert.alert(
        "Success",
        "A verification code has been sent to your email."
      );
      navigation.navigate("VerifyCode", { email });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to send verification code.";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Enter your email and we'll send you a verification code to reset
            your password.
          </Text>
          <View style={styles.inputContainer}>
            <Icon name="mail-outline" size={20} color="#888" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.disabledButton]}
            onPress={handleSendCode}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? "Sending..." : "Send Code"}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
