# Database Setup Instructions

## Step 1: Run Host Schema
1. Go to Supabase Dashboard: https://supabase.com/dashboard/project/mgdjepfdcjenisatntyl
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy and paste the contents of `supabase-host-schema.sql`
5. Click "Run" button
6. You should see success messages

## Step 2: Link Existing Hosts
1. In the same SQL Editor, create a new query
2. Copy and paste the contents of `supabase-link-hosts.sql`
3. Click "Run" button
4. You should see:
   - "Successfully created hosts and linked meals!"
   - Dr. Baneni host_id: [some-uuid]
   - Kenza host_id: [some-uuid]

## Step 3: Verify
Run this query to check everything worked:
```sql
-- Check hosts were created
SELECT * FROM hosts;

-- Check meals are linked
SELECT id, title, host, host_id, status FROM meals;
```

You should see:
- 2 rows in hosts table (Dr. Baneni and Kenza)
- 3 rows in meals table with host_id populated for the first 2 meals

## What This Does:
✅ Creates `hosts` table with RLS policies
✅ Adds `host_id`, `status`, `max_guests` to `meals` table
✅ Adds `host_id`, `status` to `experiences` table
✅ Adds `guest_name`, `guest_email`, `status` to `bookings` table
✅ Creates host profiles for Dr. Baneni and Kenza
✅ Links existing meals to these hosts

## Next Steps After SQL:
Once you've run these scripts successfully, let me know and we'll:
1. Add the host routes to App.jsx
2. Test the host dashboard
3. Build the remaining components
