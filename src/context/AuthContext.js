import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [roleChecked, setRoleChecked] = useState(false); // Add flag to prevent infinite loop

  // Failsafe: force stop loading after 10 seconds to avoid infinite spinner
  useEffect(() => {
    const failSafe = setTimeout(() => {
      if (isLoading) {
        console.warn(
          "AuthContext: Failsafe timeout reached -> setIsLoading(false)"
        );
        setIsLoading(false);
      }
    }, 10000);
    return () => clearTimeout(failSafe);
  }, [isLoading]);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        // Don't call checkUserRole here - let the useEffect below handle it
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        // Don't call checkUserRole here - let the useEffect below handle it
      } else {
        setUser(null);
        setIsAdmin(false);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Separate useEffect to check user role when user state changes
  useEffect(() => {
    if (user && user.email && !roleChecked) {
      console.log(
        "AuthContext: User state changed, checking role for:",
        user.email
      );
      checkUserRole(user.id);
    } else if (!user) {
      // Reset role check flag when user logs out
      setRoleChecked(false);
    }
  }, [user, roleChecked]); // This runs whenever 'user' or 'roleChecked' changes

  const checkUserRole = async (userId) => {
    try {
      console.log("AuthContext: checkUserRole starting for", userId);
      console.log("AuthContext: Current user object:", user);

      if (user && user.email) {
        console.log("AuthContext: Checking email in database:", user.email);

        // Add timeout to prevent hanging queries
        const queryPromise = supabase
          .from("students")
          .select("is_admin, full_name")
          .eq("id", userId)
          .maybeSingle();

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Database query timeout")), 8000)
        );

        const { data, error } = await Promise.race([
          queryPromise,
          timeoutPromise,
        ]);

        console.log("AuthContext: Database query result:", { data, error });

        if (error) {
          console.error("AuthContext: Database error:", error);
          // Don't logout on database errors, just default to student
          setIsAdmin(false);
        } else if (data) {
          console.log("AuthContext: User found in database:", data);
          console.log("AuthContext: is_admin value:", data.is_admin);

          const isUserAdmin = data.is_admin === true;
          console.log("AuthContext: Setting isAdmin to:", isUserAdmin);
          setIsAdmin(isUserAdmin);

          // Add a small delay to ensure state is updated
          setTimeout(() => {
            console.log("AuthContext: Admin status confirmed:", isUserAdmin);
          }, 100);
        } else {
          console.log(
            "AuthContext: User not found in students table, creating as student"
          );
          // User doesn't exist in students table, create them as student
          await createStudentProfile(userId);
          setIsAdmin(false);
        }
      } else {
        console.log("AuthContext: No user email found, defaulting to student");
        setIsAdmin(false);
      }
    } catch (error) {
      if (error.message === "Database query timeout") {
        console.warn(
          "AuthContext: Database query timed out, defaulting to student"
        );
      } else {
        console.error("AuthContext: Exception in checkUserRole:", error);
      }
      // Don't logout on errors, just default to student
      setIsAdmin(false);
    } finally {
      console.log(
        "AuthContext: checkUserRole completed, setting isLoading to false"
      );
      setIsLoading(false);
      setRoleChecked(true); // Mark that we've checked the role
    }
  };

  const createStudentProfile = async (userId) => {
    try {
      console.log("AuthContext: createStudentProfile starting for", userId);

      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) {
        console.warn("AuthContext: No authenticated user found");
        return;
      }

      console.log("AuthContext: Creating profile with data:", {
        id: userId,
        email: userData.user.email,
        full_name:
          userData.user.user_metadata?.full_name ||
          userData.user.email.split("@")[0],
      });

      const { error } = await supabase.from("students").insert({
        id: userId,
        email: userData.user.email,
        full_name:
          userData.user.user_metadata?.full_name ||
          userData.user.email.split("@")[0],
        is_admin: false,
      });

      if (error) {
        console.error("AuthContext: Error creating student profile:", error);
      } else {
        console.log("AuthContext: Student profile created successfully");
      }
    } catch (error) {
      console.error("AuthContext: Exception in createStudentProfile:", error);
    }
  };

  const login = async (email, password) => {
    try {
      setIsLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: error.message };
    }
  };

  const signUp = async (email, password, fullName) => {
    try {
      setIsLoading(true);

      // Create the auth user with metadata
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (authError) {
        setIsLoading(false);
        return { success: false, error: authError.message };
      }

      setIsLoading(false);
      return {
        success: true,
        needsVerification: !authData.session,
        message:
          "Compte créé avec succès! Vous pouvez maintenant vous connecter.",
      };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      console.log("AuthContext: logout called");

      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Logout timeout")), 5000)
      );

      const signOutPromise = supabase.auth.signOut();

      try {
        console.log("AuthContext: Calling supabase.auth.signOut()");
        const { error } = await Promise.race([signOutPromise, timeoutPromise]);

        if (error) {
          console.error("AuthContext: Logout error:", error);
        } else {
          console.log("AuthContext: Supabase signOut successful");
        }
      } catch (timeoutError) {
        console.warn(
          "AuthContext: SignOut timed out, proceeding with local logout:",
          timeoutError.message
        );
      }

      // Clear state immediately regardless of signOut result
      console.log("AuthContext: Clearing user state");
      setUser(null);
      setIsAdmin(false);
      setIsLoading(false);

      console.log("AuthContext: Logout completed successfully");
      return { success: true };
    } catch (error) {
      console.error("AuthContext: Exception in logout:", error);
      // Still clear state even if there's an error
      console.log("AuthContext: Clearing state due to error");
      setUser(null);
      setIsAdmin(false);
      setIsLoading(false);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    isLoading,
    isAdmin,
    isAuthenticated: !!user,
    login,
    signUp,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
