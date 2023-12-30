import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';

// Functional component representing the Message page
const Message = () => {

  // Styles for header and page
  const headerStyle = {
    backgroundColor: 'pink',
    padding: '10px',
    border: '1px solid',
    width: '500px',
    fontWeight: 'bold',
    fontSize: '20px',
    marginTop: '180px',
    textAlign: 'center',
    margin: 'auto'
  };

  const textStyle = {
    padding: '5px',
    fontSize: '15px',
    marginTop: '5px',
    fontWeight: 'bold',
    marginLeft: '2px',
    textAlign: 'left',
  };

  const buttonStyle = {
    backgroundColor: '',
    padding: '5px',
    fontWeight: 'bold',
    marginTop: '10px',
    marginLeft: '40px',
    marginBottom: '10px',
    textAlign: 'center',
  };

  // Hooks for navigation and location
  const navigate = useNavigate();
  const location = useLocation();
  const { albumID, album } = location.state || {};

  // State for username and friend
  const [username, setUsername] = useState('');
  const [friend, setFriend] = useState('');

  // Event handler for username input
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Event handler for friend input
  const handleFriendChange = (e) => {
    setFriend(e.target.value);
  };

  // Event handler for submission button click
  const handleSubmission = async () => {

    // Make a POST request to send a request
    const response = await fetch('http://localhost:5000/api/sendRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        friend: friend,
        albumID: albumID,
        album: album
      }),
    });

    if (response.status === 404 || response.status === 400) {
      alert("Try again! Problem with either your name, friend's name, or the album...");
    } else {
      alert('Request sent! Wait for your friend to accept...');
      navigate('../Home', { state: { username: username } });
    }

  };

  return (
    <div style={headerStyle}>
      <h2>Send Your Request</h2>
      <div>
        <label>Your Username:</label>
        <input style={textStyle} type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label>Friend's Username:</label>
        <input style={textStyle} type="text" value={friend} onChange={handleFriendChange} />
      </div>
      <div>
        <button style={buttonStyle} onClick={handleSubmission}>Send Request</button>
      </div>
      <GlobalStyles />
    </div>
  );
};

export default Message;
