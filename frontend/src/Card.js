import React from 'react';

const Card = ({ name, artist, imageSrc, onSwipeLeft, onSwipeRight }) => {

  const handleSwipeLeft = () => {
    if (name && artist) {
      onSwipeLeft({ name, artist });
    } else {
      console.error("Name or artist is undefined");
    }
  };

  const handleSwipeRight = () => {

    if (name && artist) {
      onSwipeRight({ name, artist });
    } else {
      console.error("Name or artist is undefined");
    }
  };

  return (
    <div>
      <img src={imageSrc} alt="Card"/>
      <div>
        <button className="swipe-left" onClick={() => handleSwipeLeft(name, artist)}> No </button>
        <button className="swipe-right" onClick={() => handleSwipeRight(name, artist)}> Yes </button>
      </div>
    </div>
  );
};

export default Card;
