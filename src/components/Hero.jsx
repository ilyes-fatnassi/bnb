import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Hero = () => {
  const handleSearch = (query) => {
    // In a real app, this would trigger a search
    console.log('Search query:', query);
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-gradient-to-br from-gray-50 via-secondary-50 to-primary-50">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerAnimation}
          initial="hidden"
          animate="show"
          className="text-center"
        >
          <motion.h1 
            variants={itemAnimation}
            className="text-5xl md:text-7xl font-display font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Experience Local
            </span>
            <br />
            <span className="text-gray-900">
              Food & Culture
            </span>
          </motion.h1>

          <motion.p 
            variants={itemAnimation}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto font-light"
          >
            Discover authentic Tunisian cuisine and experiences with local hosts
          </motion.p>

          <motion.div
            variants={itemAnimation}
            className="max-w-3xl mx-auto mb-16"
          >
            <SearchBar onSearch={handleSearch} className="bg-white/80 backdrop-blur-md" />
          </motion.div>

          <motion.div 
            variants={containerAnimation}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            <Link to="/meals">
              <motion.div 
                variants={itemAnimation}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto transform group-hover:rotate-6 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">Local Meals</h3>
                <p className="text-gray-600">Experience authentic home-cooked Tunisian dishes with local families</p>
              </motion.div>
            </Link>

            <Link to="/experiences">
              <motion.div 
                variants={itemAnimation}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto transform group-hover:rotate-6 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">Cultural Experiences</h3>
                <p className="text-gray-600">Join unique activities and workshops with passionate local guides</p>
              </motion.div>
            </Link>

            <Link to="/become-host">
              <motion.div 
                variants={itemAnimation}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all group md:col-span-2 lg:col-span-1"
              >
                <div className="bg-gradient-to-br from-primary-600 to-secondary-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto transform group-hover:rotate-6 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">Become a Host</h3>
                <p className="text-gray-600">Share your culture and earn by hosting meals or experiences</p>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;