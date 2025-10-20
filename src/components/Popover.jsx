import React, { useState, useRef, useEffect } from 'react';

const Popover = ({ 
  children, 
  content, 
  trigger = 'hover',
  position = 'top',
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef(null);
  const triggerRef = useRef(null);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  const showPopover = () => {
    if (trigger === 'hover' || trigger === 'both') {
      setIsVisible(true);
    }
  };

  const hidePopover = () => {
    if (trigger === 'hover' || trigger === 'both') {
      setIsVisible(false);
    }
  };

  const togglePopover = () => {
    if (trigger === 'click' || trigger === 'both') {
      setIsVisible(!isVisible);
    }
  };

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(event.target) &&
        triggerRef.current && 
        !triggerRef.current.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onMouseEnter={showPopover}
        onMouseLeave={hidePopover}
        onClick={togglePopover}
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          ref={popoverRef}
          className={`absolute z-10 w-64 p-4 bg-white rounded-lg shadow-lg ${positionClasses[position]} ${className}`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;