import Deck from './Deck';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GlobalSstyle from './GlobalStyles';


const Swap = () => {

  const basicStyle = {
    backgroundColor: 'pink',
    padding: '10px',
    border: '1px solid',
    width: '355px',
    fontWeight: 'bold',
    fontSize: '20px',
    marginTop: '20px',
    textAlign: 'center',
    margin: '0 auto',
  }

    const [cards, setCards] = useState([]);
    const [error, setError] = useState(''); // Initialize the error state
        
    const location = useLocation();
    const {albumID, username} = location.state || {};

    // useEffect to fetch members when the component mounts
    useEffect(() => {
      fetchTracks();
    }, []);
  
    // Async function to fetch members from the backend API
    const fetchTracks = async () => {
      try {
        // Make a GET request to the backend API
        const response = await fetch(`http://localhost:5000/api/getTracks?query=${albumID}&username=${username}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

        if (response.ok) {
  
          const result = await response.json();
          
          // Map the fetched members to cards
          const newCards = result.map((track) => ({
            id: track.id,
            name: track.name, 
            artist: track.artist,
            imageSrc: track.imageURL, 
            username: track.username,
            albumID: track.albumID
          }));
  
          // Update the state with the new cards and clear any previous errors
          setCards(newCards);
          setError('');
        } else {
          const result = await response.json();
          setCards([]);
          setError(result.error);
        }
      } catch (error) {
        console.error('Error fetching tracks:', error);
        setCards([]);
        setError('Error fetching tracks');
      }
    };

    return(    
        <div>
        <h1 style = {basicStyle}>Which songs do you like?</h1>
        <Deck cards={cards} />
        <GlobalSstyle />
    </div>
    );
};

export default Swap;