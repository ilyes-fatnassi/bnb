import React, { useState } from 'react';

const Tabs = ({ tabs, className = '' }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={className}>
      <div className="border-b border-clay">
        <nav className="flex space-x-8">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`py-4 px-1 text-sm font-medium border-b-2 ${
                activeTab === index
                  ? 'border-coral text-coral'
                  : 'border-transparent text-gray hover:text-charcoal hover:border-gray'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="py-6">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;