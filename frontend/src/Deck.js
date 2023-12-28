import React, { useState } from 'react';
import Card from './Card';

// Functional component representing the deck of cards
const Deck = ({ cards }) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeLeft = ({ name, party }) => {
    setCurrentIndex((prevIndex) => prevIndex + 1);

  };

  const handleSwipeRight = ({ name, party }) => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div>
      {currentIndex < cards.length && cards.length > 0 ? (
        <Card
          name={cards[currentIndex].name}
          artist={cards[currentIndex].artist}
          imageSrc={cards[currentIndex].imageSrc}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
        />
      ) : (
        <p>No more cards</p>
      )}
    </div>
  );
};

export default Deck;
