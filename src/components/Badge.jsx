import React from 'react';

const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '' 
}) => {
  const baseClasses = 'inline-flex items-center font-semibold rounded-full';
  
  const variantClasses = {
    primary: 'bg-coral text-white',
    secondary: 'bg-cream text-charcoal',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  };
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classes}>
      {children}
    </span>
  );
};

export default Badge;