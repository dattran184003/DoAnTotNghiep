import React, { useState, useEffect } from 'react';
import Navbar from './module/navbar';
import "../Layout/WishlistsLayout.css";
import { faBell, faHeart, faMessage, faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from './module/footer';
import axios from 'axios';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faBars, faPhone } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';

function Wishlists() {
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
    const [Wishlists, setWishlists] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7175/api/Wishlists`)
            .then(res => setWishlists(res.data));   
    }, []);
    const [car, setcar] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7175/api/Cars`)
            .then(res => setcar(res.data));   
    }, []);
    const [user, setUser] = useState({});
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
    useEffect(() => {
      axios.get(`https://localhost:7175/api/Users`)
          .then(res => setUser(res.data));   
  }, []);
  return (
    <body class='Desktop'>
        <Navbar/>
        <div class='Wishlists'>
            <div class='Wishlists-1'>
                <div class='Wishlists-1-top'>
                    <h3>DANH SÁCH YÊU THÍCH</h3> 
                </div>
                <div class='Wishlists-1-centre'>
                    <h1>L A M B O R G H I N I</h1>
                </div>
            </div>
            <div  style={{ display: "flex",flexWrap: "wrap"}}>
               {Wishlists.filter((userid) => userid.userId == userId ).map(item =>
               
                  <>   
                  {car.filter((carId) => carId.id == item.carId).map(car =>            
                  <div class='fromcar' key={car.id} >
                  <div class='fromcarimg'>
                      <img src={`/imges/car/${car.mainImage}`} alt="hinh"></img>
                  </div>
                  <div class='fromcarname'>
                      <h2>{car.name}</h2>
                      <p >{car.price}.000.000.000 VNĐ </p>
                  </div>
                  <div class='fromcarbutton'> 
                      <button class="Btncall">
                      <span>liên hệ</span>
                      <div class="container">
                          <div class='iconcall'>
                              <FontAwesomeIcon icon={faPhone} style={{height:"20px",width:"100%",marginTop:"10px"}}/>
                          </div>
                          <div style={{width:"2%"}}></div>
                          <div class='iconchat'>
                              <a href='/User/View/chat' style={{color:"#000"}}><FontAwesomeIcon icon={faMessage} style={{height:"20px",width:"100%",marginTop:"10px"}}/></a>
                          </div>         
                      </div>
                      </button>
                      
                      <a href={`/User/View/cardetail/${car.id}`} class="Btndetail" >Xem chi tiết </a>
                      <button class="btnlist">
                          <FontAwesomeIcon icon={faBars} style={{height: "20px"}}/>
                          <ul class="socials">
                              <li style={{margin:"5px"}}>
                                  <button class="Btnshare">
                                      <span>Chia sẽ</span>
                                      <div class="container">
                                          <a href="https://www.facebook.com/?locale=vi_VN" target="_blank" rel="noreferrer" style={{color:"#000"}}><FontAwesomeIcon icon={faFacebookF} style={{padding:"0px 10px",height:"20px"}}/></a>
                                          <FontAwesomeIcon icon={faInstagram} style={{padding:"0px 10px",height:"20px"}}/>
                                          <FontAwesomeIcon icon={faTwitter}   style={{padding:"0px 10px",height:"20px"}}/>
                                      </div>
                                  </button>
                              </li>
                              <li style={{margin:"5px"}}>
                                  <button class="Btnlike">
                                      <span class="leftContainer" >
                                        {/* onClick={() =>handleWishlists(item.id)} */}
                                          <FontAwesomeIcon icon={faHeart} style={{ color: "var(--trang)",height: "20px"}}/>
                                          <span class="like">Thích</span>
                                      </span>
                                      <span class="likeCount">
                                          2,050
                                      </span>
                                  </button>
                              </li>
                              <li style={{margin:"5px"}}>
                                  <button class="Btncomment">
                                      <span>Bình luận</span>
                                  </button>
                              </li>
                          </ul>
                      </button>
                  </div>
              </div>
              )}
              </>
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
export default Wishlists;
