import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
  categoryFilterContainer: {
    paddingVertical: 12,
    paddingLeft: 16,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  categoryButtonActive: {
    backgroundColor: "#3858F8",
    borderColor: "#3858F8",
  },
  categoryText: {
    fontSize: 14,
    color: "#444",
    fontWeight: "500",
  },
  categoryTextActive: {
    color: "#fff",
  },
  listContent: {
    paddingHorizontal: 8,
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
    height: 44,
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0D0D0D",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#0D0D0D",
    marginRight: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  searchButton: {
    width: 45,
    height: 45,
    borderRadius: 8,
    backgroundColor: "#3858F8",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#6B6B6B",
  },
});
