import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  hero: { flexDirection: "row", alignItems: "center", padding: 20 },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3858F8",
    marginBottom: 8,
  },
  heroDesc: { color: "#444", marginBottom: 12 },
  heroButton: {
    backgroundColor: "#3858F8",
    padding: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  heroButtonText: { color: "#fff", fontWeight: "bold" },
  heroImage: { width: 120, height: 120, marginLeft: 10, resizeMode: "contain" },
});
