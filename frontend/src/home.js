import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Home = () => {
    
    const [requests, setRequests] = useState([]);
    const [ownRequests, setOwnRequests] = useState([]);
    const [completedRequests, setCompletedRequests] = useState([]);
    const navigate = useNavigate();
        
    const location = useLocation();
    const {username} = location.state || {};


    const navigateToSearch = () => {
        navigate('../Search');
    }
    

  useEffect(() => {

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



  const handleAccept = async (albumID) => {

     // Make a POST request to register endpoint
     const response = await fetch('http://localhost:5000/api/acceptRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, albumID}),
    });

    if (response.status === 400 || response.status === 404) {
      alert("Couldn't accept request. Try again");
    }

    else {
      alert("Request accepted...Directing to your friend's album!")  
      navigate('../Swap', {state: {albumID: albumID, username: username }});
    }
  };

  const handleReject = async (albumID) => {
    
     // Make a POST request to register endpoint
     const response = await fetch('http://localhost:5000/api/rejectRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, albumID}),
    });

    if (response.status === 400 || response.status === 404) {
      alert("Couldn't reject request. Try again");
    }

    else {
      alert("Request rejected...")
      window.location.reload();
    }
  };


  const makeMixList = async (username, friend, likedSongs) => {
    
      // Make a POST request to register endpoint
      const response = await fetch('http://localhost:5000/api/makeMixList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, friend, likedSongs}),
      });
  
      if (response.status === 400 || response.status === 404) {
        alert("Couldn't make playlist. Try again");
      }
  
      else {
        navigate('../Mixed', {state: {username: username, friend: friend, likedSongs: likedSongs}});
        alert("Congratulations! New Playlist has been created for you and your friend");
      }
  };
    




  return (
    <div>
      <h2>Incoming Requests For You</h2>
      <ul>
        {requests.map((request, index) => (
          <li key={index}>
            <p>Requesting Friend: {request.username}</p>
            <p>Status: {request.status}</p>
            <button onClick={() => handleAccept(request.albumID)}>Accept</button>
            <button onClick={() => handleReject(request.albumID)}>Reject</button>
          </li>
        ))}
      </ul>

      <h2>In-progress Requests Sent by You</h2>

      <ul>
        {ownRequests.map((request, index) => (
          <li key={index}>
            <p>The Friend You Requested to: {request.friend}</p>
            <p>Status: {request.status}</p>
          </li>
        ))}
      </ul>
        
        
      <h2>Lists Ready for creating a mixed playlist!</h2>

      <ul>
        {completedRequests.map((request, index) => (
            <li key={index}>
              <p>Friend: {request.friend}</p>
              <p>Status: {request.status}</p>
              <p>Songs: {request.likedSongs.join(', ')}</p>

              <button onClick={() => makeMixList(request.username, request.friend, request.likedSongs)}>Make my mix list!</button>
              
            </li>
          ))}
      </ul>



      
      <button onClick={navigateToSearch}>Create a New Request</button>


    </div>
  );


};

export default Home;