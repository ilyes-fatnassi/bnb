import React, { useState } from 'react';
import Button from './Button';

const Booking = () => {
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [time, setTime] = useState('10:00');

  const experience = {
    title: "Traditional Tunisian Cooking Class",
    host: "Amira Benali",
    location: "Tunis, Tunisia",
    price: 45,
    rating: 4.9,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    duration: "4 hours",
    includes: [
      "Market tour with local guide",
      "Hands-on cooking class",
      "Traditional lunch",
      "Recipe card to take home"
    ]
  };

  const totalPrice = experience.price * guests;

  const handleBooking = (e) => {
    e.preventDefault();
    // In a real app, this would connect to a backend
    alert(`Booking confirmed for ${experience.title} on ${date} at ${time} for ${guests} guest(s). Total: $${totalPrice}`);
  };

  return (
    <div className="bg-whitesmoke py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-2/3 px-4 mb-8 lg:mb-0">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img 
                src={experience.image} 
                alt={experience.title} 
                className="w-full h-64 object-cover"
              />
              
              <div className="p-8">
                <div className="flex flex-wrap justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-charcoal mb-2">{experience.title}</h1>
                    <p className="text-clay flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {experience.location}
                    </p>
                    <p className="text-gray">Hosted by {experience.host}</p>
                  </div>
                  
                  <div className="flex items-center bg-cream px-3 py-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-coral mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold">{experience.rating}</span>
                    <span className="text-gray ml-1">({experience.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray mb-8">
                  <div className="flex items-center mr-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Group experience</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-charcoal mb-4">What's included</h2>
                  <ul className="space-y-2">
                    {experience.includes.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-coral mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-charcoal mb-4">About your host</h2>
                  <p className="text-gray mb-4">
                    Amira is a passionate home cook who loves sharing authentic Tunisian flavors and stories with travelers from around the world. 
                    Her family has been preparing traditional dishes for generations, and she's excited to teach you their secrets!
                  </p>
                  <button className="text-coral font-medium flex items-center">
                    Show more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/3 px-4">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="text-2xl font-bold text-charcoal mb-6">${experience.price} <span className="text-lg font-normal text-gray">per person</span></div>
              
              <form onSubmit={handleBooking}>
                <div className="mb-6">
                  <label className="block text-charcoal font-medium mb-2">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 border border-clay rounded-lg focus:outline-none focus:ring-2 focus:ring-coral"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-charcoal font-medium mb-2">Time</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-3 border border-clay rounded-lg focus:outline-none focus:ring-2 focus:ring-coral"
                    required
                  >
                    <option value="10:00">10:00 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-charcoal font-medium mb-2">Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-clay rounded-lg focus:outline-none focus:ring-2 focus:ring-coral"
                    required
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} guest{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                
                <div className="border-t border-clay pt-6 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray">${experience.price} × {guests} guest{guests > 1 ? 's' : ''}</span>
                    <span className="text-charcoal">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-charcoal">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>
                
                <Button type="submit" size="lg" className="w-full">
                  Request to Book
                </Button>
                
                <p className="text-gray text-sm text-center mt-4">
                  You won't be charged yet
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;