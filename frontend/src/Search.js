import React, { useState } from 'react';
import SearchBox from './SearchBox'; // Importing the SearchBox component
import SearchResults from './SearchResults'; // Importing the SearchResults component
import GlobalStyle from './GlobalStyles'; // Importing the GlobalStyle component

const Search = ({ results }) => {
  
  // Styles for header and page
  const headerStyle = {
    backgroundColor: 'pink',
    padding: '10px',
    border: '1px solid',
    width: '500px',
    fontWeight: 'bold',
    fontSize: '20px',
    marginTop: '80px',
    textAlign: 'center',
    margin: 'auto'
  };

  // State for storing search results
  const [searchResults, setSearchResults] = useState([]);

  // Callback function to update search results
  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div>
      <div style={headerStyle}>
        <h1>Album Search</h1>
        <p>Let's find an album you want to mix with your friend!</p>
        {/* SearchBox component that triggers the search */}
        <SearchBox onSearch={handleSearch} />
      </div>
        
      <div>
        {/* Component to display the search results */}
        <SearchResults results={searchResults} />
        {/* Global styles for the entire application */}
        <GlobalStyle />
      </div>
    </div>
  );
};

export default Search;
