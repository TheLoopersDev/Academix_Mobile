import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerImage: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 16,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0D0D0D",
    marginBottom: 8,
  },
  instructorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  instructorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  instructorName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  instructorTitle: {
    fontSize: 12,
    color: "gray",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  statBox: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    color: "gray",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#444",
    marginBottom: 16,
  },
  includeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  includeText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },
  // Course Content Styles
  accordionContainer: {
    backgroundColor: "#F7F8FA",
    borderRadius: 12,
    marginBottom: 10,
    overflow: "hidden",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  accordionMeta: {
    fontSize: 12,
    color: "gray",
  },
  lectureList: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  lectureItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
  },
  lectureNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  lectureNumberText: {
    fontSize: 12,
    color: "#6B6B6B",
  },
  lectureTitle: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  lectureMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  previewTag: {
    backgroundColor: "#e7e9ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  previewText: {
    color: "#3858F8",
    fontSize: 12,
    fontWeight: "500",
  },
  durationText: {
    fontSize: 12,
    color: "gray",
  },
  // FAB
  fabContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    flexDirection: "row",
    alignItems: "center",
  },
  priceContainer: {
    flex: 1,
  },
  discountedPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3858F8",
  },
  originalPrice: {
    fontSize: 14,
    color: "gray",
    textDecorationLine: "line-through",
  },
  addToCartButton: {
    backgroundColor: "#3858F8",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
