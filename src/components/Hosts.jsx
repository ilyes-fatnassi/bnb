import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from './Image';
import Card from './Card';
import Button from './Button';
import ListingCard from './ListingCard';
import Loading from './Loading';
import { getMeals, getExperiences } from '../services/api';
import { useAppContext } from '../context/AppContext';

const Hosts = () => {
  const [selectedHost, setSelectedHost] = useState(null);
  const [hosts, setHosts] = useState([]);
  const [allMeals, setAllMeals] = useState([]);
  const [allExperiences, setAllExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [mealsData, experiencesData] = await Promise.all([
          getMeals(),
          getExperiences()
        ]);
        
        setAllMeals(mealsData || []);
        setAllExperiences(experiencesData || []);

        // Create unique hosts from meals (excluding "Coming Soon")
        const uniqueHosts = [];
        const seenHosts = new Set();
        
        mealsData?.forEach(meal => {
          if (meal.host && meal.host !== 'Local Hosts' && !seenHosts.has(meal.host)) {
            seenHosts.add(meal.host);
            uniqueHosts.push({
              id: meal.id,
              name: meal.host,
              location: meal.location,
              rating: meal.rating,
              reviews: meal.reviews,
              image: meal.images?.[0] || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
              specialties: meal.tags?.slice(0, 3) || ['Traditional Cuisine'],
              description: meal.description?.substring(0, 100) + '...' || 'Welcoming guests to share authentic experiences.'
            });
          }
        });

        setHosts(uniqueHosts);
      } catch (error) {
        console.error('Error fetching hosts:', error);
        addNotification('Error loading hosts', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [addNotification]);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Loading />
        </div>
      </section>
    );
  }

  // Get host's meals when clicked
  const getHostExperiences = (hostName) => {
    return allMeals.filter(meal => meal.host === hostName);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Meet Our Local Hosts
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Passionate locals ready to share their culture and cuisine with you
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hosts.map((host) => (
            <motion.div
              key={host.id}
              onClick={() => setSelectedHost(selectedHost === host.id ? null : host.id)}
              whileHover={{ y: -5 }}
              className="cursor-pointer"
            >
              <Card hover={true}>
                <div className="relative">
                  <Image 
                    src={host.image} 
                    alt={host.name} 
                    className="w-full h-64 object-cover"
                    rounded={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-semibold mb-1">{host.name}</h3>
                    <div className="flex items-center text-sm">
                      <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{host.rating}</span>
                      <span className="mx-1">•</span>
                      <span>{host.reviews} reviews</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-4">{host.description}</p>
                    <h4 className="font-medium text-gray-900 mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {host.specialties.map((specialty, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedHost(selectedHost === host.id ? null : host.id);
                    }}
                  >
                    {selectedHost === host.id ? 'Show Less' : 'View Experiences'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Featured Experiences Section */}
        {selectedHost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-display font-semibold text-gray-900 mb-8 text-center">
              Meals by {hosts.find(h => h.id === selectedHost)?.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getHostExperiences(hosts.find(h => h.id === selectedHost)?.name)?.map(meal => (
                <ListingCard
                  key={meal.id}
                  listing={meal}
                  type="meal"
                  onBook={() => {/* Handle booking */}}
                  onSave={() => {/* Handle saving */}}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Hosts;