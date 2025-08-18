// Global Color Palette - Warm Academic Theme
export const GlobalColors = {
  // Primary Colors
  primary: "#FF6B6B",        // Coral red - main brand color
  primaryLight: "#FF8A80",   // Light coral
  primaryDark: "#E53935",    // Dark coral
  
  // Secondary Colors  
  secondary: "#4ECDC4",      // Mint green - secondary brand
  secondaryLight: "#81C784", // Light mint
  secondaryDark: "#26A69A",  // Dark mint
  
  // Accent Colors
  accent: "#FFB74D",         // Warm orange accent
  accentLight: "#FFCC80",    // Light orange
  accentDark: "#FF9800",     // Dark orange
  
  // Background Colors
  background: "#FAFAFA",     // Very light gray background
  surface: "#FFFFFF",        // Pure white surface
  card: "#FFFFFF",           // White cards
  overlay: "rgba(0,0,0,0.1)", // Light overlay
  
  // Warm Neutral Colors
  warmBeige: "#F5E6D3",      // Warm beige
  lightBeige: "#FFF3E0",     // Light beige
  creamWhite: "#FFFEF7",     // Cream white
  
  // Text Colors
  textPrimary: "#2C3E50",    // Dark blue-gray for primary text
  textSecondary: "#546E7A",  // Medium gray for secondary text
  textMuted: "#90A4AE",      // Light gray for muted text
  textLight: "#FFFFFF",      // White text for dark backgrounds
  
  // Status Colors
  success: "#4CAF50",        // Green for success
  warning: "#FF9800",        // Orange for warning  
  error: "#F44336",          // Red for error
  info: "#2196F3",           // Blue for info
  
  // Border Colors
  border: "#E0E0E0",         // Light gray border
  borderLight: "#F5F5F5",    // Very light border
  borderDark: "#BDBDBD",     // Medium gray border
  
  // Shadow Colors
  shadow: "rgba(0,0,0,0.1)",     // Light shadow
  shadowMedium: "rgba(0,0,0,0.15)", // Medium shadow
  shadowDark: "rgba(0,0,0,0.2)",    // Dark shadow
  
  // Gradient Colors
  gradientPrimary: ["#FF6B6B", "#FF8A80"],
  gradientSecondary: ["#4ECDC4", "#81C784"],
  gradientWarm: ["#FFB74D", "#FFCC80"],
  gradientBackground: ["#FAFAFA", "#FFFFFF"],
};

// Typography Scale
export const Typography = {
  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 28,
    "4xl": 32,
    "5xl": 36,
    "6xl": 48,
  },
  
  // Font Weights
  fontWeight: {
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
  
  // Letter Spacing (React Native uses numbers, not em units)
  letterSpacing: {
    tight: -0.4,
    normal: 0,
    wide: 0.4,
    wider: 0.8,
    widest: 1.6,
  },
};

// Spacing Scale
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  "6xl": 64,
};

// Border Radius Scale
export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 20,
  "3xl": 24,
  full: 9999,
};

// Component Specific Colors
export const ComponentColors = {
  button: {
    primary: {
      background: GlobalColors.primary,
      text: GlobalColors.textLight,
      border: GlobalColors.primary,
    },
    secondary: {
      background: GlobalColors.secondary,
      text: GlobalColors.textLight,
      border: GlobalColors.secondary,
    },
    outline: {
      background: "transparent",
      text: GlobalColors.primary,
      border: GlobalColors.primary,
    },
    ghost: {
      background: "transparent",
      text: GlobalColors.textPrimary,
      border: "transparent",
    },
  },
  
  card: {
    background: GlobalColors.card,
    border: GlobalColors.border,
    shadow: GlobalColors.shadow,
  },
  
  input: {
    background: GlobalColors.surface,
    border: GlobalColors.border,
    text: GlobalColors.textPrimary,
    placeholder: GlobalColors.textMuted,
  },
  
  header: {
    background: GlobalColors.surface,
    text: GlobalColors.textPrimary,
    border: GlobalColors.borderLight,
  },
  
  navigation: {
    background: GlobalColors.surface,
    active: GlobalColors.primary,
    inactive: GlobalColors.textMuted,
  },
};

export default GlobalColors;
