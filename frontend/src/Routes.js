// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App'; // Import your main App component
import Search from './Search'; // Import your home component
import Message from './Message'
import Home from './Home'
import Swap from './Swap'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} /> 
        <Route exact path="/Search" component={Search} /> 
        <Route exact path="/home" component={Home} />
        <Route exact path="/Message" component={Message} />
        <Route exact path="/Swap" component={Swap} />
      </Switch>
    </Router>
  );
};

export default Routes;