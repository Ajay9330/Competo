// components/Search.js
import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (filterName, value) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set(filterName, value);
      return newParams;
    });
  };

  return (
    <div>
      <h2>Search</h2>
      <div>
        <label>
          Filter 1:
          <input
            type="text"
            value={searchParams.get('filter1') || ''}
            onChange={(e) => handleFilterChange('filter1', e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Filter 2:
          <input
            type="text"
            value={searchParams.get('filter2') || ''}
            onChange={(e) => handleFilterChange('filter2', e.target.value)}
          />
        </label>
      </div>
      {/* Add more filters as needed */}
    </div>
  );
}
