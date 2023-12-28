import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Search from './Search';
import Swap from './Swap';
import Message from './Message';
import Home from './Home'

import { 
  BrowserRouter,
  Routes,
  Route, 
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
    <Route path= "/" element={<App />} />
    <Route path= "Search" element={<Search />} />
    <Route path= "Swap" element = {<Swap />} />
    <Route path= "Message" element = {<Message />} />
    <Route path= "Home" element = {<Home />} />
    <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
    </Routes>
  </BrowserRouter>
);