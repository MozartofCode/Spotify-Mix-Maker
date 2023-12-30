import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import GlobalStyle from './GlobalStyles'

const App = () => {

  // Styles for header and page
  const headerStyle = {
    backgroundColor: 'pink',
    fontWeight: 'bold',
    fontSize: '20px',
    marginTop: '200px',
  };

  // Styles for text and input elements
  const textStyle = {
    padding: '5px',
    fontSize: '15px',
    marginTop: '5px',
    fontWeight: 'bold',
    marginLeft: '2px',
    textAlign: 'left',
  }

  // Styles for the Register button
  const loginStyle = {
    backgroundColor: '',
    padding: '5px',
    fontWeight: 'bold',
    marginTop: '10px',
    marginLeft: '40px',
    marginBottom: '10px',
    textAlign: 'center',
  }

  // Styles for the Login button
  const registerStyle = {
    backgroundColor: '',
    padding: '5px',
    fontWeight: 'bold',
    marginTop: '10px',
    marginLeft: '80px',
    marginBottom: '10px',
  }

  // State for username and password input fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // React Router hook for navigation
  const navigate = useNavigate();

  // Event handler for updating the username state
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Event handler for updating the password state
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Event handler for user registration
  const handleRegister = async () => {
    // Make a POST request to register endpoint
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    // Handle different response statuses
    if (response.status === 400) {
      alert("Username already exists! Try Logging-in");
    } else if (response.status === 404) {
      alert("Error trying to register the user! Try again...");
    } else {
      alert("Registration successful!");
    }
  };

  // Event handler for user login
  const handleLogin = async () => {
    // Make a POST request to login endpoint
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    // Handle different response statuses
    if (response.status === 404 || response.status === 400) {
      alert("User not found! Try again or register if you are a new user...");
    } else {
      const data = await response.json();
      console.log(data);
      
      // Navigate to Home page with username in the state
      navigate('/Home', { state: { username: username } });
    }
  };

  // Rendered JSX
  return (
    <div className="App" style={headerStyle}>
      <h1>WELCOME TO THE SPOTIFY MIX MAKER</h1>
      <div>
        <label>Username:</label>
        <input style={textStyle} type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label>Password:</label>
        <input style={textStyle} type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <div>
        <button onClick={handleRegister} style={registerStyle}>Register</button>
        <button onClick={handleLogin} style={loginStyle}>Login</button>
      </div>

      <GlobalStyle />
    </div>
  );
};

export default App;
