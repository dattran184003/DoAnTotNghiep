import React, { useState, useEffect, useContext } from 'react';
import Navbar from './module/navbar';
import "../Layout/detailLayout.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import Footer from './module/footer';
import { faFacebookF, faInstagram, faThreads, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';



function Cardetail() {
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
  const [Display, setDisplay] = useState(false);
  const [Displayimg1, setDisplayimg1] = useState(false);
  const [Displayimg2, setDisplayimg2] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [Showdeposits, setShowdeposits] = useState(false);
  const [activeImage1, setActiveImage1] = useState(1);
  const [activeImage2, setActiveImage2] = useState(2);
  const [Showbook, setShowbook] = useState(false);

  const images = [
    { src: '/imges/car/Lamborghini Revuelto/1.jpg', alt: 'Lamborghini Revuelto' },
    { src: '/imges/car/Lamborghini Revuelto/2.jpg', alt: 'Lamborghini Revuelto' },
    { src: '/imges/car/Lamborghini Revuelto/3.jpg', alt: 'Lamborghini Revuelto' },
    { src: '/imges/car/Lamborghini Revuelto/4.jpg', alt: 'Lamborghini Revuelto' },
    { src: '/imges/car/Lamborghini Revuelto/5.jpg', alt: 'Lamborghini Revuelto' },
    { src: '/imges/car/Lamborghini Revuelto/6.jpg', alt: 'Lamborghini Revuelto' },
    { src: '/imges/car/Lamborghini Revuelto/7.jpg', alt: 'Lamborghini Revuelto' },
    { src: '/imges/car/Lamborghini Revuelto/8.jpg', alt: 'Lamborghini Revuelto' },
    { src: '/imges/car/Lamborghini Revuelto/9.jpg', alt: 'Lamborghini Revuelto' }, 
    { src: '/imges/car/Lamborghini Revuelto/10.jpg', alt: 'Lamborghini Revuelto' },
  ];
  const store = [
    { Address: '11 Công Trường Mê Linh, Quận 1, Thành phố Hồ Chí Minh',store: 'Thành phố Hồ Chí Minh' },
    { Address: '12 Công Trường Mê Linh, Quận 2, Thành phố Hà Nội',store: 'Thành phố Hà Nội' },
    { Address: '13 Công Trường Mê Linh, Quận 3, Thành phố Đà Nẳng',store: 'Thành phố Đà Nẳng' },
    { Address: '14 Công Trường Mê Linh, Quận 4, Thành phố Nha Trang',store: 'Thành phố Nha Trang' },
  ];
  const [selectedStore, setSelectedStore] = useState('');
  const [storeAddress, setStoreAddress] = useState('');

  const handleStoreChange = (event) => {
    const selectedStore = event.target.value;
    setSelectedStore(selectedStore);

    // Tìm địa chỉ của store được chọn
    const address = store.find((store) => store.store === selectedStore).Address;
    setStoreAddress(address);
  };
  const handleClickLeft = () => {
    setActiveImage((prevActiveImage) => (prevActiveImage - 1 + images.length) % images.length);
    setActiveImage1((prevActiveImage) => (prevActiveImage - 1 + images.length) % images.length);
    setActiveImage2((prevActiveImage) => (prevActiveImage - 1 + images.length) % images.length);
  };
  const handleClickRight = () => {
    setActiveImage((prevActiveImage) => (prevActiveImage + 1) % images.length);
    setActiveImage1((prevActiveImage) => (prevActiveImage + 1) % images.length);
    setActiveImage2((prevActiveImage) => (prevActiveImage + 1) % images.length);
  };
  const handleClickshow = () => {
    setDisplay(!Display);
  };
  const handleClickShowbook = () => {
    setShowbook(!Showbook);
  };
  const handleClickShowdeposits = () => {
    setShowdeposits(!Showdeposits);
  };
  const handleClickshowimg1 = () => {
    setDisplayimg1(!Displayimg1);
  };
  const handleClickshowimg2 = () => {
    setDisplayimg2(!Displayimg2);
  };
  const [iframeUrl, setIframeUrl] = useState('0deg');
  const [selectedColor, setSelectedColor] = useState('trắng');
  const handleClick = (event) => {
    const buttonId = event.target.id;
    const newIframeUrl = `${buttonId}`;
    setIframeUrl(newIframeUrl);
    const clickedButtonId = event.target.id;
    let newColor;
    switch (clickedButtonId) {
      case 'hue-rotate(170deg)':
        newColor = 'xanh dương';
        break;
      case 'hue-rotate(200deg)':
        newColor = 'xanh dương đậm';
        break;
      case 'hue-rotate(90deg)':
        newColor = 'xanh lá';
        break;
      case 'hue-rotate(150deg)':
        newColor = 'xanh lá đậm';
        break;
      case 'hue-rotate(330deg)':
        newColor = 'hồng';
        break;
      case 'hue-rotate(290deg)':
        newColor = 'hồng tím';
        break;
      case 'hue-rotate(0deg)':
        newColor = 'cam';
        break;
      case 'hue-rotate(250deg)':
        newColor = 'tím';
        break;
      case 'hue-rotate(10deg)':
        newColor = 'đen';
        break;
      case 'hue-rotate(25deg)':
        newColor = 'xám';
        break; 
      default:
        newColor = 'trắng'; 
    }

    setSelectedColor(newColor);
  };
  //demo 

  const [calendar, setCalendar] = useState(null);
  const [selectedHour, setSelectedHour] = useState(7);
  const [selectedMinute, setSelectedMinute] = useState(0);
 
 
  const handleHourChange = (event) => {
    setSelectedHour(parseInt(event.target.value));
  };

  const handleMinuteChange = (event) => {
    setSelectedMinute(parseInt(event.target.value));
  };

  const getSelectedTime = () => {
    const formattedHour = selectedHour.toString().padStart(2, '0');
    const formattedMinute = selectedMinute.toString().padStart(2, '0');
    return `${formattedHour}:${formattedMinute}`;
  };
  const { carId } = useParams();
  const [car, setcar] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7175/api/Cars`)
            .then(res => setcar(res.data));   
    }, []);
    const [img,setimg] = useState([]);
    useEffect(() => {
      axios.get(`https://localhost:7175/api/CarImages`)
          .then(res => setimg(res.data));   
  }, []);
// kt đăng nhập
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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const link1 = '/User/View/Wishlists';
    const link2 = '/User/View/login';
    useEffect(() => {
      // Kiểm tra người dùng đã đăng nhập hay chưa
      setIsLoggedIn(userId !== null); // Cập nhật trạng thái đăng nhập
    }, []);
    //đặt lịck hẹn
    const [contactInfo, setcontactInfo] = useState();
    const [location, setlocation] = useState();
    const [carViewingTime, setcarViewingTime] = useState();
    const [viewingDate, setviewingDate] = useState();
    const handleAppointments = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post('https://localhost:7175/api/Appointments', {
          userId:userId,
          carId: carId,
          carViewingTime: `${selectedHour}:00:00`,
          // selectedHour
          location: storeAddress,
          note: "không có nội dung",
          contactInfo: contactInfo,
          viewingDate: viewingDate,
        });
        if (response.status === 201) { // Handle successful creation (created - 201)
          alert('Đặt lịch thành công!');
          
        } else {
          alert('Có lỗi xảy ra khi đặt lịch:', response.data);
        }
      } catch (error) {
          alert('Có lỗi xảy ra khi đặt lịch:', error);
      }
    };
     // sưr lý chọn ngày
     const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
      const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single-digit days
      return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
    };
  
    const handleDaySelect = (selectedDate) => {
      setCalendar(selectedDate); // Update the selected date state
  
      // Update viewingDate state with formatted date
      const formattedViewingDate = formatDate(selectedDate);
      setviewingDate(formattedViewingDate);
    };
    
  return (
    <body class='Desktop'>
      <Navbar/>
       {car.filter((car) => car.id == carId).map(item =>
      <div class='cardetail-0' >
        <div class='cardetail-0-1'>
         
          <img src={`/imges/car/${item.mainImage}`} alt="hinh" style={{filter: iframeUrl}} ></img>
          <div class='cardetail-0-1-2'>
            <div class='cardetail-0-1-2-left'>
              <h2>Chia sẽ</h2>
              <div style={{display:"flex"}}>
                <button><p style={{width:"20px",marginRight:"10px"}}><FontAwesomeIcon icon={faFacebookF}/></p><p>Facebook</p></button>
                <button><p style={{width:"20px",marginRight:"10px"}}><FontAwesomeIcon icon={faInstagram}/></p><p>Instagram</p></button>
              </div>
              <div style={{display:"flex"}}>
                <button><p style={{width:"20px",marginRight:"10px"}}><FontAwesomeIcon icon={faThreads}  /></p><p>Threads</p></button>
                <button><p style={{width:"20px",marginRight:"10px"}}><FontAwesomeIcon icon={faXTwitter} /></p><p>Twitter</p></button>
              </div>
            </div>
            <div class='cardetail-0-1-2-right'>
              <div style={{display:"flex"}}>
                <h2>Lượt thích</h2>
                <span>1235775</span>
              </div>
              <div style={{display:"flex"}}>
                <h2>Bình luận</h2>
                <span>xem bình luận</span>
              </div>
              <div style={{display:"flex"}}>
                <h2>Đánh giá</h2>
                <span>8.5/10</span>
              </div>
            </div>
          </div> 
        </div>
        <div class='cardetail-0-2'>
          <h1>{item.name}</h1>
          <hr></hr> 
          <h2>Giá xe:</h2>
          <div style={{display:"flex",width:"70%",margin:"0px 15%",textAlign:"center",justifyContent:"center"}}>
            <h2>25.000.000.000 VNĐ</h2>
          </div>
          <hr></hr>
          <h2>Thông số kỹ thuật xe:</h2>
          <ul>
            <li>
              <h4>Sức Mạnh</h4>
              <h4>1015 CV</h4>
            </li>
            <li>
              <h4>TỐC ĐỘ</h4>
              <h4>&gt;350 km/h</h4>
            </li>
            <li>
              <h4>0-100 km/h</h4>
              <h4>2,5 giây</h4>
            </li>
            <li>
              <button style={{padding:"5px 10px",marginTop:"10px",width:"max-content",height:"max-content"}}  class="btncolor">Xem Thêm</button>
            </li>
          </ul>
          <hr></hr>
          <h2>Màu xe:</h2>
          <ul>
            <li>
              <button onClick={handleClick} style={{backgroundColor:"#0678e3"}} id='hue-rotate(170deg)' class="btncolor"></button>
              <button onClick={handleClick} style={{backgroundColor:"#4655e3"}} id='hue-rotate(200deg)' class="btncolor"></button>
            </li>
            <li>
              <button onClick={handleClick} style={{backgroundColor:"#168b00"}} id='hue-rotate(90deg)' class="btncolor"></button>
              <button onClick={handleClick} style={{backgroundColor:"#00603c"}} id='hue-rotate(150deg)' class="btncolor"></button>
            </li>
            <li>
              <button onClick={handleClick} style={{backgroundColor:"#ff4163"}} id='hue-rotate(330deg)' class="btncolor"></button>
              <button onClick={handleClick} style={{backgroundColor:"#ec3089"}} id='hue-rotate(290deg)' class="btncolor"></button>
            </li>
            <li>
              <button onClick={handleClick} style={{backgroundColor:"#e0400b"}} id='hue-rotate(0deg)' class="btncolor"></button>
              <button onClick={handleClick} style={{backgroundColor:"#c146f0"}} id='hue-rotate(250deg)' class="btncolor"></button>
            </li>
            <li>
              <button onClick={handleClick} style={{backgroundColor:"#000"}} id='hue-rotate(10deg)' class="btncolor"></button>
              <button onClick={handleClick} style={{backgroundColor:"#d9d9d9"}} id='hue-rotate(25deg)' class="btncolor"></button>
            </li>
          </ul>
          <hr></hr>
          <div class='cardetail-0-2-1'>
            <button  onClick={handleClickShowbook}>Đặt lịch xem xe</button>
            <button>Liên hệ</button>
            <a href={isLoggedIn ? `/User/View/contract/${item.id}/${selectedColor}` : link2  } >Đặt cọc</a>
            {/* onClick={handleClicka} */}
            <button>Thích</button>         
          </div>
        </div>
      </div>
)}
      <div class='Exterior-design'>
          <div class='Exterior-design-1'>
            <h1 >THIẾT KẾ NGOẠI THẤT</h1>
            <p >
              Lamborghini Revuelto là mẫu siêu xe hybrid đầu tiên của Lamborghini, được ra mắt vào tháng 3 năm 2023. Mẫu xe này sở hữu 
              thiết kế mang đậm dấu ấn Lamborghini, kết hợp giữa những đường nét quen thuộc từ các mẫu xe huyền thoại như Countach, 
              Diablo hay Murciélago với những chi tiết hiện đại và thể thao hơn. 
              <div class='icon-hexagon-1'  onClick={handleClickshowimg1} style={{marginTop:"20px"}}>
                <div class='icon-hexagon-2'>
                    <FontAwesomeIcon icon={faPlus} class='icon-hexagon-right'style={{ transform: Displayimg1 ? 'rotate(45deg)' : 'rotate(90deg)' }}/>
                </div> 
                <span>Xem thêm hình ảnh ngoại thất</span>
              </div>
            </p>
          </div>
          <div class='Exterior-design-2'>
            {img.filter((car) => car.carId == carId).map(item =>
              <img src={`/imges/car/${item.imageUrl10}`} alt="hinh" style={{filter: iframeUrl}} ></img>
            )}
          </div>
      </div>
      <div class='cardetail-1'style={{ display: Displayimg1 ? 'flex' : 'none' }}>
        {img.filter((car) => car.carId == carId).map(item =>
          <img src={`/imges/car/${item.imageUrl1}`} alt="hinh"  class='cardetail-1-1'style={{filter: iframeUrl}} ></img>
        )}
        {img.filter((car) => car.carId == carId).map(item =>
          <img src={`/imges/car/${item.imageUrl2}`} alt="hinh" class='cardetail-1-2' style={{filter: iframeUrl}} ></img>
        )}
      </div>
      <div class='cardetail-2'style={{ display: Displayimg1 ? 'flex' : 'none' }}>
        {img.filter((car) => car.carId == carId).map(item =>
          <img src={`/imges/car/${item.imageUrl3}`} alt="hinh" class='cardetail-2-1' style={{filter: iframeUrl}} ></img>
        )}
        {img.filter((car) => car.carId == carId).map(item =>
          <img src={`/imges/car/${item.imageUrl4}`} alt="hinh" class='cardetail-2-2' style={{filter: iframeUrl}} ></img>
        )}
      </div>
      <div class='cardetail-3'style={{ display: Displayimg1 ? 'flex' : 'none' }}>
        {img.filter((car) => car.carId == carId).map(item =>
          <img src={`/imges/car/${item.imageUrl5}`} alt="hinh" class='cardetail-3-1' style={{filter: iframeUrl}} ></img>
        )}
        {img.filter((car) => car.carId == carId).map(item =>
          <img src={`/imges/car/${item.imageUrl6}`} alt="hinh" class='cardetail-3-2' style={{filter: iframeUrl}} ></img>
        )}
      </div>
      <div class='cardetail-4'style={{ display: Displayimg1 ? 'flex' : 'none' }}>
        {img.filter((car) => car.carId == carId).map(item =>
          <img src={`/imges/car/${item.imageUrl1}`} alt="hinh" class='cardetail-4-1' style={{filter: iframeUrl}} ></img>
        )}
        {img.filter((car) => car.carId == carId).map(item =>
          <img src={`/imges/car/${item.imageUrl2}`} alt="hinh" class='cardetail-4-2' style={{filter: iframeUrl}} ></img>
        )}
      </div>
      <div class='Interior-design'>
          <div class='Interior-design-2'>
            <img src='/imges/car/Lamborghini Revuelto/12.jpg' alt="hinh"style={{filter: iframeUrl}}></img>
          </div>
          <div class='Interior-design-1'>
            <h1>THIẾT KẾ NỘI THẤT</h1>
            <p>
            Nội thất Lamborghini Revuelto là một sự thay đổi mang tính cách mạng so với những mẫu xe trước đây của Lamborghini. 
            ó kết hợp sự sang trọng, tiện nghi với công nghệ tiên tiến và hiệu suất cao. 
            <ul>
              <li>Bảng đồng hồ kỹ thuật số 12,3 inch:</li>
              <li>Màn hình cảm ứng trung tâm 8,4 inch:</li>
              <li>Màn hình 9,1 inch cho hành khách:</li>
              <li>Ghế da cao cấp:</li>
              <li>Vô lăng thể thao:</li>
              <li>Chất liệu carbon fiber:</li>
            </ul>
              <div class='icon-hexagon-1'  onClick={handleClickshowimg2} style={{marginTop:"20px"}}>
                <div class='icon-hexagon-2'>
                    <FontAwesomeIcon icon={faPlus} class='icon-hexagon-right'style={{ transform: Displayimg2 ? 'rotate(45deg)' : 'rotate(90deg)' }}/>
                </div> 
                <span>Xem thêm hình ảnh nội thất</span>
              </div>
            </p>
          </div> 
      </div>
      <div class='cardetail-7' style={{ display: Displayimg2 ? 'flex' : 'none' }}>
        <img src='/imges/car/Lamborghini Revuelto/12.jpg' alt="hinh" class='cardetail-7-1'style={{filter: iframeUrl}}></img>
        <img src='/imges/car/Lamborghini Revuelto/13.jpg' alt="hinh" class='cardetail-7-2'style={{filter: iframeUrl}}></img>
      </div>
      <div class='cardetail-8'style={{ display: Displayimg2 ? 'flex' : 'none' }}>
        <img src='/imges/car/Lamborghini Revuelto/14.jpg' alt="hinh" class='cardetail-8-1'style={{filter: iframeUrl}}></img>
        <img src='/imges/car/Lamborghini Revuelto/15.jpg' alt="hinh" class='cardetail-8-2'style={{filter: iframeUrl}}></img>
      </div>
      <div class='cardetail-5'>
        <h1>THÔNG SỐ KỸ THUẬT</h1>
        <div class='parameter'>
          <h5>SỰ DỊCH CHUYỂN</h5>
          <p>6498,5 cm³ (396,6 cu in)</p>
        </div>
        <div class='parameter'>
          <h5>CÔNG SUẤT TỐI ĐA (KẾT HỢP ICE+EE)</h5>
          <p>1015 CV</p>
        </div>
        <div class='parameter'>
          <h5>TỐC ĐỘ TỐI ĐA</h5>
          <p>&gt; 350 km/h</p>
        </div>
        <div class='parameter'>
          <h5>TĂNG TỐC 0-100 KM/H (0-62 MPH)</h5>
          <p>2,5 giây</p>
        </div>
        <div class='parameter'>
          <h5>MỨC TIÊU THỤ KẾT HỢP*</h5>
          <p>11,86 l/100km (WLTP)</p>
        </div>
        <div class='parameter'>
          <h5>LƯỢNG PHÁT THẢI CO2 TỔNG HỢP*</h5>
          <p>276 g/km (WLTP)</p>
        </div>
        <div class='parameter'>
          <h5>MỨC TIÊU THỤ ĐIỆN NĂNG KẾT HỢP*</h5>
          <p>10,1 kWh/100 Km (WLTP)</p>
        </div>
        <div class='parameter'>
          <h5>LỚP HIỆU QUẢ KẾT HỢP*</h5>
          <p>G (WLTP)</p>
        </div>
        <div class='parameter'>
          <h5>MỨC TIÊU THỤ NHIÊN LIỆU KHI HẾT PIN KẾT HỢP*</h5>
          <p>17,8 l/100km (WLTP)</p>
        </div>
        <div class='parameter'>
          <h5>CẤP HIỆU SUẤT CO2 VỚI PIN ĐÃ XẢ*</h5>
          <p>G (WLTP)</p>
        </div>
        <div class='parameter' style={{border:"none"}}>
          <div class='icon-hexagon-1' style={{margin:"auto"}} onClick={handleClickshow}>
              <div class='icon-hexagon-2'>
                  <FontAwesomeIcon icon={faPlus} class='icon-hexagon-right'style={{ transform: Display ? 'rotate(45deg)' : 'rotate(90deg)' }}/>
              </div> 
              <span>Mở rộng tất cả các thông số kỹ thuật</span>
          </div>
        </div>
      </div>
      <div class='cardetail-6' style={{ display: Display ? 'flex' : 'none' }}>
        <div class='cardetail-6-1'>
          {/* SỰ TIÊU THỤ */}
          <h1>SỰ TIÊU THỤ</h1>
          <div class='information-car'>
            <h5>MỨC TIÊU THỤ KẾT HỢP*</h5>
            <p>11,86 l/100km (WLTP)</p>
          </div>
          <div class='information-car'>
            <h5>LƯỢNG PHÁT THẢI CO2 TỔNG HỢP*</h5>
            <p>276 g/km (WLTP)</p>
          </div>
          <div class='information-car'>
            <h5>MỨC TIÊU THỤ ĐIỆN NĂNG KẾT HỢP*</h5>
            <p>10,1 kWh/100 Km (WLTP)</p>
          </div>
          <div class='information-car'>
            <h5>LỚP HIỆU QUẢ KẾT HỢP*</h5>
            <p>G (WLTP)</p>
          </div>
          <div class='information-car'>
            <h5>MỨC TIÊU THỤ NHIÊN LIỆU KHI HẾT PIN KẾT HỢP*</h5>
            <p>17,8 l/100km (WLTP)</p>
          </div>
          <div class='information-car'>
            <h5>CẤP HIỆU SUẤT CO2 VỚI PIN ĐÃ XẢ*</h5>
            <p>G (WLTP)</p>
          </div>
          {/* ĐỘNG CƠ ĐỐT TRONG */}
          <h1>ĐỘNG CƠ ĐỐT TRONG</h1>
          <div class='information-car'>
            <h5>ĐỘNG CƠ</h5>
            <p>V12 NA 6,5 l</p>
          </div>
          <div class='information-car'>
            <h5>SỰ DỊCH CHUYỂN</h5>
            <p>6498,5 cm³ (396,6 cu in)</p>
          </div>
          <div class='information-car'>
            <h5>ĐƯỜNG KÍNH X HÀNH TRÌNH PISTON</h5>
            <p>95 mm x 76,4 mm (3,74 x 3,01 in)</p>
          </div>
          <div class='information-car'>
            <h5>TỶ LỆ NÉN</h5>
            <p>12,6:1</p>
          </div>
          <div class='information-car'>
            <h5>TỐI ĐA. CÔNG SUẤT (KW/CV)</h5>
            <p>1825 CV (607 kW) @ 9250 vòng/phút</p>
          </div>
          <div class='information-car'>
            <h5>CÔNG SUẤT TỐI ĐA (KẾT HỢP ICE+EE)</h5>
            <p>1015 CV</p>
          </div>
          <div class='information-car'>
            <h5>TỐI ĐA. MÔ-MEN XOẮN</h5>
            <p>725 Nm tại 6750 vòng/phút</p>
          </div>
          <div class='information-car'>
            <h5>TỶ LỆ TRỌNG LƯỢNG TRÊN CÔNG SUẤT</h5>
            <p>1,75 kg/CV</p>
          </div>
          <div class='information-car'>
            <h5>HỆ THỐNG BÔI TRƠN</h5>
            <p>Hầm chứa khô</p>
          </div>
          <div class='information-car'>
            <h5>HỆ THỐNG LÀM MÁT</h5>
            <p>Làm mát bằng chất lỏng - mạch chuyên dụng cho linh kiện HV</p>
          </div>
          <div class='information-car'>
            <h5>HỆ THỐNG QUẢN LÝ ĐỘNG CƠ</h5>
            <p>PFI - Bosch</p>
          </div>
          <div class='information-car'>
            <h5>LỚP PHÁT THẢI</h5>
            <p>EU6; LEV III; CN6b</p>
          </div>
          <div class='information-car'>
            <h5>HỆ THỐNG KIỂM SOÁT KHÍ THẢI</h5>
            <p>4 con pre-cat gần máy, 4 con lambda</p>
          </div>
          {/*QUÁ TRÌNH LÂY TRUYỀN */}
          <h1>QUÁ TRÌNH LÂY TRUYỀN</h1>
          <div class='information-car'>
            <h5>QUÁ TRÌNH LÂY TRUYỀN</h5>
            <p>AMT</p>
          </div>
          <div class='information-car'>
            <h5>HỘP SỐ</h5>
            <p>8 bánh răng</p>
          </div>
          <div class='information-car'>
            <h5>LY HỢP</h5>
            <p>Ly hợp kép</p>
          </div>
          {/*HỆ THỐNG HỖN HỢP */}
          <h1>HỆ THỐNG HỖN HỢP</h1>
          <div class='information-car'>
            <h5>ẮC QUY</h5>
            <p>Pin lithium-ion có công suất riêng cao với các tế bào dạng túi</p>
          </div>
          <div class='information-car'>
            <h5>MÁY PHÁT ĐIỆN</h5>
            <p>Động cơ điện tử P2-P3 phía sau (110kW @10000rpm)</p>
          </div>
          <div class='information-car'>
            <h5>ĐỘNG CƠ ĐIỆN</h5>
            <p>Trục điện tử phía trước (220kW @ 3500rpm)</p>
          </div>
          {/*HIỆU SUẤT */}
          <h1>HIỆU SUẤT</h1>
          <div class='information-car'>
            <h5>TỐC ĐỘ TỐI ĐA</h5>
            <p>&gt; 350 km/h</p>
          </div>
          <div class='information-car'>
            <h5>TĂNG TỐC 0-100 KM/H (0-62 MPH)</h5>
            <p>2,5 giây</p>
          </div>
        </div>
        <div class='cardetail-6-2'>
          {/* THÂN VÀ KHUNG XE */}
          <h1>THÂN VÀ KHUNG XE</h1>
          <div class='information-car'>
            <h5>KHUNG</h5>
            <p>Cấu trúc mặt trước bằng sợi carbon liền khối đa công nghệ bằng vật liệu composite rèn</p>
          </div>
          <div class='information-car'>
            <h5>THÂN HÌNH</h5>
            <p>Thân xe bằng sợi carbon, cửa nhôm, cản trước và sau bằng nhựa chịu nhiệt</p>
          </div>
          <div class='information-car'>
            <h5>KHÍ ĐỘNG HỌC</h5>
            <p>Cánh gió sau chủ động có 3 vị trí tùy theo các chế độ lái và động lực lái khác nhau</p>
          </div>
          {/* BÁNH XE */}
          <h1>BÁNH XE</h1>
          <div class='information-car'>
            <h5>VÀNH TRƯỚC</h5>
            <p>20 x 9,5j (tùy chọn 21 x 9,5j)</p>
          </div>
          <div class='information-car'>
            <h5>VÀNH SAU</h5>
            <p>21 x 12j (22 x 12,5j tùy chọn)</p>
          </div>
          <div class='information-car'>
            <h5>LỐP TRƯỚC</h5>
            <p>265/35 ZR20 - Potenza Sport Runflat (265/30 ZR21 - Runflat tùy chọn)</p>
          </div>
          <div class='information-car'>
            <h5>LỐP SAU</h5>
            <p>345/30 ZR21 - Potenza Sport Runflat (355/25 ZR22 - Runflat tùy chọn)</p>
          </div>
          {/* CHỈ ĐẠO VÀ TẠM NGỪNG */}
          <h1>CHỈ ĐẠO VÀ TẠM NGỪNG</h1>
          <div class='information-car'>
            <h5>HỆ THỐNG ĐIỀU KHIỂN</h5>
            <p>KIỂM SOÁT ỔN ĐỊNH ĐIỆN TỬ (ESC) tích hợp ABS và TCS với các đặc tính khác nhau tùy theo chế độ lái đã chọn</p>
          </div>
          <div class='information-car'>
            <h5>LOẠI HỆ THỐNG TREO</h5>
            <p>Tay đòn kép phía trước và phía sau với bộ giảm chấn LMR - Lamborghini Magneride</p>
          </div>
          <div class='information-car'>
            <h5>HỆ THỐNG LÁI</h5>
            <p>EPS - Tay lái trợ lực điện</p>
          </div>
          {/* PHANH */}
          <h1>PHANH</h1>
          <div class='information-car'>
            <h5>PHANH</h5>
            <p>Phanh CCB Plus (Carbon Ceramic Brakes Plus) với kẹp phanh monoblock cố định bằng nhôm với 10 piston (phía trước) và 4 piston (phía sau)</p>
          </div>
          <div class='information-car'>
            <h5>PHANH GỐM CARBON (TRƯỚC)</h5>
            <p>đĩa 410x38mm</p>
          </div>
          <div class='information-car'>
            <h5>PHANH GỐM CARBON (PHÍA SAU)</h5>
            <p>đĩa 390x32mm</p>
          </div>
          {/* SỰ AN TOÀN */}
          <h1>SỰ AN TOÀN</h1>
          <div class='information-car'>
            <h5>TÚI KHÍ</h5>
            <p>Người lái, hành khách, túi khí bên. Túi khí đầu gối chỉ dành cho một số thị trường cụ thể</p>
          </div>
          {/* KÍCH THƯỚC */}
          <h1>KÍCH THƯỚC</h1>
          <div class='information-car'>
            <h5>CHIỀU DÀI</h5>
            <p>4947mm</p>
          </div>
          <div class='information-car'>
            <h5>CHIỀU RỘNG (KHÔNG BAO GỒM GƯƠNG)</h5>
            <p>2033mm</p>
          </div>
          <div class='information-car'>
            <h5>CHIỀU RỘNG (BAO GỒM CẢ GƯƠNG)</h5>
            <p>2266mm</p>
          </div>
          <div class='information-car'>
            <h5>CHIỀU CAO</h5>
            <p>1160mm</p>
          </div>
          <div class='information-car'>
            <h5>TRƯỚC</h5>
            <p>1720 mm</p>
          </div>
          <div class='information-car'>
            <h5>THEO DÕI PHÍA SAU</h5>
            <p>1701mm</p>
          </div>
          <div class='information-car'>
            <h5>CHIỀU DÀI CƠ SỞ</h5>
            <p>2779mm</p>
          </div>
          <div class='information-car'>
            <h5>TRỌNG LƯỢNG KHÔ</h5>
            <p>1772 kg</p>
          </div>
          <div class='information-car'>
            <h5>PHÂN BỐ TRỌNG LƯỢNG</h5>
            <p>% 44/56</p>
          </div>
        </div>
      </div>
      <div class='cardetail-9'>
        <h1>SẢN PHẨM LIÊN QUAN</h1>
        <div class='cardetail-9-1'>
          <img src={images[activeImage].src} alt={images[activeImage].alt} class='cardetail-9-img-left'></img>
          <img src={images[activeImage1].src} alt={images[activeImage1].alt} class='cardetail-9-img-center'></img>
          <img src={images[activeImage2].src} alt={images[activeImage2].alt} class='cardetail-9-img-right'></img>
          <div class='cardetail-9-2'>
            <div class='icon-hexagon-3' style={{margin:"auto"}}  onClick={handleClickLeft}>
              <div class='icon-hexagon-4'>
                <FontAwesomeIcon icon={faChevronLeft} class='icon-hexagon-right'/>
              </div>   
            </div>
            <div class='icon-hexagon-3' style={{margin:"auto"}}  onClick={handleClickRight}>
              <div class='icon-hexagon-4'>
                <FontAwesomeIcon icon={faChevronRight}class='icon-hexagon-right' />
              </div> 
            </div>
          </div>
        </div>
      </div>
      <form style={{ display: Showbook ? 'inline' : 'none' }} class='Showbook' onSubmit={handleAppointments}>
        <div class='Showbook-1'>
          <div class='Showbook-1-icon'></div>
          <h1 class='Showbook-1-text'>Đặt lịch xem xe</h1>
          <FontAwesomeIcon icon={faXmark}  onClick={handleClickShowbook} class='Showbook-1-icon'/>
        </div>
        <div class='Showbook-2'>
          <div class='Showbook-1-left'>
            <DayPicker
              mode="single"
              selected={calendar}
              onSelect={handleDaySelect}
            />
          </div>
          <div class='Showbook-1-right'>
            <div>
              <label htmlFor="hour">Chọn Giờ: </label>
              <select id="hour" value={selectedHour} onChange={handleHourChange}>
                {/* {Array.from({ length: 24 }).map((_, i) => (
                  <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                ))} */}
               {
                // Tạo các option từ 7 đến 20
                  [...Array(20 - 7 + 1)].map((_, i) => (
                    <option key={i + 7} value={i + 7}>{i + 7}:00</option>
                  ))
                }
              </select>
              <p >Thời gian đã chọn: {getSelectedTime()}</p>
            </div>
            <div>
              <label htmlFor="store">Chọn cửa hàng:</label>
              <select id="store" value={selectedStore} onChange={handleStoreChange}>
                {store.map((store) => (
                  <option key={store.store} value={store.store}>
                    {store.store}
                  </option>
                ))}
              </select>
              <div style={{display:"flex"}}>
                <p style={{whiteSpace:"nowrap"}}>Địa chỉ:</p>
                <p style={{paddingLeft:"10px"}}>{storeAddress}</p>
              </div>
              <div style={{display:"flex"}}>
                <p style={{margin:"0px"}}>Thông Tin liên lạc:</p>
                <input type='text' placeholder="Số điện thoại" style={{width:"35%",marginLeft:"10px"}} maxlength="10" minlength="10" value={contactInfo} onChange={(event) => setcontactInfo(event.target.value)} ></input>
              </div>
            </div>
            <div style={{display:"flex",textAlign:"center",justifyContent:"center",marginTop:"10px"}}>
              <button type='submit'>Xác nhận</button>
            </div>
          </div>
        </div>
      </form>
      <Footer/>
    </body>
  );
};
const Mobile = () => {
  return (
    <body>
      <Navbar/>
      Nội dung cho màn hình dưới 1000px
      <Footer/>
    </body>
  );
};
export default Cardetail;
