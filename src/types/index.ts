// Import Supabase types
import { User as SupabaseUser } from '@supabase/supabase-js';

// Database Types
export interface User {
  id: string;
  email?: string;
  role: 'admin' | 'student';
  created_at: string;
}

// For compatibility with Supabase User type
export type AuthUser = SupabaseUser;

export interface Activity {
  id: string;
  title: string;
  description: string;
  content: string;
  correction?: string | null;
  created_by: string;
  is_published: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

export interface Class {
  id: string;
  name: string;
  level_order: number;
  created_at: string;
}

export interface DifficultyLevel {
  id: string;
  name: string;
  level_order: number;
  color_code: string;
  created_at: string;
}

// Enhanced Activity with relations
export interface ActivityWithRelations extends Activity {
  category?: Category;
  class?: Class;
  difficulty_level?: DifficultyLevel;
}

// Context Types
export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  signIn?: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ success: boolean; error?: string; needsVerification?: boolean; message?: string }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
}

export interface ActivitiesContextType {
  activities: Activity[];
  isLoading: boolean;
  fetchActivities: () => Promise<{ success: boolean; error?: string }>;
  createActivity: (activityData: Partial<Activity>) => Promise<{ success: boolean; data?: Activity; error?: string }>;
  updateActivity: (activityId: string, activityData: Partial<Activity>) => Promise<{ success: boolean; data?: Activity; error?: string }>;
  deleteActivity: (activityId: string) => Promise<{ success: boolean; error?: string }>;
  searchActivities: (searchTerm: string) => Activity[];
}

// Navigation Types
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  ActivityDetail: { activity: Activity };
  AddActivity: { activity?: Activity };
};

// Component Props Types
export interface ActivityCardProps {
  activity: Activity;
  onPress: () => void;
}

export interface FilterState {
  category?: string;
  class?: string;
  difficulty?: string;
  searchTerm?: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
