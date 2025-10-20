import React, { createContext, useContext, useState } from 'react';

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
  const [loading, setLoading] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    checkin: '',
    checkout: '',
    guests: 1
  });

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

  // Login user
  const loginUser = (userData) => {
    setUser(userData);
    addNotification('Welcome back!', 'success');
  };

  // Logout user
  const logoutUser = () => {
    setUser(null);
    addNotification('You have been logged out', 'info');
  };

  // Signup user
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
    </AppContext.Provider>
  );
};