import React from 'react';
import SearchBar from './SearchBar';

const Hero = () => {
  const handleSearch = (query) => {
    // In a real app, this would trigger a search
    console.log('Search query:', query);
  };

  return (
    <section className="bg-cream py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-charcoal mb-6">
          Eat, Connect, and Stay Local
        </h1>
        <p className="text-xl text-gray mb-10 max-w-2xl mx-auto">
          Meet locals. Share food. Live Tunisia.
        </p>
        
        <div className="max-w-3xl mx-auto">
          <SearchBar onSearch={handleSearch} className="bg-white" />
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-coral w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-2">Find Experiences</h3>
            <p className="text-gray">Discover unique local experiences with authentic hosts</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-coral w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-2">Meet Locals</h3>
            <p className="text-gray">Connect with passionate hosts who share their culture</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-coral w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-2">Enjoy Meals</h3>
            <p className="text-gray">Savor home-cooked meals and authentic flavors</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;