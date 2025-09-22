import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BusList from './components/BusList';
import BusRouteMap from './components/BusRouteMap';
import WelcomePage from './pages/WelcomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< WelcomePage/>} />
        <Route path="/home" element={<BusList />} />
        <Route path="/bus/:busId" element={<BusRouteMap />} />
      </Routes>
    </Router>
  );
}

export default App;
