// src/pages/WelcomePage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

// Make sure 'WelcomePage' starts with a capital 'W'
const WelcomePage = () => { 
  // The hook is called correctly at the top level here
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/home');
  };

  return (
    <div className="welcome-container">
      <div className="text-content">
        <h1>Adventure starts at the next stop...</h1>
        <p>Track. Ride. Relax.</p>
      </div>
      <button className="get-started-btn" onClick={handleGetStarted}>
        GET STARTED
      </button>
    </div>
  );
};

// Make sure this line is exactly 'export default WelcomePage;'
export default WelcomePage;