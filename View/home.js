import React, { useEffect, useRef, useState } from 'react';
import "../Layout/homeLayout.css";
import Navbar from './module/navbar';
import Carousel from './module/carousel';
import Footer from './module/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlus, faRectangleList, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Cell, Label, Legend, Pie, PieChart, Text } from 'recharts';

function Home() {
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
  const [activeIndex, setActiveIndex] = useState(0); // State to track the active index
  const [activeImage, setActiveImage] = useState(0);
  const [activeImage1, setActiveImage1] = useState(1);
  const [Display, setDisplay] = useState(false); 
  const [Tableofcontents, setTableofcontents] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const contentRef = useRef(null);

  const handleItemClick = (id) => {
    setActiveItem(id);
  };
  useEffect(() => {
    if (activeItem) {
      const element = contentRef.current.querySelector(`#${activeItem}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center'});
       
      }
    }
  }, [activeItem]);
  const handleClickshow = () => {
    setDisplay(!Display);
  };
  const handleClickTableofcontents = () => {
    setTableofcontents(!Tableofcontents);
  };
  const images = [
    { src: '/imges/car/Lamborghini Countach Revision/4.jpg', alt: 'Lamborghini Countach Revision' },
    { src: '/imges/car/Lamborghini Revuelto/10.jpg', alt: 'Lamborghini Revuelto' },
    { src: '/imges/car/Lamborghini Modeling/4.jpeg', alt: 'Lamborghini Modeling' },
    
  ];
  const data = [
    { name: "Rất tệ", value: 4 ,color:"#005fa3"},
    { name: "Tệ", value: 6 ,color:"#028ae0"},
    { name: "Bình thường", value: 20 ,color:"#00a5f5" },
    { name: "Tốt", value: 40 ,color:"#24bfdd"},
    { name: "Rất tốt", value: 30 ,color:"#53cef8"},
  ];
  const handleClickLeft = () => {
    setActiveIndex((prevIndex) => (prevIndex + 2) % 3); // Increment and loop index
    setActiveImage((prevActiveImage) => (prevActiveImage - 1 + images.length) % images.length);
    setActiveImage1((prevActiveImage) => (prevActiveImage - 1 + images.length) % images.length);
  };
  const handleClickRight = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % 3); // Increment and loop index
    setActiveImage((prevActiveImage) => (prevActiveImage + 1) % images.length);
    setActiveImage1((prevActiveImage) => (prevActiveImage + 1) % images.length);
  };

  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play();
    }
  }, []);
  const styles = {
    span: {
      height: '2px',
    },
    activeSpan: {
      height: '4px', 
    },
  };
    return (
      <body class='Desktop'>
        <Navbar/>
        <Carousel/>
        <div class='body-home' ref={contentRef}>
            <div class='body-home-2' id="heading1">
                <div class='body-home-2-top'>
                  <h3>THÔNG TIN</h3>
                </div>
                <div class='body-home-2-bottom'>
                  <h1>L A M B O R G H I N I</h1>
                </div>
            </div>
            <div class='body-home-1'>
              <div class='body-home-1-top'>
                <h1 style={{marginBottom:"0px"}}>Automobili Lamborghini – Hành trình 60 năm phát triển của nhà máy và những tên tuổi siêu xe</h1>
                <span>15/07/2024</span>
                <h3 style={{marginTop:"0px"}}>
                  Từ mẫu xe huyền thoại làm nên định nghĩa siêu xe đầu tiên – 350GT cho đến siêu SUV Urus, tượng đài trong thế giới siêu 
                  xe 60 năm chặng đường lịch sử ngay mảnh đất nơi Lamborghini bắt đầu tại Sant’Agata Bolognese.
                </h3>
                <hr></hr>
                <img src='/imges/museum/636745-scaled.jpg' alt="hinh"></img>
                <p>
                  Automobili Lamborghini của ngày hôm nay là một doanh nghiệp danh tiếng toàn cầu, với hơn 2.000 nhân viên với 9.223 chiếc 
                  xe được bàn giao vào năm 2022. Tuy nhiên, để có được vị thế của hiện tại, nhà sáng lập Ferruccio Lamborghini đã bắt đầu 
                  từ con số 0 khi đặt những “viên gạch” đầu tiên cho thương hiệu vào năm 1963. Xuyên suốt 60 năm qua, dù trụ sở Lamborghini
                  – nơi làm nên những mẫu xe mang tính biểu tượng – đã trải qua nhiều lần nâng cấp, mở rộng và tái thiết dựa trên những nhu
                  cầu về sản xuất, môi trường và công nghệ nhưng vẫn chưa bao giờ mất đi cấu trúc cốt lõi ban đầu.
                </p>
                <img src='/imges/museum/Front-of-the-factory-during-years-9-2048x1365.jpeg' alt="hinh"></img>
                <img src='/imges/museum/Ferruccio-Lamborghini-4-1536x1040.jpeg' alt="hinh"></img>
                <span><b><i>Feruccio Lamborghini</i></b></span>
                <p>
                  Trong khi tìm kiếm một địa điểm để xây dựng công ty mới, Feruccio Lamborghini khi ấy đã lựa chọn Sant’Agata Bolognese –
                  một nơi chỉ cách quê nhà Cento của ông vài cây số. Công việc xây dựng những phần đầu tiên của thương hiệu, được xem là 
                  hiện đại nhất thời bấy giờ, diễn ra rất nhanh chóng và hoàn thành chỉ trong vòng 8 tháng trong khoảng giữa mùa Thu và 
                  Đông của năm 1963. Vào ngày 20/10 năm đó, khi Ferruccio mời giới báo chí đến sự kiện ra mắt chiếc xe đầu tiên của 
                  Lamborghini – mẫu 350 GTV, khu vực nhà máy chính đã hoàn thành.
                </p>
              </div>
              <div class='body-home-1-top'  style={{ display: Display ? 'block' : 'none' }}>
                <img src='/imges/museum/Ferruccio-Lamborghini--scaled.jpeg' alt="hinh"></img>
                <span><b><i>Feruccio Lamborghini</i></b></span>
                <img src='/imges/museum/company-construction-1-2048x1449.jpeg' alt="hinh"></img>
                <span><b><i>Giai đoạn khởi công xây dựng ban đầu vào năm 1963</i></b></span>
              </div>
              <div style={{width:"100%",margin:"50px 0px"}}  >
                <div class='icon-hexagon-1' style={{margin:"auto"}} onClick={handleClickshow}>
                    <div class='icon-hexagon-2'>
                        <FontAwesomeIcon icon={faPlus}  class='icon-hexagon-right'style={{ transform: Display ? 'rotate(45deg)' : 'rotate(90deg)' }}/>
                    </div> 
                    <span>Xem thêm thông tin</span>
                </div>
              </div>
            </div>
            <div class='body-home-2' id="heading2">
                <div class='body-home-2-top'>
                  <h3>TIN TỨC</h3>
                </div>
                <div class='body-home-2-bottom'>
                  <h1>L A M B O R G H I N I</h1>
                </div>
            </div>  
            <div class='body-home-3'>
              <div class='body-home-3-from'>
                <div class='body-home-3-left'>
                  <img src='/imges/logo/Musée_Lamborghini_0003.jpg' alt="hinh"></img>
                </div>
                <div class='body-home-3-right'>
                  <div style={{height:"50px"}}>
                    <span>31 THÁNG 5 NĂM 2024</span>
                  </div>
                  <div style={{height:"200px",display:"grid",alignItems:"center"}}>
                    <h1>CÔNG TY CHÍNH LAMBORGHINI</h1>
                  </div>
                  <div style={{height:"50px"}}>
                    <button>ĐỌC THÊM</button>
                  </div>
                </div>
              </div>
              {/* thông tin về tin tức */}
              <div class='body-home-3-from'>
                <div class='body-home-3-left'>
                  <img src='/imges/car/Lamborghini Countach Revision/4.jpg' alt="hinh"></img>
                </div>
                <div class='body-home-3-right'>
                  <div style={{height:"50px"}}>
                    <span>31 THÁNG 5 NĂM 2024</span>
                  </div>
                  <div style={{height:"200px",display:"grid",alignItems:"center"}}>
                    <h1>AUTOMOBILE LAMBORGHINI KỶ NIỆM THÁNG ĐA DẠNG CHÂU ÂU, CHÂU Á, CHÂU ÚC VÀ CHÂU MỸ</h1>
                  </div>
                  <div style={{height:"50px"}}>
                    <button>ĐỌC THÊM</button>
                  </div>
                </div>
              </div>
              {/* thông tin về tin tức */}
              <div class='body-home-3-from'>
                <div class='body-home-3-left'>
                  <img src='/imges/car/Lamborghini Revuelto/10.jpg' alt="hinh"></img>
                </div>
                <div class='body-home-3-right'>
                  <div style={{height:"50px"}}>
                    <span>31 THÁNG 5 NĂM 2024</span>
                  </div>
                  <div style={{height:"200px",display:"grid",alignItems:"center"}}>
                    <h1>TUYỆT PHẨM LAMBORGHINI TẠI VILLA D'ESTE</h1>
                  </div>
                  <div style={{height:"50px"}}>
                    <button>ĐỌC THÊM</button>
                  </div>
                </div>
              </div>
              {/* nút xem thêm các tin tức mới */}
              <div style={{width:"100%",margin:"50px 0px"}} >
                <div class='icon-hexagon-1' style={{margin:"auto"}}>
                    <div class='icon-hexagon-2'>
                        <FontAwesomeIcon icon={faPlus}  class='icon-hexagon-right'/>
                    </div> 
                    <span>Xem thêm tin tức</span>
                </div>
              </div>
            </div> 
            <div class='body-home-2' id="heading3">
                <div class='body-home-2-top'>
                  <h3>SẢN PHẨM</h3>
                </div>
                <div class='body-home-2-bottom'>
                  <h1>L A M B O R G H I N I</h1>
                </div>
            </div> 
            <div class='body-home-4'>
                <img src={images[activeImage].src} alt={images[activeImage].alt} class='body-home-4-form1'></img>
                <img src={images[activeImage1].src} alt={images[activeImage1].alt} class='body-home-4-form2'></img>
                <div class='body-home-4-form3'>
                  <h1>{images[activeImage1].alt}</h1>
                  <div style={{display:"flex",margin:"20px"}}>
                    <div class='icon-hexagon-3' style={{margin:"auto"}}  onClick={handleClickLeft}>
                      <div class='icon-hexagon-4'>
                        <FontAwesomeIcon icon={faChevronLeft} class='icon-hexagon-right'/>
                      </div>   
                    </div>
                    <div class='icon-hexagon-3' style={{margin:"auto"}} onClick={handleClickRight}>
                      <div class='icon-hexagon-4'>
                        <FontAwesomeIcon icon={faChevronRight}class='icon-hexagon-right' />
                      </div> 
                    </div>
                  </div>
                  <div style={{ display: 'flex' }}>
                    {['Span 2', 'Span 4', 'Span 6'].map((spanText, index) => (
                      <span key={index} style={{ ...styles.span, ...(index === activeIndex ? styles.activeSpan : {}) }}></span>
                    ))}
                  </div>
                </div>
            </div> 
            <div style={{width:"100%",margin:"50px 0px"}} >
              <div class='icon-hexagon-1' style={{margin:"auto"}}>
                  <div class='icon-hexagon-2'>
                      <FontAwesomeIcon icon={faPlus}  class='icon-hexagon-right'/>
                  </div> 
                  <span>Xem thêm sản phẩm</span>
              </div>
            </div>
            <div class='body-home-2' id="heading4">
                <div class='body-home-2-top'>
                  <h3>BẢN GIÁ SẢN PHẨM</h3>
                </div>
                <div class='body-home-2-bottom'>
                  <h1>L A M B O R G H I N I</h1>
                </div>
            </div> 
            <div class='body-home-5'>
              <table>
                <tr>
                    <th>STT</th>
                    <th colspan="2">Dòng xe / Phiên bản  </th>
                    <th>Giá niêm yết</th>
                    <th>Giá tạm tính tại Việt Nam</th>
                    <th>Giá lăn bánh tạm tính</th>
                </tr>
                {/* body table */}
                <tr>
                    <td class='stt'>1</td>
                    <td rowspan="4" class='Vehicle'>Lamborghini Aventador</td>
                    <td>Lamborghini Aventador SVJ (LP770-4)</td>
                    <td>517.700 USD (12 tỷ)</td>
                    <td>60 tỷ</td>
                    <td>70 tỷ</td>
                </tr>
                <tr>
                    <td class='stt'>2</td>
                    <td>Lamborghini Aventador S (LP740-4)</td>
                    <td>421.350 USD (9,590 tỷ)</td>
                    <td>40 tỳ</td>
                    <td>44 tỷ</td>
                </tr>
                <tr>
                    <td class='stt'>3</td>
                    <td>Lamborghini Aventador LP750-SV</td>
                    <td>530.075USD (12 tỷ)</td>
                    <td>39 tỷ</td>
                    <td>55 tỷ</td>
                </tr>
                <tr>
                    <td class='stt'>4</td>
                    <td>Lamborghini Aventador LP700-4</td>
                    <td>381.700 USD (7,9 tỷ)</td>
                    <td>37,796 tỷ</td>
                    <td>41,6 tỷ</td>
                </tr>
                <tr>
                    <td class='stt'>5</td>
                    <td rowspan="5" class='Vehicle'>Lamborghini Huracan</td>
                    <td>Lamborghini Huracan LP610-4</td>
                    <td>241.000USD (5,754 tỷ)</td>
                    <td>21,8 tỷ</td>
                    <td>25 tỷ</td>
                </tr>
                <tr>
                    <td class='stt'>6</td>
                    <td>Lamborghini Huracan LP580-2</td>
                    <td>201.100USD (4,660 tỷ)</td>
                    <td>19,899 tỷ</td>
                    <td>21,9 tỳ</td>
                </tr>
                <tr>
                    <td class='stt'>7</td>
                    <td>Lamborghini Huracan Performante</td>
                    <td>277.855USD (6,6 tỷ)</td>
                    <td>22 tỷ</td>
                    <td>26 tỷ</td>
                </tr>
                <tr>
                    <td class='stt'>8</td>
                    <td>Lamborghini Huracan EVO</td>
                    <td>260.000USD (6,2 tỷ)</td>
                    <td>18 tỷ</td>
                    <td>24 tỷ</td>
                </tr>
                <tr>
                    <td class='stt'>9</td>
                    <td>Lamborghini Huracan STO</td>
                    <td>327.838USD (7,6 tỷ)</td>
                    <td>29 tỷ</td>
                    <td>33 tỷ</td>
                </tr>
                <tr>
                    <td class='stt'>10</td>
                    <td rowspan="3" class='Vehicle'>Urus</td>
                    <td>Lamborghini Urus</td>
                    <td>222.000USD (~  5,2 tỷ)</td>
                    <td>13,1 tỷ</td>
                    <td>13,3 tỷ</td>
                </tr>
                <tr>
                    <td class='stt'>11</td>
                    <td>Lamborghini Urus S</td>
                    <td>232.000USD (~  5,6 tỷ)</td>
                    <td>14,1 tỷ</td>
                    <td>14,5 tỷ</td>
                </tr>
                <tr>
                    <td class='stt'>12</td>
                    <td>Lamborghini Urus Performante</td>
                    <td>252.000USD (~  6,2 tỷ)</td>
                    <td>16,1 tỷ</td>
                    <td>16,8 tỷ</td>
                </tr>
                <tr>
                    <td class='stt'>13</td>
                    <td class='Vehicle'>Sian</td>
                    <td>Lamborghini Sian SKP 37</td>
                    <td>3.700.000USD (~ 88,354 tỳ)</td>
                    <td>300 tỷ</td>
                    <td>Chưa xác định</td>
                </tr>
                <tr>
                    <td class='stt'>14</td>
                    <td class='Vehicle'>Revuelto</td>
                    <td>Lamborghini Revuelto</td>
                    <td>650.000USD (~ 15 tỷ)</td>
                    <td>Chưa xác định</td>
                    <td>Chưa xác định</td>
                </tr>
              </table>
            </div>
            <div style={{width:"100%",margin:"50px 0px"}} >
              <div class='icon-hexagon-1' style={{margin:"auto"}}>
                  <div class='icon-hexagon-2'>
                      <FontAwesomeIcon icon={faPlus}  class='icon-hexagon-right'/>
                  </div> 
                  <span>Xem thêm sản phẩm</span>
              </div>
            </div>
            <div class='body-home-2' id="heading5">
                <div class='body-home-2-top'>
                  <h3>PHẢN HỒI & ĐÁNH GIÁ</h3>
                </div>
                <div class='body-home-2-bottom'>
                  <h1>L A M B O R G H I N I</h1>
                </div>
            </div> 
            <div class='body-home-6'>
              <div class='body-home-6-left'>
                <div>
                  <h2 style={{width:"100%"}}>PHẢN HỒI VỀ SẢN PHẨM</h2>
                  <PieChart width={400} height={400}>
                    <Pie
                      data={data}
                      stroke="#fff"
                      dataKey="value"
                      innerRadius={0}
                      outerRadius={150}
                    >
                      {data.map((entry, index) => (
                        <>
                        <Cell key={index} fill={entry.color} />
                        <Text
                          // x={entry.centroid.x}
                          // y={entry.centroid.y}
                          textAnchor="middle"
                          fontSize={16}
                          fontWeight="bold"
                          fill="#fff"
                        >
                          {entry.value}
                      </Text>
                      </>
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </div>
              </div>
              <div class='body-home-6-right'>
              
                <div>
                  <h2 style={{width:"100%"}}>PHẢN HỒI VỀ NHÃN HÀNG</h2>
                  <PieChart width={400} height={400}>
                    <Pie
                      data={data}
                      stroke="#fff"
                      dataKey="value"
                      innerRadius={0}
                      outerRadius={150}
                    >
                      {data.map((entry, index) => (
                        <Cell key={index} fill={entry.color} /> 
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </div>
              </div>
            </div> 
            <div class='body-home-2' id="heading2">
                <div class='body-home-2-top'>
                  <h3>CHI NHÁNH HỒ CHÍ MINH</h3>
                </div>
                <div class='body-home-2-bottom'>
                  <h1>L A M B O R G H I N I</h1>
                </div>
            </div>
            <div class='body-home-6'>
              <video src="/videos/store.mp4" ref={videoRef} controls={false} autoPlay> </video>
              <div>

              </div>
              <div>
                
              </div>
            </div>
        </div>
          
        <div class='Table-of-contents'>
          <div class='Table-of-contents-1' onClick={handleClickTableofcontents} style={{ display: Tableofcontents ? 'none' : 'block' }}>
            <FontAwesomeIcon icon={faRectangleList} style={{height:"40px"}}/>
          </div>
          <div class='Table-of-contents-2' style={{ display: Tableofcontents ? 'block' : 'none' }} >
            <div onClick={handleClickTableofcontents}>
              <FontAwesomeIcon icon={faXmark}  style={{float:"right",height:"20px"}}/>
              <h2>MỤC LỤC</h2>
            </div>
            <ul>
              <li onClick={() => handleItemClick('heading1')}>THÔNG TIN</li>
              <li onClick={() => handleItemClick('heading2')}>TIN TỨC</li>
              <li onClick={() => handleItemClick('heading3')}>SẢN PHẨM</li>
              <li onClick={() => handleItemClick('heading4')}>BẢN GIÁ SẢN PHẨM</li>
              <li onClick={() => handleItemClick('heading5')}>PHẢN HỒI & ĐÁNH GIÁ</li>
            </ul>
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
  export default Home;
  