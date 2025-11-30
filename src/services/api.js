import { supabase } from '../lib/supabase';

// ============= MEALS =============

export const getMeals = async () => {
  try {
    const { data, error } = await supabase
      .from('meals')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching meals:', error);
    throw error;
  }
};

export const getMealById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('meals')
      .select('*')
      .eq('id', id)
      .single();
    
    // If not found (PGRST116 error), return null instead of throwing
    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error fetching meal:', error);
    // Return null for not found, otherwise throw
    if (error.code === 'PGRST116') {
      return null;
    }
    throw error;
  }
};

// ============= EXPERIENCES =============

export const getExperiences = async () => {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching experiences:', error);
    throw error;
  }
};

export const getExperienceById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('id', id)
      .single();
    
    // If not found (PGRST116 error), return null instead of throwing
    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error fetching experience:', error);
    // Return null for not found, otherwise throw
    if (error.code === 'PGRST116') {
      return null;
    }
    throw error;
  }
};

// ============= BOOKINGS =============

export const createBooking = async (bookingData) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const getUserBookings = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

// ============= AUTHENTICATION =============

export const signUp = async (email, password, fullName) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const resetPassword = async (email) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

// ============= REVIEWS =============

export const getReviewsByListing = async (listingType, listingId) => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('listing_type', listingType)
      .eq('listing_id', listingId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const createReview = async (reviewData) => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert([reviewData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

// ============= HOSTS =============

export const createHost = async (hostData) => {
  try {
    const { data, error } = await supabase
      .from('hosts')
      .insert([hostData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating host:', error);
    throw error;
  }
};

export const getHostByUserId = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('hosts')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
    return data;
  } catch (error) {
    console.error('Error fetching host:', error);
    return null;
  }
};

export const getHostById = async (hostId) => {
  try {
    const { data, error } = await supabase
      .from('hosts')
      .select('*')
      .eq('id', hostId)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching host by ID:', error);
    throw error;
  }
};

export const updateHost = async (hostId, updates) => {
  try {
    const { data, error } = await supabase
      .from('hosts')
      .update(updates)
      .eq('id', hostId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating host:', error);
    throw error;
  }
};

export const getHostMeals = async (hostId) => {
  try {
    const { data, error } = await supabase
      .from('meals')
      .select('*')
      .eq('host_id', hostId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching host meals:', error);
    throw error;
  }
};

export const getHostExperiences = async (hostId) => {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('host_id', hostId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching host experiences:', error);
    throw error;
  }
};

export const createMeal = async (mealData) => {
  try {
    const { data, error } = await supabase
      .from('meals')
      .insert([mealData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating meal:', error);
    throw error;
  }
};

export const updateMeal = async (mealId, updates) => {
  try {
    const { data, error } = await supabase
      .from('meals')
      .update(updates)
      .eq('id', mealId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating meal:', error);
    throw error;
  }
};

export const deleteMeal = async (mealId) => {
  try {
    const { error } = await supabase
      .from('meals')
      .delete()
      .eq('id', mealId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting meal:', error);
    throw error;
  }
};

export const getHostBookings = async (hostId) => {
  try {
    // For now, just return empty array since we don't have bookings yet
    // This will be fully implemented in Phase 2
    return [];
    
    // TODO: Implement proper booking fetching when bookings table is populated
    // const { data, error } = await supabase
    //   .from('bookings')
    //   .select('*')
    //   .order('created_at', { ascending: false });
    // if (error) throw error;
    // return data || [];
  } catch (error) {
    console.error('Error fetching host bookings:', error);
    return [];
  }
};

// ============= EXPERIENCE CRUD =============

export const createExperience = async (experienceData) => {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .insert([experienceData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating experience:', error);
    throw error;
  }
};

export const updateExperience = async (experienceId, experienceData) => {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .update(experienceData)
      .eq('id', experienceId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating experience:', error);
    throw error;
  }
};

export const deleteExperience = async (experienceId) => {
  try {
    const { error } = await supabase
      .from('experiences')
      .delete()
      .eq('id', experienceId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting experience:', error);
    throw error;
  }
};

export const uploadImage = async (file, bucket = 'meal-photos') => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);
    
    if (error) throw error;
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);
    
    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
