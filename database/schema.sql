-- Simple database setup for the fresh start
-- Run this in your Supabase SQL Editor

-- 1. Create the students table
CREATE TABLE IF NOT EXISTS public.students (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON public.students;
DROP POLICY IF EXISTS "Users can update own profile" ON public.students;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.students;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.students;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.students;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.students;

-- 4. Create new simplified policies
-- Allow authenticated users to read all student profiles (needed for admin checks)
CREATE POLICY "Enable read access for authenticated users" ON public.students
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert their own profile (for signup)
CREATE POLICY "Enable insert for authenticated users only" ON public.students
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow users to update their own profile
CREATE POLICY "Enable update for users based on user_id" ON public.students
  FOR UPDATE USING (auth.uid() = id);

