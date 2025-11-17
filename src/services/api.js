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
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching meal:', error);
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
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching experience:', error);
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
