import React, { useState } from 'react';
import Button from './Button';

const Filter = ({ 
  filters, 
  onFilterChange, 
  className = '' 
}) => {
  const [activeFilters, setActiveFilters] = useState({});

  const handleFilterChange = (filterKey, value) => {
    const newFilters = {
      ...activeFilters,
      [filterKey]: value
    };
    
    setActiveFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const clearFilters = () => {
    setActiveFilters({});
    if (onFilterChange) {
      onFilterChange({});
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-charcoal">Filters</h3>
        <button 
          onClick={clearFilters}
          className="text-coral text-sm hover:underline"
        >
          Clear all
        </button>
      </div>
      
      <div className="space-y-6">
        {filters.map((filter) => (
          <div key={filter.key}>
            <h4 className="font-medium text-charcoal mb-3">{filter.label}</h4>
            
            {filter.type === 'select' && (
              <select
                value={activeFilters[filter.key] || ''}
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                className="w-full px-4 py-2 border border-clay rounded-lg focus:outline-none focus:ring-2 focus:ring-coral"
              >
                <option value="">All</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
            
            {filter.type === 'checkbox' && (
              <div className="space-y-2">
                {filter.options.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`${filter.key}-${option.value}`}
                      checked={activeFilters[filter.key]?.includes(option.value) || false}
                      onChange={(e) => {
                        const current = activeFilters[filter.key] || [];
                        let newValues;
                        
                        if (e.target.checked) {
                          newValues = [...current, option.value];
                        } else {
                          newValues = current.filter(v => v !== option.value);
                        }
                        
                        handleFilterChange(filter.key, newValues);
                      }}
                      className="h-4 w-4 text-coral border-clay rounded focus:ring-coral"
                    />
                    <label 
                      htmlFor={`${filter.key}-${option.value}`} 
                      className="ml-2 text-gray"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
            
            {filter.type === 'range' && (
              <div>
                <input
                  type="range"
                  min={filter.min}
                  max={filter.max}
                  value={activeFilters[filter.key] || filter.min}
                  onChange={(e) => handleFilterChange(filter.key, parseInt(e.target.value))}
                  className="w-full h-2 bg-clay rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray mt-1">
                  <span>{filter.min}</span>
                  <span>{activeFilters[filter.key] || filter.min}</span>
                  <span>{filter.max}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <Button 
        variant="primary" 
        size="md" 
        className="w-full mt-6"
        onClick={() => onFilterChange && onFilterChange(activeFilters)}
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default Filter;