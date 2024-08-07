import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../Layout/moduleLayout/carouselLayout.css';
import '../../Layout/moduleLayout/layout.css';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


const Carousel = () => {
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
  return (
    <body class='Desktop'>
      <div class='carousel'>
        <div class='video-top'>
          <div class='video-top-left'>
            <h4>LAMBORGHINI / TRANG CHỦ</h4>
          </div>
          <div class='video-top-right'>
            <marquee>
              * Giá trị tiêu thụ và phát thải trên trang web đề cập đến IP địa lý của bạn. Giá trị này có thể không thực tế nếu 
              bạn điều hướng bằng VPN hoặc nếu vị trí của nhà cung cấp dịch vụ Internet của bạn không chính xác. Nếu bạn cho rằng mình đã
              định vị địa lý không chính xác, hãy liên hệ với đại lý của bạn để nhận thông tin hợp lệ về mức tiêu thụ và khí thải trong 
              khu vực của bạn.
            </marquee>
          </div>
        </div>
        <video src="/videos/3.mp4" ref={videoRef} controls={false} autoPlay> </video>
        <div class='video-bottom'>
        </div>
      </div>
    </body>
  );
};
const Mobile = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play();
    }
  }, []);
  return (
    <body class='Mobile'>
      <div class='video-top'>
        <h4>LAMBORGHINI / TRANG CHỦ</h4>
      </div>
      <video src="/videos/9convert.com - Making the racetrack happy This is Revuelto lamborghini_1080p.mp4" ref={videoRef} controls={false} autoPlay ></video>
      <div class='video-bottom'>
          <div class='video-bottom-top'>
            <div class='video-bottom-top-left'>
              <h3>LAMBORGHINI Revuelto</h3>
            </div>
            <div class='video-bottom-top-right'>
              <h1>01</h1>
            </div>
          </div>
          <div class='video-bottom-bottom'>
            <div></div>
            <div class="s5852s"></div>
            <div></div>
          </div>
      </div>
    </body>
  );
};
export default Carousel;
