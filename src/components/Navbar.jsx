import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ 
  logo, 
  navItems, 
  className = '' 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`bg-white shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            {logo ? (
              <Link to="/">{logo}</Link>
            ) : (
              <Link to="/" className="text-2xl font-bold text-coral">Bite&Bed</Link>
            )}
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-charcoal hover:text-coral px-3 py-2 rounded-md text-sm font-medium transition"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Auth buttons */}
            <Link
              to="/login"
              className="text-charcoal hover:text-coral px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="bg-coral text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-coralLight transition"
            >
              Sign up
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-charcoal hover:text-coral focus:outline-none"
            >
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="text-charcoal hover:text-coral block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 pb-3 border-t border-clay">
            <div className="flex items-center px-5">
              <Link
                to="/login"
                className="text-charcoal hover:text-coral block px-3 py-2 rounded-md text-base font-medium w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
            </div>
            <div className="mt-3 px-2">
              <Link
                to="/signup"
                className="bg-coral text-white block px-3 py-2 rounded-md text-base font-medium text-center hover:bg-coralLight"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;