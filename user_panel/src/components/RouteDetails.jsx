// src/components/RouteDetails.jsx
import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Import a location icon
import './RouteDetails.css';

const RouteDetails = ({ stops }) => {
  return (
    <div className="route-details-container">
      <div className="handle-bar"></div>
      <h2>Route & ETA</h2>
      
      {!stops || stops.length === 0 ? (
        <p className="no-stops-message">No stops available for this route.</p>
      ) : (
        <ul className="stops-timeline">
          {stops.map((stop, index) => (
            <li key={index} className="stop-item">
              <div className="stop-icon"><FaMapMarkerAlt /></div>
              <div className="stop-info">
                <span className="stop-name">{stop.name}</span>
                <span className="eta">{stop.eta}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RouteDetails;