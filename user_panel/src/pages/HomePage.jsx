// src/pages/HomePage.jsx
import React from 'react';
import SearchPanel from '../components/SearchPanel';
import RecentBuses from '../components/RecentBuses';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="home-title">Where are you going today?</h1>
      <SearchPanel />
      <RecentBuses />
    </div>
  );
};

export default HomePage;