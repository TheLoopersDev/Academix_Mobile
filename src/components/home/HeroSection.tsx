import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../../styles/HeroSectionStyles";

export default function HeroSection() {
  return (
    <View style={styles.hero}>
      <View style={{ flex: 1 }}>
        <Text style={styles.heroTitle}>
          All The Skills You Need In One Place
        </Text>
        <Text style={styles.heroDesc}>
          From coding skills to business topics. Udemy helpsexpand your
          professional development.
        </Text>
        <TouchableOpacity style={styles.heroButton}>
          <Text style={styles.heroButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require("../../assets/hero.png")}
        style={styles.heroImage}
      />
    </View>
  );
}
