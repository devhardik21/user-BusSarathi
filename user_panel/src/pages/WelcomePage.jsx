import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/home'); // or wherever you want to navigate
  };

  return (
    <div className="welcome-container">
      {/* Animated Bus */}
      <div className="bus-animation">
        <div className="css-bus">
          <div className="bus-windows"></div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="floating-elements">
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
      </div>

      {/* Main content */}
      <div className="text-content">
        <h1>Welcome to Bus Sarathi</h1>
        <p>Your intelligent companion for seamless bus travel. Find routes, track buses in real-time, and plan your journey with confidence.</p>
      </div>

      <button className="get-started-btn" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
};

export default WelcomePage;