import React, { useState } from 'react';
import Card from './Card';

// Functional component representing the deck of cards
const Deck = ({ cards }) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeLeft = ({ name, artist}) => {
    setCurrentIndex((prevIndex) => prevIndex + 1);

  };

  const handleSwipeRight = ({ name, artist }) => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div>
      {currentIndex < cards.length && cards.length > 0 ? (
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

        <div>
          <p>Finished going through the album</p>
          <button>Send your friend your album!</button>
        </div>
      
      )}
    </div>
  );
};

export default Deck;
