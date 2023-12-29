// SearchResults.js
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';

const SearchResults = ({ results }) => {

  const paragraphStyle = {
    backgroundColor: 'pink',
    padding: '10px',
    border: '1px solid',
    width: '500px',
    fontWeight: 'bold',
    fontSize: '20px',
    marginTop: '80px',
    textAlign: 'left',
    margin:'auto'
  }


  const [album, setAlbum] = useState('');
  const navigate = useNavigate();

  const handleAlbumChange = (e) => {
    setAlbum(e.target.value);
  }

  if (!results) {
    alert("ERROR: FAILED FETCHING DATA FROM API")
  }

  const nextStep = async (selectedAlbumId, selectedAlbum) => {
    navigate('/Message', { state: { albumID: selectedAlbumId, album: selectedAlbum } });
  }

  return (
   <div style={paragraphStyle}>
   <ul>
    {results.map((result) => (
      <li key={result.id}>
        <button onClick={() => nextStep(result.id, result.name)} value={album}>
          {result.name}
        </button>
      </li>
    ))}
  </ul>
  </div>
  );
};

export default SearchResults;
