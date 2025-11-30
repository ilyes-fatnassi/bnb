-- PHASE 1: Host System Database Schema
-- Run this in Supabase SQL Editor

-- 1. Create hosts table
CREATE TABLE IF NOT EXISTS hosts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users UNIQUE, -- Nullable to allow seed data, can be linked later
  full_name TEXT NOT NULL,
  bio TEXT,
  profile_photo TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  languages TEXT[] DEFAULT ARRAY['Arabic'],
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'active', 'suspended')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  rating DECIMAL(3,2) DEFAULT 0.0,
  total_reviews INT DEFAULT 0
);

-- 2. Update meals table to link with hosts
ALTER TABLE meals 
  ADD COLUMN IF NOT EXISTS host_id UUID REFERENCES hosts(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'paused', 'archived')),
  ADD COLUMN IF NOT EXISTS max_guests INT DEFAULT 6,
  ADD COLUMN IF NOT EXISTS what_included TEXT[] DEFAULT ARRAY[]::TEXT[];

-- 3. Update experiences table to link with hosts
ALTER TABLE experiences
  ADD COLUMN IF NOT EXISTS host_id UUID REFERENCES hosts(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'paused', 'archived')),
  ADD COLUMN IF NOT EXISTS max_guests INT DEFAULT 8;

-- 4. Update bookings table
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS guest_name TEXT,
  ADD COLUMN IF NOT EXISTS guest_email TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  ADD COLUMN IF NOT EXISTS special_requests TEXT;

-- 5. Enable Row Level Security
ALTER TABLE hosts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for hosts table
-- Anyone can view approved hosts
CREATE POLICY "Anyone can view approved hosts"
  ON hosts FOR SELECT
  USING (status IN ('approved', 'active'));

-- Users can view their own host profile
CREATE POLICY "Users can view own host profile"
  ON hosts FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own host profile
CREATE POLICY "Users can create own host profile"
  ON hosts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own host profile
CREATE POLICY "Users can update own host profile"
  ON hosts FOR UPDATE
  USING (auth.uid() = user_id);

-- 6. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_hosts_user_id ON hosts(user_id);
CREATE INDEX IF NOT EXISTS idx_hosts_status ON hosts(status);
CREATE INDEX IF NOT EXISTS idx_meals_host_id ON meals(host_id);
CREATE INDEX IF NOT EXISTS idx_experiences_host_id ON experiences(host_id);

-- 7. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 8. Create trigger for hosts table
DROP TRIGGER IF EXISTS update_hosts_updated_at ON hosts;
CREATE TRIGGER update_hosts_updated_at
    BEFORE UPDATE ON hosts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 9. Update existing meals to have a default host (optional - for current seed data)
-- This links existing meals to a placeholder host - you can update this manually later
-- Or skip this if you want to manually assign hosts

COMMENT ON TABLE hosts IS 'Stores host profile information for users who want to offer meals and experiences';
COMMENT ON COLUMN hosts.status IS 'pending: awaiting approval, approved: can list, active: actively hosting, suspended: temporarily disabled';
COMMENT ON COLUMN meals.status IS 'draft: not published, active: available for booking, paused: temporarily unavailable, archived: no longer offered';
