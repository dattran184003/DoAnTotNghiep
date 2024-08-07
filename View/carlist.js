import React, { useState, useEffect } from 'react';
import Navbar from './module/navbar';
import Carousel from './module/carousel';
import "../Layout/carlistLayout.css";
import { faBars, faHeart, faMessage, faPhone, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import { FacebookProvider, Share } from 'react-facebook';
import { jwtDecode } from 'jwt-decode';
import Footer from './module/footer';

function Carlist() {
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
    const [showfilter, setshowfilter] = useState(false);
    const handleClickshow = () => {
    setshowfilter(!showfilter);
    };
    const [car, setcar] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7175/api/Cars`)
            .then(res => setcar(res.data));   
    }, []);
    const [model,setmodel] = useState(); //dòng xe
    const [engine,setengine] = useState();// động cơ
    const [torque,settorque] = useState();// công xuất

    const handleClickmodel = (event) => {
        setmodel(event.target.value);
    };
    const handleClickengine = (event) => {
        setengine(event.target.value);
    };
    const handleClicktorque = (event) => {
        settorque(event.target.value);
    };
//share fb
    // const [shareUrl, setShareUrl] = useState('https://www.facebook.com/?locale=vi_VN'); // Lưu trữ URL để chia sẻ

    // const handleShareClick = () => {
    //     // Lấy URL hiện tại của trang
    //     const currentUrl = window.location.href;

    //     // Cập nhật URL để chia sẻ
    //     setShareUrl(currentUrl);
    // };
    const [isOpen, setIsOpen] = useState(false);
    const [url, setUrl] = useState('');
  
    const handleShareClick = (event) => {
      setIsOpen(true);
      setUrl(event.target.dataset.url);
    };
  
    const handleClose = () => {
      setIsOpen(false);
    };
   // xem bình luận 
   const [conmont,setonmont] = useState(false);
   // yêu thích
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
                const response = await axios.get(`https://localhost:7175/api/Users/${userId}`);
                setUser(response.data);

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
  //
 
  const handleAddToWishlist = async (itemId) => {
    
    try {
      const response = await axios.post('https://localhost:7175/api/Wishlists', {
        userId:userId,
        carId: itemId, // Use itemId instead of carId (assuming items have an "id" property)
      });
      if (response.status === 201) { // Handle successful creation (created - 201)
        alert('Sản phẩm đã được thêm vào yêu thích!');
        
      } else {
        alert('Có lỗi xảy ra khi thêm sản phẩm vào yêu thích:', response.data);
      }
    } catch (error) {
        alert('Error adding product to wishlist:', error);
    }
  };
  return (
    <body >
        <Navbar/>
        <div class='Desktop'>
            <div class='filtration-products'>
                <div class='filtration-products-1' >
                    <div class='filtration-products-1-top'>
                        <h3>DANH SÁCH SẢN PHẨM</h3> 
                    </div>
                    <div class='filtration-products-1-centre'>
                        <h1>L A M B O R G H I N I</h1>
                    </div>
                    <div class='filtration-products-1-bottom' onClick={handleClickshow}>
                        <h3>LỌC SẢN PHẨM <FontAwesomeIcon icon={faPlay} style={{height:"60px",marginLeft:"30px",transform: showfilter ? 'rotate(31deg)' : 'rotate(90deg)' }}/></h3>
                    </div>
                </div>
                <div class='filtration-products-2' style={{ display: showfilter ? 'block' : 'none' }}>
                    <div class='filtration-products-2-1'>
                        <h2>Dòng Xe</h2>
                        <ul>
                            <li value="1" onClick={handleClickmodel}>Lamborghini Aventador</li>
                            <li value="2" onClick={handleClickmodel}>Lamborghini Huracan</li>
                            <li value="3" onClick={handleClickmodel}>Lamborghini Urus</li>
                            <li value="4" onClick={handleClickmodel}>Lamborghini Sian</li>
                            <li value="5" onClick={handleClickmodel}>Lamborghini Revuelto </li>
                        </ul>
                    </div>
                    <div class='filtration-products-2-1'>
                        <h2>Động cơ</h2>
                        <ul>
                            <li value="12" onClick={handleClickengine}>V12</li>
                            <li value="10" onClick={handleClickengine}>V10</li>
                            <li value="8" onClick={handleClickengine}>V8</li>
                        </ul>
                    </div>
                    <div class='filtration-products-2-1'>
                        <h2>Công suất</h2>
                        <ul>
                            <li value="563" onClick={handleClicktorque}>563-650 mã lực</li>
                            <li value="650" onClick={handleClicktorque}>650 mã lực</li>
                            <li value="769" onClick={handleClicktorque}>769 mã lực</li>
                            <li value="780" onClick={handleClicktorque}>700-780 mã lực</li>
                        </ul>
                    </div>
                    {/* <div class='filtration-products-2-1'>
                        <h2>TỐC ĐỘ TỐI ĐA</h2>
                        <ul>
                            <li  value="8" onClick={handleClickmodel}>300 Km/h</li>   
                            <li  value="9" onClick={handleClickmodel}>350 Km/h</li>
                            <li  value="10" onClick={handleClickmodel}>400 Km/h</li>
                            <li  value="11" onClick={handleClickmodel}>450 Km/h</li>
                            <li  value="12" onClick={handleClickmodel}>500 Km/h</li>
                        </ul>
                    </div> */}
                </div>
            </div>
            <div style={{ display: "flex",flexWrap: "wrap"}}>
                <div style={{display: showfilter ?   'none':'block' }}>
                {car.map(item => 
                <div class='fromcar' key={item.id} >
                    <div class='fromcarimg'>
                        <img src={`/imges/car/${item.mainImage}`} alt="hinh"></img>
                    </div>
                    <div class='fromcarname'>
                        <h2>{item.name}</h2>
                        <p >{item.price}.000.000.000 VNĐ </p>
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
                        
                        <a href={`/User/View/cardetail/${item.id}`} class="Btndetail" >Xem chi tiết </a>
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
                                        <span class="leftContainer" onClick={() => handleAddToWishlist(item.id)}>
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
                </div>
                {/* lọc */}
                <div style={{display: showfilter ? 'block' : 'none' }}>
                    {car.filter((car) => (car.modelId == model) || (car.engine == ("V" + engine)) || (car.horsepower === torque) ).map(item => 
                    <div class='fromcar' key={item.id}>
                        <div class='fromcarimg'>
                            <img src={`/imges/car/${item.mainImage}`} alt="hinh"></img>
                        </div>
                        <div class='fromcarname'>
                            <h2>{item.name}</h2>
                            <p >{item.price}.000.000.000 VNĐ </p>
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
                                    <FontAwesomeIcon icon={faMessage} style={{height:"20px",width:"100%",marginTop:"10px"}}/>
                                </div>         
                            </div>
                            </button>
                            <a href='/User/View/cardetail' class="Btndetail">Xem chi tiết </a>
                            <button class="btnlist">
                                <FontAwesomeIcon icon={faBars} style={{height: "20px"}}/>
                                <ul class="socials">
                                    <li style={{margin:"5px"}}>
                                        <button class="Btnshare">
                                            <span>Share</span>
                                            <div class="container">
                                                {/* <Share
                                                    url={shareUrl} // Truyền URL để chia sẻ
                                                    quote="Nội dung bạn muốn chia sẻ..." // Tùy chỉnh lời trích dẫn
                                                    hashtag="#hastag liên quan" // Thêm hashtag
                                                    >
                                                    <FontAwesomeIcon icon={faFacebookF} style={{padding:"0px 10px",height:"20px"}}onClick={handleShareClick}/>
                                                </Share> */}
                                                <a href="https://www.instagram.com/lamborghini/?hl=en" target="_blank" rel="noreferrer" ><FontAwesomeIcon icon={faFacebookF} style={{padding:"0px 10px",height:"20px"}}/></a>
                                                {/* <a href="https://www.facebook.com/?locale=vi_VN" ><FontAwesomeIcon icon={faFacebookF} style={{padding:"0px 10px",height:"20px"}}/></a> */}
                                                <FontAwesomeIcon icon={faFacebookF} style={{padding:"0px 10px",height:"20px"}}/>
                                                <FontAwesomeIcon icon={faInstagram} style={{padding:"0px 10px",height:"20px"}}/>
                                                <FontAwesomeIcon icon={faTwitter}   style={{padding:"0px 10px",height:"20px"}}/>
                                            </div>
                                        </button>
                                    </li>
                                    <li style={{margin:"5px"}}>
                                        <button class="Btnlike">
                                            <span class="leftContainer">
                                                <FontAwesomeIcon icon={faHeart} style={{ color: "var(--trang)",height: "20px"}}/>
                                                <span class="like">Like</span>
                                            </span>
                                            <span class="likeCount">
                                                2,050
                                            </span>
                                        </button>
                                    </li>
                                    <li style={{margin:"5px"}}>
                                        <button class="Btncomment">
                                            <span>comment</span>
                                        </button>
                                    </li>
                                </ul>
                            </button>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
        {/* <div >
            <h1>Bình Luận</h1>
        </div> */}
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
export default Carlist;
