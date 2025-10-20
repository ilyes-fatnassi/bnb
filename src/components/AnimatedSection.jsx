import React from 'react';

const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  return (
    <div 
      className={`opacity-0 translate-y-10 animate-fade-in-up ${className}`}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'both'
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;