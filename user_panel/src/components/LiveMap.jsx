// src/components/LiveMap.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './LiveMap.css';

const LiveMap = ({ busId }) => {
  const [route, setRoute] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/bus/${busId}`)
      .then(res => res.json())
      .then(data => {
        // --- THIS IS THE FIX ---
        // We now get the real route path from the API
        if (data.route_path) {
          setRoute(data.route_path);
          if (data.route_path.length > 0) {
            // Start at the first point of the real route
            setCurrentPosition(data.route_path[0]);
          }
        }
      });
  }, [busId]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(`http://127.0.0.1:5000/api/bus/${busId}/location`)
        .then(res => res.json())
        .then(data => {
          setCurrentPosition(data.position);
        })
        .catch(error => console.error("Error fetching live location:", error));
    }, 3000);

    return () => clearInterval(intervalId);
  }, [busId]);

  if (!currentPosition) {
    return <div>Loading Map...</div>;
  }

  return (
    <MapContainer className="map-container" center={currentPosition} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {route.length > 0 && <Polyline pathOptions={{ color: 'blue' }} positions={route} />}
      
      <Marker position={currentPosition}>
        <Popup>Bus #{busId} is here.</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LiveMap;