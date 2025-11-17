import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const DashboardCard = ({ title, children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}
  >
    <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">{title}</h3>
    {children}
  </motion.div>
);

const Dashboard = () => {
  const { user, bookings, hostProfile } = useAppContext();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
            Please log in to view your dashboard
          </h2>
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-primary-500 text-white font-medium rounded-full hover:bg-primary-600 transition-colors"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="container mx-auto px-4">
        {/* User Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-6">
            <img
              src={user.avatar || 'https://ui-avatars.com/api/?name=' + user.name}
              alt={user.name}
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-display font-bold text-gray-900 mb-1">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600">Member since {new Date(user.joinDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <DashboardCard title="Recent Bookings" className="lg:col-span-2">
            <div className="space-y-4">
              {bookings.length > 0 ? (
                bookings.slice(0, 3).map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50"
                  >
                    <img
                      src={booking.image}
                      alt={booking.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{booking.title}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(booking.date).toLocaleDateString()}
                      </p>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : booking.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${booking.total}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center py-4">No bookings yet</p>
              )}
            </div>
            {bookings.length > 3 && (
              <button className="mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm">
                View all bookings
              </button>
            )}
          </DashboardCard>

          {/* Quick Actions */}
          <DashboardCard title="Quick Actions">
            <div className="space-y-3">
              <Link
                to="/meals"
                className="block w-full px-4 py-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors"
              >
                Browse Meals
              </Link>
              <Link
                to="/experiences"
                className="block w-full px-4 py-3 bg-secondary-50 text-secondary-700 rounded-lg hover:bg-secondary-100 transition-colors"
              >
                Discover Experiences
              </Link>
              {!hostProfile && (
                <Link
                  to="/become-host"
                  className="block w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Become a Host
                </Link>
              )}
            </div>
          </DashboardCard>

          {/* Host Section (if applicable) */}
          {hostProfile && (
            <DashboardCard title="Host Dashboard" className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-primary-50 rounded-lg p-6">
                  <h4 className="font-medium text-primary-900 mb-2">Total Earnings</h4>
                  <p className="text-2xl font-bold text-primary-700">
                    ${hostProfile.earnings.toFixed(2)}
                  </p>
                </div>
                <div className="bg-secondary-50 rounded-lg p-6">
                  <h4 className="font-medium text-secondary-900 mb-2">Active Listings</h4>
                  <p className="text-2xl font-bold text-secondary-700">
                    {hostProfile.activeListings}
                  </p>
                </div>
                <div className="bg-gray-100 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-2">Rating</h4>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-700 mr-2">
                      {hostProfile.rating.toFixed(1)}
                    </p>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-gray-600 ml-1">
                        ({hostProfile.totalReviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </DashboardCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;