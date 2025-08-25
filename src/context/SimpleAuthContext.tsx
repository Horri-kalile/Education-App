import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Platform } from "react-native";
import { supabase } from "../lib/supabase";
import { AuthUser } from "../types";

interface SimpleAuthContextType {
  user: AuthUser | null;
  session: any;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  signUp: (email: string, password: string, userData?: any) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Simplified Authentication context for debugging
 */
const AuthContext = createContext<SimpleAuthContextType | undefined>(undefined);

export const useAuth = (): SimpleAuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [session, setSession] = useState<any>(null);

  // Check for stored authentication on app start
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(
        "AuthContext: Initial session:",
        session?.user?.email || "No session"
      );
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log(
        "AuthContext: Auth state changed:",
        _event,
        session?.user?.email || "No user"
      );
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log("AuthContext: Starting login with email:", email);
      setIsLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error("AuthContext: Login error:", error);
        return { success: false, error: error.message };
      }

      console.log("AuthContext: Login successful:", data.user?.email);
      return { success: true, user: data.user };
    } catch (error: any) {
      console.error("AuthContext: Login exception:", error);
      return { success: false, error: error?.message || 'Unknown error' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log("AuthContext: Starting logout...");
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("AuthContext: Logout error:", error);
        return { success: false, error: error.message };
      }

      console.log("AuthContext: Logout successful");
      return { success: true };
    } catch (error: any) {
      console.error("AuthContext: Logout exception:", error);
      return { success: false, error: error?.message || 'Unknown error' };
    }
  };

  const signUp = async (email: string, password: string, userData: any = {}) => {
    try {
      console.log("AuthContext: Starting signup with email:", email);
      setIsLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: userData.full_name || email.split("@")[0],
            ...userData,
          },
        },
      });

      if (error) {
        console.error("AuthContext: Signup error:", error);
        return { success: false, error: error.message };
      }

      console.log("AuthContext: Signup successful:", data.user?.email);
      return {
        success: true,
        user: data.user,
        needsVerification: !data.session,
      };
    } catch (error: any) {
      console.error("AuthContext: Signup exception:", error);
      return { success: false, error: error?.message || 'Unknown error' };
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log("AuthContext: Starting Google sign in");
      setIsLoading(true);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: Platform.OS === "web" ? undefined : undefined,
        },
      });

      if (error) {
        console.error("AuthContext: Google sign in error:", error);
        return { success: false, error: error.message };
      }

      console.log("AuthContext: Google sign in initiated");
      return { success: true };
    } catch (error: any) {
      console.error("AuthContext: Google sign in exception:", error);
      return { success: false, error: error?.message || 'Unknown error' };
    } finally {
      setIsLoading(false);
    }
  };

  // Simple admin detection
  const isAdmin = user?.email === "khalilhorri9@gmail.com";

  console.log("AuthContext: Current state:", {
    hasUser: !!user,
    userEmail: user?.email,
    isAdmin,
    isAuthenticated: !!session && !!user,
  });

  const value: SimpleAuthContextType = {
    user,
    session,
    isLoading,
    login,
    logout,
    signUp,
    signInWithGoogle,
    isAuthenticated: !!session && !!user,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
