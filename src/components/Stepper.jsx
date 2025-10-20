import React from 'react';

const Stepper = ({ 
  steps, 
  currentStep, 
  className = '' 
}) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isUpcoming = index > currentStep;
        
        return (
          <div key={index} className="flex items-center">
            {/* Step circle */}
            <div className={`
              flex items-center justify-center w-10 h-10 rounded-full
              ${isCompleted ? 'bg-coral text-white' : ''}
              ${isCurrent ? 'border-2 border-coral text-coral' : ''}
              ${isUpcoming ? 'border-2 border-gray text-gray' : ''}
            `}>
              {isCompleted ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span className="font-medium">{index + 1}</span>
              )}
            </div>
            
            {/* Step label */}
            <div className="ml-3">
              <div className={`
                text-sm font-medium
                ${isCompleted || isCurrent ? 'text-charcoal' : 'text-gray'}
              `}>
                {step.title}
              </div>
              {step.description && (
                <div className="text-xs text-gray mt-1">
                  {step.description}
                </div>
              )}
            </div>
            
            {/* Connector line (except for last step) */}
            {index < steps.length - 1 && (
              <div className={`
                flex-auto h-0.5 mx-4
                ${isCompleted ? 'bg-coral' : 'bg-gray'}
              `}></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;