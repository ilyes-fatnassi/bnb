import React from 'react';
import AnimatedSection from './AnimatedSection';

const Features = () => {
  const features = [
    {
      title: "Authentic Experiences",
      description: "Immerse yourself in local culture through genuine interactions with passionate hosts.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
        </svg>
      )
    },
    {
      title: "Delicious Home Cooking",
      description: "Taste authentic local cuisine prepared with love in home kitchens.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
        </svg>
      )
    },
    {
      title: "Comfortable Stays",
      description: "Experience the warmth of local hospitality in carefully selected accommodations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-whitesmoke">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">How Bite&Bed Works</h2>
          <p className="text-gray max-w-2xl mx-auto">Connecting travelers with locals for authentic cultural experiences</p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <AnimatedSection key={index} delay={index * 200}>
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-cream w-20 h-20 rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-charcoal mb-3">{feature.title}</h3>
                <p className="text-gray">{feature.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;