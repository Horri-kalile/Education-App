-- Activities table schema for MR Naim Education App
-- Run this in your Supabase SQL Editor

-- 1. Create the activities table
CREATE TABLE IF NOT EXISTS public.activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL, -- HTML content for the activity
  correction TEXT, -- HTML content for the correction
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_published BOOLEAN DEFAULT true
);

-- 2. Enable Row Level Security
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS policies for activities

-- Allow all authenticated users to read published activities
CREATE POLICY "Enable read access for published activities" ON public.activities
  FOR SELECT USING (auth.role() = 'authenticated' AND is_published = true);

-- Allow admins to create activities
CREATE POLICY "Enable insert for admins only" ON public.activities
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND 
    EXISTS (
      SELECT 1 FROM public.students 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Allow admins to update their own activities
CREATE POLICY "Enable update for admin creators" ON public.activities
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND 
    created_by = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.students 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Allow admins to delete their own activities
CREATE POLICY "Enable delete for admin creators" ON public.activities
  FOR DELETE USING (
    auth.role() = 'authenticated' AND 
    created_by = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.students 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- 4. Create an index for better performance
CREATE INDEX IF NOT EXISTS idx_activities_created_by ON public.activities(created_by);
CREATE INDEX IF NOT EXISTS idx_activities_published ON public.activities(is_published);

-- 5. Create a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_activities_updated_at 
  BEFORE UPDATE ON public.activities 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
