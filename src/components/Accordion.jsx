import React, { useState } from 'react';

const Accordion = ({ items, className = '' }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="border border-clay rounded-lg">
          <button
            onClick={() => toggleAccordion(index)}
            className="flex justify-between items-center w-full p-4 text-left font-medium text-charcoal hover:bg-cream rounded-lg transition"
          >
            <span>{item.title}</span>
            <svg
              className={`h-5 w-5 text-coral transform transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          
          {openIndex === index && (
            <div className="p-4 pt-0 text-gray">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;