-- Clean up hardcoded experiences and keep only one for testing
-- Run this in your Supabase SQL Editor AFTER running supabase-experiences-update.sql

-- First, let's see what we have
-- SELECT id, title, host, location FROM experiences;

-- Delete all experiences except the first one (Medina Walking Tour)
-- We'll keep one for testing purposes
DELETE FROM experiences 
WHERE title != 'Medina of Tunis Walking Tour with Local Guide';

-- Or if you want to keep only the first experience by ID:
-- DELETE FROM experiences WHERE id NOT IN (
--   SELECT id FROM experiences ORDER BY created_at ASC LIMIT 1
-- );

-- Verify what's left
SELECT id, title, host, location, status FROM experiences;

-- Note: If you want to link the remaining experience to your host profile,
-- run this after the deletions (replace 'your-email@example.com' with your actual email):
-- 
-- UPDATE experiences 
-- SET host_id = (
--   SELECT h.id FROM hosts h
--   JOIN auth.users u ON h.user_id = u.id
--   WHERE u.email = 'your-email@example.com'
-- ),
-- status = 'active'
-- WHERE host_id IS NULL;
