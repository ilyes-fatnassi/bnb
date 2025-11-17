import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project credentials
// Get them from: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not found. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
