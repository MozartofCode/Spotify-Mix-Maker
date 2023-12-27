
import React, { useState } from 'react';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';

const Home = ({ results }) => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div>
      <h1>Spotify Album Search</h1>
      <SearchBox onSearch={handleSearch} />
      <SearchResults results={searchResults} />
    </div>
  );

};


  export default Home;
  