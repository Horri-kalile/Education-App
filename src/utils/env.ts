/**
 * Environment configuration utility
 * Validates and exports environment variables
 */

// Required environment variables
const requiredEnvVars = {
  SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
} as const;

// Validate that all required environment variables are present
function validateEnvironment() {
  const missingVars: string[] = [];

  Object.entries(requiredEnvVars).forEach(([key, value]) => {
    if (!value || value.trim() === "") {
      missingVars.push(`EXPO_PUBLIC_${key}`);
    }
  });

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}\n` +
        "Please check your .env file and ensure all required variables are set."
    );
  }
}

// Validate on import
validateEnvironment();

// Export validated environment variables
export const env = {
  SUPABASE_URL: requiredEnvVars.SUPABASE_URL!,
  SUPABASE_ANON_KEY: requiredEnvVars.SUPABASE_ANON_KEY!,

  // Helper to check if we're in development
  isDev: __DEV__,
} as const;

export default env;
