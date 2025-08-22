import React, { createContext, useContext, useState, useEffect } from "react";
import { authenticateUser } from "../data/sampleData";

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
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    try {
      setIsLoading(true);

      // Simple local authentication using sample data
      const foundUser = authenticateUser(email, password);

      if (foundUser) {
        setUser(foundUser);
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, error: "Email ou mot de passe incorrect" };
      }
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    setUser(null);
    return { success: true };
  };

  const value = {
    user,
    isLoading,
    isAdmin: user?.role === "admin",
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
