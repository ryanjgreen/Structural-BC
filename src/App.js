import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Navbar, Form, SignIN } from './components';
import { Header, Footer } from './containers';
import { Contactpage, Earthquake, Loginre } from './pages';
import { AuthProvider, useAuth } from './AuthContext'; // Import AuthProvider and useAuth
import { RingLoader } from 'react-spinners'; // Import the spinner component

import './App.css';

function PrivateRoute({ element: Element, ...rest }) {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true); // Introduce loading state

  useEffect(() => {
    // Simulate an async check for authentication status
    // Replace this with your actual authentication check
    setTimeout(() => {
      setLoading(false);
    }, 750); // Adjust the timeout as needed
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner">
       <RingLoader color={'#000000'} loading={loading} size={200} />

      </div>
    );
  }

  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/loginredirect" />;
}

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            {/* Make sure the path and the imported component name match */}
            <Route path="/calculators" element={<PrivateRoute element={Earthquake} />} />
            <Route path="/contact" element={<Contactpage />} />
            <Route path="/signin" element={<SignIN />} />
            <Route path="/signup" element={<Form />} />
            <Route path="/loginredirect" element={<Loginre />} />
          </Routes>
          {window.location.pathname === '/' && <Header />}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
