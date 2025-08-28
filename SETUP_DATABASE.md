# Supabase Database Setup Instructions

## Step 1: Create the Students Table

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Open your project: `zyvvzqqkjaxoinhhqdyy`
3. Navigate to **SQL Editor** in the left sidebar
4. Create a new query and copy-paste the content from `database/schema.sql`
5. Click **Run** to execute the SQL

## Step 2: Configure Google OAuth (Optional)

If you want to enable Google authentication:

1. Go to **Authentication** → **Providers** in your Supabase Dashboard
2. Enable **Google** provider
3. Configure your Google OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add your Supabase callback URL: `https://zyvvzqqkjaxoinhhqdyy.supabase.co/auth/v1/callback`

## Step 3: Test the Setup

1. Start your app: `npm start`
2. Try creating a new account
3. Check the **Authentication** → **Users** tab in Supabase to see the new user
4. Check the **Table Editor** → **students** table to see the user profile

## Database Schema Explanation

The `students` table includes:

- `id`: Links to the auth.users table (automatic)
- `email`: User's email address
- `full_name`: User's display name
- `class_level`: Student's grade level ('1ère année', '2ème année', '3ème année', 'Bac')
- `is_admin`: Boolean flag for admin users
- `created_at` & `updated_at`: Timestamps

## Security Features

- **Row Level Security (RLS)** is enabled
- Users can only view/edit their own profile
- Admins can view/edit all profiles
- Automatic profile creation via database triggers

## Troubleshooting

If you encounter issues:

1. **Profile not created**: Check if the trigger was created successfully
2. **Permission errors**: Verify RLS policies are active
3. **Google OAuth not working**: Check your OAuth configuration in both Google Console and Supabase

## Next Steps

After setting up the database:

1. Test user registration
2. Set up admin users by manually updating `is_admin = true` in the students table
3. Add class selection during registration
4. Implement profile editing functionality
