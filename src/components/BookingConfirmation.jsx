import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};

  if (!booking) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          {/* Success Animation */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600 text-lg">
              Your order has been successfully placed
            </p>
          </div>

          {/* Booking Details */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Order Summary */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-4">
                {booking.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Details */}
            <div className="p-6 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Delivery Details
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Delivery Address</p>
                  <p className="font-medium text-gray-900">{booking.deliveryAddress}</p>
                </div>
                {booking.deliveryInstructions && (
                  <div>
                    <p className="text-sm text-gray-600">Delivery Instructions</p>
                    <p className="font-medium text-gray-900">{booking.deliveryInstructions}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Contact Number</p>
                  <p className="font-medium text-gray-900">{booking.contactNumber}</p>
                </div>
                {booking.specialRequests && (
                  <div>
                    <p className="text-sm text-gray-600">Special Requests</p>
                    <p className="font-medium text-gray-900">{booking.specialRequests}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-medium text-gray-900">
                    {booking.paymentMethod === 'card' ? 'Card Payment' : 'Cash on Delivery'}
                  </p>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-primary-600">
                  ${booking.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-primary-500 text-white font-medium rounded-full hover:bg-primary-600 transition-colors"
            >
              View Dashboard
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingConfirmation;