import React from 'react';
import Image from './Image';
import Card from './Card';
import Button from './Button';

const Hosts = () => {
  const hosts = [
    {
      id: 1,
      name: "Amira Benali",
      location: "Tunis, Tunisia",
      rating: 4.9,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      specialties: ["Traditional Tunisian", "Cooking Classes", "Cultural Tours"],
      description: "Passionate home cook sharing authentic Tunisian flavors and stories for over 5 years."
    },
    {
      id: 2,
      name: "Youssef Trabelsi",
      location: "Sidi Bou Said, Tunisia",
      rating: 4.8,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      specialties: ["Seafood", "Pottery Workshops", "Historical Walks"],
      description: "Third-generation fisherman turned host, offering unique coastal experiences."
    },
    {
      id: 3,
      name: "Fatma Mehdi",
      location: "Tozeur, Tunisia",
      rating: 5.0,
      reviews: 64,
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      specialties: ["Desert Cuisine", "Oasis Tours", "Traditional Crafts"],
      description: "Desert dweller sharing the rich traditions of southern Tunisia."
    }
  ];

  return (
    <section className="py-16 bg-whitesmoke">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">Meet Our Local Hosts</h2>
          <p className="text-gray max-w-2xl mx-auto">Passionate locals ready to share their culture and cuisine with you</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hosts.map((host) => (
            <Card key={host.id} hover={true}>
              <div className="relative">
                <Image 
                  src={host.image} 
                  alt={host.name} 
                  className="w-full h-64"
                  rounded={false}
                />
                <div className="absolute top-4 right-4 bg-coral text-white px-3 py-1 rounded-full flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{host.rating}</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-charcoal">{host.name}</h3>
                  <span className="text-clay text-sm">{host.location}</span>
                </div>
                
                <p className="text-gray text-sm mb-4">{host.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-charcoal mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {host.specialties.map((specialty, index) => (
                      <span key={index} className="bg-cream text-charcoal text-xs px-3 py-1 rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray text-sm">{host.reviews} reviews</span>
                  <Button variant="outline" size="sm">View Profile</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hosts;