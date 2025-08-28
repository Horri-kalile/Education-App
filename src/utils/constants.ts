/**
 * Application constants
 */

// Class levels
export const CLASS_LEVELS = {
  FIRST_YEAR: "1ère année",
  SECOND_YEAR: "2ème année",
  THIRD_YEAR: "3ème année",
  BAC: "Bac",
} as const;

// User roles
export const USER_ROLES = {
  ADMIN: "admin",
  STUDENT: "student",
} as const;

// Subject categories
export const SUBJECTS: readonly string[] = [
  "Mathématiques",
  "Histoire",
  "Français",
  "Sciences",
  "Physique",
  "Chimie",
  "Biologie",
  "Géographie",
] as const;

// App theme colors
export const COLORS = {
  primary: "#667eea",
  secondary: "#764ba2",
  success: "#4CAF50",
  warning: "#FF9800",
  error: "#f44336",
  info: "#2196F3",
  light: "#f8f9fa",
  dark: "#333",
  gray: "#666",
  border: "#e0e0e0",
} as const;

// Screen dimensions
export const SCREEN_PADDING = 20;
export const CARD_BORDER_RADIUS = 12;
export const BUTTON_BORDER_RADIUS = 8;

// Type exports for better type safety
export type ClassLevel = (typeof CLASS_LEVELS)[keyof typeof CLASS_LEVELS];
export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type Subject = (typeof SUBJECTS)[number];
export type AppColor = (typeof COLORS)[keyof typeof COLORS];
