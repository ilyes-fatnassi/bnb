import React from 'react';

const Stat = ({ 
  value, 
  label, 
  icon,
  variant = 'default',
  className = '' 
}) => {
  const baseClasses = 'bg-white rounded-lg shadow p-6';
  const variantClasses = {
    default: 'text-center',
    horizontal: 'flex items-center'
  };
  
  const content = (
    <>
      {icon && (
        <div className="inline-flex items-center justify-center p-3 bg-cream rounded-full mb-4">
          {icon}
        </div>
      )}
      <div className="text-3xl font-bold text-charcoal">{value}</div>
      <div className="text-gray mt-1">{label}</div>
    </>
  );
  
  if (variant === 'horizontal') {
    return (
      <div className={`${baseClasses} ${variantClasses.horizontal} ${className}`}>
        {icon && (
          <div className="flex-shrink-0 inline-flex items-center justify-center p-3 bg-cream rounded-full mr-4">
            {icon}
          </div>
        )}
        <div>
          <div className="text-2xl font-bold text-charcoal">{value}</div>
          <div className="text-gray">{label}</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`${baseClasses} ${variantClasses.default} ${className}`}>
      {content}
    </div>
  );
};

export default Stat;