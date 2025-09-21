// src/pages/TrackingPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LiveMap from '../components/LiveMap';
import RouteDetails from '../components/RouteDetails';
import './TrackingPage.css';

const TrackingPage = () => {
  const { busId } = useParams();
  const [busDetails, setBusDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/bus/${busId}`)
      .then(response => response.json())
      .then(data => {
        setBusDetails(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching bus details:", error);
        setLoading(false);
      });
  }, [busId]);

  if (loading) {
    return <div>Loading bus details...</div>;
  }

  if (!busDetails || busDetails.error) {
    return <div>Bus not found.</div>;
  }

  return (
    <div className="tracking-page-container">
      <div className="map-wrapper">
        <LiveMap busId={busId} />
      </div>
      <RouteDetails stops={busDetails.stops} />
    </div>
  );
};

export default TrackingPage;