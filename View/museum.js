/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useRef } from 'react';
import "../Layout/museumLayout.css";
import Navbar from './module/navbar';
import Footer from './module/footer';
import { faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Museum() {
        const videoRef = useRef(null);
      
        useEffect(() => {
          const video = videoRef.current;
          if (video) {
            video.muted = true;
            video.play();
          }
        }, []);
    return (
        <body class="Desktop">
            <Navbar/>
            <div class="Museum">
                <div class="Museum-carousel">
                    <div class="Museum-carousel-top">
                        <h4>LAMBORGHINI / BẢO TÀNG</h4>
                        <div class="Museum-carousel-top-1">
                            <h1>Không gian tầng trệt</h1>
                            <h1>BẢO TÀNG</h1>
                            <div class='Museum-carousel-top-2'>
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
                        <h1>BẢO TÀNG Ô TÔ LAMBORGHINI</h1>
                        <p>
                            <font>
                                <font>
                                    Lịch sử hấp dẫn, những mẫu xe mang tính biểu tượng và chuyến tham quan dây chuyền sản xuất bên trong 
                                    Bảo tàng Automobile Lamborghini tiết lộ 60 năm đổi mới đang đưa Lamborghini hướng tới tương lai.
                                </font>
                            </font>
                            <br></br>
                            <font>
                                <font>
                                    Từ những sáng tạo có tầm nhìn xa trông rộng đầu tiên của thiên tài Ferruccio Lamborghini, như Miura và 
                                    Countach, tiếp theo là những siêu xe thể thao độc quyền và gần đây hơn như Huracán Performanceante, 
                                    Aventador SVJ, và vài mẫu Centenario, Sesto Elemento và Veneno. , sẽ xuất hiện hôm nay với những chiếc 
                                    Lamborghini đầu tiên có công nghệ hybrid, Sian và Countach LPI 800-4.
                                </font>
                            </font>
                            <br></br>
                            <font>
                                <font>
                                    Bảo tàng Automobilei Lamborghini mang đến trải nghiệm tương tác, cũng được cung cấp bởi trình mô phỏng lái
                                    xe mới giúp khuếch đại cảm xúc và khám phá các phương tiện được trưng bày.
                                </font>
                            </font>
                            <br></br>
                            <br></br>
                            <font>
                                <font>
                                    Mở cửa hàng ngày
                                </font>
                            </font>
                            <br></br>
                            <br></br>
                            <font>
                                <font>
                                    Từ ngày 1 tháng 10 đến ngày 30 tháng 4, từ 9:30 sáng đến 6 giờ chiều (lối vào cuối cùng lúc 5 giờ chiều).
                                </font>
                            </font>
                            <br></br>
                            <br></br>
                            <font>
                                <font>
                                    Từ ngày 2 tháng 5 đến ngày 30 tháng 9, từ 9:30 sáng đến 7 giờ tối (lối vào cuối cùng lúc 6 giờ chiều).
                                </font>
                            </font>
                        </p>
                    </div>
                    <div class='part-1-right'>
                        <img src='/imges/museum/1.png' alt="hinh"></img>
                    </div>
                </div>
                <div class='part-2'>
                        <img src='/imges/museum/4.png' alt="hinh" class='part-2-left'></img>
                        <img src='/imges/museum/5.png' alt="hinh" class='part-2-right'></img>
                </div>
                <div class='part-3'> 
                    <div class='part-3-left'>
                    <img src='/imges/museum/14.png' alt="hinh" ></img>
                    </div>
                    <div class='part-3-right'>
                        <h1>NGÀY ĐÓNG CỬA TRONG NĂM 2024</h1>
                        <p>
                            <font>
                                <font>
                                    Tháng 2: 22 (đóng cửa sớm lúc 4:30 chiều) 26 (đóng cửa sớm lúc 4 giờ chiều).
                                </font>
                            </font>
                            <br></br>
                            <font>
                                <font>
                                    Tháng 3: 27 (đóng cửa sớm lúc 4 giờ chiều).
                                </font>
                            </font>
                            <br></br>
                            <font>
                                <font>
                                    Tháng 5: 1
                                </font>
                            </font>
                            <br></br>
                            <font>
                                <font>
                                    Tháng 12: 24 (đóng cửa sớm lúc 2 giờ chiều); 25; 31 (đóng cửa sớm lúc 2 giờ chiều).
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
                <div class='part-4'>
                    <div class='part-1-left'>
                        <h1>THAM QUAN DÂY CHUYỀN SẢN XUẤT</h1>
                        <p>
                            <font>
                                <font>
                                Từ lối vào lịch sử hướng tới tương lai. Tham quan dây chuyền sản xuất là hành trình độc đáo chứng kiến ​
                                ​sự ra đời của siêu xe thể thao Lamborghini. Từ mẫu hybrid Revuelto V12 hoàn toàn mới, có dây chuyền sản 
                                xuất bao gồm 15 trạm, đi qua dây chuyền V10 nơi Huracán ra đời và cho đến dây chuyền bọc ghế. Các chuyến 
                                tham quan có hướng dẫn bắt đầu từ Bảo tàng Lamborghini khiến chuyến tham quan trở thành một trải nghiệm 
                                khó quên khi khám phá những địa điểm công nghệ và đáng ngạc nhiên nhất của công ty.
                                </font>
                            </font>
                            <br></br>
                            <br></br>
                            <div class='icon-hexagon-1'>
                                <div class='icon-hexagon-2'>
                                    <FontAwesomeIcon icon={faChevronRight} class='icon-hexagon-right'/>
                                </div> 
                                <span>Thông tin và đặt chỗ</span>
                            </div>
                        </p>
                    </div>
                    <div class='part-4-right'>
                        <img src='/imges/museum/6.png' alt="hinh"></img>
                    </div>
                </div>
                <div class='part-5'>
                        <img src='/imges/museum/2.png' alt="hinh" class='part-5-left'></img>
                        <img src='/imges/museum/3.png' alt="hinh" class='part-5-right'></img>
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
                    <img src='/imges/museum/15.png' alt="hinh" ></img>
                </div>
                <div class='part-9'>
                    <div class='part-9-left'>
                        <div class='part-9-left-1'>
                            <h1>LIÊN LẠC</h1>
                            <p>Via Modena, 12 40019 Sant'Agata Bolognese (Bologna) - Ý</p>
                            <p>Điện thoại: +39 051 681 7611</p>
                            <div class='icon-hexagon-1'>
                                <div class='icon-hexagon-2'>
                                    <FontAwesomeIcon icon={faChevronRight} class='icon-hexagon-right'/>
                                </div> 
                                <span>Xem trên Maps</span>
                            </div>
                            <div class='icon-hexagon-1'>
                                <div class='icon-hexagon-2'>
                                    <FontAwesomeIcon icon={faPlus}  class='icon-hexagon-add'/>
                                </div>
                                <span>Hướng dẫn lái xe</span>
                            </div>
                        </div> 
                    </div>
                    <div class='part-9-right'>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5675.929281365083!2d11.124765136421503!3d44.65907408074393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477fc395a3ff12a5%3A0xcd8bded915d658e8!2sLamborghini%20Automobile%20Museum!5e0!3m2!1svi!2s!4v1714626658999!5m2!1svi!2s"allowfullscreen="" loading="lazy"></iframe>
                    </div>
                </div>
                <div class='part-10'>
                    
                    <div class='part-10-left'>
                        <div class='part-10-left-1'>
                            <h1>THÔNG TIN</h1>
                            <h1>THAM QUAN GIÁO DỤC</h1>
                            <p>Các nhóm trường học và đại học phải đặt trước.</p>
                            <br></br>
                            <h1>CHỤP ẢNH VÀ QUAY VIDEO</h1>
                            <p>
                                Hình ảnh và video chỉ có thể được chụp bên trong Bảo tàng cho mục đích sử dụng cá nhân. Không được phép 
                                chụp ảnh hoặc quay video trong chuyến thăm nhà máy. Trước khi bắt đầu chuyến tham quan, người tham gia 
                                sẽ được yêu cầu để lại máy ảnh, điện thoại di động và tất cả các thiết bị khác có thể chụp ảnh và/hoặc 
                                quay video trong tủ khóa được cung cấp.
                            </p>
                            <br></br>
                            <h1>Rào cản kiến ​​trúc</h1>
                            <p>
                                Bảo tàng không có rào cản kiến ​​trúc. Các chuyến tham quan diễn ra trên hai tầng và có thang máy dành cho 
                                những người bị hạn chế khả năng di chuyển.
                            </p>
                        </div>
                    </div>
                    <div class='part-10-right'>
                        <div class='part-10-right-1' >
                            <h1  class='part-10-right-2'>THÔNG TIN</h1>
                            <h1>NHỮNG HẠN CHẾ</h1>
                            <p>
                                Du khách không được phép chạm vào các phương tiện và tài liệu được trưng bày cũng như không được phép vào 
                                phương tiện hoặc mang bất cứ thứ gì ra khỏi Bảo tàng. Không được phép ăn uống bên trong Bảo tàng. Động vật
                                không được phép vào, ngoại trừ chó dẫn đường cho người mù. Du khách được yêu cầu cư xử theo cách phù hợp 
                                với bảo tàng, thể hiện sự tôn trọng với nhân viên và những du khách khác; điều này bao gồm sự lựa chọn 
                                trang phục và giọng điệu của họ. Trẻ em và trẻ vị thành niên đi cùng luôn phải chịu trách nhiệm về hành 
                                vi của mình. Việc sử dụng điện thoại di động được cho phép miễn là cẩn thận để không làm phiền hoặc gây 
                                bất tiện cho người khác.
                            </p>
                            <br></br>
                            <h1>GIẢM GIÁ</h1>
                            <p>
                                Giấy tờ xác nhận quyền được giảm học phí phải được xuất trình cho nhân viên khi có yêu cầu.
                            </p>
                            <br></br>
                            <div class='icon-hexagon-1'>
                                <div class='icon-hexagon-2'>
                                    <FontAwesomeIcon icon={faChevronRight} class='icon-hexagon-right'/>
                                </div> 
                                <span>Tải về quy định ra vào bảo tàng</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
            
        </body>
    );
}

export default Museum;
