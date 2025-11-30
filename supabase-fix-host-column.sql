-- Fix the host and images column constraints
-- Run this in Supabase SQL Editor

-- Make the old 'host' text column nullable since we now use host_id
ALTER TABLE meals 
  ALTER COLUMN host DROP NOT NULL;

-- Make the 'images' column nullable (we'll use 'image' instead)
ALTER TABLE meals 
  ALTER COLUMN images DROP NOT NULL;

-- Set default empty array for images if it's an array type
UPDATE meals SET images = ARRAY[]::TEXT[] WHERE images IS NULL;

-- Optionally, you can also update existing meals to have a host name from the hosts table
UPDATE meals m
SET host = h.full_name
FROM hosts h
WHERE m.host_id = h.id AND m.host IS NULL;
