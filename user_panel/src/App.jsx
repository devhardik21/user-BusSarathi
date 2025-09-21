// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Make sure this import is correct
import WelcomePage from './pages/WelcomePage'; 
import HomePage from './pages/HomePage';
import BusListPage from './pages/BusListPage';
import TrackingPage from './pages/TrackingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/buses" element={<BusListPage />} />
        <Route path="/track/:busId" element={<TrackingPage />} />
      </Routes>
    </Router>
  );
}

export default App;