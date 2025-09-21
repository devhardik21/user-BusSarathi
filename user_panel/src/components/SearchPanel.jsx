// src/components/SearchPanel.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 1. Import the icons you want to use
import { FaBusAlt, FaMapMarkerAlt, FaHashtag, FaSearch } from 'react-icons/fa';
import './SearchPanel.css';

const SearchPanel = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [busNumber, setBusNumber] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const searchString = `?from=${fromLocation}&to=${toLocation}&bus=${busNumber}`;
    navigate(`/buses${searchString}`);
  };

  return (
    <div className="search-panel">
      {/* 2. Add the icon next to the input */}
      <div className="input-group">
        <FaBusAlt className="input-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="FROM"
          value={fromLocation}
          onChange={(e) => setFromLocation(e.target.value)}
        />
      </div>
      <div className="input-group">
        <FaMapMarkerAlt className="input-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="TO"
          value={toLocation}
          onChange={(e) => setToLocation(e.target.value)}
        />
      </div>
      <div className="input-group">
        <FaHashtag className="input-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="BUS NUMBER"
          value={busNumber}
          onChange={(e) => setBusNumber(e.target.value)}
        />
      </div>
      <button className="search-button" onClick={handleSearch}>
        <FaSearch /> {/* Add an icon to the button */}
        <span style={{ marginLeft: '8px' }}>PROCEED</span>
      </button>
    </div>
  );
};

export default SearchPanel;