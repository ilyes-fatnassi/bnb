-- Add RLS policies for hosts to manage their meals
-- Run this in Supabase SQL Editor

-- Allow hosts to insert their own meals
CREATE POLICY "Hosts can insert their own meals"
ON meals FOR INSERT
WITH CHECK (
  host_id IN (
    SELECT id FROM hosts WHERE user_id = auth.uid()
  )
);

-- Allow hosts to update their own meals
CREATE POLICY "Hosts can update their own meals"
ON meals FOR UPDATE
USING (
  host_id IN (
    SELECT id FROM hosts WHERE user_id = auth.uid()
  )
);

-- Allow hosts to delete their own meals
CREATE POLICY "Hosts can delete their own meals"
ON meals FOR DELETE
USING (
  host_id IN (
    SELECT id FROM hosts WHERE user_id = auth.uid()
  )
);

-- Allow anyone to view active meals (if not already set)
DROP POLICY IF EXISTS "Anyone can view meals" ON meals;
CREATE POLICY "Anyone can view meals"
ON meals FOR SELECT
USING (status = 'active' OR host_id IN (
  SELECT id FROM hosts WHERE user_id = auth.uid()
));
