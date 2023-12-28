
import React, { useState } from 'react';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';

const Search = ({ results }) => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div>
      <h1>Spotify Album Search</h1>
      <body>Let's find an album you want to mix with your friend!</body>
      <SearchBox onSearch={handleSearch} />
      <SearchResults results={searchResults} />
    </div>
  );

};

export default Search;
  