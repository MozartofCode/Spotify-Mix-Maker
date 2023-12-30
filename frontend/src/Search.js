
import React, { useState } from 'react';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';
import GlobalStyle from './GlobalStyles';

const Search = ({ results }) => {

  
  const headerStyle = {
    backgroundColor: 'pink',
    padding: '10px',
    border: '1px solid',
    width: '500px',
    fontWeight: 'bold',
    fontSize: '20px',
    marginTop: '80px',
    textAlign: 'center',
    margin:'auto'
  };


  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div>
      <div style={headerStyle}>
        <h1>Album Search</h1>
        <p>Let's find an album you want to mix with your friend!</p>
        <SearchBox onSearch={handleSearch} />
      </div>
        
      <div>
        <SearchResults results={searchResults} />
        <GlobalStyle />
        </div>
      </div>
  );

};

export default Search;
  