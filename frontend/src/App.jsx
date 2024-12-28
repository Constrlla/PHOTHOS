import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './login'; // login page
import MainPage from './search'; // search page
import About from './about';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state to wait for token check
  const location = useLocation(); // Hook to get the current route

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); // Finish loading after checking the token
  }, []);

  if (loading) {
    // Render a loading spinner or blank page until the token is checked
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Routes>
         {/* Public route for Login */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/app" /> : <Login onLogin={() => setIsAuthenticated(true)} />} />
      
      {/* Private routes */}
      <Route path="/app" element={isAuthenticated ? <MainPage /> : <Navigate to="/" state={{ from: location }} />} />
      <Route path="/about" element={isAuthenticated ? <About /> : <Navigate to="/" state={{ from: location }} />} />
    </Routes>
  );
};

export default App;
