import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const HostLayout = () => {
  const location = useLocation();
  const { user } = useAppContext();

  const navigation = [
    { name: 'Dashboard', path: '/host/dashboard', icon: '📊' },
    { name: 'My Meals', path: '/host/meals', icon: '🍽️' },
    { name: 'Bookings', path: '/host/bookings', icon: '📅' },
    { name: 'Profile', path: '/host/profile', icon: '👤' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Host Dashboard</h2>
                <p className="text-sm text-gray-600">
                  Welcome, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                </p>
              </div>

              <nav className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary-50 text-primary-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  to="/"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-xl">🏠</span>
                  <span>Back to Site</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostLayout;
