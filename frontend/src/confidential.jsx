import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bg from './image/bg.jpg';

function SecretCode() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');       
  const [token, setToken] = useState('');
  const navigate = useNavigate(); // Hook for navigation
  

 
  // handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {

      const response = await axios.post('https://phothos-web-service.onrender.com/api/login', { username, password });

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
  const [inputValue, setInputValue] = useState(""); 
  const [isCorrect, setIsCorrect] = useState(false); 

  const correctAnswer = "e^ipi + 1 = 0"; 

  const handleCheck = () => {
    if (inputValue === correctAnswer) {
      setIsCorrect(true); 
    } else {
      alert("หืมม ลองใหม่สิ")
    }
  };

  return (
    <div className="ic-7">
      <input
        placeholder="ใส่รหัสลับ!"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} 
        style={{marginBottom:'1rem'}}
      />
      <button onClick={handleCheck}>
        <i className="bx bx-check"></i>
      </button>

      {/* Conditional Pop-Up */}
      {isCorrect && (
        <div className="popup">
          <div className="popup-content">
            
    <div className='login-container' >
      <div>
             <header style={{width:'100%'}}>
        <div>
  
          <h1>PHOTHOS</h1>
        </div>
        
        <div className="header-end">(ล็อกอินเข้าสู่ระบบผู้ดูแล)</div>
      </header>
      <div className="vignette"></div>
      <div className="background-image">
          <img src={bg}></img>
        </div>  
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

          <label htmlFor="password">รหัสผ่าน</label>
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

          </div>

        </div>
            
            <button onClick={() => setIsCorrect(false)}>ปิด</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SecretCode;
