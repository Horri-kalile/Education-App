# Supabase Setup Guide for MR Naim App

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" and sign up/login
3. Click "New Project"
4. Choose your organization (or create one)
5. Fill in project details:
   - Name: `mr-naim-app`
   - Database Password: (create a strong password)
   - Region: Choose closest to your location
6. Click "Create new project"

## Step 2: Get Your Project Credentials

After your project is created:

1. Go to **Settings** → **API**
2. Copy these two values:
   - **Project URL** (something like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **API Key (anon public)** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## Step 3: Update Your App Configuration

Open the file: `src/lib/supabase.js`

Replace these lines:

```javascript
const supabaseUrl = "YOUR_SUPABASE_URL";
const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY";
```

With your actual values:

```javascript
const supabaseUrl = "https://xxxxxxxxxxxxx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
```

## Step 4: Set Up User Roles (Optional)

To automatically detect admin users, you can either:

### Option A: Use Email-based Detection (Current Setup)

- Any email containing 'admin' will be treated as admin
- Example: `admin@mrnaimapp.com`, `teacher.admin@school.com`

### Option B: Set Up Custom User Metadata

In your Supabase dashboard:

1. Go to **Authentication** → **Users**
2. After users sign up, click on a user
3. Go to **Raw user meta data**
4. Add: `{"role": "admin"}` for admin users

## Step 5: Test the App

1. Start your app: `npx expo start`
2. First, create accounts using "Créer un compte":
   - Admin: `admin@mrnaimapp.com` / `admin123`
   - Student: `student@mrnaimapp.com` / `student123`
3. Check your email for verification (if enabled)
4. Then login with these accounts

## Step 6: Database Tables (Future Enhancement)

Later, you can create custom tables for:

- Student profiles with class levels
- Activities/assignments
- Student progress tracking

## Security Notes

- Never commit your actual Supabase keys to version control
- Consider using environment variables for production
- The anon key is safe to use in client-side code
- Enable Row Level Security (RLS) for production use

## Troubleshooting

If you get errors:

1. Check your internet connection
2. Verify the Supabase URL and key are correct
3. Make sure your Supabase project is active
4. Check the browser console for detailed error messages

## Current Features with Supabase

✅ User registration and login
✅ Email/password authentication  
✅ Automatic session management
✅ Role-based access (admin/student)
✅ Secure logout
✅ Cross-platform compatibility (web/mobile)

## Next Steps

Once Supabase is working, you can:

- Add user profiles with class levels
- Create a database table for activities
- Implement real-time features
- Add file uploads for activity content
