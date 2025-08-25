/**
 * Utility functions for the MR Naim Educational App
 */

/**
 * Format a date to a readable French format
 * @param date - The date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/**
 * Get a color based on subject name
 * @param subject - The subject name
 * @returns Hex color code
 */
export const getSubjectColor = (subject: string): string => {
  const colors: Record<string, string> = {
    Mathématiques: "#2196F3",
    Histoire: "#FF9800",
    Français: "#4CAF50",
    Sciences: "#9C27B0",
    Physique: "#E91E63",
    Chimie: "#00BCD4",
    Biologie: "#8BC34A",
    Géographie: "#795548",
  };
  return colors[subject] || "#666";
};

/**
 * Validate email format
 * @param email - The email to validate
 * @returns True if valid email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Truncate text to specified length
 * @param text - The text to truncate
 * @param length - Maximum length
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, length: number = 100): string => {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + "...";
};

/**
 * Generate a unique ID
 * @returns Unique identifier
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Capitalize first letter of each word
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export const capitalizeWords = (text: string): string => {
  return text.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

/**
 * Sleep utility function for delays
 * @param ms - Milliseconds to sleep
 * @returns Promise that resolves after the delay
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Check if a string is empty or only whitespace
 * @param str - String to check
 * @returns True if string is empty or whitespace
 */
export const isEmpty = (str: string | null | undefined): boolean => {
  return !str || str.trim().length === 0;
};
