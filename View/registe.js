import React, { useState, useEffect, useRef } from 'react';
import Navbar from './module/navbar';
import "../Layout/loginLayout.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';

function Registe() {
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
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play();
    }
  }, []);
  const [showLognDiv2, setShowLognDiv2] = useState(true);
  const [showLognDiv3, setShowLognDiv3] = useState(false);
  const [showLognDiv4, setShowLognDiv4] = useState(false);
  const [showLognDiv5, setShowLognDiv5] = useState(false);
  const [showLognDiv6, setShowLognDiv6] = useState(false);
  const handleClickLogn = () => {
    if (showLognDiv5){
      setShowLognDiv5(false);
      setShowLognDiv6(true);
    } else if (showLognDiv4) {
      setShowLognDiv4(false);
      setShowLognDiv5(true);
    } else if (showLognDiv3) {
      setShowLognDiv3(false);
      setShowLognDiv4(true);
    } else {
      setShowLognDiv2(false);
      setShowLognDiv3(true);
    }
  }
  const navigate = useNavigate();
  const [account, setAccount] = useState({});

  const handleChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      setAccount(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      axios.post(`https://localhost:7175/api/Users/register`, account)
          .then(() => navigate('/User/View/login'))
          .catch(err => {
              // handle error if needed
              console.error("Có lỗi xảy ra:", err);
          });
  }
  return (
    <body class='Desktop'>
      <div class='login-video'>
        <video src="/videos/5.mp4" ref={videoRef} controls={false} autoPlay ></video>
        {/* from đăng ký 1 nhập tên người dùng */}
        <Form onSubmit={handleSubmit}>
        <div class='register-from' id="Logndiv2" style={{ display: showLognDiv2 ? 'block' : 'none' }}>
          <div class='register-name'>
            <p class="title">ĐĂNG KÝ</p>
            <div class="form">
              <Form.Group className="mb-3" class="input-group">
                <Form.Label>Tên Đăng Nhập</Form.Label>
                  <Form.Control required placeholder="" type="text" name="username" onChange={handleChange} />
              </Form.Group>
              <div class="social-message">
                <div class="line"></div>
                <p class="message">Đăng nhập bằng tài khoản xã hội</p>
                <div class="line"></div>
              </div>
              <div class="social-icons">
                <button aria-label="Log in with Google" class="icon">
                  <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button aria-label="Log in with Twitter" class="icon">
                  <FontAwesomeIcon icon={faTwitter} />
                </button>
                <button aria-label="Log in with GitHub" class="icon">
                  <FontAwesomeIcon icon={faGithub} />
                </button>
                <button aria-label="Log in with Facebock" class="icon">
                  <FontAwesomeIcon icon={faFacebook} />
                </button>
              </div>
              <div class="social-message">
                <div class="line"></div>
                  <p class="sign" onClick={handleClickLogn }>Tiếp theo</p>
                <div class="line"></div>
              </div>
            </div>
          </div>
        </div>
        {/* from đăng ký 1 nhập email người dùng */}
        <div class='register-from' id="Logndiv3" style={{ display: showLognDiv3 ? 'block' : 'none' }}>
          <div class='register-name'>
            <p class="title">ĐĂNG KÝ</p>
            <div class="form">
              <Form.Group className="mb-3" class="input-group">
                  <Form.Label>Email</Form.Label>
                  <Form.Control required placeholder="" type="email" name="email" onChange={handleChange} />
              </Form.Group>
              <div class="social-message">
                <div class="line"></div>
                <p class="message">Sử dụng địa chỉ email hiện tại của bạn</p>
                <div class="line"></div>
              </div>
              <div class="social-icons">
                <button aria-label="Log in with Google" style={{backgroundColor:"#fff",padding:"7px 100px",border:"none",borderRadius:"6px"}}>
                <img src='/imges/logo/icon-google.png' alt="hinh" style={{width:"30px",height:"30px"}}></img>
                </button>
              </div>
              <div class="social-message">
                <div class="line"></div>
                  <p class="sign" onClick={handleClickLogn  }>Tiếp theo</p>
                <div class="line"></div>
              </div>
            </div>
          </div>
        </div>
        {/* from đăng ký 1 nhập mật khẩu người dùng */}
        <div class='register-from' id="Logndiv4" style={{ display: showLognDiv4 ? 'block' : 'none' }}>
          <div class='register-name'>
            <p class="title">ĐĂNG KÝ</p>
            <div class="form">
              <div class="input-group">
                <label for="password">Mật Khẩu</label>
                <input type="text" name="password" id="password" placeholder=""></input>
                <div class="social-message">
                  <div class="line"></div>
                  <p class="message">Yêu cầu người dùng nhập lại mật khẩu</p>
                  <div class="line"></div>
                </div>
                <Form.Group className="mb-3">
                  <Form.Label>Nhập Lại Mật Khẩu</Form.Label>
                  <Form.Control required placeholder="" type="password" name="password" onChange={handleChange} />
                </Form.Group>
              </div>
              <div class="social-message">
                <div class="line"></div>
                  <p class="sign" onClick={handleClickLogn }>Tiếp theo</p>
                <div class="line"></div>
              </div>
            </div>
          </div>
        </div>
        {/* from đăng ký điều khoản người dùng */}
        <div class='register-from' id="Logndiv5" style={{ display: showLognDiv5 ? 'block' : 'none' }}>
          <div class='register-name'>
            <p class="title" style={{margin:"0px"}}>ĐĂNG KÝ</p>
            <div class="form" style={{margin:"0px"}}>
              <div class="social-message"  style={{padding:"0px"}}>
                  <div class="line"></div>
                  <p class="message">Điều khoản và chính sách bảo mật</p>
                  <div class="line"></div>
              </div>
              <div class="register-information">
                <h4>TRANG WEB LAMBORGHINI - ĐIỀU KHOẢN SỬ DỤNG</h4>
                <p>
                  Bằng cách truy cập bất kỳ phần hoặc phần nào của trang web này, Người dùng đồng ý bị ràng buộc về mặt pháp lý bởi các 
                  điều khoản và điều kiện sau đây. 
                </p>
                <h4>QUYỀN SỞ HỮU TRÍ TUỆ</h4>
                <p>
                  Thông tin, dữ liệu, phần mềm, hình ảnh, đồ họa, video, hình nền, phông chữ, thiết kế đồ họa, âm nhạc, âm thanh, hình
                  ảnh, hình minh họa, hình vẽ, biểu tượng, văn bản và bất kỳ tài liệu nào khác có trên Trang web là tác phẩm thuộc về 
                  Lamborghini và/hoặc bên thứ ba. các bên và được bảo vệ bởi bản quyền. 
                  Việc sao chép, sao chép (thậm chí một phần), tải xuống, lưu, xuất bản hoặc phân phối bằng bất kỳ phương tiện nào và nói
                  chung là bất kỳ hành động nào liên quan đến chuyển giao hoặc sử dụng thông tin hoặc tài liệu có trên trang web, dưới 
                  mọi hình thức, sử dụng công nghệ hiện có hoặc tương lai, bị cấm nếu không có sự cho phép rõ ràng bằng văn bản của chủ
                  sở hữu hợp pháp.  
                </p>
                <h4>ĐƯỢC PHÉP SỬ DỤNG </h4>
                <p>
                  Người dùng được phép truy cập Trang web cho các mục đích sử dụng hợp pháp và cam kết không sử dụng Trang web cho các hoạt
                  động đầu cơ, lừa đảo hoặc gian lận.
                  Trừ khi có quy định khác và rõ ràng, tất cả các phần hoặc phần của Trang web này cũng như thông tin và tài liệu có sẵn 
                  trong đó chỉ dành riêng cho mục đích sử dụng được cung cấp, tức là đọc và tham khảo ý kiến.  
                </p>
                <h4>BẢO VỆ QUYỀN RIÊNG TƯ</h4>
                <p>
                  Lamborghini cam kết tôn trọng quyền riêng tư và bảo mật của Người dùng. Dữ liệu được Người dùng tự nguyện truyền đạt 
                  tới Lamborghini thông qua Trang web sẽ được xử lý cẩn thận tối đa và sử dụng tất cả các công cụ cần thiết để đảm bảo 
                  tính bảo mật, hoàn toàn tôn trọng luật pháp nghiêm ngặt về quyền riêng tư của Ý và như được nêu rõ trong tuyên bố thông 
                  tin. Vui lòng xem chính sách quyền riêng tư và tuyên bố thông tin được công bố trên các trang thu thập dữ liệu để biết 
                  thêm chi tiết. 
                </p>
              </div>
              <div class="social-message">
                <div class="line"></div>
                  <p class="sign" onClick={handleClickLogn}>Tiếp theo</p>
                <div class="line"></div>
              </div>
            </div>
          </div>
        </div>
        {/* from đăng ký 1 xát nhận đăng ký thành công người dùng */}
        <div class='register-from' id="Logndiv6" style={{ display: showLognDiv6 ? 'block' : 'none' }}>
          <div class='register-name'>
            <p class="title" style={{margin:"0px"}}>ĐĂNG KÝ</p>
            <div class="form" style={{margin:"0px"}}>
              <p style={{textAlign:"center",margin:"0px"}}>Chào mừng bạn đã đến với trang web của LAMBORGHINI</p>
              <p style={{textAlign:"justify"}}>Nếu bạn chấp nhận các yêu cầu về ĐIỀU KHOẢN SỬ DỤNG và CHÍNH SÁCH BẢO MẬT của chúng tôi vui lòng đánh dấu chấp nhận ở 
                bên dưới để hoàn thành việc đăng ký.</p>
              <div>
                <label>
                  <input type="checkbox" class='checkbox'></input>
                  <span class="custom-checkbox"></span>
                </label>
                <span style={{fontSize:"14px",marginLeft:"10px"}}>Tôi chấp nhận các điều khoản và điều kiện</span>
              </div>
              <div class="social-message">
                <div class="line"></div>
                  <button class="sign" type="submit" variant="success">Đăng ký</button>
                <div class="line"></div>
              </div>
            </div>
          </div>
        </div>
        </Form>
      </div>
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
export default Registe;



// import { useState } from "react";
// import { Button, Form, Container, Row, Col } from "react-bootstrap";
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";

// const RegisterUser = () => {
//     const navigate = useNavigate();
//     const [account, setAccount] = useState({});
//     const [isSidebarOpen, setSidebarOpen] = useState(false);

//     const handleChange = (e) => {
//         let name = e.target.name;
//         let value = e.target.value;
//         setAccount(prev => ({ ...prev, [name]: value }));
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         axios.post(`https://localhost:7175/api/Users/register`, account)
//             .then(() => navigate('/admin/accounts'))
//             .catch(err => {
//                 // handle error if needed
//                 console.error("Có lỗi xảy ra:", err);
//             });
//     }

//     const toggleSidebar = () => {
//         setSidebarOpen(!isSidebarOpen);
//     };

//     return (
//         <div className="account">
//             <div className={`accountContainer ${isSidebarOpen ? "open" : ""}`}>
//                 <Container>
//                     <br></br>
//                     <Row className="justify-content-center">
//                         <Col md={6} lg={4}>
//                             <Form className="form-container" onSubmit={handleSubmit}>
//                                 <h2>Thêm người dùng</h2>
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Tên đăng nhập:</Form.Label>
//                                     <Form.Control required placeholder="Username" type="text" name="username" onChange={handleChange} />
//                                 </Form.Group>
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Mật khẩu:</Form.Label>
//                                     <Form.Control required placeholder="Password" type="password" name="password" onChange={handleChange} />
//                                 </Form.Group>
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Email:</Form.Label>
//                                     <Form.Control required placeholder="Email" type="email" name="email" onChange={handleChange} />
//                                 </Form.Group>
//                                 <Button type="submit" variant="success">Đăng ký</Button>
//                             </Form>
//                         </Col>
//                     </Row>
//                 </Container>
//             </div>
//         </div>
//     );
// }

// export default RegisterUser;
