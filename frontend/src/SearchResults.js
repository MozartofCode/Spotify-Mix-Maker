// SearchResults.js
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';

const SearchResults = ({ results }) => {

  const [album, setAlbum] = useState('');
  const navigate = useNavigate();

  const handleAlbumChange = (e) => {
    setAlbum(e.target.value);
  }

  if (!results) {
    alert("ERROR: FAILED FETCHING DATA FROM API")
  }


  const nextStep = async (selectedAlbumId) => {

    navigate('/Message', { state: { album: selectedAlbumId } });
  }

  return (
    <ul>
    {results.map((result) => (
      <li key={result.id}>
        <button onClick={() => nextStep(result.id)} value={album}>
          {result.name}
        </button>
      </li>
    ))}
  </ul>
  );
};

export default SearchResults;
