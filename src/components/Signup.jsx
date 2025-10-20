import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // In a real app, this would connect to a backend
    console.log('Signup attempt with:', { name, email, password });
    alert('Signup functionality would be implemented in a real application');
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
                className="w-full bg-coral hover:bg-coralLight text-white py-3 rounded-lg font-semibold transition"
              >
                Create Account
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