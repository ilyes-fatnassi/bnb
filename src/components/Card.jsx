import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  shadow = true, 
  rounded = 'rounded-xl' 
}) => {
  const baseClasses = 'bg-white overflow-hidden';
  const hoverClasses = hover ? 'hover:shadow-lg transition' : '';
  const shadowClasses = shadow ? 'shadow-md' : '';
  
  const classes = [
    baseClasses,
    hoverClasses,
    shadowClasses,
    rounded,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Card;