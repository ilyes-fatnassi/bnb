import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Image from './Image';
import StarRating from './StarRating';
import Skeleton from './Skeleton';

const ListingCard = ({ 
  listing, 
  type = 'experience', // or 'meal'
  onBook,
  onSave,
  isSaved = false
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Format price based on type
  const formattedPrice = type === 'meal' 
    ? `$${listing.price} per person`
    : `From $${listing.price}`;

  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Don't navigate if clicking on save button or image navigation
    if (e.target.closest('button')) {
      e.preventDefault();
      return;
    }
    navigate(`/listing/${listing.id}`);
  };

  return (
    <motion.div
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-200">
        {/* Image Carousel */}
        <div className="relative h-full">
          <Image 
            src={Array.isArray(listing.images) ? listing.images[currentImageIndex] : listing.image} 
            alt={listing.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Navigation Arrows - Only show if multiple images */}
          {Array.isArray(listing.images) && listing.images.length > 1 && isHovered && (
            <>
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition-opacity hover:bg-white"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentImageIndex((prev) => 
                    prev === 0 ? listing.images.length - 1 : prev - 1
                  );
                }}
              >
                <svg className="h-4 w-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition-opacity hover:bg-white"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentImageIndex((prev) => 
                    prev === listing.images.length - 1 ? 0 : prev + 1
                  );
                }}
              >
                <svg className="h-4 w-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Save Button */}
          <button
            className={`absolute right-3 top-3 rounded-full p-2 transition-transform hover:scale-110 ${
              isSaved ? 'text-red-500' : 'text-gray-800'
            } ${isHovered ? 'bg-white shadow-md' : 'bg-white/80'}`}
            onClick={(e) => {
              e.preventDefault();
              onSave && onSave(listing.id);
            }}
          >
            <svg 
              className="h-5 w-5" 
              fill={isSaved ? "currentColor" : "none"} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" 
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mt-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900 line-clamp-1">{listing.title}</h3>
          <div className="flex items-center gap-1 text-sm">
            <StarRating rating={listing.rating} size="sm" />
            <span className="text-gray-600">({listing.reviews})</span>
          </div>
        </div>

        <div className="mt-1 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <span>{listing.host}</span>
            <span>•</span>
            <span>{listing.location}</span>
          </div>
        </div>

        {/* Additional Details */}
        <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
          {listing.duration && (
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {listing.duration}
            </span>
          )}
          {listing.groupSize && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {listing.groupSize}
              </span>
            </>
          )}
        </div>

        <p className="mt-2 font-medium text-gray-900">{formattedPrice}</p>

        {/* Special Tags */}
        {listing.tags && listing.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {listing.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ListingCard;