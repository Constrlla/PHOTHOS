import React, { useState } from 'react';
import axios from 'axios';

const TokenButton = () => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  // Function to generate the token (without login)
  const generateToken = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username: '69420', // Mock username
        password: '6942000000', // Mock password
      });
      setToken(response.data.token); 
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      window.location.reload();
    } catch (err) {
      setError('Failed to generate token');
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={generateToken}><i class='bx bx-check'></i> ใช้เลย</button>

    </div>
  );
};

export default TokenButton;
