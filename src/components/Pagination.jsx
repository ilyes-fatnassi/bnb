import React from 'react';
import Button from './Button';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className = ''
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
      
      {getPageNumbers().map((page, index) => (
        <Button
          key={index}
          variant={page === currentPage ? 'primary' : 'secondary'}
          size="sm"
          disabled={page === '...'}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          className={page === '...' ? 'cursor-default' : ''}
        >
          {page}
        </Button>
      ))}
      
      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;