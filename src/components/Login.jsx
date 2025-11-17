import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import Button from './Button';
import { signIn, resetPassword } from '../services/api';
import { useAppContext } from '../context/AppContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser, addNotification } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      const { user, session } = await signIn(email, password);
      
      if (user) {
        loginUser(user);
        addNotification('Successfully logged in!', 'success');
        navigate('/');
      } else {
        addNotification('Login failed. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      addNotification(error.message || 'Failed to log in. Please check your credentials.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      addNotification('Please enter your email address', 'error');
      return;
    }

    try {
      setIsLoading(true);
      await resetPassword(resetEmail);
      addNotification(`Password reset link sent to ${resetEmail}`, 'success');
      setShowForgotPassword(false);
      setResetEmail('');
    } catch (error) {
      console.error('Password reset error:', error);
      addNotification(error.message || 'Failed to send reset email', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-cream min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-charcoal mb-2">Welcome Back</h1>
            <p className="text-gray">Sign in to your Bite&Bed account</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-charcoal font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-clay rounded-lg focus:outline-none focus:ring-2 focus:ring-coral"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-charcoal font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-clay rounded-lg focus:outline-none focus:ring-2 focus:ring-coral"
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-coral border-clay rounded focus:ring-coral"
                />
                <label htmlFor="remember" className="ml-2 text-gray">Remember me</label>
              </div>
              <button 
                type="button"
                onClick={() => setShowForgotPassword(true)} 
                className="text-coral hover:underline"
              >
                Forgot password?
              </button>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-coral hover:bg-coralLight text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray">
              Don't have an account?{' '}
              <Link to="/signup" className="text-coral font-medium hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        title="Reset Password"
        size="md"
        actions={
          <>
            <Button variant="secondary" onClick={() => setShowForgotPassword(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleForgotPassword}>
              Send Reset Link
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <div>
            <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="reset-email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="your@email.com"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Login;