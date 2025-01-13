import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './page.css';
import bg from './image/bg.jpg';
import logo from './image/photha-logo.png';
import Credits from './credits';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [feedback, setFeedback] = useState('');
  const [role, setRole] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editData, setEditData] = useState({ name: '', link: '', date: '' });

  useEffect(() => {
    axios
      .get('https://phothos-web-service.onrender.com/api/items')
      .then((response) => {
        setItems(response.data);
        setFilteredItems(response.data);
      })
      .catch((error) => console.error('Error fetching data:', error));

    if (token) {
      axios
        .get('https://phothos-web-service.onrender.com/api/userRole', {
          headers: { Authorization: token },
        })
        .then((response) => {
          setRole(response.data.role);
        })
        .catch((error) => console.error('Error fetching user role:', error));
    }
  }, [token]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);
    filterItems(searchTerm, startDate, endDate);
  };


  const handleDateFilter = () => {
    filterItems(query, startDate, endDate);
  };

  const filterItems = (searchTerm, start, end) => {
    const filtered = items.filter((item) => {
      const isNameMatch = item.name && item.name.toLowerCase().includes(searchTerm);
      const isDescriptionMatch = item.description && item.description.toLowerCase().includes(searchTerm);
      const itemDate = new Date(item.date);
      const isWithinDateRange =
        (!start || itemDate >= new Date(start)) &&
        (!end || itemDate <= new Date(end));

      return (isNameMatch || isDescriptionMatch) && isWithinDateRange;
    });

    setFilteredItems(filtered);
  };

  const handleSort = (sortType) => {
    let sortedItems = [...filteredItems];

    if (sortType === 'oldest') {
      sortedItems.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortType === 'newest') {
      sortedItems.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredItems(sortedItems);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('th-TH', options);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const content_name = formData.get('content_name');
    const link = formData.get('link');
    const date = formData.get('date');

    try {
      const response = await axios.post(
        'https://phothos-web-service.onrender.com/post',
        { content_name, link, date },
        {
          headers: { Authorization: token },
        }
      );

      if (response.data.success) {
        setFeedback(response.data.message);
        const updatedItems = await axios.get('https://phothos-web-service.onrender.com/api/items');
        setItems(updatedItems.data);
        setFilteredItems(updatedItems.data);
        e.target.reset();
      } else {
        setFeedback('เพิ่มข้อมูลไม่สำเร็จ');
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setFeedback('เกิดข้อผิดพลาดในการเพิ่มข้อมูล');
    }
  };

  const toggleMenuVisibility = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setRole('');
    window.location.reload();
  };

  const handleDelete = async (id) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
    
    try {
      await axios.delete(`https://phothos-web-service.onrender.com/api/items/${id}`);
      console.log('Activity deleted');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting item:', error);
      // Optionally, handle the error by restoring the item or showing a message
    }
  };
  

  const handleEdit = (id) => {
    const itemToEdit = items.find((item) => item._id === id);
    if (itemToEdit) {
      setEditingItemId(id);
      setEditData({
        name: itemToEdit.name,
        link: itemToEdit.link,
        date: itemToEdit.date.split('T')[0],
      });
    }
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

const handleEditSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.put(
      `https://phothos-web-service.onrender.com/api/update/${editingItemId}`,
      editData
    );
    const updatedItems = await axios.get('https://phothos-web-service.onrender.com');
    setItems(updatedItems.data);
    setFilteredItems(updatedItems.data);
    setEditingItemId(null);
    setFeedback('แก้ไขข้อมูลเรียบร้อยแล้ว');
  } catch (error) {
    console.error('Error updating item:', error.response || error.message || error);
    setFeedback(`Error updating item: ${error.response?.data?.message || error.message || 'Unknown error'}`);
  }
};

const goToAboutPage = () => {
  navigate('/about'); // Redirect to the Data Page
};

    return (
      <div>
        <header>
          <div>
            <img src={logo}></img>
            <h1>PHOTHOS</h1>
          </div>
            <div className='header-end'>
            <button>หน้าแรก</button>
            <button onClick={goToAboutPage}>เกี่ยวกับเรา</button>
            <button onClick={handleLogout}>ออกจากระบบ</button>
              </div>
        </header>
        

        <div className="background-image">

        </div>

      {/* Search and Filter */}
      <div className="search-box">

<h2 style={{fontSize:"20px"}}>ค้นหากิจกรรม</h2>
          

          <div className="search-line">

          <i className='bx bx-search'></i>
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder=" ใส่คำค้นหาที่นี่"
            className="search-bar"
          />
{/* Add Activity Form - visible only to admin */}
{role === 'admin' && (
  <button 
    onClick={toggleMenuVisibility} 
    name="add-data" 
    className="data-addition-button"
  >
    <i className='bx bx-plus'></i>
  </button>
)}

          </div>
         

{/* Add Activity Form - visible only to admin */}
{role === 'admin' && isMenuVisible && (
  <div className="data-addition">
    <div className="data-addition-label">
      <h2 align='center'>เพิ่มกิจกรรม</h2>
    </div>
    <div className="form-box">
      <form onSubmit={handleSubmit}>
        <table>
          <tr>
            <td>ชื่อกิจกรรม:</td>
            <td className='input-field'>
              <input type="text" placeholder="กรอกชื่อ" name="content_name" required />
            </td>
          </tr>
          <tr>
            <td>ลิงค์:</td>
            <td className='input-field'>
              <input type="text" placeholder="กรอกลิงค์" name="link" required />
            </td>
          </tr>
          <tr>
            <td>วันที่กิจกรรม (ดด/วว/คศ):</td>
            <td className='input-field'>
              <input type="date" name="date" required />
            </td>
          </tr>
        </table>
        <br />
        {feedback && <div className="feedback-message">{feedback}</div>}

        <div className="op-container">
        <button type="submit" name="sub_btn" className='operation_btn'>ยืนยัน</button>
        <button type="reset" name="sub_rst" className='operation_btn'>รีเซ็ต</button>
        </div>
        
      </form>
    </div>
  </div>
)}

      <hr style={{height: "1px", margin:"10px"}}></hr>

      <div className="date-filters">
  <h2><i className="bx bx-filter"></i> กรองการค้นหา</h2>

  <div className="filter-group">
    <label>เริ่มวันที่:</label>
    <input
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
    />
  </div>

  <div className="filter-group">
    <label>ถึงวันที่:</label>
    <input
      type="date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
    />
  </div>

  <button className="sort-button" onClick={handleDateFilter}>
    <i className="bx bxs-filter-alt"></i> กรอง
  </button>

  {/* Date sort buttons */}
  <button className="sort-button" onClick={() => handleSort('oldest')}>
    เรียงจากเก่าสุด
  </button>
  <button className="sort-button" onClick={() => handleSort('newest')}>
    เรียงจากใหม่สุด
  </button>
</div>

     
      
  {/*===================RESULT BOXES===================*/}
  <div className="results">
  <h2 style={{ fontSize: '1.5em' }}>
    <i className="bx bxs-data"></i> ผลลัพธ์สำหรับรายการที่เลือก
  </h2>
  
  {filteredItems.map((item) => (
    <div className="result-box" key={item._id}>
      {editingItemId === item._id ? (
        // Form for editing
        <form onSubmit={handleEditSubmit} className="edit-form">
          <div className="image">
            <img src={logo} alt="activity" />
          </div>
          <div className="edit-input">
            <label htmlFor="name">ชื่อ</label>
            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={handleEditChange}
              required
              className="edit-input-field"
            />
          </div>
          <div className="edit-input">
            <label htmlFor="link">ลิงค์</label>
            <input
              type="text"
              name="link"
              value={editData.link}
              onChange={handleEditChange}
              required
              className="edit-input-field"
            />
          </div>
          <div className="edit-input">
            <label htmlFor="date">วันที่</label>
            <input
              type="date"
              name="date"
              value={editData.date}
              onChange={handleEditChange}
              required
              className="edit-input-field"
            />
          </div>
          
          <button type="submit" className="save-button">บันทึก</button>
          <button
            type="button"
            onClick={() => setEditingItemId(null)}
            className="cancel-button"
          >
            ยกเลิก
          </button>
        </form>
      ) : (
        // Display for non-editable items
        <>
  
        <div className='image'>
          <img src={logo}></img>
        </div>
        <div class='break'></div>
          <div className="result-info">
            <p>
              <b>{item.name}</b>
            </p>
            <p>
              ลิงค์ : <a href={item.link} style={{ color: 'white' }}>{item.link}</a>
            </p>
            <p>วันที่กิจกรรม : {formatDate(item.date)}</p>
            {role === 'admin' && (
              <div className="admin-actions">
                <button
                  onClick={() => handleEdit(item._id)}
                  className="edit-button"
                >
                  แก้ไข
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="delete-button"
                >
                  ลบ
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  ))}
</div>  


</div>

    {/*
    
    MAYBE IN THE FUTURE TAKES YOUR TIME TO OPTIMIZE THE CODE BELOW
    the "i" tags are icon i've imported
    
    */}
        <footer>
          <div className="footer-container">
          <div>
          <h1><i className='bx bxs-wink-smile'></i> จัดทำโดย</h1>
          <Credits/>
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

export default App;
