-- Supabase Database Schema for Bite&Bed
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/YOUR_PROJECT/sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Meals table
CREATE TABLE meals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  host TEXT NOT NULL,
  location TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 5.0,
  reviews INTEGER DEFAULT 0,
  images TEXT[] NOT NULL,
  price INTEGER NOT NULL,
  description TEXT,
  group_size TEXT,
  duration TEXT,
  tags TEXT[],
  highlights TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Experiences table
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  host TEXT NOT NULL,
  location TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 5.0,
  reviews INTEGER DEFAULT 0,
  images TEXT[],
  image TEXT,
  price INTEGER NOT NULL,
  description TEXT,
  group_size TEXT,
  duration TEXT,
  tags TEXT[],
  highlights TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table (requires auth.users from Supabase Auth)
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  listing_type TEXT NOT NULL CHECK (listing_type IN ('meal', 'experience')),
  listing_id UUID NOT NULL,
  booking_date DATE NOT NULL,
  guests INTEGER NOT NULL,
  total_price INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  listing_type TEXT NOT NULL CHECK (listing_type IN ('meal', 'experience')),
  listing_id UUID NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can read meals and experiences
CREATE POLICY "Public meals read" ON meals FOR SELECT USING (true);
CREATE POLICY "Public experiences read" ON experiences FOR SELECT USING (true);

-- Only authenticated users can create bookings
CREATE POLICY "Authenticated users can create bookings" ON bookings 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only see their own bookings
CREATE POLICY "Users can view own bookings" ON bookings 
  FOR SELECT USING (auth.uid() = user_id);

-- Only authenticated users can create reviews
CREATE POLICY "Authenticated users can create reviews" ON reviews 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Anyone can read reviews
CREATE POLICY "Public reviews read" ON reviews FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX idx_meals_location ON meals(location);
CREATE INDEX idx_meals_rating ON meals(rating DESC);
CREATE INDEX idx_experiences_location ON experiences(location);
CREATE INDEX idx_experiences_rating ON experiences(rating DESC);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_reviews_listing ON reviews(listing_type, listing_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to auto-update updated_at
CREATE TRIGGER update_meals_updated_at BEFORE UPDATE ON meals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
