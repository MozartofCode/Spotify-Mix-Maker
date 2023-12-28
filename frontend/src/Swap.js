import Deck from './Deck';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Swap = () => {

    const [cards, setCards] = useState([]);
    const [error, setError] = useState(''); // Initialize the error state
    
    const navigate = useNavigate();
        
    const location = useLocation();
    const {albumID} = location.state || {};

    // useEffect to fetch members when the component mounts
    useEffect(() => {
      fetchTracks();
    }, []);
  
    // Async function to fetch members from the backend API
    const fetchTracks = async () => {
      try {
        // Make a GET request to the backend API
        const response = await fetch(`http://localhost:5000/api/getTracks?query=${albumID}`, {
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
        <h1>Which songs do you like?</h1>
        <Deck cards={cards} />
    </div>
    );
};


export default Swap;