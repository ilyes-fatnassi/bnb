import React from 'react';

const Chip = ({ 
  children, 
  variant = 'filled', 
  color = 'primary',
  size = 'md',
  onDelete,
  className = '' 
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const variantClasses = {
    filled: {
      primary: 'bg-coral text-white',
      secondary: 'bg-cream text-charcoal',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800'
    },
    outlined: {
      primary: 'border border-coral text-coral',
      secondary: 'border border-clay text-charcoal',
      success: 'border border-green-200 text-green-800',
      warning: 'border border-yellow-200 text-yellow-800',
      error: 'border border-red-200 text-red-800',
      info: 'border border-blue-200 text-blue-800'
    }
  };
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };
  
  const classes = [
    baseClasses,
    variantClasses[variant][color],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <span>{children}</span>
      {onDelete && (
        <button 
          onClick={onDelete}
          className="ml-1 hover:bg-black hover:bg-opacity-10 rounded-full p-0.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Chip;