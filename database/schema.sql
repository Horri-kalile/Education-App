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

-- 2. Enable RLS (Row Level Security)
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- 3. Simple RLS policies
-- Users can read their own record
CREATE POLICY "Users can read own record" ON public.students
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own record  
CREATE POLICY "Users can update own record" ON public.students
  FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own record
CREATE POLICY "Users can insert own record" ON public.students
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Admins can read all records
CREATE POLICY "Admins can read all" ON public.students
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.students 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- 4. Auto-update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Trigger for auto-updating updated_at
CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 6. Grant permissions
GRANT ALL ON public.students TO authenticated;
