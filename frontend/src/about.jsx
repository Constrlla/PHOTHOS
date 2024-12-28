import React, { useEffect, useState }  from 'react';
import './page.css';
import bg from './image/bg.jpg';
import logo from './image/photha-logo.png';
import Credits from './credits';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const mainPage = () => {
    navigate('/app');
  };
  
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const goToAboutPage = () => {
    navigate('/about'); // Redirect to the Data Page
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setRole('');
    window.location.href = '/';
  };

  return (
    <div>
        <header>
            <div>
                <img src={logo}></img>
                <h1>PHOTHOS</h1>
            </div>
            <div className='header-end'>
            <button onClick={mainPage}>หน้าหลัก</button>
                <button onClick={goToAboutPage}>เกี่ยวกับเรา</button>
                <button onClick={handleLogout}>ออกจากระบบ</button>
            </div>
        </header>
        <div className="background-image">
          <img src={bg}></img>
        </div>

      <div className='about-container'>

        <div className='about-image-container'>
          <div className='about-header'>PHOTHOS</div>
        </div>

        <div className='about-session'>
          <hr></hr>
          <h2><i class='bx bx-question-mark'></i> ที่มาและความสำคัญ</h2>
          <div className='paragraph-1'>
          เว็บไซต์มีไว้เพื่อแสดงข้อมูลที่แตกต่างกัน ขึ้นอยู่กับความต้องการของผู้ทำเว็บไซต์นั้น ๆ เช่น การแสดงข้อมูลข่าวสารต่าง ๆ , ข้อมูลบริษัท, การขายสินค้า เป็นต้น ในปัจจุบันเว็บไซต์เข้ามามีบทบาทและมีความสำคัญต่อชีวิตประจำวันของเราเป็นอย่างมากโดยเฉพาะกลุ่มเด็กรุ่นใหม่ ที่โตมาพร้อมกับคอมพิวเตอร์ และเทคโนโลยีต่าง ๆ จึงทำให้เว็บไซต์เป็นแหล่งสารสนเทศที่สำคัญ เพราะสามารถเข้าถึงข้อมูลได้ง่ายและรวดเร็ว ไม่ว่าจะเป็นการติดต่อสื่อสาร การประชาสัมพันธ์ข่าว การโฆษณาสื่อต่าง ๆ ผ่านทางเว็บไซต์ หรือแม้กระทั่งสื่อสังคมออนไลน์ ที่สามารถใช้ติดต่อสื่อสารกันได้ ดังนั้น เว็บไซต์จึงมีบทบาทสำคัญเป็นอย่างมาก ทำให้องค์กรต่าง ๆ ทั้งภาครัฐและเอกชน ให้ความสำคัญกับเว็บไซต์เพิ่มมากขึ้น โดยมีจุดประสงค์เพื่อการประชาสัมพันธ์ หรือเพื่อการค้าขาย และสามารถค้นหาข้อมูลได้ง่าย มีความน่าเชื่อถือ ซึ่งประโยชน์ของเว็บไซต์มีหลากหลายไม่ว่าจะเป็น ช่วยสร้างภาพลักษณ์ที่ดี ความทันสมัย ความน่าเชื่อถือให้กับองค์กร และช่วยเผยแพร่ข้อมูลข่าวสารได้อย่างแพร่หลาย เป็นต้น
          </div>
          <div className='paragraph-1'>
          ​โรงเรียนโพธาวัฒนาเสนีของเรามีการจัดกิจกรรมต่าง ๆ ขึ้นเป็นจำนวนมากในแต่ละปีและไม่มีแหล่งรวบรวมและเรียบเรียงรูปถ่ายจากกิจกรรมนั้น ๆ ปัจจุบันบุคลากรและนักเรียนของโรงเรียนเราจึงประสบปัญหาในการค้นหารูปกิจกรรมต่าง ๆ ที่ได้จัดขึ้นเป็นระยะเวลานานเนื่องจากไม่มีแหล่งหรือเว็บไซต์ที่มีการจัดเรียงรูปต่าง ๆ อย่างเป็นระบบ ซึ่งใช้เวลานานและยากต่อการค้นหา หากมีแหล่งหรือเว็บไซต์สำหรับเรียบเรียงรูปภาพหรือลิงก์ของรูปภาพเหล่านั้น จะถือว่าเป็นตัวช่วยประหยัดเวลาในการค้นหารูปกิจกรรมที่ต้องการได้เป็นอย่างดี
          </div>


          <h2 style={{marginTop:'100px'}}><i class='bx bx-list-ol' ></i> วัตถุประสงค์ </h2>
    <div className='purposes'>
      <ol>
        <li>เพื่อศึกษาและเรียนรู้การเขียนโปรแกรมและการจัดทำเว็ปไซต์</li>
        <li>เพื่อศึกษาในการเขียนเว็ปไซต์จาก Tech Stack MERN</li>
        <li>เพื่อช่วยเพิ่มความสะดวกในการค้นหาลิงก์ของรูปภาพที่ต้องการ</li>
        <li>เพื่อศึกษาความพึงพอใจต่อการใช้งานเว็บไซต์</li>
      </ol>
    </div>

<hr style={{marginBottom:"2em"}}></hr>
<h2 style={{marginTop:'100px'}}><i class='bx bx-wink-smile' ></i> แบบประเมินความพึงพอใจ
</h2>
<button onClick={toggleExpand} className="expand-button" >
        {isExpanded ? 'ย่อ' : 'ขยาย'}
      </button>



  <div className="form-container">
      {isExpanded && (
        <div className="rating-form">
          <a href='https://docs.google.com/forms/d/e/1FAIpQLSeFTpD0EFwnK6_B50iel5VPAz-MCPx4VsmOgEPv2NM0WuMzHA/viewform?'>หรือเปิดในแท็บใหม่</a>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSeFTpD0EFwnK6_B50iel5VPAz-MCPx4VsmOgEPv2NM0WuMzHA/viewform?embedded=true"
            width="750"
            height="500"
            frameBorder="0"
          ></iframe>
        </div>
      )}
    </div>
        </div>
      </div>

      <footer>
          <div className="footer-container">
          <div>
          <h1><i className='bx bxs-wink-smile'></i> จัดทำโดย</h1>
          <Credits />
        </div>

        <div>
          <h1><i className='bx bx-edit-alt' ></i> พัฒนาด้วย</h1>
          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <br></br>
            <hr></hr>
            <h2><i className='bx bxs-layer'></i> MERN STACK</h2>
            <li>MongoDB</li>
            <li>Express JS</li>
            <li>ReactJS</li>
            <li>NodeJS</li>
            </ul>
        </div>

        <div>
          <h1><i className='bx bxs-check-square' ></i> ขอบคุณ</h1>
          อาจาร์ยวัชรพล นาคทับ
        </div>
          </div>

        </footer>

    </div>
  );
};

export default About;