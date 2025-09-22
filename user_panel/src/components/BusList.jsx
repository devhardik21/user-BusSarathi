import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaBusAlt, FaMapMarkerAlt, FaHashtag, FaSearch } from 'react-icons/fa';
import './BusList.css';
import { DEPLOYED_URL } from '../api';

const BusList = () => {
    // Bus list state
    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Search panel state
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [busNumber, setBusNumber] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const response = await axios.get(`${DEPLOYED_URL}/api_admin/bus`);
                setBuses(response.data.allBus);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch bus data. Please try again later.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchBuses();
    }, []);

    const handleSearch = () => {
        const searchString = `?from=${fromLocation}&to=${toLocation}&bus=${busNumber}`;
        navigate(`/buses${searchString}`);
    };

    if (loading) {
        return <div className="loading-message">Loading Active Routes...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="bus-list-container">
            {/* Search Panel Section */}
            <div className="search-panel">
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
                    <FaSearch />
                    <span style={{ marginLeft: '8px' }}>PROCEED</span>
                </button>
            </div>

            {/* Bus List Section */}
            <h1>Active Routes</h1>
            <div className="bus-list">
                {buses.length > 0 ? (
                    buses.map((bus) => (
                        <Link to={`/bus/${bus._id}`} state={{ bus }} key={bus._id} className="bus-card-link">
                            <div className="bus-card">
                                <img src={bus.busImageUrl} alt={bus.busName} className="bus-image" />
                                <div className="bus-details">
                                    <h2>{bus.busName}</h2>
                                    <p><strong>Number:</strong> {bus.busNumber}</p>
                                    <p><strong>Route:</strong> {bus.routeDetails.routeName}</p>
                                    <p>
                                        <strong>Status:</strong>
                                        <span className={`status status-${bus.status.toLowerCase()}`}>{bus.status}</span>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No active buses found.</p>
                )}
            </div>
        </div>
    );
};

export default BusList;