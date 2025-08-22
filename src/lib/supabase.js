import { AppState, Platform } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// TODO: Replace these with your actual Supabase project credentials
// You can find these in your Supabase Dashboard -> Settings -> API
// For now, using placeholder values to prevent app crashes
const supabaseUrl = "https://zyvvzqqkjaxoinhhqdyy.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5dnZ6cXFramF4b2luaGhxZHl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MDI1ODUsImV4cCI6MjA3MTM3ODU4NX0.jUNe40bCGkfFYr_NgXZw3DazNhshbjRWd2RcOU8Zdo8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    ...(Platform.OS !== "web" ? { storage: AsyncStorage } : {}),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
if (Platform.OS !== "web") {
  AppState.addEventListener("change", (state) => {
    if (state === "active") {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });
}
