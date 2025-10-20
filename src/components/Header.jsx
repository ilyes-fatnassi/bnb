import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-whitesmoke shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-coral">Bite&Bed</Link>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link to="/search" className="text-charcoal hover:text-coral font-medium">Explore</Link>
          <Link to="/hosts" className="text-charcoal hover:text-coral font-medium">Become a Host</Link>
          <Link to="/login" className="text-charcoal hover:text-coral font-medium">Login</Link>
          <Link to="/signup" className="bg-coral text-white px-4 py-2 rounded-full hover:bg-coralLight transition">Sign Up</Link>
        </nav>
        <button className="md:hidden text-charcoal">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;