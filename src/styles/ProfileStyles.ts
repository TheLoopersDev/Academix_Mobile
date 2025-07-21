import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const instructorCardWidth = (width - 48) / 2; // 16 padding, 8*2 margin

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
  // Header
  header: {
    padding: 16,
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0D0D0D",
  },
  title: {
    fontSize: 14,
    color: "#6B6B6B",
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: "#3858F8",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  // Tab Navigator
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabButtonActive: {
    borderBottomColor: "#3858F8",
  },
  tabText: {
    fontSize: 16,
    color: "#6B6B6B",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#3858F8",
  },
  // Content
  contentContainer: {
    padding: 16,
  },
  // Edit Info Form
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#444",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  flex1: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: "#3858F8",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  // My Courses & Lectures List
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: "row",
    overflow: "hidden",
    elevation: 2,
  },
  courseImage: {
    width: 100,
    height: "100%",
  },
  courseInfo: {
    flex: 1,
    padding: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 12,
    color: "gray",
    marginBottom: 8,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#3858F8",
    borderRadius: 3,
  },
  // List container style
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  // Instructor Card Styles
  instructorCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    width: instructorCardWidth,
    margin: 8,
    padding: 16,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#3858F8",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  instructorAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#f0f0f0",
  },
  instructorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D0D0D",
    marginBottom: 2,
  },
  instructorTitle: {
    fontSize: 12,
    color: "#6B6B6B",
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  statText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  statLabel: {
    fontSize: 12,
    color: "gray",
    marginLeft: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    flex: 1,
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: "#F0F0F0",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "500",
  },
  secondaryButtonText: {
    color: "#333",
  },
  instructorListContainer: {
    padding: 8,
  },
  // Menu Item (Logout)
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  menuItemText: {
    marginLeft: 16,
    fontSize: 16,
    color: "#444",
  },
});
