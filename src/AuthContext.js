import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check if there's an authenticated user in localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');

    if (storedIsAuthenticated && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://structuralbc-cea735a41380.herokuapp.com/login', { email, password });

      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser({ id: response.data.user_id, firstName: response.data.first_name });
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('user', JSON.stringify({ id: response.data.user_id, firstName: response.data.first_name }));
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
