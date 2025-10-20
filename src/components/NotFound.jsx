import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="bg-cream min-h-screen flex items-center">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-9xl font-bold text-coral mb-6">404</div>
          <h1 className="text-4xl font-bold text-charcoal mb-6">Page Not Found</h1>
          <p className="text-xl text-gray mb-10">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/" 
              className="bg-coral hover:bg-coralLight text-white font-semibold py-3 px-8 rounded-full transition duration-300"
            >
              Go Home
            </Link>
            <Link 
              to="/search" 
              className="border-2 border-coral text-coral hover:bg-coral hover:text-white font-semibold py-3 px-8 rounded-full transition duration-300"
            >
              Explore Experiences
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;