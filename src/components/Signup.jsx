import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../services/api';
import { useAppContext } from '../context/AppContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signupUser, addNotification } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      addNotification('Passwords do not match', 'error');
      return;
    }

    if (password.length < 6) {
      addNotification('Password must be at least 6 characters', 'error');
      return;
    }

    try {
      setIsLoading(true);
      const { user, session } = await signUp(email, password, name);
      
      if (user) {
        signupUser(user);
        addNotification('Account created successfully! Welcome to Bite&Bed!', 'success');
        navigate('/');
      } else {
        addNotification('Failed to create account. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Signup error:', error);
      addNotification(error.message || 'Failed to create account', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-cream min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-charcoal mb-2">Join Bite&Bed</h1>
            <p className="text-gray">Create an account to start your journey</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-charcoal font-medium mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-clay rounded-lg focus:outline-none focus:ring-2 focus:ring-coral"
                placeholder="Your full name"
                required
              />
            </div>
            
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
              <p className="mt-2 text-xs text-gray-500">
                💡 Use a unique password. If your browser warns about a data breach, it means that password was used elsewhere - create a new one for better security.
              </p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-charcoal font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-clay rounded-lg focus:outline-none focus:ring-2 focus:ring-coral"
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="mb-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-coral hover:bg-coralLight text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>
          
          <div className="text-center">
            <p className="text-gray">
              Already have an account?{' '}
              <Link to="/login" className="text-coral font-medium hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;