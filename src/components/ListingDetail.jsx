import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Image from './Image';
import Button from './Button';
import StarRating from './StarRating';
import Loading from './Loading';
import { getMealById, getExperienceById } from '../services/api';
import { useAppContext } from '../context/AppContext';

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useAppContext();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('meal'); // Default to meal
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        // Try to fetch as meal first
        let data = await getMealById(id);
        if (data) {
          setType('meal');
          setListing(data);
        } else {
          // If not found, try as experience
          data = await getExperienceById(id);
          if (data) {
            setType('experience');
            setListing(data);
          } else {
            addNotification('Listing not found', 'error');
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Error fetching listing:', error);
        addNotification('Error loading listing details', 'error');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, navigate, addNotification]);

  if (loading) {
    return <Loading />;
  }

  if (!listing) {
    return null;
  }

  // Handle both image array and single image field
  const listingImages = listing.images || (listing.image ? [listing.image] : []);
  
  // Create hostInfo object from available data
  const hostInfo = {
    bio: `Your host ${listing.host} is excited to share their home and traditions with you.`,
    yearsHosting: 2,
    languages: ["Arabic", "French", "English"],
    responseTime: "within a few hours"
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-20">
      {/* Full Photos Modal */}
      {showAllPhotos && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-95 z-50 overflow-y-auto"
          onClick={() => setShowAllPhotos(false)}
        >
          <div className="min-h-screen px-4 py-20">
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-white text-2xl font-bold mb-6">{listing.title} - All Photos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {listingImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-900 rounded-lg overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={image}
                      alt={`${listing.title} ${index + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Image Gallery */}
      <div className="relative w-full bg-gray-100 mb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 py-4">
            {/* Main large image */}
            <div className="relative h-[40vh] md:h-[500px]">
              <Image
                src={listingImages[0] || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80'}
                alt={listing.title}
                className="w-full h-full object-cover rounded-lg cursor-pointer"
                onClick={() => setShowAllPhotos(true)}
              />
            </div>
            {/* Show only first 2 additional images (total 3 images shown) */}
            <div className="hidden md:grid grid-cols-2 gap-2 h-[500px]">
              {listingImages.slice(1, 3).map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`${listing.title} ${index + 2}`}
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                  onClick={() => setShowAllPhotos(true)}
                />
              ))}
            </div>
          </div>
          {/* Show all photos button - only if there are more than 1 image */}
          {listingImages.length > 1 && (
            <button
              onClick={() => setShowAllPhotos(true)}
              className="absolute bottom-8 right-8 px-4 py-2 bg-white rounded-lg shadow-md text-sm font-medium hover:bg-gray-50 hover:shadow-lg transition-all z-10 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Show all {listingImages.length} photos</span>
            </button>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                  {listing.title}
                </h1>
                <p className="text-gray-600">
                  {listing.location}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center">
                  <StarRating rating={listing.rating} />
                  <span className="ml-2 text-gray-600">({listing.reviews} reviews)</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${listing.price}
                  <span className="text-lg font-normal text-gray-600">/person</span>
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About this experience</h2>
              <p className="text-gray-600 mb-6">{listing.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Duration</p>
                    <p className="text-sm text-gray-600">{listing.duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Group size</p>
                    <p className="text-sm text-gray-600">{listing.groupSize}</p>
                  </div>
                </div>
              </div>

              {listing.highlights && listing.highlights.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">What's included</h3>
                  <ul className="space-y-2 mb-6">
                    {listing.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Host Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${listing.host.split(' ').join('+')}&size=128`}
                  alt={listing.host}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    Hosted by {listing.host}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    {hostInfo.yearsHosting} years hosting • Speaks {hostInfo.languages.join(', ')}
                  </p>
                  <p className="text-gray-600">{hostInfo.bio}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Book this experience</h3>
                
                {/* Add booking form here */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select date
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of guests
                    </label>
                    <select className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500">
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} guests</option>
                      ))}
                    </select>
                  </div>
                  <Button variant="primary" className="w-full">
                    Book Now
                  </Button>
                </div>

                <div className="mt-4 text-sm text-gray-500 text-center">
                  You won't be charged yet
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;