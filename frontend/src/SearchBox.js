// SearchBox.js
import React, { useState } from 'react';


const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/search?query=${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      onSearch(data.results); // Assuming the result structure is similar to your previous implementation
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for albums"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBox;
