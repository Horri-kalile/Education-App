-- Categories and Levels tables with many-to-many relationships to Activities
-- Run this in your Supabase SQL Editor

-- 1. Create the categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create the levels table
CREATE TABLE IF NOT EXISTS public.levels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Add category_id to activities table for many-to-many relationship
ALTER TABLE public.activities 
ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL;

-- 4. Add level_id to activities table for many-to-many relationship  
ALTER TABLE public.activities 
ADD COLUMN IF NOT EXISTS level_id UUID REFERENCES public.levels(id) ON DELETE SET NULL;

-- 5. Enable Row Level Security on new tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.levels ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS policies for categories
-- Allow all authenticated users to read categories
CREATE POLICY "Enable read access for authenticated users" ON public.categories
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow admins to create, update, and delete categories
CREATE POLICY "Enable insert for admins only" ON public.categories
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND 
    EXISTS (
      SELECT 1 FROM public.students 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Enable update for admins only" ON public.categories
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND 
    EXISTS (
      SELECT 1 FROM public.students 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Enable delete for admins only" ON public.categories
  FOR DELETE USING (
    auth.role() = 'authenticated' AND 
    EXISTS (
      SELECT 1 FROM public.students 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- 7. Create RLS policies for levels
-- Allow all authenticated users to read levels
CREATE POLICY "Enable read access for authenticated users" ON public.levels
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow admins to create, update, and delete levels
CREATE POLICY "Enable insert for admins only" ON public.levels
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND 
    EXISTS (
      SELECT 1 FROM public.students 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Enable update for admins only" ON public.levels
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND 
    EXISTS (
      SELECT 1 FROM public.students 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Enable delete for admins only" ON public.levels
  FOR DELETE USING (
    auth.role() = 'authenticated' AND 
    EXISTS (
      SELECT 1 FROM public.students 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- 8. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_categories_name ON public.categories(name);
CREATE INDEX IF NOT EXISTS idx_levels_name ON public.levels(name);
CREATE INDEX IF NOT EXISTS idx_activities_category ON public.activities(category_id);
CREATE INDEX IF NOT EXISTS idx_activities_level ON public.activities(level_id);

-- 9. Create triggers to automatically update the updated_at timestamp
-- For categories table
CREATE TRIGGER update_categories_updated_at 
  BEFORE UPDATE ON public.categories 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- For levels table
CREATE TRIGGER update_levels_updated_at 
  BEFORE UPDATE ON public.levels 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 10. Create helpful views for easier querying
-- View to get activities with their categories and levels
CREATE OR REPLACE VIEW activity_complete AS
SELECT 
  a.id,
  a.title,
  a.description,
  a.content,
  a.correction,
  a.created_by,
  a.created_at,
  a.updated_at,
  a.is_published,
  a.category_id,
  a.level_id,
  c.name as category_name,
  l.name as level_name
FROM public.activities a
LEFT JOIN public.categories c ON a.category_id = c.id
LEFT JOIN public.levels l ON a.level_id = l.id;
