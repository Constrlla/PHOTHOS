import React, { useState } from 'react';
import axios from 'axios';
import './page.css';
import logo from './image/photha-logo.png';
import Secret from './confidential';
import Credits from './credits';
import Faq from './faq';
import GrantToken from './grantToken';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');       
  const [token, setToken] = useState('');
  const navigate = useNavigate(); // Hook for navigation
  const [activityCount, setActivityCount] = useState(0); // State to store the count


  
  const fetchActivityCount = async () => {
    try {
      const response = await axios.get('https://phothos-web-service.onrender.com/api/activityCount', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setActivityCount(response.data.count); // Set the count to state
    } catch (err) {
      setError('Error fetching activity count');
      console.error('Error fetching activity count:', err);
    }
  };

  fetchActivityCount();

  
  
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

  return (
    <div>

      <div>
             <header>
        <div>
          <img src={logo} alt="logo" />
          <h1>PHOTHOS</h1>
        </div>
        <div className="header-end">เว็บไซต์รวมรูปภาพโรงเรียนโพธาวัฒนาเสนี</div>
      </header> 

<div className='intro-container'>


<div className='ic-1'>
      <h1><span>ค้นหา | </span>รูปกิจกรรมได้อย่างรวดเร็วทันใจ</h1>
      <p>ด้วยเว็บไซต์นี้ การเลื่อนหารูปกิจกรรมเป็นชั่วโมงจะหมดไป</p>
      <div>
        <GrantToken></GrantToken>
        <a href="#origin">
          <button className='review-form'style={{textDecoration:'none'}} href="https://forms.gle/mUddXEhAfD3iTW477">เพิ่มเติม <i class='bx bx-chevron-right'></i></button>
        </a>
      </div>

      </div>

    
      <div className="ic-2">

    <div className="instruction-container">
<h2 style={{justifySelf:'start', color:'#000d56', fontSize:'2rem', borderBottom:'1px solid blue'}}>
  <i class='bx bx-link' ></i> วิธีใช้งาน
  </h2>

      <div className="instruction">

        <div className="step">
            <div className="s-topic">
                <div className="order"><i class='bx bxs-hand-up'></i></div>
                <div className="order-name">กดปุ่ม "ใช้เลย" เพื่อเข้าสู่เว็บไซต์</div>
            </div>
          <div className="s-description">
            เมื่อกดแล้วจะถูกนำเข้าสู่หน้าถัดไป
          </div>
        </div>

        <div className="step">
            <div className="s-topic">
                <div className="order"><i class='bx bx-search-alt-2' ></i></div>
                <div className="order-name">ค้นหาได้เลย!</div>
            </div>
          <div className="s-description">
            เพียงแค่ 2 ขั้นตอนคุณก็สามารถหากิจกรรมที่จัดขึ้นได้แล้ว
          </div>
        </div>

      </div>

    </div>
 
</div>




<div className='ic-3'>
  
<h2 style={{justifySelf:'start', fontSize:'2rem'}}>
<i class='bx bx-cube' ></i> ฟีเจอร์
  </h2>
  
  <div className="feature-container">

    <div className="feature">
      <div className="feature-logo">
      <i class='bx bx-fast-forward' ></i>
        </div>
      <div className="feature-topic">ผลลัพธ์ทันใจ</div>
      <div className="feature-description">ไม่ต้องกดยืนยัน ผลลัพธ์ขึ้นทันที</div>
    </div>

    <div className="feature">
      <div className="feature-logo">
      <i class='bx bx-filter-alt' ></i>
        </div>
      <div className="feature-topic">กรองข้อมูล</div>
      <div className="feature-description">หากิจกรรมเฉพาะในช่วงเวลาที่สนใจ</div>
    </div>

    <div className="feature">
      <div className="feature-logo">
      <i class='bx bx-group' ></i>
        </div>
      <div className="feature-topic">ถั่วถึง</div>
      <div className="feature-description">ใครก็ได้หาได้โดยไม่เสียเงิน</div>
    </div>

    <div className="feature">
      <div className="feature-logo">
      <i class='bx bxs-devices' ></i>
        </div>
      <div className="feature-topic">รองรับ</div>
      <div className="feature-description">ใช้ที่ไหนก็ได้แค่มีอินเตอร์เน็ต</div>
    </div>

  </div>
</div>

<faq></faq>

<h2 style={{justifySelf:'start', fontSize:'2.5rem', marginLeft:'2rem'}}>
<i class='bx bxs-message-dots'></i> คำถามที่อาจพบ
  </h2>
<div className="ic-6">


<Faq></Faq>

</div>

<div className="ic-4" id="origin">
<h2 style={{justifySelf:'start', fontSize:'2.5rem',color:'white'}}>
<i class='bx bxs-message-dots'></i> ที่มาและความสำคัญ
  </h2>
    <div className="ic-4s">
      <div className="s-indicator">1</div>
      <div className="s4-paragraph">
        <p>
        เว็บไซต์มีบทบาทสำคัญในชีวิตประจำวัน 
        โดยเฉพาะในกลุ่มคนรุ่นใหม่ที่เติบโตมากับเทคโนโลยี เป็นแหล่งสารสนเทศที่เข้าถึงง่ายและรวดเร็ว ใช้สำหรับติดต่อสื่อสาร ประชาสัมพันธ์ โฆษณา และเป็นสื่อกลางสำหรับองค์กรภาครัฐและเอกชน เพื่อเผยแพร่ข้อมูลหรือทำการค้า เว็บไซต์ช่วยสร้างภาพลักษณ์ที่ดี ความทันสมัย ความน่าเชื่อถือ และเผยแพร่ข้อมูลได้อย่างกว้างขวาง
        </p>
      </div>
    </div>

    <div className="ic-4s section-reverse">
       <div className="s4-paragraph">
        <p>
        ​โรงเรียนโพธาวัฒนาเสนีมีการจัดกิจกรรมต่าง ๆ ขึ้นเป็นจำนวนมากในแต่ละปีและไม่มีแหล่งรวบรวมและเรียบเรียงรูปถ่ายจากกิจกรรมนั้น ๆ ปัจจุบันบุคลากรและนักเรียนของโรงเรียนเราจึงประสบปัญหาในการค้นหารูปกิจกรรมต่าง ๆ ที่ได้จัดขึ้นเป็นระยะเวลานานเนื่องจากไม่มีแหล่งหรือเว็บไซต์ที่มีการจัดเรียงรูปต่าง ๆ อย่างเป็นระบบ ซึ่งใช้เวลานานและยากต่อการค้นหา หากมีแหล่งหรือเว็บไซต์สำหรับเรียบเรียงรูปภาพหรือลิงก์ของรูปภาพเหล่านั้น จะถือว่าเป็นตัวช่วยประหยัดเวลาในการค้นหารูปกิจกรรมที่ต้องการได้เป็นอย่างดี
        </p>
      </div>
      <div className="s-indicator">2</div>
     
    </div>
    <div className="ic-4s"></div>
</div>

<div className="ic-5">



</div>

<div className="ic-6">
  <div className="counter">
    <div className="counter-number">{activityCount}</div>
    <div className="counter-label"> กิจกรรมที่ถูกบันถึกไว้</div>
  </div>

  <div className="counter">
    <div className="counter-number">1.0.0</div>
    <div className="counter-label">เวอร์ชั่นที่</div>
  </div>

  <div className="counter">
    <div className="counter-number">MERN</div>
    <div className="counter-label">พัฒนาด้วย</div>
  </div>
</div>

<div className="marquee-container">
      <div className="marquee-content">
      <a href="https://forms.gle/6dHgz2XWFWhpDn9JA">
    <div class="card c1">
	<div class="bottom">
		<h1>ติดต่อ/สอบถาม</h1>
		<p>
      ทำได้ผ่าน Google Forms นี้
    </p>
	</div>
</div>
    </a>  

    <a href="https://drive.google.com/file/d/1rBtucc2kMOWfmWDeaAoPg5tyruc6DZZg/view">
<div class="card c3">
  
	<div class="bottom">
		<h1>วิธีใช้งาน</h1>
		<p>
      คลิกเพื่อนำไปสู่วิธีใช้งานโดยละเอียด
    </p>
	</div>
</div>
</a>

<a href="#credits">
<div class="card c2">
	<div class="bottom">
		<h1>คณะผู้จัดทำ</h1>
		<p></p>
	</div>
</div>
</a>

      </div>
    </div>


<Secret></Secret>



</div>



<footer id="credits">
          <div className="footer-container">
          <div>
          <h1><i className='bx bxs-wink-smile'></i> จัดทำโดย</h1>
<Credits></Credits>
        </div>

       

        <div>
          <h1><i className='bx bxs-check-square' ></i> ขอบคุณ</h1>
          อาจาร์ยวัชรพล นาคทับ
        </div>
          </div>

        </footer>


          </div>

        </div>
      );
    };
    
    export default Login;
    
