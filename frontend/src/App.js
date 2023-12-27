import React, { useState } from 'react';
import './App.css';
import { useNavigate} from 'react-router-dom';


const App = () => {

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

  const handleLogin = async () => {
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

      navigate('/Home');

    }

  };

  return (
    <div className="App">
      <h1>Login Page</h1>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <div>
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default App;
