import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ListingCard from './ListingCard';
import Pagination from './Pagination';
import Loading from './Loading';
import { getMeals } from '../services/api';
import { useAppContext } from '../context/AppContext';

const FilterBar = ({ onFilterChange }) => (
  <div className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-16 z-30">
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center space-x-4 overflow-x-auto pb-2">
        <button className="px-4 py-2 rounded-full bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors">
          All
        </button>
        <button className="px-4 py-2 rounded-full bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 border border-gray-200 transition-colors">
          Traditional
        </button>
        <button className="px-4 py-2 rounded-full bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 border border-gray-200 transition-colors">
          Modern Fusion
        </button>
        <button className="px-4 py-2 rounded-full bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 border border-gray-200 transition-colors">
          Vegetarian
        </button>
        <button className="px-4 py-2 rounded-full bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 border border-gray-200 transition-colors">
          Seafood
        </button>
      </div>
    </div>
  </div>
);



const Meals = () => {
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useAppContext();

  // Fetch meals from Supabase
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        const data = await getMeals();
        setMeals(data || []);
      } catch (error) {
        console.error('Error loading meals:', error);
        addNotification('Failed to load meals. Please try again.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [addNotification]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(meals.length / itemsPerPage);
  
  const currentMeals = meals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 pt-32 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Discover Local Meals
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Experience authentic Tunisian cuisine with our passionate local hosts. 
            Each meal is a journey through tradition and flavor.
          </p>
        </div>
      </div>
      <FilterBar onFilterChange={setFilters} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {currentMeals.map(meal => (
              <ListingCard
                key={meal.id}
                listing={meal}
                type="meal"
                onBook={() => {/* Handle booking */}}
                onSave={() => {/* Handle saving */}}
              />
            ))}
          </AnimatePresence>
        </div>
        
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="mt-12"
          />
        )}
      </div>
    </div>
  );
};

export default Meals;