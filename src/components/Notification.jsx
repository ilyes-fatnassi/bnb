import React from 'react';

const Notification = ({ message, type = 'info', onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-100' : 
                 type === 'error' ? 'bg-red-100' : 
                 'bg-blue-100';
  
  const borderColor = type === 'success' ? 'border-green-500' : 
                     type === 'error' ? 'border-red-500' : 
                     'border-blue-500';
  
  const textColor = type === 'success' ? 'text-green-700' : 
                   type === 'error' ? 'text-red-700' : 
                   'text-blue-700';

  return (
    <div className={`fixed top-4 right-4 ${bgColor} ${borderColor} border-l-4 p-4 rounded shadow-lg max-w-md z-50`}>
      <div className="flex items-start">
        <div className={`flex-1 ${textColor}`}>
          <p className="font-medium">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="ml-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;