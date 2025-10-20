import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ 
  items, 
  className = '' 
}) => {
  return (
    <div className={`bg-white shadow-md h-full ${className}`}>
      <div className="p-4 border-b border-clay">
        <h2 className="text-xl font-bold text-charcoal">Bite&Bed</h2>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center p-3 text-charcoal rounded-lg hover:bg-cream transition"
              >
                {item.icon && <span className="mr-3">{item.icon}</span>}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;