import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface TempUser {
  id: string;
  email: string;
  password: string;
  role: string;
  name: string;
}

interface TempAuthUser {
  id: string;
  email: string;
  user_metadata: {
    name: string;
    role: string;
  };
}

interface TempAuthContextType {
  user: TempAuthUser | null;
  session: any;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  signUp: (email: string, password: string, userData?: any) => Promise<any>;
  updateUser: (userData: any) => Promise<any>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Temporary Authentication context using local storage
 * This will work until Supabase is properly configured
 */
const AuthContext = createContext<TempAuthContextType | undefined>(undefined);

export const useAuth = (): TempAuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<TempAuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [session, setSession] = useState<any>(null);

  // Simple local users database for testing
  const localUsers: TempUser[] = [
    {
      id: "1",
      email: "admin@mrnaimapp.com",
      password: "admin123",
      role: "admin",
      name: "Admin User",
    },
    {
      id: "2",
      email: "student@mrnaimapp.com",
      password: "student123",
      role: "student",
      name: "Student User",
    },
  ];

  useEffect(() => {
    // Check for stored session
    if (typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem("tempUser");
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setSession({ user: userData });
        } catch (error) {
          console.error("Error parsing stored user:", error);
          localStorage.removeItem("tempUser");
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log("Temp AuthContext: Starting login with email:", email);
      setIsLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Find user in local database
      const foundUser = localUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        return { success: false, error: "Email ou mot de passe incorrect" };
      }

      // Create user object similar to Supabase format
      const userData: TempAuthUser = {
        id: foundUser.id,
        email: foundUser.email,
        user_metadata: {
          name: foundUser.name,
          role: foundUser.role,
        },
      };

      // Store in localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem("tempUser", JSON.stringify(userData));
      }

      setUser(userData);
      setSession({ user: userData });

      console.log("Temp AuthContext: Login successful:", userData);
      return { success: true, user: userData };
    } catch (error: any) {
      console.error("Temp AuthContext: Login error:", error);
      return { success: false, error: error?.message || 'Unknown error' };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: any = {}) => {
    try {
      console.log("Temp AuthContext: Starting signup with email:", email);
      setIsLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if user already exists
      const existingUser = localUsers.find((u) => u.email === email);
      if (existingUser) {
        return {
          success: false,
          error: "Un compte avec cet email existe déjà",
        };
      }

      // Create new user
      const newUser: TempAuthUser = {
        id: Date.now().toString(),
        email: email,
        user_metadata: {
          name: email.split("@")[0],
          role: email.includes("admin") ? "admin" : "student",
        },
      };

      // Add to local users (in real app, this would be sent to database)
      localUsers.push({
        id: newUser.id,
        email: email,
        password: password,
        role: newUser.user_metadata.role,
        name: newUser.user_metadata.name,
      });

      console.log("Temp AuthContext: Signup successful:", newUser);
      return { success: true, user: newUser, needsVerification: false };
    } catch (error: any) {
      console.error("Temp AuthContext: Signup error:", error);
      return { success: false, error: error?.message || 'Unknown error' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log("Temp AuthContext: Starting logout...");
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem("tempUser");
      }
      setUser(null);
      setSession(null);
      console.log("Temp AuthContext: Logout successful");
      return { success: true };
    } catch (error: any) {
      console.error("Temp AuthContext: Logout error:", error);
      return { success: false, error: error?.message || 'Unknown error' };
    }
  };

  const updateUser = async (userData: any) => {
    try {
      const updatedUser = {
        ...user!,
        user_metadata: { ...user!.user_metadata, ...userData },
      };
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem("tempUser", JSON.stringify(updatedUser));
      }
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (error: any) {
      console.error("Temp AuthContext: Update user error:", error);
      return { success: false, error: error?.message || 'Unknown error' };
    }
  };

  const value: TempAuthContextType = {
    user,
    session,
    isLoading,
    login,
    logout,
    signUp,
    updateUser,
    isAuthenticated: !!session && !!user,
    isAdmin: !!(
      user?.user_metadata?.role === "admin" || user?.email?.includes("admin")
    ),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
