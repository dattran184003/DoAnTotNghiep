import React, { useState, useEffect } from 'react';
import Navbar from './module/navbar';
import "../Layout/settingLayout.css";
import { faBell, faMessage, faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from './module/footer';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function Setting() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const isScreen = windowWidth > 768;
  const content = isScreen ? <Desktop /> : <Mobile />;

  return (
    <body>
      {content}
    </body>
  );
};

const Desktop = () => {
  const [username, setUsername] = useState('');
  const [userRoles, setUserRoles] = useState([]);
  const [userId, setUserId] = useState('');
  const fetchUserData = async () => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
          try {
              const decodedToken = jwtDecode(token);
              const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

              // Lấy thông tin người dùng từ API
              // const response = await axios.get(`https://localhost:7175/api/Users/${userId}`);
              // setUser(response.data);

              // Lấy danh sách quyền từ JWT
              const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
              setUserRoles(Array.isArray(roles) ? roles : [roles]);

              setUserId(userId);
              setUsername(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
          } catch (error) {
              console.error('Error fetching user data:', error);
          }
      }
    };
    useEffect(() => {
        fetchUserData();
    }, []);
    const [user, setUser] = useState([]);
    useEffect(() => {
      axios.get(`https://localhost:7175/api/Users`)
          .then(res => setUser(res.data));   
    }, []); 
  return (
    <body class='Desktop'>
      <Navbar/>
      <div class='setting'>
        <div class='setting-left'>
           <p><a href='/User/View/login'>Đăng nhập</a></p>
           <p><a href='/User/View/registe'>Đăng ký</a></p>
        </div>
        <div class='setting-right'>
          {user.filter((user) => user.id == userId ).map(item =>
          <div class='setting-right-son'>
            <h3>Hồ Sơ Của Tôi</h3>
            <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
            <div class='setting-right-1'>
              <table style={{width:"70%"}}>
                <tbody>
                  <tr>
                    <td>Họ và Tên</td>
                    <td><input type="text" name="full_name" id="full_name" value={item.fullname} style={{width:"60%",height:"30px"}}></input></td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td><input type="email" name="email" id="email" value={item.email} style={{width:"60%",height:"30px"}}></input></td>
                  </tr>
                  <tr>
                    <td>Số Điện Thoại</td>
                    <td><input type="text" name="phone number" id="phone number" value={item.phone} style={{width:"60%",height:"30px"}}></input></td>
                  </tr>
                  <tr>
                    <td>Giới tính</td>
                    <td>
                      <label for="sex">
                        <input type="radio" name="sex" id="Nam" style={{width:"10%"}}></input>Nam
                      </label>
                      <label for="sex">
                        <input type="radio" name="sex" id="Nữ" style={{width:"10%"}}></input>Nữ
                      </label>
                      <label for="sex">
                        <input type="radio" name="sex" id="Khác" style={{width:"10%"}}></input>Khác
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>Ngày Sinh</td>
                    <td>
                      <input type="number" name="sex" id="Khác" min="1" max="31" pattern="[0-9]"  style={{width:"15%",marginRight:"5%",height:"30px",textAlign:"center"}}></input>
                      <input type="number" name="sex" id="Khác" min="1" max="12" pattern="[0-9]"  style={{width:"15%",marginRight:"5%",height:"30px",textAlign:"center"}}></input>
                      <input type="number" name="sex" id="Khác" min="1970" max="2024" pattern="[0-9]"  style={{width:"15%",height:"30px",textAlign:"center"}}></input>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={{display:"inline", width:"30%",textAlign:"center",borderLeft:"1px solid #c4c4c4"}}>
                <img src='/imges/logo/LÊ PHƯỚC SANG.jpg' alt="hinh" style={{width:"100px",height:"100px",borderRadius:"50%", objectFit: "cover",display:"block",margin:" 50px auto"}} ></img>
                <button>
                  <label for="avatar" style={{display:"block"}}>Chọn ảnh
                    <input type="file" name="avatar" id="avatar" style={{display:"none" }}></input>
                  </label>
                </button>
                <p>Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG</p>
              </div>
            </div>
            <div style={{width:"30%",textAlign:"center"}}>
              <button style={{backgroundColor:'#f05d40',color:"#fff"}}>Lưu</button>
            </div>
          </div>
        )}
        </div>
      </div>
      <Footer/>
    </body>
  );
};
const Mobile = () => {
  return (
    <body>
       <Navbar/>
      Nội dung cho màn hình dưới 1000px
    </body>
  );
};
export default Setting;
