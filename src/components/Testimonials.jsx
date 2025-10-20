import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Paris, France",
      text: "My experience with Bite&Bed in Tunis was incredible! Amira's home-cooked meal was the highlight of my trip. The warmth and hospitality were unmatched.",
      rating: 5
    },
    {
      name: "Michael Chen",
      location: "Singapore",
      text: "I've used many platforms for local experiences, but Bite&Bed stands out. The connection with my host felt genuine and the food was exceptional.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      text: "Staying with the Ben Ali family was like having relatives in Tunisia. Their stories, their home, their delicious couscous - unforgettable!",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">Traveler Stories</h2>
          <p className="text-gray max-w-2xl mx-auto">Hear from travelers who experienced the magic of Bite&Bed</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-coral" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray mb-6 italic">"{testimonial.text}"</p>
              <div>
                <h4 className="font-semibold text-charcoal">{testimonial.name}</h4>
                <p className="text-clay">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;