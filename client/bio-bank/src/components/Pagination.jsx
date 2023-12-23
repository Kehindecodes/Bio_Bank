import { useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const maxPageNumbers = 3; // You can adjust this based on your design preference
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  
    const [inputPage, setInputPage] = useState('');
  
    const renderPageNumbers = () => {
      const startIndex = Math.max(currentPage - Math.floor(maxPageNumbers / 2), 1);
      const endIndex = Math.min(startIndex + maxPageNumbers - 1, totalPages);
  
      return pageNumbers.slice(startIndex - 1, endIndex).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`relative block rounded-full  px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  hover:bg-neutral-700 hover:text-white ${
            currentPage === page ? 'bg-primary-500 text-surface-100' : 'bg-transparent text-surface-600'
          }`}
        >
          {page}
        </button>
      ));
    };
  
    const handleInputChange = (e) => {
      const value = e.target.value;
      setInputPage(value);
    };
  
    const handleGoClick = () => {
      const pageNumber = parseInt(inputPage, 10);
      if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
        onPageChange(pageNumber);
        setInputPage('');
      }
    };
  
    return (
      <div className="flex justify-center items-center mt-4">
    
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className={`relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400 hover:text-primary-500 ${
                currentPage > 1 ? '' : 'pointer-events-none'
            }`}
          >
            Previous
          </button>
  
        {renderPageNumbers()}
  
        
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className={`relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 text-neutral-400 hover:text-primary-500 ${
                currentPage < totalPages ? '' : 'pointer-events-none'
            } `}
          >
            Next
          </button>
  
        <div className="flex items-center mx-4">
          <input
            type="text"
            className="border border-line-divider px-1 py-3 rounded-xl bg-surface-100 text-surface-600 text-sm w-16 focus:outline-none"
            value={inputPage}
            onChange={handleInputChange}
          />
          <button
            onClick={handleGoClick}
            className="bg-primary-500 text-surface-100 py-1 px-2 ml-2 rounded-xl cursor-pointer focus:outline-none"
          >
            Go
          </button>
        </div>
      </div>
    );
  };

export default Pagination;
