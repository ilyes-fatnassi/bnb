import React, { useState } from 'react';

const Tooltip = ({ 
  children, 
  content, 
  position = 'top',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-3',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-3',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-3',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-3'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-t-coral',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-b-coral',
    left: 'right-full top-1/2 transform -translate-y-1/2 border-l-coral',
    right: 'left-full top-1/2 transform -translate-y-1/2 border-r-coral'
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      {isVisible && (
        <div 
          className={`absolute z-10 px-3 py-2 text-sm font-medium text-white bg-coral rounded-lg shadow-sm whitespace-nowrap ${positionClasses[position]} ${className}`}
          role="tooltip"
        >
          <div className="relative">
            {content}
            <div 
              className={`absolute w-0 h-0 border-4 border-transparent ${arrowClasses[position]}`}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;