import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { styles } from "../../styles/auth/SignUpStyles";
import Icon from "react-native-vector-icons/Ionicons";

// Import API service
import { registrationUserApi } from "../../services/api";

type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  VerifyCode: { email: string; activationToken: string };
};
type Props = StackScreenProps<AuthStackParamList, "SignUp">;

export default function SignUpScreen({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    // 1. Validation for the Full Name field
    const nameRegex = /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/;
    if (!name.trim()) {
      Alert.alert("Error", "Please enter your full name.");
      return;
    }
    if (name.length < 3) {
      Alert.alert("Error", "Full name must have at least 3 characters.");
      return;
    }
    if (!nameRegex.test(name)) {
      Alert.alert(
        "Error",
        "Invalid full name. Please enter a valid name (e.g., Nguyen Van A)."
      );
      return;
    }

    // 2. Basic email validation
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    // 3. Validation for the Password field
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|:;"'<>,.?/~`-])[A-Za-z\d!@#$%^&*()_+={}\[\]|:;"'<>,.?/~`-]{8,}$/;
    if (!password) {
      Alert.alert("Error", "Please enter your password.");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Error", "Password must have at least 8 characters.");
      return;
    }
    if (!passwordRegex.test(password)) {
      Alert.alert(
        "Error",
        "Password must contain at least 1 uppercase letter, 1 number, and 1 special character."
      );
      return;
    }

    // If all validations pass, proceed with the API call
    setLoading(true);
    try {
      const res = await registrationUserApi(name, email, password);
      const { activationToken, message } = res.data;
      Alert.alert("Success", message);
      navigation.navigate("VerifyCode", { email, activationToken });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Registration failed.";
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
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>Create an account</Text>
            <View style={styles.inputContainer}>
              <Icon name="person-outline" size={20} color="#888" />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
              />
            </View>
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
            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={20} color="#888" />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
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
            <TouchableOpacity
              style={[styles.loginButton, loading && styles.disabledButton]}
              onPress={handleSignUp}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? "Registering..." : "Sign Up"}
              </Text>
            </TouchableOpacity>
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.signupLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
