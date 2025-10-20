import React from 'react';

const Drawer = ({ 
  isOpen, 
  onClose, 
  children, 
  position = 'right',
  className = '' 
}) => {
  if (!isOpen) return null;

  const positionClasses = {
    left: 'left-0 top-0 h-full w-80 transform translate-x-0',
    right: 'right-0 top-0 h-full w-80 transform translate-x-0',
    top: 'top-0 left-0 w-full h-80 transform translate-y-0',
    bottom: 'bottom-0 left-0 w-full h-80 transform translate-y-0'
  };

  const overlayPositionClasses = {
    left: 'left-0',
    right: 'right-0',
    top: 'top-0',
    bottom: 'bottom-0'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Drawer panel */}
      <div 
        className={`absolute bg-white shadow-xl transition-transform duration-300 ease-in-out ${positionClasses[position]} ${className}`}
      >
        <div className="h-full flex flex-col">
          {/* Close button */}
          <div className="flex justify-end p-4">
            <button
              onClick={onClose}
              className="text-gray hover:text-charcoal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;