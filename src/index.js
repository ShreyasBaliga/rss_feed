import React from 'react';
import ReactDOM from 'react-dom/client';
import './services/firebase';
import App from './Router';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);