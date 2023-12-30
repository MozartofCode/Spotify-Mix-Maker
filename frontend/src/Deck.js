import React, { useState } from 'react';
import Card from './Card';  // Importing the Card component
import { useNavigate } from 'react-router-dom';

// Functional component representing the deck of cards
const Deck = ({ cards }) => {

  // Styles for the deck
  const deckStyle = {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '10px',
    marginTop: '5px',
  };

  const buttonStyle = {
    border: '5px solid white',
    fontWeight: 'bold',
    fontSize: '15px',
    marginTop: '-4px',
    textAlign: 'center'
  };

  const paragraphStyle = {
    backgroundColor: '#ADD8E6',
    padding: '10px', // Adjust the padding as needed
    border: '3px solid #ADD8E6',
    width: '250px',
    fontSize: '25px',
    marginTop: '100px',
    marginBottom: '10px',
    margin: 'auto'
  }

  const [currentIndex, setCurrentIndex] = useState(0);  // State to track the current index of the card
  const navigate = useNavigate();

  // Event handler for swiping left
  const handleSwipeLeft = ({ name, artist }) => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // Event handler for swiping right
  const handleSwipeRight = ({ name, artist }) => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div style={deckStyle}>
      {currentIndex < cards.length && cards.length > 0 ? (
        // Render the Card component with the current card information
        <Card
          name={cards[currentIndex].name}
          artist={cards[currentIndex].artist}
          imageSrc={cards[currentIndex].imageSrc}
          albumID={cards[currentIndex].albumID}
          username={cards[currentIndex].username}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
        />
      ) : (
        // Render a message when all cards have been swiped
        <div style={paragraphStyle}>
          <p>Finished going through the album!</p>
          <button style={buttonStyle} onClick={() => navigate('../Search')}>Make a request to send your friend your album!</button>
        </div>
      )}
    </div>
  );
};

export default Deck;
