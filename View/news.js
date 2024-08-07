import React, { useState, useEffect, useRef } from 'react';
import Navbar from './module/navbar';
import Footer from './module/footer';
import "../Layout/newsLayout.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faThreads, faTiktok, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

function News() {
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
  const [NewDisplay, setNewDisplay] = useState(false); 
  const [Newcontent, setNewcontent] = useState('');
  const h1Ref = useRef(null);
  const [newID, setnewID] = useState();
  const handleClickshowNew = (event) => {
    setNewDisplay(!NewDisplay);
    setnewID(event.target.value);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (h1Ref.current) {
      const h1Content = h1Ref.current.textContent; // Lấy nội dung văn bản
      setNewcontent("LAMBORGHINI / TIN TỨC / " + h1Content); // Lưu vào state
    }
  };
  const [New, setNew] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7175/api/News`)
            .then(res => setNew(res.data));   
    }, []);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
    const handlePageClicktiep = () => {
      setCurrentPage(currentPage - 1);
    };
    const handlePageClicklui = () => {
      setCurrentPage(currentPage + 1);
    };
  return (
    <body class='Desktop'>
      <Navbar/>
      <div class='body-news-1'>
        <div class='body-news-1-1'>
            <h4 style={{ display: NewDisplay ? 'none': 'block'  }}>LAMBORGHINI / TIN TỨC </h4>
            <h4 style={{ display: NewDisplay ? 'block': 'none'  }}> {Newcontent}</h4>
        </div> 
        <div class='body-news-1-2' style={{ display: NewDisplay ? 'block': 'none'  }}>
          <h4 onClick={handleClickshowNew}><FontAwesomeIcon icon={faXmark} style={{height:"60px"}}/></h4>
        </div>
      </div>
      <div class='body-news' style={{ display: NewDisplay ? 'none' : 'block' }}>
        <div class='body-news-2'>
          <div class='body-news-2-top'>
            <h3>TIN TỨC</h3>
          </div>
          <div class='body-news-2-bottom'>
            <h1>L A M B O R G H I N I</h1>
          </div>
        </div>  
        <img src='/imges/museum/Gallardo-and-Murcielago-pruduction-era-1-2048x1365.jpeg' alt="hinh" style={{width:'90%',margin:'20px 5%'}}></img>
        <div class='body-news-4'>
          <h2>THEO DÕI CHÚNG TÔI TRÊN NHIỀU NỀN TẢNG</h2>
          <h4 style={{margin:"0px 20px"}}>ĐỂ NHẬN ĐƯỢC NHIỀU TIN TỨC HƠN VÀ NHANH HƠN</h4>
          <div class='body-news-4-1'>
            <div class='body-news-4-2'>
              <a href='https://www.facebook.com/Lamborghini/' target="_blank" style={{display:"flex",color:"#000",textDecoration: "none"}}>
              <div class='icon-hexagon-5' >
                <div class='icon-hexagon-6'>
                  <FontAwesomeIcon icon={faFacebookF} class='icon-hexagon-right'/>
                </div>   
              </div>
              <h3>Facebook</h3>
              </a>
            </div>
            <div class='body-news-4-2'>
              <a href='https://www.instagram.com/lamborghini/?hl=en' target="_blank" style={{display:"flex",color:"#000",textDecoration: "none"}}>
              <div class='icon-hexagon-5'>
                <div class='icon-hexagon-6'>
                  <FontAwesomeIcon icon={faInstagram} class='icon-hexagon-right' />
                </div>   
              </div>
              <h3>Instagram</h3>
              </a>
            </div>
            <div class='body-news-4-2'>
              <a href='https://www.youtube.com/channel/UC9DXZC8BCDOW6pYAQKgozqw' target="_blank" style={{display:"flex",color:"#000",textDecoration: "none"}}>
              <div class='icon-hexagon-5' >
                <div class='icon-hexagon-6'>
                  <FontAwesomeIcon icon={faYoutube} class='icon-hexagon-right'/>
                </div>   
              </div>
              <h3>Youtube</h3>
              </a>
            </div>
            <div class='body-news-4-2'>
              <a href='https://www.threads.net/@lamborghini' target="_blank" style={{display:"flex",color:"#000",textDecoration: "none"}}>
              <div class='icon-hexagon-5' >
                <div class='icon-hexagon-6'>
                  <FontAwesomeIcon icon={faThreads} class='icon-hexagon-right'/>
                </div>   
              </div>
              <h3>Threads</h3>
              </a>
            </div>
            <div class='body-news-4-2'>
              <a href='https://twitter.com/Lamborghini' target="_blank" style={{display:"flex",color:"#000",textDecoration: "none"}}>
              <div class='icon-hexagon-5' >
                <div class='icon-hexagon-6'>
                  <FontAwesomeIcon icon={faXTwitter} class='icon-hexagon-right'/>
                </div>   
              </div>
              <h3>X-Twitter</h3>
              </a>
            </div>
            <div class='body-news-4-2'>
              <a href='https://www.instagram.com/lamborghini/?hl=en' target="_blank" style={{display:"flex",color:"#000",textDecoration: "none"}}>
              <div class='icon-hexagon-5'  >
                <div class='icon-hexagon-6'>
                  <FontAwesomeIcon icon={faTiktok} class='icon-hexagon-right'/>
                </div>   
              </div>
              <h3>Tiktok</h3>
              </a>
            </div>
          </div>
        </div>
        <div class='body-news-3'>
          <h1 style={{width:"100%",textAlign:"center",margin:"0px",padding:"20px 0px",fontSize:"40px", letterSpacing: "10px"}}>DANH SÁCH TIN TỨC</h1>
          {New.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(item =>
            <div class='body-news-3-from'>
              <div class='body-news-3-left'>
                <img src={`/imges/${item.image}`} alt="hinh"></img>
              </div>
              <div class='body-news-3-right'>
                <div style={{height:"50px"}}>
                  <span>{new Date(item.dateSubmitted).getDate() } THÁNG {new Date(item.dateSubmitted).getMonth() + 1} NĂM {new Date(item.dateSubmitted).getFullYear()}</span>
                </div>
                <div style={{height:"200px",display:"grid",alignItems:"center"}}>
                  <h1 ref={h1Ref}>Tin Tức Về {item.title}</h1>
                </div>
                <div style={{height:"50px"}} >
                  <button value={(item.id)} onClick={ handleClickshowNew }>ĐỌC THÊM</button>
                </div>
              </div>
            </div>
          )}
          <h3 style={{textAlign:"center"}}>Trang {currentPage}</h3>
          <div class='list-button'>
            <ul>
              <li><FontAwesomeIcon icon={faAnglesLeft} onClick={handlePageClicktiep}/></li>
              <li onClick={() => handlePageClick(1)}>1</li>
              <li onClick={() => handlePageClick(2)}>2</li>
              <li onClick={() => handlePageClick(3)}>3</li>
              <li onClick={() => handlePageClick(4)}>4</li>
              <li><FontAwesomeIcon icon={faAnglesRight} onClick={handlePageClicklui}/></li>
            </ul>
          </div>
        </div>
      </div>
        <div class='body-new' style={{ display: NewDisplay ? 'block': 'none'  }}>
          {New.filter((ID)=> ID.id == newID ).map(item =>
          <>
          <div class='body-new-1'>
            <div class='body-new-1-top'>
              <h3>TIN TỨC</h3>
            </div>
            <div class='body-new-1-bottom'>
              <h1>{item.title}</h1>
            </div>
          </div> 
          <div class='body-new-2'>
            <img src={`/imges/${item.image}`} alt="hinh"></img>
            {/* nút xem thêm các tin tức mới */}
          </div>
          <div class='body-new-content'>
            <div class='body-new-content-1'>
              <div class='body-new-content-3'>
                <p>
                  Năm 2011 cũng chứng kiến sự ra mắt của Lamborghini Park, nơi mà ngày nay cho phép công ty tiến bước 2 trong số những dự án 
                  quan trọng nhất về tính bền vững và nghiên cứu về những tác động đến môi trường địa phương: giám sát sinh học loài ong và 
                  nghiên cứu thử nghiệm về đa dạng sinh học rừng sồi cũng như khả năng hấp thụ khí CO2 của khu rừng, thử nghiệm ngày được 
                  thực hiện trong sự hợp tác với hội đồng địa phương Sant’Agata Bolognese và các trường Đại học Bologna, Bolzano và Munich.
                </p>
              </div>
              <div class='body-new-content-3'>
                <p>
                  Năm 2011 cũng chứng kiến sự ra mắt của Lamborghini Park, nơi mà ngày nay cho phép công ty tiến bước 2 trong số những dự án 
                  quan trọng nhất về tính bền vững và nghiên cứu về những tác động đến môi trường địa phương: giám sát sinh học loài ong và 
                  nghiên cứu thử nghiệm về đa dạng sinh học rừng sồi cũng như khả năng hấp thụ khí CO2 của khu rừng, thử nghiệm ngày được 
                  thực hiện trong sự hợp tác với hội đồng địa phương Sant’Agata Bolognese và các trường Đại học Bologna, Bolzano và Munich.
                  Năm 2011 cũng chứng kiến sự ra mắt của Lamborghini Park, nơi mà ngày nay cho phép công ty tiến bước 2 trong số những dự án 
                  quan trọng nhất về tính bền vững và nghiên cứu về những tác động đến môi trường địa phương: giám sát sinh học loài ong và 
                  nghiên cứu thử nghiệm về đa dạng sinh học rừng sồi cũng như khả năng hấp thụ khí CO2 của khu rừng, thử nghiệm ngày được 
                  thực hiện trong sự hợp tác với hội đồng địa phương Sant’Agata Bolognese và các trường Đại học Bologna, Bolzano và Munich.
                </p>
              </div>
              <div class='body-new-content-3'>
                <p>
                  Năm 2011 cũng chứng kiến sự ra mắt của Lamborghini Park, nơi mà ngày nay cho phép công ty tiến bước 2 trong số những dự án 
                  quan trọng nhất về tính bền vững và nghiên cứu về những tác động đến môi trường địa phương: giám sát sinh học loài ong và 
                  nghiên cứu thử nghiệm về đa dạng sinh học rừng sồi cũng như khả năng hấp thụ khí CO2 của khu rừng, thử nghiệm ngày được 
                  thực hiện trong sự hợp tác với hội đồng địa phương Sant’Agata Bolognese và các trường Đại học Bologna, Bolzano và Munich.
                </p>
              </div>
              <div class='body-new-content-3'>
                <p>
                  Năm 2011 cũng chứng kiến sự ra mắt của Lamborghini Park, nơi mà ngày nay cho phép công ty tiến bước 2 trong số những dự án 
                  quan trọng nhất về tính bền vững và nghiên cứu về những tác động đến môi trường địa phương: giám sát sinh học loài ong và 
                  nghiên cứu thử nghiệm về đa dạng sinh học rừng sồi cũng như khả năng hấp thụ khí CO2 của khu rừng, thử nghiệm ngày được 
                  thực hiện trong sự hợp tác với hội đồng địa phương Sant’Agata Bolognese và các trường Đại học Bologna, Bolzano và Munich.
                  Năm 2011 cũng chứng kiến sự ra mắt của Lamborghini Park, nơi mà ngày nay cho phép công ty tiến bước 2 trong số những dự án 
                  quan trọng nhất về tính bền vững và nghiên cứu về những tác động đến môi trường địa phương: giám sát sinh học loài ong và 
                  nghiên cứu thử nghiệm về đa dạng sinh học rừng sồi cũng như khả năng hấp thụ khí CO2 của khu rừng, thử nghiệm ngày được 
                  thực hiện trong sự hợp tác với hội đồng địa phương Sant’Agata Bolognese và các trường Đại học Bologna, Bolzano và Munich.
                  Năm 2011 cũng chứng kiến sự ra mắt của Lamborghini Park, nơi mà ngày nay cho phép công ty tiến bước 2 trong số những dự án 
                  quan trọng nhất về tính bền vững và nghiên cứu về những tác động đến môi trường địa phương: giám sát sinh học loài ong và 
                  nghiên cứu thử nghiệm về đa dạng sinh học rừng sồi cũng như khả năng hấp thụ khí CO2 của khu rừng, thử nghiệm ngày được 
                  thực hiện trong sự hợp tác với hội đồng địa phương Sant’Agata Bolognese và các trường Đại học Bologna, Bolzano và Munich.
                </p>
              </div>
            </div>
            <div class='body-new-content-2'>
              <div class='body-new-content-4'>
                <p>
                  Năm 2011 cũng chứng kiến sự ra mắt của Lamborghini Park, nơi mà ngày nay cho phép công ty tiến bước 2 trong số những dự án 
                  quan trọng nhất về tính bền vững và nghiên cứu về những tác động đến môi trường địa phương: giám sát sinh học loài ong và 
                  nghiên cứu thử nghiệm về đa dạng sinh học rừng sồi cũng như khả năng hấp thụ khí CO2 của khu rừng, thử nghiệm ngày được 
                  thực hiện trong sự hợp tác với hội đồng địa phương Sant’Agata Bolognese và các trường Đại học Bologna, Bolzano và Munich.
                </p>
              </div>
              <div class='body-new-content-4'>
                <p>
                  Năm 2011 cũng chứng kiến sự ra mắt của Lamborghini Park, nơi mà ngày nay cho phép công ty tiến bước 2 trong số những dự án 
                  quan trọng nhất về tính bền vững và nghiên cứu về những tác động đến môi trường địa phương: giám sát sinh học loài ong và 
                  nghiên cứu thử nghiệm về đa dạng sinh học rừng sồi cũng như khả năng hấp thụ khí CO2 của khu rừng, thử nghiệm ngày được 
                  thực hiện trong sự hợp tác với hội đồng địa phương Sant’Agata Bolognese và các trường Đại học Bologna, Bolzano và Munich.
                </p>
              </div>
              <div class='body-new-content-4'>
              <img src={`/imges/${item.image}`} alt="hinh"></img>
              </div>
              <div class='body-new-content-4'>
                <p>
                  Năm 2011 cũng chứng kiến sự ra mắt của Lamborghini Park, nơi mà ngày nay cho phép công ty tiến bước 2 trong số những dự án 
                  quan trọng nhất về tính bền vững và nghiên cứu về những tác động đến môi trường địa phương: giám sát sinh học loài ong và 
                  nghiên cứu thử nghiệm về đa dạng sinh học rừng sồi cũng như khả năng hấp thụ khí CO2 của khu rừng, thử nghiệm ngày được 
                  thực hiện trong sự hợp tác với hội đồng địa phương Sant’Agata Bolognese và các trường Đại học Bologna, Bolzano và Munich.
                </p>
              </div>
              <div class='body-new-content-4'>
                <div style={{width:"100%",margin:"50px 0px"}} >
                  <div class='icon-hexagon-1' style={{margin:"auto"}}>
                    <div class='icon-hexagon-2'>
                        <FontAwesomeIcon icon={faPlus}  class='icon-hexagon-right'/>
                    </div> 
                    <span>Xem thêm tin tức</span>
                  </div>
                </div> 
              </div>
            </div>
          </div> 
          </>
          )}
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
      <Footer/>
    </body>
  );
};
export default News;
