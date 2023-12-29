import React, { useState } from 'react';
import './App.css';
import { useNavigate} from 'react-router-dom';
import GlobalStyle from './GlobalStyles'


const App = () => {

  // Styles for header and page
  const headerStyle = {
    backgroundColor: 'pink',
    fontWeight: 'bold',
    fontSize: '20px',
    marginTop: '200px',
  };

  
  const textStyle = {
    padding: '5px',
    fontSize: '15px',
    marginTop: '5px',
    fontWeight: 'bold',
    marginLeft: '2px',
    textAlign: 'left',
  }

  const loginStyle = {
      backgroundColor: '',
      padding: '5px',
      fontWeight: 'bold',
      marginTop: '10px',
      marginLeft: '40px',
      marginBottom: '10px',
      textAlign: 'center',

  }

  const registerStyle = {
    backgroundColor: '',
    padding: '5px',
    fontWeight: 'bold',
    marginTop: '10px',
    marginLeft: '80px',
    marginBottom: '10px',
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async () => {
    // Make a POST request to register endpoint
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 400) {
      alert("Username already exists! Try Logging-in");
    }

    else if (response.status === 404) {
      alert("Error trying to register the user! Try again...");
    }

    else {
      alert("Registration successful!");
    }
    
  };

  const handleLogin = async (username) => {
    // Make a POST request to login endpoint
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 404 || response.status === 400) {
      alert("User not found! Try again or register if you are a new user...");
    }

    else {
      const data = await response.json();  
      console.log(data);
      
      navigate('/Home', {state: {username: username }});

    }

  };

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
        <button onClick={() => handleLogin(username)} style={loginStyle}>Login</button>
      </div>

      <GlobalStyle />
    </div>
  );
};

export default App;
