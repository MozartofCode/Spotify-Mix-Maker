// SearchResults.js
import React from 'react';

const SearchResults = ({ results }) => {

  if (!results) {
    return (
      <h1>ERRORRRR</h1>
    );
  }

  return (
    <ul>
      {results.map((result) => (
        <li key={result.id}>{result.name}</li>
      ))}
    </ul>
  );
};

export default SearchResults;
