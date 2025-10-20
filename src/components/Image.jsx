import React from 'react';

const Image = ({ 
  src, 
  alt, 
  className = '', 
  lazy = true, 
  rounded = false,
  ...props 
}) => {
  const baseClasses = 'object-cover';
  const roundedClasses = rounded ? 'rounded-lg' : '';
  
  const classes = [
    baseClasses,
    roundedClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <img
      src={src}
      alt={alt}
      className={classes}
      loading={lazy ? 'lazy' : 'eager'}
      {...props}
    />
  );
};

export default Image;