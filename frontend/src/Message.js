import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Message = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { albumID, album } = location.state || {};
  
  const [username, setUsername] = useState('');
  const [friend, setFriend] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFriendChange = (e) => {
    setFriend(e.target.value);
  };

  const handleSubmission = async () => {

    const response = fetch('http://localhost:5000/api/sendRequest', {
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
      alert("Try again! Problem with either your name, friend's name or the album...");
    }

    else {
      alert('Request send! Wait for your friend to accept...');
      navigate('../Home')
    }
    
  };


  return (
    <div>
      <h2>Message Component</h2>
      <div>
        <label>Your Username:</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label>Your Friend's Username:</label>
        <input type="text" value={friend} onChange={handleFriendChange} />
      </div>
      <div>
        <button onClick={handleSubmission}>Send Request</button>
      </div>
      
    </div>
  );
};

export default Message;
