import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './home';
import Swap from './Swap';

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
    <Route path= "home" element={<Home />} />
    <Route path= "Swap" element = {<Swap />} />
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