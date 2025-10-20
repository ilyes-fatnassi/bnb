import React from 'react';
import Image from './Image';
import Card from './Card';
import Button from './Button';
import StarRating from './StarRating';

const Experiences = () => {
  const experiences = [
    {
      id: 1,
      title: "Traditional Tunisian Cooking Class",
      host: "Amira Benali",
      location: "Tunis",
      price: 45,
      rating: 4.9,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Learn to prepare authentic Tunisian dishes in a local home kitchen. Includes market tour and lunch.",
      duration: "4 hours",
      groupSize: "Up to 6 people"
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

  return (
    <section className="py-16 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">Local Experiences</h2>
          <p className="text-gray max-w-2xl mx-auto">Authentic activities hosted by passionate locals</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {experiences.map((experience) => (
            <Card key={experience.id} hover={true}>
              <div className="relative">
                <Image 
                  src={experience.image} 
                  alt={experience.title} 
                  className="w-full h-48"
                  rounded={false}
                />
                <div className="absolute top-4 right-4 bg-coral text-white px-2 py-1 rounded-full flex items-center text-sm">
                  <StarRating rating={experience.rating} size="sm" />
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-charcoal">{experience.title}</h3>
                  <span className="text-coral font-bold">${experience.price}</span>
                </div>
                
                <div className="flex items-center text-gray text-sm mb-3">
                  <span>{experience.host}</span>
                  <span className="mx-2">•</span>
                  <span>{experience.location}</span>
                </div>
                
                <p className="text-gray text-sm mb-4">{experience.description}</p>
                
                <div className="flex justify-between text-sm text-gray mb-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>{experience.groupSize}</span>
                  </div>
                </div>
                
                <Button variant="primary" size="sm" className="w-full">
                  Book Experience
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;