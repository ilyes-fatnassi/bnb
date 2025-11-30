import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { getHostByUserId, getHostMeals, getHostBookings, getHostExperiences } from '../../services/api';
import Loading from '../Loading';

const HostDashboard = () => {
  const { user, addNotification } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [host, setHost] = useState(null);
  const [stats, setStats] = useState({
    totalMeals: 0,
    totalExperiences: 0,
    totalBookings: 0,
    avgRating: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Get host profile
        const hostData = await getHostByUserId(user.id);
        
        if (!hostData) {
          // User is not a host yet - show the become host message
          setHost(null);
          setLoading(false);
          return;
        }

        setHost(hostData);

        // Get host's meals
        const meals = await getHostMeals(hostData.id);
        
        // Get host's experiences
        const experiences = await getHostExperiences(hostData.id);
        
        // Get host's bookings
        const bookings = await getHostBookings(hostData.id);
        setRecentBookings(bookings.slice(0, 5)); // Latest 5

        // Calculate stats
        setStats({
          totalMeals: meals.length,
          totalExperiences: experiences.length,
          totalBookings: bookings.length,
          avgRating: hostData.rating || 0
        });

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        addNotification('Error loading dashboard', 'error');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [user, addNotification]);

  if (loading) {
    return <Loading />;
  }

  if (!host) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to Host Dashboard!
        </h2>
        <p className="text-gray-600 mb-6">
          Complete your host profile to start offering meals and experiences.
        </p>
        <Link
          to="/become-host"
          className="inline-block px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
        >
          Become a Host
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {host.full_name}! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your listings today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Total Meals</span>
            <span className="text-2xl">🍽️</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalMeals}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Experiences</span>
            <span className="text-2xl">🎭</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalExperiences}</p>
          <p className="text-xs text-gray-500 mt-1">Coming in Phase 2</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Total Bookings</span>
            <span className="text-2xl">📅</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Avg Rating</span>
            <span className="text-2xl">⭐</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {stats.avgRating.toFixed(1)}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/host/meals/add"
            className="flex items-center justify-center space-x-3 px-6 py-4 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
          >
            <span className="text-2xl">➕</span>
            <span>Add New Meal</span>
          </Link>
          <Link
            to="/host/experiences/add"
            className="flex items-center justify-center space-x-3 px-6 py-4 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
          >
            <span className="text-2xl">🎭</span>
            <span>Add New Experience</span>
          </Link>
          <Link
            to="/host/bookings"
            className="flex items-center justify-center space-x-3 px-6 py-4 bg-gray-50 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            <span className="text-2xl">📅</span>
            <span>View All Bookings</span>
          </Link>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Bookings</h2>
        {recentBookings.length === 0 ? (
          <p className="text-gray-600 text-center py-8">
            No bookings yet. Share your listings to get started!
          </p>
        ) : (
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={booking.meals?.images?.[0] || booking.experiences?.images?.[0] || 'https://via.placeholder.com/80'}
                    alt="Listing"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {booking.meals?.title || booking.experiences?.title || 'Booking'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {booking.guest_name || 'Guest'} • {booking.guests} guests
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(booking.booking_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">${booking.total_price}</p>
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    booking.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                    booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HostDashboard;
