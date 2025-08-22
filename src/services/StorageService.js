import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

/**
 * Storage service that works on both web and mobile
 * Uses SecureStore on mobile and localStorage on web
 */

const isWeb = Platform.OS === "web";

export const StorageService = {
  async getItem(key) {
    try {
      if (isWeb) {
        // Use localStorage for web
        return localStorage.getItem(key);
      } else {
        // Use SecureStore for mobile
        return await SecureStore.getItemAsync(key);
      }
    } catch (error) {
      console.error("Storage getItem error:", error);
      return null;
    }
  },

  async setItem(key, value) {
    try {
      if (isWeb) {
        // Use localStorage for web
        localStorage.setItem(key, value);
        return true;
      } else {
        // Use SecureStore for mobile
        await SecureStore.setItemAsync(key, value);
        return true;
      }
    } catch (error) {
      console.error("Storage setItem error:", error);
      return false;
    }
  },

  async removeItem(key) {
    try {
      if (isWeb) {
        // Use localStorage for web
        localStorage.removeItem(key);
        return true;
      } else {
        // Use SecureStore for mobile
        await SecureStore.deleteItemAsync(key);
        return true;
      }
    } catch (error) {
      console.error("Storage removeItem error:", error);
      return false;
    }
  },

  async deleteItem(key) {
    try {
      if (isWeb) {
        // Use localStorage for web
        localStorage.removeItem(key);
        return true;
      } else {
        // Use SecureStore for mobile
        await SecureStore.deleteItemAsync(key);
        return true;
      }
    } catch (error) {
      console.error("Storage deleteItem error:", error);
      return false;
    }
  },
};
