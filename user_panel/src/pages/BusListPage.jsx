// src/pages/BusListPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa'; // Import an icon
import './BusListPage.css';

const BusListPage = () => {
  // ... (all your existing useState and useEffect logic stays the same)
  const [searchParams] = useSearchParams();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const busParam = searchParams.get('bus');

  useEffect(() => {
    const query = searchParams.toString();
    setLoading(true);
    fetch(`http://127.0.0.1:5000/api/buses?${query}`)
      .then(response => response.json())
      .then(data => {
        setBuses(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the data:", error);
        setLoading(false);
      });
  }, [searchParams]);

  return (
    <div className="bus-list-page">
      <div className="search-summary">
        <h1>Search Results</h1>
        {from && to && <p>{from} → {to}</p>}
      </div>

      <div className="bus-list">
        {loading && <p className="loading-message">Loading available buses...</p>}
        {!loading && buses.length === 0 && (
          <p className="no-buses-message">Sorry, no buses were found for your search.</p>
        )}
        {!loading && buses.length > 0 && buses.map((bus) => (
          <Link to={`/track/${bus.id}`} key={bus.id} className="bus-card-link">
            <div className="bus-card">
              <div className="bus-card-info">
                <h3>{bus.name} ({bus.number})</h3>
                <p>Departs: {bus.departure} | Arrives: {bus.arrival}</p>
              </div>
              <FaArrowRight className="bus-card-arrow" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BusListPage;