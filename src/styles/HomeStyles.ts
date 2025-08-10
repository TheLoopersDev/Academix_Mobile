import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2; // 16 padding, 8*2 margin

export const styles = StyleSheet.create({
  // HomeScreen styles
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F8FA",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: "red",
  },

  // HeroSection styles
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

  // CourseGrid styles
  courseGridContainer: {
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0D0D0D",
    marginBottom: 16,
    paddingHorizontal: 8, // Add padding to match the list
  },
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: cardWidth,
    margin: 8,
    elevation: 3,
    shadowColor: "#3858F8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  courseImage: {
    width: "100%",
    height: 110,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  courseDetails: {
    padding: 12,
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0D0D0D",
    marginBottom: 6,
    height: 44, // Limit to 2 lines
  },
  instructorInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  instructorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  instructorName: {
    fontSize: 12,
    color: "#6B6B6B",
  },
  courseFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#6B6B6B",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3858F8",
  },
});
