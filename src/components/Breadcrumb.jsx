import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ crumbs }) => {
  return (
    <nav className="bg-whitesmoke py-4">
      <div className="container mx-auto px-4">
        <ol className="flex items-center space-x-2 text-sm">
          {crumbs.map((crumb, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
              {crumb.path ? (
                <Link to={crumb.path} className="text-coral hover:underline">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-gray">{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;