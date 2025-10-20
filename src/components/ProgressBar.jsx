import React from 'react';

const ProgressBar = ({ 
  progress, 
  className = '', 
  showPercentage = false,
  color = 'coral'
}) => {
  const colorClasses = {
    coral: 'bg-coral',
    clay: 'bg-clay',
    gray: 'bg-gray'
  };

  return (
    <div className={className}>
      <div className="w-full bg-whitesmoke rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${colorClasses[color]}`} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {showPercentage && (
        <div className="text-right text-sm text-gray mt-1">
          {progress}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar;