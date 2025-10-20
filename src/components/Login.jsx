import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would connect to a backend
    console.log('Login attempt with:', { email, password });
    alert('Login functionality would be implemented in a real application');
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
              <Link to="/forgot-password" className="text-coral hover:underline">Forgot password?</Link>
            </div>
            
            <button
              type="submit"
              className="w-full bg-coral hover:bg-coralLight text-white py-3 rounded-lg font-semibold transition"
            >
              Sign In
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
    </div>
  );
};

export default Login;