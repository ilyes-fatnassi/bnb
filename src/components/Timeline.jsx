import React from 'react';

const Timeline = ({ 
  items, 
  className = '' 
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-clay transform translate-x-1/2"></div>
      
      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={index} className="relative flex items-start">
            {/* Dot */}
            <div className="absolute left-4 w-4 h-4 rounded-full bg-coral border-4 border-white transform -translate-x-1/2"></div>
            
            {/* Content */}
            <div className="ml-12">
              <div className="text-sm text-coral font-medium">{item.date}</div>
              <h3 className="text-lg font-semibold text-charcoal mt-1">{item.title}</h3>
              <p className="text-gray mt-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;