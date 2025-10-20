// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Format date
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Format rating
export const formatRating = (rating) => {
  return rating.toFixed(1);
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate password strength
export const validatePassword = (password) => {
  // At least 8 characters, one uppercase, one lowercase, one number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

// Calculate total price
export const calculateTotalPrice = (price, guests, nights = 1) => {
  return price * guests * nights;
};

// Get random image URL (for placeholder images)
export const getRandomImageUrl = (width = 400, height = 300) => {
  const categories = ['food', 'people', 'travel', 'culture'];
  const category = categories[Math.floor(Math.random() * categories.length)];
  return `https://source.unsplash.com/${width}x${height}/?${category}`;
};