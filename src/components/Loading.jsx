import React from 'react';

const Loading = () => {
  return (
    <div className="bg-cream min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-coral mb-4"></div>
        <h2 className="text-2xl font-semibold text-charcoal">Loading...</h2>
        <p className="text-gray mt-2">Preparing your authentic experience</p>
      </div>
    </div>
  );
};

export default Loading;