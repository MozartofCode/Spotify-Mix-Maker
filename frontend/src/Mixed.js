import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GlobalService from './GlobalStyles';

const Mixed = () => {
    
  
  const headerStyle = {
    backgroundColor: 'pink',
    padding: '10px',
    border: '1px solid',
    width: '355px',
    fontWeight: 'bold',
    fontSize: '20px',
    marginTop: '40px',
    textAlign: 'center',
    margin: 'auto'
  };

  const paragraphStyle = {
    backgroundColor: 'pink',
    padding: '10px',
    width: '200px',
    fontWeight: 'bold',
    fontSize: '20px',
    marginTop: '20px',
    textAlign: 'left',
    margin:'auto'
  };


  const navigate = useNavigate();
  const location = useLocation();
  const { username, friend, likedSongs } = location.state || {};

  return (
    <div style={headerStyle}>
      <h2 >{username} and {friend}'s Playlist!</h2>
      
      <ul style={paragraphStyle}>
        {likedSongs.map((song, index) => (
            <li key={index}>
              <p>{song}</p>
            </li>
        ))}
      </ul>
      
      <button onClick={() => navigate('../Home', { state: { username: username } })}>
        Go Back to Home Page
      </button>
      <GlobalService />
    </div>
  );
  
}


export default Mixed;