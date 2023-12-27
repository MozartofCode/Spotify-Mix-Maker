import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';

const Home = () => {

  const [username, setUsername] = useState('');
  const [friend, setFriend] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFriendChange = (e) => {
    setFriend(e.target.value);
  };


  const handleSubmission = async () => {

    // SOmehow get this from album
    albumID = ""


    // Make a POST request to login endpoint
    const response = await fetch('http://localhost:5000/api/send/Album', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, friend, albumID }),
    });

    if (response.status === 404 || response.status === 400) {
      alert("Try Again! Either your name or your friend's name is incorrect! Or change the album");
    }

    else {
      const data = await response.json();  
      console.log(data);

      navigate('/Swap');

    }

  };

    return (
      <div className="Home">
      <h1> Page</h1>
      <div>
        <label>Your Username:</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label>Your friend's Username:</label>
        <input type="text" value={friend} onChange={handleFriendChange} />
      </div>
      <div>
        <form id="searchForm">
          <input type="text" id="albumSearch" placeholder="Search for an album" />
          <button type="submit">Search</button>
        </form>
      </div>
      <div>
        <button onClick={handleSubmission}>Submit Request</button>
      </div>
    </div>
    );
  };
  
  export default Home;
  