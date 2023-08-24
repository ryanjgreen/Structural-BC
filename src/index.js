import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import App from './App';
import './index.css';
import { AuthProvider } from './AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
    <AuthProvider>
    <App />
    </AuthProvider>
  </React.StrictMode>
);
