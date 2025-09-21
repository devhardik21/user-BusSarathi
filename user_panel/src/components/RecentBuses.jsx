// src/components/RecentBuses.jsx
import React from 'react';
import './RecentBuses.css';
import { FaArrowRight } from 'react-icons/fa'; // Import an arrow icon

const RecentBuses = () => {
  // (Your placeholder data remains the same)
  const recentBuses = [
    { id: 1, number: '302', route: 'City Center to Tech Park' },
    { id: 2, number: '450', route: 'Downtown to Uptown' },
    { id: 3, number: '110', route: 'Airport Express' },
  ];

  return (
    <div className="recent-buses-container">
      <h2 className="recent-buses-title">Active Routes</h2>
      <div className="buses-list">
        {recentBuses.map((bus) => (
          // In a real app, this would be a <Link> component
          <div key={bus.id} className="recent-bus-card">
            <div className="bus-card-info">
              <h3>Bus No: {bus.number}</h3>
              <p>{bus.route}</p>
            </div>
            <FaArrowRight className="bus-card-arrow" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBuses;