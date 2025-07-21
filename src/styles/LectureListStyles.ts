import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2; // 16 padding, 8*2 margin

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
  listContent: {
    padding: 8,
  },
  instructorCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    width: cardWidth,
    margin: 8,
    padding: 16,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#3858F8",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#f0f0f0",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D0D0D",
    marginBottom: 2,
  },
  title: {
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
  primaryButton: {
    backgroundColor: "#3858F8",
  },
  secondaryButton: {
    backgroundColor: "#F0F0F0",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "500",
  },
  primaryButtonText: {
    color: "#fff",
  },
  secondaryButtonText: {
    color: "#333",
  },
});
