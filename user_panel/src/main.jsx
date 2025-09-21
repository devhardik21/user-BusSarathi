// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Global styles

// This line finds the <div id="root"> in the HTML
const rootElement = document.getElementById('root');

// This tells React to take control of that element
const root = ReactDOM.createRoot(rootElement);

// This renders our main <App> component into the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)