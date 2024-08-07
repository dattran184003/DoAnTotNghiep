import React, { useState, useEffect, useRef } from 'react';
import Navbar from './module/navbar';
import "../Layout/loginLayout.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Form } from 'react-bootstrap';

function Login() {
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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post('https://localhost:7175/api/Users/login', {
          Username: username,
          Password: password
        });
  
        const { token, roles } = response.data;
  
        // Lưu trữ JWT vào localStorage
        localStorage.setItem('jwtToken', token);
  
        if (roles.includes('Admin')) {
          alert('Đăng nhập thành công với quyền Admin');
          navigate('/admin');
        } else {
          navigate('/');
        }
      } catch (error) {
        if (error.response) {
          setErrorMessage('Tài khoản hoặc mật khẩu không chính xác');
        } else {
          setErrorMessage('Lỗi kết nối đến máy chủ');
        }
      }
    };

  return (
    <body class='Desktop'>
      <div class='login-video'>
        <video src="/videos/5.mp4" ref={videoRef} controls={false} autoPlay ></video>
        <div class='login-from'>   
          <div class="form-container">
            <Form class="form" onSubmit={handleSubmit}>
              <p class="title">ĐĂNG NHẬP</p>
              <Form.Group controlId="formUsername" class="input-group">
                <Form.Label>Tên đăng nhập</Form.Label>
                  <Form.Control type="text"  placeholder="" value={username} required onChange={(e) => setUsername(e.target.value)}/>
              </Form.Group>
              <div class="social-message">
                <div class="line"></div>
                  {errorMessage && <Alert variant="danger" class="message">{errorMessage}</Alert>}
                <div class="line"></div>
              </div>
              <Form.Group controlId="formPassword" class="input-group">
                <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control type="password" placeholder="" value={password} required onChange={(e) => setPassword(e.target.value)}/>
              </Form.Group>
              <div class="forgot">
                <Link to="/">Quên mật khẩu ?</Link>
              </div>
              <Button class="sign" variant="primary" type="submit" style={{width:"100%",padding:"0.75rem", border: "none", borderRadius: "0.375rem",fontWeight: "600"}}>Đăng nhập</Button>
            </Form>
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
              <p class="signup">Bạn chưa có tài khoản? 
              <a href='/User/View/registe' style={{marginLeft:"10px",display:"inline",fontSize:"15px",color:"#fff"}}>Đăng Ký</a>
              </p>
          </div>
        </div>
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
export default Login;