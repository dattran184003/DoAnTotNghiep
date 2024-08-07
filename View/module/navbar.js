import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../Layout/moduleLayout/navbarLayout.css';
import '../../Layout/moduleLayout/layout.css';
import { faBell, faCommentAlt, faIdCard, faUser } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faGlobeAfrica, faGlobeAmericas, faGlobeAsia, faKey, faSearch } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const Navbar = () => {
  useEffect(() => {
    document.title = 'Lamborghini';
    const faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    faviconLink.href = '/imges/logo/Lamborghini_Logo.png';
    document.head.appendChild(faviconLink);
  }, []);
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
  const icon1 = useRef(null);
  const icon2 = useRef(null);
  const icon3 = useRef(null);
  const form1 = useRef(null);
  const form2 = useRef(null);
  const form3 = useRef(null);
  const handleMouseOver1 = () => {
    form1.current.style.display = 'block';
  };

  const handleMouseOut1 = () => {
    form1.current.style.display = 'none';
  };
  const handleMouseOver2 = () => {
    form2.current.style.display = 'block';
  };

  const handleMouseOut2 = () => {
    form2.current.style.display = 'none';
  };
  const handleMouseOver3 = () => {
    form3.current.style.display = 'block';
  };

  const handleMouseOut3 = () => {
    form3.current.style.display = 'none';
  };
  
  const [navbarPosition, setNavbarPosition] = useState(0);

  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.Desktop');
      if (navbar) {
        setNavbarPosition(navbar.getBoundingClientRect().top);
      }
    });
    return () => window.removeEventListener('scroll',setNavbarPosition);
  }, []);
  const iconTop =  Math.abs( navbarPosition - 70); 
  //jwwt
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
  // kiểm tra dăng nhâp
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const link1 = '/User/View/Wishlists';
  const link2 = '/User/View/login';
  useEffect(() => {
    // Kiểm tra người dùng đã đăng nhập hay chưa
    setIsLoggedIn(userId !== null); // Cập nhật trạng thái đăng nhập
  }, []);
  // lich hẹn
  const [appointments, setappointments] = useState([]);
  useEffect(() => {
    axios.get(`https://localhost:7175/api/Appointments`)
        .then(res => setappointments(res.data));   
  }, []);
  // lịch sử đặt cọc
  const [DepositContracts, setDepositContracts] = useState([]);
  useEffect(() => {
    axios.get(`https://localhost:7175/api/DepositContracts`)
        .then(res => setDepositContracts(res.data));   
  }, []);
  // xe
  const [car, setcar] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7175/api/Cars`)
            .then(res => setcar(res.data));   
    }, []);
    //tìm kiếm theo tên
  const [searchTerm, setSearchTerm] = useState(''); // State to store the search term
  const [filteredProducts, setFilteredProducts] = useState(car); // State to store filtered products

  useEffect(() => {
    const filteredProducts = car.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  }, [searchTerm, car]); // Update filteredProducts when searchTerm or products change

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  return (
    <body class="Desktop">
      <div class="navbar">
          <div class="navbar-left">
            <div class="function">
              <a href='/' class='lienket'>TRANG CHỦ</a>
            </div>
            <div class="function">
              <a href='/User/View/carlist' class='lienket'>XE ÔTÔ</a>
            </div>
            <div class="function">
              <a href='/User/View/news' class='lienket'>TIN TỨC</a>
            </div>
            <div class="function">
              <a href="/User/View/store" class='lienket'>CỬA HÀNG</a>
            </div>
          </div>
          <div class="logo">
            <img  src='/imges/logo/Lamborghini_logo-1.png' alt="logo"></img>
          </div>
          <div class="navbar-right">
            <div class="function">
              <a href="/User/View/museum" class='lienket'>BẢO TÀNG</a>
            </div>
            <div class="function">
              <a href={isLoggedIn ? link1 : link2} class='lienket'>YÊU THÍCH</a>
            </div>
            <div class="right-son">
              <div class="icon" ref={icon3} onMouseOver={handleMouseOver3} onMouseOut={handleMouseOut3}>
                <FontAwesomeIcon icon={faBell} style={{height:"20px"}}/>
              </div>
              <div class="icon" ref={icon1} onMouseOver={handleMouseOver1} onMouseOut={handleMouseOut1}>
                <FontAwesomeIcon icon={faCommentAlt} style={{height:"20px"}} />
              </div>
              <div class="icon" ref={icon2} onMouseOver={handleMouseOver2} onMouseOut={handleMouseOut2}>
                <FontAwesomeIcon icon={faSearch} style={{height:"20px"}}/>
              </div>
              <div class="icon">
                <a href="/User/View/setting" class='lienket' style={{padding:"0"}}>
                  <div>
                    <div class="icon-navbar" ></div>
                    <div class="icon-navbar" ></div>
                    <div class="icon-navbar" ></div>
                  </div>
                </a>
              </div>
            </div>
          </div>    
      </div>
      <div class="icon-child1" style={{ top:`${iconTop}px` }}  ref={form1} onMouseOver={handleMouseOver1} onMouseOut={handleMouseOut1}>
        <h2>Hỏi tôi</h2>
        <hr></hr>
        <div class="form1-2">
          <div>
            <img src='/imges/logo/Lamborghini_logo-2.png' alt="logo"></img>
          </div>
          <span>Tôi là Trí tuệ nhân tạo đầu tiên của Lamborghini, tôi có thể giúp gì cho bạn ?</span>
        </div>
        <div class="form1-2">
          <div>
            <img src='/imges/logo/Lamborghini_logo-2.png' alt="logo"></img>
          </div>
          <span>Bạn có thể chọn một trong những gợi ý hoặc hỏi tôi một câu hỏi ?</span>
        </div>
        <hr></hr>
        <div class="form1-3">
          <button>MÔ HÌNH</button>
          <button>ĐẠI LÝ</button>
          <button>BẢO TÀNG VÀ DÂY CHUYỀN SẢN XUẤT</button>
          <button>NHÂN VIÊN QUẢNG CÁO</button>
          <button>LÀM VIỆC VỚI CHÚNG TÔI</button>
          <button>CÔNG TY VÀ LỊCH SỬ</button>
          <button>TUYỆT VỜI</button>
        </div>
        <hr></hr>
        <div class="form1-4">
          <div class="messageBox">
            <div class="fileUploadWrapper">
              <label for="file">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 337 337">
                  <circle
                    stroke-width="20"
                    stroke="#6c6c6c"
                    fill="none"
                    r="158.5"
                    cy="168.5"
                    cx="168.5"
                  ></circle>
                  <path
                    stroke-linecap="round"
                    stroke-width="25"
                    stroke="#6c6c6c"
                    d="M167.759 79V259"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-width="25"
                    stroke="#6c6c6c"
                    d="M79 167.138H259"
                  ></path>
                </svg>
                <span class="tooltip">Add an image</span>
              </label>
              <input type="file" id="file" name="file" />
            </div>
            <input required="" placeholder="Hey, ask me something..." type="text" id="messageInput" />
            <button id="sendButton">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
                <path
                  fill="none"
                  d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                ></path>
                <path
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="33.67"
                  stroke="#6c6c6c"
                  d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                ></path>
              </svg>
            </button>
          </div>
        </div> 
      </div>
      <div class="icon-child2" style={{ top:`${iconTop}px` }} ref={form2} onMouseOver={handleMouseOver2} onMouseOut={handleMouseOut2}>
        <div style={{display:"flex"}}>
          <div class="icon-child2-1">
            <h1>Tìm Kiếm</h1>
            <input placeholder="Tìm kiếm xe,thông tin..." value={searchTerm} onChange={handleSearchChange} class="input" name="text" type="text"></input>
            <button>Tìm Kiếm</button>
          </div>
          <div>
            <ol>
              {filteredProducts.map((product) => (
                <li key={product.id} style={{color:"#fff"}}>
                  {product.name} 
                </li>
              ))}
          </ol>
          </div>
        </div>
          
      </div>
      <div class="icon-child3" style={{ top:`${iconTop}px` }}  ref={form3} onMouseOver={handleMouseOver3} onMouseOut={handleMouseOut3}>
        <h2>Lịch sử đặt cọc</h2>
        <hr></hr>
        <div class="icon-child3-content-form">
          {DepositContracts.filter((id)=> id.userId ==userId).map(item =>
            <div class="icon-child3-content" onClick={() => window.location.href = '/User/View/activityHistory'}>
              <div class="icon-child3-content-1">
                <img src='/imges/logo/Lamborghini_logo-2.png' alt="logo"></img>
              </div>
              <div class="icon-child3-content-2">
                <span>{new Date(item.contractSigningDate).getDate() }/{new Date(item.contractSigningDate).getMonth() + 1}/{new Date(item.contractSigningDate).getFullYear()}</span>
                {car.filter((car)=> car.id == item.carId).map(item =>
                  <p>Quý khách đã đặt cọc xe {item.name}</p>
                )}
              </div>
            </div>
          )}
        </div>
        <h2>Lịch sử cuộc hẹn</h2>
        <hr></hr>
        <div class="icon-child3-content-form">
          {appointments.filter((id)=> id.userId ==userId).map(item =>
            <div class="icon-child3-content" onClick={() => window.location.href = '/User/View/activityHistory'}>
              <div class="icon-child3-content-1">
                <img src='/imges/logo/Lamborghini_logo-2.png' alt="logo"></img>
              </div>
              <div class="icon-child3-content-2">
                <span>{new Date(item.viewingDate).getDate() }/{new Date(item.viewingDate).getMonth() + 1}/{new Date(item.viewingDate).getFullYear()}</span>
                {car.filter((car)=> car.id == item.carId).map(item => 
                  <p>Quý khách đã đặt cuộc hẹn xem xe {item.name}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </body>
  );
};
const Mobile = () => {
  const icon1 = useRef(null);
  const icon2 = useRef(null);
  const icon3 = useRef(null);
  const form1 = useRef(null);
  const form2 = useRef(null);
  const form3 = useRef(null);
  const handleMouseOver1 = () => {
    form1.current.style.display = 'block';
  };

  const handleMouseOut1 = () => {
    form1.current.style.display = 'none';
  };
  const handleMouseOver2 = () => {
    form2.current.style.display = 'block';
  };

  const handleMouseOut2 = () => {
    form2.current.style.display = 'none';
  };
  const handleMouseOver3 = () => {
    form3.current.style.display = 'block';
  };

  const handleMouseOut3 = () => {
    form3.current.style.display = 'none';
  };
  return (
    <body class="Mobile">
      <div class="navbar">
          <div class="navbar-left">
            <img  src='/imges/logo/Lamborghini_logo-1.png' alt="logo"></img>
          </div>    
          <div class="navbar-right">
            <div class="icon" ref={icon1} onMouseOver={handleMouseOver1} onMouseOut={handleMouseOut1}>
              <FontAwesomeIcon icon={faCommentAlt} style={{height:"20px"}} />
            </div>
            <div class="icon" ref={icon2} onMouseOver={handleMouseOver2} onMouseOut={handleMouseOut2}>
              <FontAwesomeIcon icon={faSearch} style={{height:"20px"}}/>
            </div>
            <div class="icon" ref={icon3} onMouseOver={handleMouseOver3} onMouseOut={handleMouseOut3}>
              <div>
                <div class="icon-navbar" ></div>
                <div class="icon-navbar" ></div>
                <div class="icon-navbar" ></div>
              </div>
            </div>
          </div> 
      </div>
      <div class="icon-child1" ref={form1} onMouseOver={handleMouseOver1} onMouseOut={handleMouseOut1}>
        <h2>ASK ME</h2>
        <hr></hr>
        <div class="form1-2">
          <div>
            <img src='/imges/logo/Lamborghini_logo-2.png' alt="logo"></img>
          </div>
          <span>I'm Lamborghini's first Artificial Intelligence, how can I help you?</span>
        </div>
        <div class="form1-2">
          <div>
            <img src='/imges/logo/Lamborghini_logo-2.png' alt="logo"></img>
          </div>
          <span>You can choose one of the suggestions or ask me a question</span>
        </div>
        <hr></hr>
        <div class="form1-3">
          <button>MODELS</button>
          <button>DEALERS</button>
          <button>MUSEUM AND PRODUCTION LINE </button>
          <button>AD PERSONAM</button>
          <button>WORK WITH US</button>
          <button>COMPANY AND HISTORY</button>
          <button>MASTERPIECES</button>
        </div>
        <hr></hr>
        <div class="form1-4">
          <div class="messageBox">
            <div class="fileUploadWrapper">
              <label for="file">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 337 337">
                  <circle
                    stroke-width="20"
                    stroke="#6c6c6c"
                    fill="none"
                    r="158.5"
                    cy="168.5"
                    cx="168.5"
                  ></circle>
                  <path
                    stroke-linecap="round"
                    stroke-width="25"
                    stroke="#6c6c6c"
                    d="M167.759 79V259"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-width="25"
                    stroke="#6c6c6c"
                    d="M79 167.138H259"
                  ></path>
                </svg>
                <span class="tooltip">Add an image</span>
              </label>
              <input type="file" id="file" name="file" />
            </div>
            <input required="" placeholder="Hey, ask me something..." type="text" id="messageInput" />
            <button id="sendButton">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
                <path
                  fill="none"
                  d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                ></path>
                <path
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="33.67"
                  stroke="#6c6c6c"
                  d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="icon-child2" ref={form2} onMouseOver={handleMouseOver2} onMouseOut={handleMouseOut2}>
        <div class="form2-1">
          <label></label>
          <input></input>
          <label></label>
          <input></input>
          <label></label>
          <input></input>
        </div>
        <div class="form2-2">
          <label></label>
          <input></input>
          <label></label>
          <input></input>
          <label></label>
          <input></input>
          <label></label>
          <input></input>
        </div>
        <div class="form2-3">
          <label></label>
          <input></input>
          <label></label>
          <input></input>
          <label></label>
          <input></input>
          <label></label>
          <input></input>
        </div>
        <div class="form2-4">
          <label></label>
          <input></input>
          <label></label>
          <input></input>
          <label></label>
          <input></input>
          <label></label>
          <input></input>
        </div>
        
      </div>
      <div class="icon-child3" ref={form3} onMouseOver={handleMouseOver3} onMouseOut={handleMouseOut3}>
        <div class="form3-1">
          <div class="function">
            <a href='./User/View/home'>TRANG CHỦ</a>
          </div>
          <div class="function">
            <a href='/User/View/news'>XE ÔTÔ</a>
          </div>
          <div class="function">
            <a href='/User/View/news'>TIN TỨC</a>
          </div>
          <div class="function">
            <a href='/User/View/news'>BẢO TÀNG</a>
          </div>
          <div class="function">
            <a href='/User/View/news'>CỬA HÀNG</a>
          </div>
          <div class="function">
            <a href='/User/View/news'>THEO DÕI</a>
          </div>
          <div class="function">
            <a href='/User/View/news'>GIỎ HÀNG</a>
          </div>
          <div class="function">
            <a href='/User/View/news'>TÀI KHOẢN</a>
          </div>
          <div class="function">
            <a href='/User/View/news'>CÀI ĐẶT</a>
          </div>
          <div class="function">
            <a href='/User/View/news'>ĐIỀU KHOẢN</a>
          </div>
          <div class="function">
            <a href='/User/View/news'>TRỢ GIÚP & HỖ TRỢ</a>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Navbar;
