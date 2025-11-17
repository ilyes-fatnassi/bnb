import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

const BecomeHost = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 pt-32 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Become a Host
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Share your passion for cooking and culture with guests from around the world
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Share Your Cooking</h3>
            <p className="text-gray-600 mb-4">
              Showcase your culinary skills and traditional recipes to eager food enthusiasts
            </p>
            <Button variant="outline" size="sm">Learn More</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Earn Extra Income</h3>
            <p className="text-gray-600 mb-4">
              Set your own prices and schedule. We handle the payments and insurance
            </p>
            <Button variant="outline" size="sm">Learn More</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Meet New People</h3>
            <p className="text-gray-600 mb-4">
              Connect with travelers from around the world and share your culture
            </p>
            <Button variant="outline" size="sm">Learn More</Button>
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Ready to Start Hosting?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our community of passionate hosts and start sharing your culinary expertise
            </p>
            <Button variant="primary" size="lg">
              Get Started Now
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BecomeHost;
