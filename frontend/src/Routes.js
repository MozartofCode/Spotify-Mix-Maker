// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import Search from './Search'; 
import Message from './Message'
import Home from './Home'
import Swap from './Swap'
import Mixed from './Mixed'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} /> 
        <Route exact path="/Search" component={Search} /> 
        <Route exact path="/home" component={Home} />
        <Route exact path="/Message" component={Message} />
        <Route exact path="/Swap" component={Swap} />
        <Route exact path="/Mixed" component={Mixed} />
      </Switch>
    </Router>
  );
};

export default Routes;