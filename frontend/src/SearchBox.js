// SearchBox.js
import React, { useState } from 'react';
import axios from 'axios';

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search?query=${query}`);
      onSearch(response.data);
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
