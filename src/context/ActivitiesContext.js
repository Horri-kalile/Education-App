import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

const ActivitiesContext = createContext();

export const useActivities = () => {
  const context = useContext(ActivitiesContext);
  if (!context) {
    throw new Error("useActivities must be used within an ActivitiesProvider");
  }
  return context;
};

export const ActivitiesProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Fetch all activities
  const fetchActivities = async () => {
    try {
      setIsLoading(true);
      console.log("ActivitiesContext: Fetching activities...");

      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("ActivitiesContext: Error fetching activities:", error);
        return { success: false, error: error.message };
      }

      console.log("ActivitiesContext: Fetched activities:", data?.length || 0);
      setActivities(data || []);
      return { success: true, data };
    } catch (error) {
      console.error("ActivitiesContext: Exception in fetchActivities:", error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Create new activity (admin only)
  const createActivity = async (activityData) => {
    try {
      if (!user) {
        return { success: false, error: "User not authenticated" };
      }

      setIsLoading(true);
      console.log("ActivitiesContext: Creating activity...", activityData);

      const newActivity = {
        title: activityData.title,
        description: activityData.description,
        content: activityData.content,
        correction: activityData.correction || null,
        created_by: user.id,
        is_published: true,
      };

      const { data, error } = await supabase
        .from("activities")
        .insert([newActivity])
        .select()
        .single();

      if (error) {
        console.error("ActivitiesContext: Error creating activity:", error);
        return { success: false, error: error.message };
      }

      console.log("ActivitiesContext: Activity created successfully:", data);

      // Add to local state
      setActivities((prev) => [data, ...prev]);

      return { success: true, data };
    } catch (error) {
      console.error("ActivitiesContext: Exception in createActivity:", error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Update activity (admin only)
  const updateActivity = async (activityId, activityData) => {
    try {
      if (!user) {
        return { success: false, error: "User not authenticated" };
      }

      setIsLoading(true);
      console.log("ActivitiesContext: Updating activity...", activityId);

      const updateData = {
        title: activityData.title,
        description: activityData.description,
        content: activityData.content,
        correction: activityData.correction || null,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("activities")
        .update(updateData)
        .eq("id", activityId)
        .eq("created_by", user.id) // Only update own activities
        .select()
        .single();

      if (error) {
        console.error("ActivitiesContext: Error updating activity:", error);
        return { success: false, error: error.message };
      }

      console.log("ActivitiesContext: Activity updated successfully:", data);

      // Update local state
      setActivities((prev) =>
        prev.map((activity) => (activity.id === activityId ? data : activity))
      );

      return { success: true, data };
    } catch (error) {
      console.error("ActivitiesContext: Exception in updateActivity:", error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Delete activity (admin only)
  const deleteActivity = async (activityId) => {
    try {
      if (!user) {
        console.error("ActivitiesContext: No user found for delete");
        return { success: false, error: "User not authenticated" };
      }

      console.log("ActivitiesContext: Delete attempt by user:", user.id);
      console.log("ActivitiesContext: Deleting activity ID:", activityId);

      setIsLoading(true);

      const { error } = await supabase
        .from("activities")
        .delete()
        .eq("id", activityId)
        .eq("created_by", user.id); // Only delete own activities

      if (error) {
        console.error("ActivitiesContext: Supabase delete error:", error);
        return { success: false, error: error.message };
      }

      console.log(
        "ActivitiesContext: Activity deleted successfully from database"
      );

      // Remove from local state
      setActivities((prev) => {
        const newActivities = prev.filter(
          (activity) => activity.id !== activityId
        );
        console.log(
          "ActivitiesContext: Updated local activities count:",
          newActivities.length
        );
        return newActivities;
      });

      return { success: true };
    } catch (error) {
      console.error("ActivitiesContext: Exception in deleteActivity:", error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Get activities by searching title (for filtering if needed)
  const searchActivities = (searchTerm) => {
    return activities.filter(
      (activity) =>
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Fetch activities when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchActivities();
    } else {
      setActivities([]);
    }
  }, [isAuthenticated]);

  const value = {
    activities,
    isLoading,
    fetchActivities,
    createActivity,
    updateActivity,
    deleteActivity,
    searchActivities,
  };

  return (
    <ActivitiesContext.Provider value={value}>
      {children}
    </ActivitiesContext.Provider>
  );
};
