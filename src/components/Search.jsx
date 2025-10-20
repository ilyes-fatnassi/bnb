import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState({ checkin: '', checkout: '' });
  const [guests, setGuests] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would trigger a search
    console.log('Search for:', { location, dates, guests });
    alert(`Search functionality would search for experiences in ${location} for ${guests} guest(s)`);
  };

  return (
    <div className="bg-cream py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
            Eat, Connect, and Stay Local
          </h1>
          <p className="text-xl text-gray mb-10 max-w-2xl mx-auto">
            Meet locals. Share food. Live Tunisia.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-full shadow-lg p-2 flex flex-col md:flex-row gap-2">
          <div className="flex-grow px-6 py-4 border-r border-clay">
            <label className="block text-xs text-gray mb-1">WHERE</label>
            <input 
              type="text" 
              placeholder="Where do you want to go?" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full focus:outline-none text-charcoal"
            />
          </div>
          
          <div className="border-r border-clay px-6 py-4">
            <label className="block text-xs text-gray mb-1">CHECK IN</label>
            <input 
              type="date" 
              value={dates.checkin}
              onChange={(e) => setDates({...dates, checkin: e.target.value})}
              className="focus:outline-none text-charcoal"
            />
          </div>
          
          <div className="border-r border-clay px-6 py-4">
            <label className="block text-xs text-gray mb-1">CHECK OUT</label>
            <input 
              type="date" 
              value={dates.checkout}
              onChange={(e) => setDates({...dates, checkout: e.target.value})}
              className="focus:outline-none text-charcoal"
            />
          </div>
          
          <div className="px-6 py-4">
            <label className="block text-xs text-gray mb-1">GUESTS</label>
            <select 
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="focus:outline-none text-charcoal"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num} guest{num > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          
          <button 
            type="submit"
            className="bg-coral hover:bg-coralLight text-white font-semibold py-4 px-8 rounded-full transition duration-300 self-center"
          >
            Search
          </button>
        </form>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-charcoal mb-8 text-center">Popular Destinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Tunis', 'Sidi Bou Said', 'Tozeur', 'Douz'].map((destination, index) => (
              <Link 
                key={index} 
                to="/experiences" 
                className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition"
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-3" />
                <h3 className="font-semibold text-charcoal">{destination}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;