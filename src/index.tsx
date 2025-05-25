import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Initialize the root
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Measure performance
reportWebVitals();
