import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GlobalStyle from './GlobalStyles';

// Functional component representing the Home page
const Home = () => {

  // Styles for the header and list containers
  const headerStyle = {
    backgroundColor: 'pink',
    padding: '10px',
    border: '1px solid',
    width: '355px',
    fontWeight: 'bold',
    fontSize: '20px',
    marginTop: '20px',
    textAlign: 'center'
  };

  const listStyle = {
    backgroundColor: '#ADD8E6',
    border: '1px solid',
    width: '355px',
    fontWeight: 'bold',
    fontSize: '15px',
    marginTop: '20px',
    textAlign: 'center'
  };

  // Styles for buttons
  const mixButton = {
    border: '5px solid white',
    fontWeight: 'bold',
    fontSize: '15px',
    marginTop: '-4px',
    textAlign: 'center'
  }

  const searchButton = {
    border: '5px solid white',
    fontWeight: 'bold',
    fontSize: '15px',
    marginTop: '20px',
    textAlign: 'center'
  }

  const otherButtons = {
    border: '5px solid white',
    fontWeight: 'bold',
    fontSize: '15px',
    marginTop: '5px',
    textAlign: 'center',
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '10px'
  }

  // State to store requests data
  const [requests, setRequests] = useState([]);
  const [ownRequests, setOwnRequests] = useState([]);
  const [completedRequests, setCompletedRequests] = useState([]);

  // Hooks for navigation and location
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || {};

  // Function to navigate to the Search page
  const navigateToSearch = () => {
    navigate('../Search');
  }

  useEffect(() => {

    // Function to fetch completed requests
    const fetchCompletedRequest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/displayCompletedRequests?username=${username}`);
        const data = await response.json();

        if (response.ok) {
          setCompletedRequests(data.requests);
        } else {
          console.error('Failed to fetch requests:', data.error);
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    // Function to fetch own requests
    const fetchOwnRequest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/displayOwnRequests?username=${username}`);
        const data = await response.json();

        if (response.ok) {
          setOwnRequests(data.requests);
        } else {
          console.error('Failed to fetch requests:', data.error);
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    // Function to fetch other requests
    const fetchRequests = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/displayOtherRequests?username=${username}`);
        const data = await response.json();

        if (response.ok) {
          setRequests(data.requests);
        } else {
          console.error('Failed to fetch requests:', data.error);
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
    fetchOwnRequest();
    fetchCompletedRequest();
  }, [username]);

  // Function to handle accepting a request
  const handleAccept = async (albumID) => {

    // Make a POST request to accept the request
    const response = await fetch('http://localhost:5000/api/acceptRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, albumID }),
    });

    if (response.status === 400 || response.status === 404) {
      alert("Couldn't accept request. Try again");
    } else {
      alert("Request accepted...Directing to your friend's album!")
      navigate('../Swap', { state: { albumID: albumID, username: username } });
    }
  };

  // Function to handle rejecting a request
  const handleReject = async (albumID) => {

    // Make a POST request to reject the request
    const response = await fetch('http://localhost:5000/api/rejectRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, albumID }),
    });

    if (response.status === 400 || response.status === 404) {
      alert("Couldn't reject request. Try again");
    } else {
      alert("Request rejected...")
      window.location.reload();
    }
  };

  // Function to create a mixed playlist
  const makeMixList = async (username, friend, likedSongs) => {

    navigate('../Mixed', { state: { username: username, friend: friend, likedSongs: likedSongs } });
    alert("Congratulations! A new playlist has been created for you and your friend");

  };

  return (
    <div>
      <h2 style={headerStyle}>Incoming Requests For You</h2>
      <ul>
        {requests.map((request, index) => (
          <li style={listStyle} key={index}>
            <p>Requesting Friend: {request.username}</p>
            <p>Status: {request.status}</p>
            <button style={otherButtons} onClick={() => handleAccept(request.albumID)}>Accept</button>
            <button style={otherButtons} onClick={() => handleReject(request.albumID)}>Reject</button>
          </li>
        ))}
      </ul>

      <h2 style={headerStyle}>In-progress Requests Sent by You</h2>

      <ul>
        {ownRequests.map((request, index) => (
          <li style={listStyle} key={index}>
            <p>The Friend You Requested to: {request.friend}</p>
            <p>Status: {request.status}</p>
          </li>
        ))}
      </ul>

      <h2 style={headerStyle}>Lists Ready for Creating a Mixed Playlist!</h2>

      <ul>
        {completedRequests.map((request, index) => (
          <li style={listStyle} key={index}>
            <p>Friend: {request.friend}</p>
            <p>Status: {request.status}</p>
            <p>Songs: {request.likedSongs.join(', ')}</p>
            <button style={mixButton} onClick={() => makeMixList(request.username, request.friend, request.likedSongs)}>Make my mix list!</button>
          </li>
        ))}
      </ul>

      <button style={searchButton} onClick={navigateToSearch}>Create a New Request</button>

      <GlobalStyle />
    </div>
  );
};

export default Home;
