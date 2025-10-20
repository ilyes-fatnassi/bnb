import React from 'react';
import Breadcrumb from './Breadcrumb';
import Image from './Image';
import Card from './Card';
import Button from './Button';
import StarRating from './StarRating';

const HostProfile = () => {
  const host = {
    name: "Amira Benali",
    location: "Tunis, Tunisia",
    rating: 4.9,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    joined: "March 2020",
    languages: ["Arabic", "French", "English"],
    description: "I'm a passionate home cook who loves sharing authentic Tunisian flavors and stories with travelers from around the world. My family has been preparing traditional dishes for generations, and I'm excited to teach you our secrets!",
    specialties: ["Traditional Tunisian", "Cooking Classes", "Cultural Tours"],
    experiences: [
      {
        id: 1,
        title: "Traditional Tunisian Cooking Class",
        price: 45,
        rating: 4.9,
        reviews: 127,
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 2,
        title: "Medina Food Tour",
        price: 35,
        rating: 4.8,
        reviews: 92,
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 3,
        title: "Traditional Bread Making",
        price: 30,
        rating: 5.0,
        reviews: 64,
        image: "https://images.unsplash.com/photo-1598333307245-9c2d155c2d25?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ]
  };

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Hosts', path: '/hosts' },
    { label: host.name }
  ];

  return (
    <div className="bg-whitesmoke">
      <Breadcrumb crumbs={breadcrumbs} />
      
      <div className="container mx-auto px-4 py-8">
        <Card>
          <div className="md:flex">
            <div className="md:w-1/3">
              <Image 
                src={host.image} 
                alt={host.name} 
                className="w-full h-96 object-cover"
                rounded={false}
              />
            </div>
            
            <div className="md:w-2/3 p-8">
              <div className="flex flex-wrap justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-charcoal mb-2">{host.name}</h1>
                  <p className="text-clay flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {host.location}
                  </p>
                </div>
                
                <div className="flex items-center bg-cream px-3 py-1 rounded-full">
                  <StarRating rating={host.rating} size="md" />
                  <span className="text-gray ml-2">({host.reviews} reviews)</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {host.specialties.map((specialty, index) => (
                  <span key={index} className="bg-cream text-charcoal text-sm px-3 py-1 rounded-full">
                    {specialty}
                  </span>
                ))}
              </div>
              
              <p className="text-gray mb-6">{host.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-charcoal mb-2">Languages</h3>
                  <p className="text-gray">{host.languages.join(", ")}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal mb-2">Joined Bite&Bed</h3>
                  <p className="text-gray">{host.joined}</p>
                </div>
              </div>
              
              <Button variant="primary" size="md">
                Contact {host.name.split(' ')[0]}
              </Button>
            </div>
          </div>
        </Card>
        
        <div className="my-12">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Experiences with {host.name.split(' ')[0]}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {host.experiences.map((experience) => (
              <Card key={experience.id} hover={true}>
                <Image 
                  src={experience.image} 
                  alt={experience.title} 
                  className="w-full h-48 object-cover"
                  rounded={false}
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-charcoal mb-2">{experience.title}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <StarRating rating={experience.rating} size="sm" />
                      <span className="text-gray text-sm ml-1">({experience.reviews})</span>
                    </div>
                    <span className="text-coral font-bold">${experience.price}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View Experience
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Reviews</h2>
          <div className="space-y-6">
            <div className="border-b border-clay pb-6">
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold text-charcoal">Sarah J.</h3>
                <div className="flex items-center">
                  <StarRating rating={5} size="sm" />
                </div>
              </div>
              <p className="text-gray">Amira's cooking class was the highlight of my trip to Tunisia! She's such a wonderful teacher and her family welcomed us like relatives. The food was incredible and I learned so much about Tunisian culture.</p>
            </div>
            
            <div className="border-b border-clay pb-6">
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold text-charcoal">Michael T.</h3>
                <div className="flex items-center">
                  <StarRating rating={5} size="sm" />
                </div>
              </div>
              <p className="text-gray">What an amazing experience! Amira is passionate about her culture and cuisine. The market tour was fascinating and I loved learning to cook traditional dishes. Highly recommend!</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HostProfile;