// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App'; // Import your main App component
import Home from './home'; // Import your home component
import Message from './Message'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} /> {/* Route for the home/login page */}
        <Route exact path="/home" component={Home} /> {/* Route for the wardrobe page */}
        <Route exact path="/Message" component={Message} />
      </Switch>
    </Router>
  );
};

export default Routes;