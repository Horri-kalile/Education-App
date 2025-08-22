/**
 * Utility functions for the MR Naim Educational App
 */

/**
 * Format a date to a readable French format
 * @param {Date|string} date - The date to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/**
 * Get a color based on subject name
 * @param {string} subject - The subject name
 * @returns {string} - Hex color code
 */
export const getSubjectColor = (subject) => {
  const colors = {
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
 * @param {string} email - The email to validate
 * @returns {boolean} - True if valid email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Truncate text to specified length
 * @param {string} text - The text to truncate
 * @param {number} length - Maximum length
 * @returns {string} - Truncated text with ellipsis if needed
 */
export const truncateText = (text, length = 100) => {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + "...";
};

/**
 * Generate a unique ID
 * @returns {string} - Unique identifier
 */
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};
