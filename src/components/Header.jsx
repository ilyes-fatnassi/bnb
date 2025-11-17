import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              Bite&Bed
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-1 bg-gray-100/80 backdrop-blur-sm p-1 rounded-full">
              <Link
                to="/meals"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive('/meals')
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                Meals
              </Link>
              <Link
                to="/experiences"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive('/experiences')
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                Experiences
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/become-host"
                className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
              >
                Become a Host
              </Link>
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <img
                      src={user.avatar || 'https://ui-avatars.com/api/?name=' + user.name}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {user.name}
                    </span>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-full transition-colors"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/meals"
                  className="px-4 py-2 text-gray-600 hover:text-primary-600 rounded-lg hover:bg-gray-50"
                >
                  Meals
                </Link>
                <Link
                  to="/experiences"
                  className="px-4 py-2 text-gray-600 hover:text-primary-600 rounded-lg hover:bg-gray-50"
                >
                  Experiences
                </Link>
                <Link
                  to="/become-host"
                  className="px-4 py-2 text-gray-600 hover:text-primary-600 rounded-lg hover:bg-gray-50"
                >
                  Become a Host
                </Link>
                {!user && (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2 text-gray-600 hover:text-primary-600 rounded-lg hover:bg-gray-50"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      className="px-4 py-2 text-white bg-primary-500 hover:bg-primary-600 rounded-lg text-center"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;