/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './module/navbar';
import "../Layout/storeLayout.css";
import { faCaretDown, faCaretRight, faChevronRight, faLocationCrosshairs, faLocationDot, faMagnifyingGlassLocation, faPhone, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from './module/footer';

function Store() {
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
  const [showDiv1, setShowDiv1] = useState(false);
  const [showDiv2, setShowDiv2] = useState(false);
  const handleClickStore1 = () => {
      setShowDiv1(!showDiv1);
  };
  const handleClickStore2 = () => {
    setShowDiv2(!showDiv2);
  };
  const [iframeUrl, setIframeUrl] = useState('');

  const handleClick = (event) => {
    const buttonId = event.target.id;
    const newIframeUrl = `${buttonId}`;
    setIframeUrl(newIframeUrl);
  };
  const [showMap, setShowMap] = useState(true); // State để lưu trữ trạng thái hiển thị div 1
  const [showInformation, setShowInformation] = useState(false); // State để lưu trữ trạng thái hiển thị div 2

  const handleClickMap = () => {
    setShowMap(!showMap); // Thay đổi trạng thái hiển thị div 1
    setShowInformation(!showInformation); // Thay đổi trạng thái hiển thị div 2
  };
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
      <Navbar/>
      <div class="Desktop-store" >
                <div class="Desktop-store-carousel">
                    <div class="Desktop-store-carousel-top">
                        <h4>LAMBORGHINI / CHI NHÁNH HỒ CHÍ MINH</h4>
                        <div class="Desktop-store-carousel-top-1">
                            <h1>HỒ CHÍ MINH</h1>
                            <h1>STORE</h1>
                            <div class='Desktop-store-carousel-top-2'>
                                <div></div>
                                <div class="s5852s"></div>
                                <div></div>
                            </div>
                        </div>
                        
                    </div>
                    <img src='/imges/museum/9.png' alt="hinh"></img>
                </div>
                <div class='part-1'>
                    <div class='part-1-left'>
                        <h1>STORE LAMBORGHINI HỒ CHÍNH MINH</h1>
                        <p>
                            <font>
                                <font>
                                    Tọa lạc trong khuôn viên khách sạn Hilton Saigon, số 11 Công Trường Mê Linh, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh.
                                </font>
                            </font>
                            <br></br>
                            <br></br>
                            <font>
                                <font>
                                Có mặt ở khắp mọi nơi trên thế giới, Đại lý Lamborghini được ủy quyền sẵn sàng cung cấp cho bạn dịch vụ
                                ộc quyền và được cá nhân hóa để hướng dẫn bạn qua từng bước trải nghiệm Lamborghini. Dù yêu cầu của bạn 
                                là gì, một đội ngũ đủ trình độ sẽ hỗ trợ bạn từ khi bạn mua hàng cho đến sau bán hàng. Dù là mới hay đã
                                 qua sử dụng, điều đó không thành vấn đề: lái một chiếc Lamborghini là một cảm giác hồi hộp độc đáo đáng
                                  được trải nghiệm và trân trọng.
                                </font>
                            </font>
                        </p>
                    </div>
                    <div class='part-1-right'>
                        <img src='/imges/museum/1.png' alt="hinh"></img>
                    </div>
                </div>
                <div class='part-2'>
                        <img src='/imges/museum/stort2.jpg' alt="hinh" class='part-2-left'></img>
                        <img src='/imges/museum/stort2.jpg' alt="hinh" class='part-2-right'></img>
                </div>
                <div class='part-3'> 
                    <div class='part-3-left'>
                    <img src='/imges/museum/14.png' alt="hinh" ></img>
                    </div>
                    <div class='part-3-right'>
                        <h1>GIỜ MỞ CỬA TRƯNG BÀY</h1>
                        <div style={{display:"flex",width:"100%"}}>
                            <div style={{width:"20%"}}>
                                <p>Thứ hai</p>
                                <p>Thứ ba</p>
                                <p>Thứ tư</p>
                                <p>Thứ năm</p>
                                <p>Thứ sáu</p>
                                <p>Thứ bảy</p>
                                <p>Chủ nhật</p>
                            </div>
                            <div style={{width:"80%"}}>
                                <p>10:00 sáng - 7:00 tối</p>
                                <p>10:00 sáng - 7:00 tối</p>
                                <p>10:00 sáng - 7:00 tối</p>
                                <p>10:00 sáng - 7:00 tối</p>
                                <p>10:00 sáng - 7:00 tối</p>
                                <p>10:00 sáng - 7:00 tối</p>
                                <p>10:00 sáng - 7:00 tối</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='part-4'>
                    <div class='part-1-left'>
                        <h1>GIỜ MỞ CỬA DỊCH VỤ</h1>
                        <div style={{display:"flex",width:"100%"}}>
                            <div style={{width:"40%"}}>
                                <p>Thứ hai - Thứ sáu</p>
                                <p>Chủ nhật</p>
                            </div>
                            <div style={{width:"60%"}}>
                                <p>8:00 sáng - 12:00 trưa / 1:00 chiều - 5:00 chiều</p>
                                <p>Đã đóng</p>
                            </div>
                        </div>
                        <div style={{display:"flex",textAlign:"center",justifyContent:"center"}}>
                           <div class='icon-hexagon-1'>
                                <div class='icon-hexagon-2'>
                                    <FontAwesomeIcon icon={faChevronRight} class='icon-hexagon-right'/>
                                </div> 
                                <span>Đặt lịch hẹn</span>
                            </div> 
                        </div>        
                    </div>
                    <div class='part-4-right'>
                        <img src='/imges/museum/6.png' alt="hinh"></img>
                    </div>
                </div>
                <div class='part-5'>
                        <img src='/imges/museum/2.png' alt="hinh" class='part-5-left'></img>
                        <img src='/imges/museum/stoer.jpg' alt="hinh" class='part-5-right'></img>
                </div>
                <div class='part-6'> 
                    <div class='part-6-left'>
                    <img src='/imges/museum/15.png' alt="hinh" ></img>
                    </div>
                    <div class='part-6-right'>
                        <h1>SỰ KIỆN RIÊNG: TRẢI NGHIỆM ĐỘC QUYỀN</h1>
                        <p>
                            <font>
                                <font>
                                Không gian của chúng tôi được tạo ra để truyền cảm hứng, chia sẻ những ý tưởng mới và kết nối mạng. Museo 
                                Automobile Lamborghini là nơi lý tưởng để tổ chức các sự kiện buổi tối trong khung cảnh trang nhã. Khu 
                                vực của nó đã được cải tạo theo cách tiếp cận mới, tương tự như một phòng trưng bày nghệ thuật. Olimpo 
                                mới, nhìn ra Manifattura Lamborghini 4.0 – dây chuyền sản xuất Urus công nghệ – là địa điểm hoàn hảo để 
                                biến hội nghị, cuộc họp thành những trải nghiệm độc đáo.
                                </font>
                            </font>
                        </p>
                        <div class='icon-hexagon-1'>
                            <div class='icon-hexagon-2'>
                                <FontAwesomeIcon icon={faChevronRight} class='icon-hexagon-right'/>
                            </div> 
                            <span>Thông tin và đặt chỗ</span>
                        </div>
                    </div>
                </div>
                <div class='part-7'>
                    <video src="/videos/Museum.mp4" ref={videoRef} controls={false} autoPlay> </video>
                </div>
                <div class='part-8'>
                    <img src='/imges/museum/store3.jpg' alt="hinh" ></img>
                </div>
                
                <div style={{display:"flex"}}>
                <div class='Desktop-store-left'>
                        <h1>CHI NHÁNH</h1>
                        <div>
                            <div class='Desktop-store-search'>
                                <input type="text" name="tìm kiếm_cửa hàng" placeholder="Tìm kiếm"></input>
                                <FontAwesomeIcon icon={faMagnifyingGlassLocation} class='store-icon'/>
                                <hr></hr>
                                <FontAwesomeIcon icon={faLocationCrosshairs} class='store-icon'/>
                            </div>
                            <div class='Desktop-store-menu'>
                                <div class='store-menu-son'>
                                    <div class='store-menu-son-1' onClick={handleClickStore1}>
                                        <p>Việt Nam</p>
                                        <FontAwesomeIcon icon={faCaretDown} class='store-icon'/>
                                    </div>
                                    <div class='store-menu-son-2' style={{ display: showDiv1 ? 'block' : 'none' }}>
                                        <button onClick={handleClick} id="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125423.07935294115!2d106.5822744369507!3d10.775174792577147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4158469f47%3A0x8b984270f7644f22!2sLamborghini%20Ho%20Chi%20Minh!5e0!3m2!1svi!2s!4v1714829106672!5m2!1svi!2s">
                                            <p id="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125423.07935294115!2d106.5822744369507!3d10.775174792577147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4158469f47%3A0x8b984270f7644f22!2sLamborghini%20Ho%20Chi%20Minh!5e0!3m2!1svi!2s!4v1714829106672!5m2!1svi!2s">Lamborghini Hồ Chí Minh</p>
                                            <FontAwesomeIcon icon={faCaretRight} class='store-icon' onClick={handleClickMap}/>
                                        </button>
                                        <button onClick={handleClick} id="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238343.1264179628!2d105.55660603820942!3d21.02823015071996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b2e104eb09%3A0x8570111041279364!2sLamborghini%20Vi%E1%BB%87t%20Nam!5e0!3m2!1svi!2s!4v1714830270826!5m2!1svi!2s">
                                            <p id="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238343.1264179628!2d105.55660603820942!3d21.02823015071996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b2e104eb09%3A0x8570111041279364!2sLamborghini%20Vi%E1%BB%87t%20Nam!5e0!3m2!1svi!2s!4v1714830270826!5m2!1svi!2s">Lamborghini Hà Nội</p>
                                            <FontAwesomeIcon icon={faCaretRight} class='store-icon'/>
                                        </button>
                                        <button onClick={handleClick} id="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.934832686134!2d108.21830807263126!3d16.068871139452465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2647423ac5ea6315%3A0xda9f0000ac264d4d!2sLamboghini%20Club!5e0!3m2!1svi!2s!4v1714830103322!5m2!1svi!2s">
                                            <p id="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.934832686134!2d108.21830807263126!3d16.068871139452465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2647423ac5ea6315%3A0xda9f0000ac264d4d!2sLamboghini%20Club!5e0!3m2!1svi!2s!4v1714830103322!5m2!1svi!2s">Lamborghini Đà Nẵng</p>
                                            <FontAwesomeIcon icon={faCaretRight} class='store-icon' />
                                        </button>
                                    </div>
                                </div>
                                <div class='store-menu-son'>
                                    <div class='store-menu-son-1' onClick={handleClickStore2}>
                                        <p>Trung Quốc</p>
                                        <FontAwesomeIcon icon={faCaretDown} class='store-icon'/>
                                    </div>
                                    <div class='store-menu-son-2' style={{ display: showDiv2 ? 'block' : 'none' }}>
                                        <button>
                                            <p>Lamborghini Bắc Kinh</p>
                                            <FontAwesomeIcon icon={faCaretRight} class='store-icon'/>
                                        </button>
                                        <button>
                                            <p>Lamborghini Nam Bắc Kinh</p>
                                            <FontAwesomeIcon icon={faCaretRight} class='store-icon'/>
                                        </button>
                                        <button>
                                            <p>Lamborghini Trường Sa</p>
                                            <FontAwesomeIcon icon={faCaretRight} class='store-icon'/>
                                        </button>
                                        <button>
                                            <p>Lamborghini Thành Đô</p>
                                            <FontAwesomeIcon icon={faCaretRight} class='store-icon'/>
                                        </button>
                                        <button>
                                            <p>Lamborghini Trùng Khánh</p>
                                            <FontAwesomeIcon icon={faCaretRight} class='store-icon'/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='Desktop-store-right'>
                    {showMap &&  <iframe src={iframeUrl} ></iframe>}
                    {showInformation &&  <div class='information-store'>
                                            <h1 style={{margin:"0px", padding:"20px",textAlign:"center"}}>LAMBORGHINI HỒ CHÍ MINH</h1>
                                            <div style={{display:"flex",width:"70%",margin:"auto"}}>
                                                <div style={{width:"50px"}}>
                                                <p style={{height:"70px"}}><FontAwesomeIcon icon={faLocationDot} /></p>
                                                <p><FontAwesomeIcon icon={faPhone} /></p>
                                                </div>
                                                <div>
                                                <p style={{height:"70px"}}>Khách sạn Hilton Sài Gòn, 11 Công Trường Mê Linh, Quận 1, Thành phố Hồ Chí Minh, Việt Nam</p>
                                                <p>0859 180 088</p>
                                                </div>
                                            </div>
                                            <div style={{textAlign:"center"}}>
                                                <button>CHI TIẾT</button>
                                            </div> 
                                        </div>
                    }
                    </div>
                </div>
                <Footer/>
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
export default Store;
