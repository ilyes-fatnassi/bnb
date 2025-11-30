-- Create storage bucket for meal images
-- Run this in Supabase SQL Editor

-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('meals', 'meals', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for the meals bucket
-- Allow anyone to read/view images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'meals');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload meal images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'meals' 
  AND auth.role() = 'authenticated'
);

-- Allow hosts to update their own meal images
CREATE POLICY "Hosts can update their meal images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'meals' 
  AND auth.role() = 'authenticated'
);

-- Allow hosts to delete their own meal images
CREATE POLICY "Hosts can delete their meal images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'meals' 
  AND auth.role() = 'authenticated'
);
