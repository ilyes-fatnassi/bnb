import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ListingCard from './ListingCard';
import Button from './Button';
import Pagination from './Pagination';
import Loading from './Loading';
import { getExperiences } from '../services/api';
import { useAppContext } from '../context/AppContext';

const FilterBar = ({ onFilterChange }) => (
  <div className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-16 z-30">
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center space-x-4 overflow-x-auto pb-2">
        <button className="px-4 py-2 rounded-full bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors">
          All
        </button>
        <button className="px-4 py-2 rounded-full bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 border border-gray-200 transition-colors">
          Cooking
        </button>
        <button className="px-4 py-2 rounded-full bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 border border-gray-200 transition-colors">
          Tours
        </button>
        <button className="px-4 py-2 rounded-full bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 border border-gray-200 transition-colors">
          Workshops
        </button>
        <button className="px-4 py-2 rounded-full bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 border border-gray-200 transition-colors">
          Photography
        </button>
      </div>
    </div>
  </div>
);

const Experiences = () => {
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useAppContext();

  // Fetch experiences from Supabase
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const data = await getExperiences();
        setExperiences(data || []);
      } catch (error) {
        console.error('Error loading experiences:', error);
        addNotification('Failed to load experiences. Please try again.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [addNotification]);

  // Hardcoded fallback (will be replaced by Supabase data)
  const fallbackExperiences = [
    {
      id: 1,
      title: "Traditional Tunisian Cooking Class",
      host: "Amira Benali",
      location: "Tunis",
      price: 45,
      rating: 4.9,
      reviews: 127,
      images: [
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1551218372-a8789b81b253?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Learn to prepare authentic Tunisian dishes in a local home kitchen. Includes market tour and lunch.",
      duration: "4 hours",
      groupSize: "Up to 6 people",
      tags: ["Cooking", "Market Tour", "Family-friendly"],
      highlights: ["Market visit included", "All ingredients provided", "Take recipes home"]
    },
    {
      id: 2,
      title: "Medina Walking Tour & Street Food Tasting",
      host: "Youssef Trabelsi",
      location: "Sidi Bou Said",
      price: 35,
      rating: 4.8,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Explore the blue and white streets of Sidi Bou Said with a local guide and taste traditional street food.",
      duration: "3 hours",
      groupSize: "Up to 8 people"
    },
    {
      id: 3,
      title: "Desert Sunset Photography & Dinner",
      host: "Fatma Mehdi",
      location: "Tozeur",
      price: 65,
      rating: 5.0,
      reviews: 64,
      image: "https://images.unsplash.com/photo-1509316785289-025f5b8b4a21?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Capture stunning desert landscapes at sunset and enjoy a traditional Berber dinner under the stars.",
      duration: "5 hours",
      groupSize: "Up to 4 people"
    },
    {
      id: 4,
      title: "Pottery Making Workshop",
      host: "Youssef Trabelsi",
      location: "Sidi Bou Said",
      price: 40,
      rating: 4.7,
      reviews: 82,
      image: "https://images.unsplash.com/photo-1601143393714-00a0b4d3a4a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Learn the ancient art of Tunisian pottery from a master craftsman in his family workshop.",
      duration: "2.5 hours",
      groupSize: "Up to 5 people"
    }
  ];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(experiences.length / itemsPerPage);
  
  const currentExperiences = experiences.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-secondary-50 to-primary-50 pt-32 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Local Experiences
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Discover unique activities and workshops led by passionate local hosts
          </p>
        </div>
      </div>
      
      <FilterBar onFilterChange={setFilters} />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentExperiences.map((experience) => (
            <ListingCard
              key={experience.id}
              listing={experience}
              type="experience"
              onBook={() => {/* Handle booking */}}
              onSave={() => {/* Handle saving */}}
            />
          ))}
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

export default Experiences;