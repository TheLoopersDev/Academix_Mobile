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
import { styles } from "../../styles/auth/VerifyCodeStyles";
import Icon from "react-native-vector-icons/Ionicons";

// Import API service
import { activateUserApi } from "../../services/api";

type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  VerifyCode: { email: string; activationToken: string };
};
type Props = StackScreenProps<AuthStackParamList, "VerifyCode">;

export default function VerifyCodeScreen({ route, navigation }: Props) {
  const { email, activationToken } = route.params;
  const [activationCode, setActivationCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyCode = async () => {
    if (activationCode.length !== 4) {
      // Assuming the code is 4 digits long
      Alert.alert("Error", "Invalid verification code.");
      return;
    }
    setLoading(true);
    try {
      await activateUserApi(activationToken, activationCode);
      Alert.alert("Success", "Your account has been activated!");
      navigation.navigate("Login");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Account activation failed.";
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
        <View style={styles.formContainer}>
          <Text style={styles.title}>Verify your account</Text>
          <Text style={styles.subtitle}>
            Please enter the code sent to {"\n"}
            <Text style={styles.emailText}>{email}</Text>
          </Text>
          <View style={styles.inputContainer}>
            <Icon name="key-outline" size={20} color="#888" />
            <TextInput
              style={styles.input}
              placeholder="Verification Code"
              keyboardType="number-pad"
              value={activationCode}
              onChangeText={setActivationCode}
              maxLength={4}
            />
          </View>
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.disabledButton]}
            onPress={handleVerifyCode}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? "Verifying..." : "Verify"}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
