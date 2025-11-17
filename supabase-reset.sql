-- =====================================================
-- RESET SCRIPT - Run this BEFORE running schema.sql
-- This will drop all existing tables and start fresh
-- =====================================================

-- Drop tables in reverse order of dependencies
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS experiences CASCADE;
DROP TABLE IF EXISTS meals CASCADE;

-- Drop any custom types if they exist
DROP TYPE IF EXISTS booking_status CASCADE;

-- Success message
SELECT 'All tables dropped successfully! Now run supabase-schema.sql' AS status;
