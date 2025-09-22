import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- Fix for default marker icon ---
// This is a known issue with React-Leaflet and bundlers like Vite.
// It prevents the default marker icon from appearing correctly.
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41], // Half of the icon width and full height
});

L.Marker.prototype.options.icon = DefaultIcon;
// --- End of fix ---


// This helper component will automatically adjust the map's view to fit the route.
const ChangeView = ({ bounds }) => {
    const map = useMap();
    useEffect(() => {
        if (bounds.isValid()) {
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [map, bounds]);
    return null;
};

const BusRouteMap = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { busId } = useParams();

    // The bus data is passed via router state.
    // If the user navigates directly to this URL, `location.state` will be null.
    const { bus } = location.state || {};

    // If no bus data is found (e.g., direct URL access), navigate back to the home page.
    useEffect(() => {
        if (!bus) {
            console.warn(`No bus data for ID ${busId}. Redirecting to home.`);
            navigate('/');
        }
    }, [bus, busId, navigate]);

    if (!bus) {
        return <div>Loading map data...</div>;
    }

    const { routeDetails } = bus;
    const { startingPoint, endingPoint, routeStops } = routeDetails;

    // Create an array of all points for the polyline and for fitting the map bounds.
    // The points must be in the correct sequence.
    const allPoints = [
        [startingPoint.lat, startingPoint.long],
        ...routeStops
            .slice() // Create a copy to avoid mutating the original array
            .sort((a, b) => a.sequence - b.sequence)
            .map(stop => [stop.lat, stop.long]),
        [endingPoint.lat, endingPoint.long]
    ];

    // Create a LatLngBounds object to fit all points on the map.
    const bounds = L.latLngBounds(allPoints);

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <MapContainer style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Start Marker */}
                <Marker position={[startingPoint.lat, startingPoint.long]}>
                    <Popup>
                        <strong>Start:</strong> {startingPoint.name}
                    </Popup>
                </Marker>

                {/* End Marker */}
                <Marker position={[endingPoint.lat, endingPoint.long]}>
                    <Popup>
                        <strong>End:</strong> {endingPoint.name}
                    </Popup>
                </Marker>

                {/* Stop Markers */}
                {routeStops.map(stop => (
                    <Marker key={stop._id} position={[stop.lat, stop.long]}>
                        <Popup>
                            <strong>Stop {stop.sequence}:</strong> {stop.name}
                        </Popup>
                    </Marker>
                ))}

                {/* Route Polyline */}
                <Polyline positions={allPoints} color="blue" weight={5} />

                {/* This component will zoom the map to fit the route */}
                <ChangeView bounds={bounds} />
            </MapContainer>
        </div>
    );
};

export default BusRouteMap;
