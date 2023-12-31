import React from 'react';

// Card component for displaying album information and swipe buttons
const Card = ({ albumID, username, name, artist, imageSrc, onSwipeLeft, onSwipeRight }) => {

  // Styles for the buttons
  const buttonStyle = {
    backgroundColor: '#1899D6',
    borderRadius: '16px',
    borderWidth: '0 0 4px',
    boxSizing: 'border-box',
    color: '#FFFFFF',
    cursor: 'pointer',
    fontFamily: 'din-round, sans-serif',
    fontSize: '15px',
    fontWeight: '700',
    letterSpacing: '.8px',
    lineHeight: '20px',
    margin: '0',
    outline: 'none',
    overflow: 'visible',
    padding: '13px 16px',
    textAlign: 'center',
    textTransform: 'uppercase',
    touchAction: 'manipulation',
    transform: 'translateZ(0)',
    transition: 'filter .2s',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    width: '200px',
    position: 'relative', // Needed for pseudo-element emulation
    marginLeft: '60px',
    marginRight: '60px',
    border: '10px solid white',
  };

  const buttonStyle2 = {
    backgroundColor: 'red',
    borderRadius: '16px',
    borderWidth: '0 0 4px',
    boxSizing: 'border-box',
    color: '#FFFFFF',
    cursor: 'pointer',
    fontFamily: 'din-round, sans-serif',
    fontSize: '15px',
    fontWeight: '700',
    letterSpacing: '.8px',
    lineHeight: '20px',
    margin: '0',
    outline: 'none',
    overflow: 'visible',
    padding: '13px 16px',
    textAlign: 'center',
    textTransform: 'uppercase',
    touchAction: 'manipulation',
    transform: 'translateZ(0)',
    transition: 'filter .2s',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    width: '200px',
    position: 'relative', // Needed for pseudo-element emulation
    marginLeft: '60px',
    marginRight: '60px',
    border: '10px solid white',
  };

  // Styles for the header container
  const headerContainerStyle = {
    backgroundColor: 'pink',
    padding: '20px', // Adjust the padding as needed
    border: '10px solid pink',
    width: '300px'
  };

  // Styles for the paragraph container
  const paragraphStyle = {
    backgroundColor: '#ADD8E6',
    padding: '10px', // Adjust the padding as needed
    border: '3px solid #ADD8E6',
    width: '250px',
    fontSize: '15px',
    marginTop: '10px',
    marginBottom: '10px',
    margin: 'auto'
  }

  // Event handler for swiping left
  const handleSwipeLeft = () => {
    if (name && artist) {
      onSwipeLeft({ name, artist });
    } else {
      console.error("Name or artist is undefined");
    }
  };

  // Event handler for swiping right
  const handleSwipeRight = async () => {
    
    // Make a POST request to swipeRight endpoint
    const response = await fetch('http://localhost:5000/api/swipeRight', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, name, albumID }),
    });

    // Handle different response statuses
    if (response.status === 404 || response.status === 400) {
      alert("Couldn't swipe Right! Error! Try again...");
    } else {
      const data = await response.json();  
      console.log("Success in swiping right");
      if (name && artist) {
        onSwipeRight({ name, artist });
      }
    };
  }

  // Rendered JSX
  return (
    <div>
      <div style={paragraphStyle}>
        <p>Song: {name}</p>
        <p>Artist: {artist}</p>
      </div>

      <img src={imageSrc} alt="Card" style={headerContainerStyle}/>
      <div />
      
      <div>
        {/* Button for swiping left */}
        <button style={buttonStyle} className="swipe-left" onClick={handleSwipeLeft}> No </button>
        {/* Button for swiping right */}
        <button style={buttonStyle2} className="swipe-right" onClick={handleSwipeRight}> Yes </button>
      </div>
    </div>
  );
};

export default Card;
