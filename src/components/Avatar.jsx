import React from 'react';
import Image from './Image';

const Avatar = ({ 
  src, 
  alt, 
  size = 'md', 
  className = '',
  initials = '',
  online = false
}) => {
  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <div className={`relative inline-block ${sizeClasses[size]} ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          className={`rounded-full ${sizeClasses[size]} object-cover`}
        />
      ) : (
        <div className={`rounded-full bg-coral flex items-center justify-center text-white font-semibold ${sizeClasses[size]} ${textSizeClasses[size]}`}>
          {initials}
        </div>
      )}
      
      {online && (
        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white"></span>
      )}
    </div>
  );
};

export default Avatar;