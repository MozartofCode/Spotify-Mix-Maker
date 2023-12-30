import React, { useState } from 'react';

// SearchBox component that takes a callback function onSearch as a prop
const SearchBox = ({ onSearch }) => {
  
  // Style for the button
  const boxStyle = {
    marginLeft: '5px',
  };
  
  // State for storing the search query
  const [query, setQuery] = useState('');

  // Function to handle the search
  const handleSearch = async () => {
    try {
      // Make a GET request to the search API with the query
      const response = await fetch(`http://localhost:5000/api/search?query=${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the response JSON
      const data = await response.json();
      
      // Trigger the onSearch callback with the search results
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
      <button style={boxStyle} onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBox;
