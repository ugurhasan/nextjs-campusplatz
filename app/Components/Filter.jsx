'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const Filter = ({ category, subcategories }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [debouncedMinPrice, setDebouncedMinPrice] = useState('');
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState('');
  const [subcategoryDropdownOpen, setSubcategoryDropdownOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();

  const priceDropdownRef = useRef(null);
  const subcategoryDropdownRef = useRef(null);

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setSubcategoryDropdownOpen(false);
    router.push(`/${category}/${subcategory.toLowerCase() || ''}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedMinPrice(minPrice);
      setDebouncedMaxPrice(maxPrice);
    }, 500);

    return () => clearTimeout(timer);
  }, [minPrice, maxPrice]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedMinPrice) {
      params.set('min_price', debouncedMinPrice);
    } else {
      params.delete('min_price');
    }

    if (debouncedMaxPrice) {
      params.set('max_price', debouncedMaxPrice);
    } else {
      params.delete('max_price');
    }

    router.push(`/${category}?${params.toString()}`);
  }, [debouncedMinPrice, debouncedMaxPrice, router, searchParams, category]);

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        priceDropdownRef.current && !priceDropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
      if (
        subcategoryDropdownRef.current &&
        !subcategoryDropdownRef.current.contains(event.target)
      ) {
        setSubcategoryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-row gap-5 mt-5">
      {/* Subcategory Dropdown */}
      <div className="relative inline-block text-left w-56" ref={subcategoryDropdownRef}>
        <button
          type="button"
          onClick={() => setSubcategoryDropdownOpen(!subcategoryDropdownOpen)}
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {selectedSubcategory || 'All Subcategories'}
          <svg className={`-mr-1 ml-2 h-5 w-5 transform ${ subcategoryDropdownOpen ? 'rotate-180' : 'rotate-0' } transition-transform`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
        </button>

        {subcategoryDropdownOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <ul className="py-1">
              <li onClick={() => handleSubcategorySelect('')} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                All Subcategories
              </li>
              {subcategories.map((subcategory) => (
                <li key={subcategory} onClick={() => handleSubcategorySelect(subcategory)} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  {subcategory}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Price Filters */}
      <div className="relative inline-block text-left" ref={priceDropdownRef}>
        <button type="button" onClick={() => setDropdownOpen(!dropdownOpen)} className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Price Filters
          <svg className={`-mr-1 ml-2 h-5 w-5 transform ${ dropdownOpen ? 'rotate-180' : 'rotate-0' } transition-transform`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" > <path fillRule="evenodd" d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
        </button>

        {dropdownOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="py-4 px-4">
              <div className="flex items-center gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Min Price
                  </label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    placeholder="Min"
                    className="h-10 pl-2 border block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Max Price
                  </label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    placeholder="Max"
                    className="h-10 pl-2 border block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
