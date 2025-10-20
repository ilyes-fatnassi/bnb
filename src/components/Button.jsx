import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-full transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-coral hover:bg-coralLight text-white focus:ring-coral',
    secondary: 'bg-whitesmoke hover:bg-cream text-charcoal focus:ring-clay border border-clay',
    outline: 'border-2 border-coral text-coral hover:bg-coral hover:text-white focus:ring-coral',
    ghost: 'text-coral hover:bg-cream focus:ring-coral'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabledClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={classes} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;