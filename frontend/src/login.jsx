import React, { useState } from 'react';
import axios from 'axios';
import './page.css';
import bg from './image/bg2.jpg';
import logo from './image/photha-logo.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');       
  const [token, setToken] = useState('');
  const navigate = useNavigate(); // Hook for navigation

 
  // handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {

      const response = await axios.post('http://localhost:5000/api/login', { username, password });

      setError('');
      console.log('Login successful');
      localStorage.setItem('token', response.data.token);
      window.location.reload();
      navigate('/app');

    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      console.error('Error logging in:', err);
      
    }
  };

  return (
    <div className='login-container'>
      <div>
             <header>
        <div>
          <img src={logo} alt="logo" />
          <h1>PHOTHOS</h1>
        </div>
        <div className="header-end">เว็บไซต์รวมรูปภาพโรงเรียนโพธาวัฒนาเสนี</div>
      </header>
      <div className="vignette"></div>

      <div className="login-form">
        <form onSubmit={handleLogin}>
          <h2>เข้าสู่ระบบ</h2>
          <label htmlFor="name">รหัสประจำตัว</label>
          <input
            name="name"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          />

          <label htmlFor="password">รหัสผ่าน (วว/ดด/ปป)</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />

          <div>
            <input type="submit" value="ยืนยัน" />
            <input
              type="reset"
              value="รีเซ็ต"
              onClick={() => {
                setUsername(''); 
                setPassword(''); 
                setError('');  
              }}
            />
          </div>
          {error && <p className="error">{error}</p>}
          </form>
          </div>
    
          <div className="login-footer">
            ---- เว็บไซต์นี้อยู่ในการดูแลของหน่วยประมวลผลภาพโรงเรียนโพธาวัฒนาเสนี ----
          </div>
          </div>

        </div>
      );
    };
    
    export default Login;
    