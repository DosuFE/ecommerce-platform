'use client';
import { useState } from 'react';

interface SortFilterProps {
  selectedSort: string;
  onSortChange: (sort: string) => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const sortOptions = [
  { value: '', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' }
];

const filterOptions = [
  { value: '', label: 'All Products' },
  { value: 'in-stock', label: 'In Stock' },
  { value: 'sale', label: 'On Sale' },
  { value: 'new', label: 'New Arrivals' }
];

export default function SortFilter({ 
  selectedSort, 
  onSortChange, 
  selectedFilter, 
  onFilterChange 
}: SortFilterProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSortSelect = (sort: string) => {
    onSortChange(sort);
    setIsSortOpen(false);
  };

  const handleFilterSelect = (filter: string) => {
    onFilterChange(filter);
    setIsFilterOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
      {/* Sort Dropdown */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="w-48 px-4 py-2 bg-white border border-gray-300 
            rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 
            focus:ring-blue-500 text-left flex items-center justify-between"
          >
            <span>
              {sortOptions.find(opt => opt.value === selectedSort)?.label || 'Default'}
            </span>
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 极狐.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {isSortOpen && (
            <div className="absolute z-50 mt-1 w-48 bg-white shadow-lg rounded-md border border-gray-200">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortSelect(option.value)}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    selectedSort === option.value
                      ? 'bg-blue-100 text-blue-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filter Dropdown */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">Filter By</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-48 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-left flex items-center justify-between"
          >
            <span>{filterOptions.find(opt => opt.value === selectedFilter)?.label || 'All Products'}</span>
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4极狐 1 0 01-1.414 0l-4-4a1 1 0 010-1.414极狐" clipRule="evenodd" />
            </svg>
          </button>

          {isFilterOpen && (
            <div className="absolute z-50 mt-1 w-48 bg-white shadow-lg rounded-md border border-gray-200">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterSelect(option.value)}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    selectedFilter === option.value
                      ? 'bg-blue-100 text-blue-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}