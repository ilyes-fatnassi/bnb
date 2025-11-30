-- Update experiences table to support host management
-- Run this in your Supabase SQL Editor

-- 1. Make sure host_id column exists and is properly linked
ALTER TABLE experiences 
  ADD COLUMN IF NOT EXISTS host_id UUID REFERENCES hosts(id) ON DELETE CASCADE;

-- 2. Add/update status column
ALTER TABLE experiences
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';

-- 3. Update status constraint if it exists, or add it
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage 
    WHERE table_name = 'experiences' AND column_name = 'status'
  ) THEN
    ALTER TABLE experiences DROP CONSTRAINT IF EXISTS experiences_status_check;
  END IF;
END $$;

ALTER TABLE experiences
  ADD CONSTRAINT experiences_status_check 
  CHECK (status IN ('draft', 'active', 'paused', 'archived'));

-- 4. Add what_included column if it doesn't exist
ALTER TABLE experiences
  ADD COLUMN IF NOT EXISTS what_included TEXT[] DEFAULT ARRAY[]::TEXT[];

-- 5. Drop NOT NULL constraints on legacy columns that may not be populated
ALTER TABLE experiences 
  ALTER COLUMN host DROP NOT NULL;

-- 6. Update existing experiences to set empty arrays where null
UPDATE experiences SET what_included = ARRAY[]::TEXT[] WHERE what_included IS NULL;

-- 7. Create index for performance
CREATE INDEX IF NOT EXISTS idx_experiences_host_id ON experiences(host_id);
CREATE INDEX IF NOT EXISTS idx_experiences_status ON experiences(status);

-- 8. Add RLS policies for host experience management
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- Policy: Hosts can insert their own experiences
CREATE POLICY "Hosts can insert their own experiences"
  ON experiences FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM hosts WHERE id = experiences.host_id
    )
  );

-- Policy: Hosts can update their own experiences
CREATE POLICY "Hosts can update their own experiences"
  ON experiences FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT user_id FROM hosts WHERE id = experiences.host_id
    )
  );

-- Policy: Hosts can delete their own experiences
CREATE POLICY "Hosts can delete their own experiences"
  ON experiences FOR DELETE
  USING (
    auth.uid() IN (
      SELECT user_id FROM hosts WHERE id = experiences.host_id
    )
  );

-- Policy: Everyone can view active experiences
CREATE POLICY "Public can view active experiences"
  ON experiences FOR SELECT
  USING (status = 'active' OR auth.uid() IN (
    SELECT user_id FROM hosts WHERE id = experiences.host_id
  ));

-- 9. Add comments for documentation
COMMENT ON COLUMN experiences.status IS 'draft: not published, active: available for booking, paused: temporarily unavailable, archived: no longer offered';
COMMENT ON COLUMN experiences.what_included IS 'Array of items/services included in the experience';
COMMENT ON COLUMN experiences.host_id IS 'References the host who offers this experience';
