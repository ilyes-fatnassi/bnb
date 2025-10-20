import React from 'react';

const Divider = ({ 
  orientation = 'horizontal', 
  className = '',
  text = '',
  variant = 'solid'
}) => {
  const baseClasses = 'border-clay';
  const variantClasses = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted'
  };
  
  if (orientation === 'horizontal') {
    if (text) {
      return (
        <div className={`flex items-center my-6 ${className}`}>
          <div className={`flex-grow border-t ${baseClasses} ${variantClasses[variant]}`}></div>
          <span className="flex-shrink mx-4 text-gray text-sm">{text}</span>
          <div className={`flex-grow border-t ${baseClasses} ${variantClasses[variant]}`}></div>
        </div>
      );
    }
    
    return (
      <div className={`border-t ${baseClasses} ${variantClasses[variant]} my-6 ${className}`}></div>
    );
  }
  
  return (
    <div className={`border-l ${baseClasses} ${variantClasses[variant]} h-full ${className}`}></div>
  );
};

export default Divider;