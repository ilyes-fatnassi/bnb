-- Add missing columns to meals table for host meal management
-- Run this in Supabase SQL Editor

ALTER TABLE meals 
  ADD COLUMN IF NOT EXISTS available_days TEXT[] DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN IF NOT EXISTS preparation_time INT,
  ADD COLUMN IF NOT EXISTS meal_type TEXT DEFAULT 'dinner',
  ADD COLUMN IF NOT EXISTS dietary_info TEXT[] DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Tunisian',
  ADD COLUMN IF NOT EXISTS location TEXT,
  ADD COLUMN IF NOT EXISTS image TEXT;

-- Update existing meals to have some default available days
UPDATE meals 
SET available_days = ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
WHERE available_days IS NULL OR array_length(available_days, 1) IS NULL;
