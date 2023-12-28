import React from 'react';

const Card = ({ albumID, username, name, artist, imageSrc, onSwipeLeft, onSwipeRight }) => {

  const handleSwipeLeft = () => {
    if (name && artist) {
      onSwipeLeft({ name, artist });
    } else {
      console.error("Name or artist is undefined");
    }
  };

  const handleSwipeRight = async () => {
    
    // Make a POST request to login endpoint
    const response = await fetch('http://localhost:5000/api/swipeRight', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, name, albumID }),
    });

    if (response.status === 404 || response.status === 400) {
      alert("Couldn't swipe Right! Error! Try again...");
    }

    else {
      const data = await response.json();  
      console.log("Success in swiping right")
      if (name && artist) {
        onSwipeRight({ name, artist });
      }
    };
  }

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
