-- Link existing seed data to host profiles
-- Run this AFTER running supabase-host-schema.sql

-- First, create host profiles for existing hosts in seed data
-- You'll need to manually get user_id values after creating test accounts
-- Or we'll create placeholder entries that can be claimed later

-- For now, let's create placeholder host entries
-- Replace the user_id values with actual user IDs from auth.users table

-- Insert Dr. Baneni as a host
INSERT INTO hosts (
  full_name,
  bio,
  phone,
  address,
  city,
  languages,
  status,
  rating,
  total_reviews
) VALUES (
  'Dr. Baneni',
  'Physician and writer with a passion for sharing Tunisian culture and hospitality. My home is filled with books, stories, and the aroma of traditional couscous every Friday. I believe in the power of sharing meals to bridge cultures and create lasting connections.',
  '+216 XX XXX XXX',
  'Bab Jdid',
  'Tunis',
  ARRAY['Arabic', 'French', 'English'],
  'active',
  5.0,
  89
)
RETURNING id; -- Save this ID to update meals

-- Insert Kenza as a host
INSERT INTO hosts (
  full_name,
  bio,
  phone,
  address,
  city,
  languages,
  status,
  rating,
  total_reviews
) VALUES (
  'Kenza & Family',
  'Welcoming travelers into our medina home for years, treating each guest like extended family. Our kitchen is the heart of our home where traditional recipes passed down through generations come to life. Join us for authentic Tunisian home cooking and warm hospitality.',
  '+216 XX XXX XXX',
  'Tunis Medina',
  'Tunis',
  ARRAY['Arabic', 'French', 'English'],
  'active',
  4.9,
  156
)
RETURNING id; -- Save this ID to update meals

-- Now manually link the meals to hosts:
-- Update Dr. Baneni's meal
-- UPDATE meals SET host_id = '[dr-baneni-host-id]' WHERE host = 'Dr. Baneni';

-- Update Kenza's meal
-- UPDATE meals SET host_id = '[kenza-host-id]' WHERE host = 'Kenza & Family';

-- NOTE: You'll need to run the UPDATE statements manually after getting the host IDs
-- Or you can do it all at once with this approach:

-- Method 2: Do it all in one transaction (SIMPLIFIED - without user_id requirement)
-- First, temporarily remove the NOT NULL constraint from user_id
ALTER TABLE hosts ALTER COLUMN user_id DROP NOT NULL;

DO $$
DECLARE
  baneni_host_id UUID;
  kenza_host_id UUID;
BEGIN
  -- Insert Dr. Baneni (user_id will be NULL for now, can be claimed later)
  INSERT INTO hosts (
    full_name, bio, phone, address, city, languages, status, rating, total_reviews
  ) VALUES (
    'Dr. Baneni',
    'Physician and writer with a passion for sharing Tunisian culture and hospitality. My home is filled with books, stories, and the aroma of traditional couscous every Friday.',
    '+216 XX XXX XXX',
    'Bab Jdid',
    'Tunis',
    ARRAY['Arabic', 'French', 'English'],
    'active',
    5.0,
    89
  ) RETURNING id INTO baneni_host_id;

  -- Insert Kenza (user_id will be NULL for now, can be claimed later)
  INSERT INTO hosts (
    full_name, bio, phone, address, city, languages, status, rating, total_reviews
  ) VALUES (
    'Kenza & Family',
    'Welcoming travelers into our medina home for years. Our kitchen is the heart of our home where traditional recipes come to life.',
    '+216 XX XXX XXX',
    'Tunis Medina',
    'Tunis',
    ARRAY['Arabic', 'French', 'English'],
    'active',
    4.9,
    156
  ) RETURNING id INTO kenza_host_id;

  -- Link meals to hosts
  UPDATE meals SET host_id = baneni_host_id WHERE host = 'Dr. Baneni';
  UPDATE meals SET host_id = kenza_host_id WHERE host = 'Kenza & Family';

  -- Also update their max_guests and status
  UPDATE meals SET max_guests = 10, status = 'active' WHERE host = 'Dr. Baneni';
  UPDATE meals SET max_guests = 8, status = 'active' WHERE host = 'Kenza & Family';

  RAISE NOTICE 'Successfully created hosts and linked meals!';
  RAISE NOTICE 'Dr. Baneni host_id: %', baneni_host_id;
  RAISE NOTICE 'Kenza host_id: %', kenza_host_id;
END $$;

-- Note: user_id is now NULL for these hosts. When real users sign up,
-- you can link them by running: UPDATE hosts SET user_id = '[user-id]' WHERE full_name = 'Dr. Baneni';
