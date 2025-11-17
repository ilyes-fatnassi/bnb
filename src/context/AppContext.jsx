import React, { createContext, useContext, useState, useEffect } from 'react';
import Notification from '../components/Notification';
import { supabase } from '../lib/supabase';
import { getCurrentUser, signOut as apiSignOut } from '../services/api';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // Start with true to check auth
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    checkin: '',
    checkout: '',
    guests: 1
  });

  // Check for existing session on mount
  useEffect(() => {
    console.log('AppContext: Starting auth initialization');
    const initAuth = async () => {
      try {
        console.log('AppContext: Getting current user');
        const currentUser = await getCurrentUser();
        console.log('AppContext: Current user:', currentUser);
        setUser(currentUser);
      } catch (error) {
        console.error('AppContext: Error checking auth:', error);
        // Don't block the app if auth check fails
      } finally {
        console.log('AppContext: Setting loading to false');
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    try {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      });

      return () => {
        authListener?.subscription?.unsubscribe();
      };
    } catch (error) {
      console.error('Error setting up auth listener:', error);
    }
  }, []);

  // Add notification
  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    
    // Auto remove notification after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  // Remove notification
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Set loading state
  const setLoadingState = (state) => {
    setLoading(state);
  };

  // Update search filters
  const updateSearchFilters = (filters) => {
    setSearchFilters(prev => ({ ...prev, ...filters }));
  };

  // Login user (now handled by Supabase in Login component)
  const loginUser = (userData) => {
    setUser(userData);
    addNotification('Welcome back!', 'success');
  };

  // Logout user
  const logoutUser = async () => {
    try {
      await apiSignOut();
      setUser(null);
      addNotification('You have been logged out', 'info');
    } catch (error) {
      console.error('Logout error:', error);
      addNotification('Error logging out', 'error');
    }
  };

  // Signup user (now handled by Supabase in Signup component)
  const signupUser = (userData) => {
    setUser(userData);
    addNotification('Welcome to Bite&Bed!', 'success');
  };

  const value = {
    user,
    notifications,
    loading,
    searchFilters,
    addNotification,
    removeNotification,
    setLoadingState,
    updateSearchFilters,
    loginUser,
    logoutUser,
    signupUser
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      {/* Render notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </AppContext.Provider>
  );
};