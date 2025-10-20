import React from 'react';

const Skeleton = ({ 
  variant = 'text', 
  width = 'full', 
  height = '4',
  className = '',
  count = 1
}) => {
  const baseClasses = 'bg-clay animate-pulse rounded';
  const widthClasses = {
    '1/4': 'w-1/4',
    '1/2': 'w-1/2',
    '3/4': 'w-3/4',
    'full': 'w-full',
    'auto': 'w-auto'
  };
  
  const heightClasses = {
    '2': 'h-2',
    '3': 'h-3',
    '4': 'h-4',
    '5': 'h-5',
    '6': 'h-6',
    '8': 'h-8',
    '10': 'h-10',
    '12': 'h-12',
    '16': 'h-16',
    '20': 'h-20',
    '24': 'h-24',
    '32': 'h-32',
    '40': 'h-40',
    '48': 'h-48',
    '56': 'h-56',
    '64': 'h-64'
  };
  
  const variantClasses = {
    text: 'rounded',
    circle: 'rounded-full',
    rect: 'rounded-sm'
  };
  
  const classes = [
    baseClasses,
    widthClasses[width],
    heightClasses[height],
    variantClasses[variant],
    className
  ].filter(Boolean).join(' ');
  
  if (count > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className={classes}></div>
        ))}
      </div>
    );
  }
  
  return <div className={classes}></div>;
};

export default Skeleton;