import React from 'react';

const List = ({ 
  children, 
  variant = 'vertical', 
  className = '' 
}) => {
  const baseClasses = 'space-y-4';
  const horizontalClasses = 'flex space-x-4';
  
  return (
    <div className={`${variant === 'horizontal' ? horizontalClasses : baseClasses} ${className}`}>
      {children}
    </div>
  );
};

const ListItem = ({ 
  children, 
  className = '',
  hover = false,
  active = false
}) => {
  const baseClasses = 'p-4 rounded-lg';
  const hoverClasses = hover ? 'hover:bg-cream cursor-pointer' : '';
  const activeClasses = active ? 'bg-cream border-l-4 border-coral' : '';
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${activeClasses} ${className}`}>
      {children}
    </div>
  );
};

List.Item = ListItem;

export default List;