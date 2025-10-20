import React, { useState } from 'react';
import Button from './Button';

const SearchBar = ({ onSearch, className = '' }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`flex rounded-full shadow-lg overflow-hidden ${className}`}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Where do you want to go?"
        className="flex-grow px-6 py-4 focus:outline-none text-charcoal"
      />
      <Button type="submit" size="md" className="rounded-l-none">
        Search
      </Button>
    </form>
  );
};

export default SearchBar;