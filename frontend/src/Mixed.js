import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Mixed = () => {
    
  const navigate = useNavigate();
  const location = useLocation();
  const { username, friend, likedSongs } = location.state || {};

  return (
    <div>
      <h2>{username} and {friend}'s Playlist!</h2>
      
      <ul>
        {likedSongs.map((song, index) => (
            <li key={index}>
              <p>{song}</p>
            </li>
        ))}
      </ul>
      
      <button onClick={() => navigate('../Home', { state: { username: username } })}>
        Go Back to Home Page
      </button>
    </div>
  );
  
}


export default Mixed;