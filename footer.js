import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../Layout/moduleLayout/footerLayout.css';
import '../../Layout/moduleLayout/layout.css';
import { faDiscord, faFacebookF, faInstagram, faInstalod, faLinkedinIn, faThreads, faTiktok, faWeibo, faWeixin, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
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
    return (
        <body>
        <div class="footer-Desktop"> 
            <div class="footer-1">
                <div class="footer-1-left">
                    <a href='./User/View/home' class='lienket'>CÔNG TY</a>
                    <a href='./User/View/home' class='lienket'>TÀI CHÍNH</a>
                    <a href='./User/View/home' class='lienket'>NGHỀ NGHIỆP</a>
                    <a href='./User/View/home' class='lienket'>LIÊN HỆ CHÚNG TÔI</a>
                    <a href='./User/View/home' class='lienket'>SỰ BỀN VỮNG</a>
                    <br></br>
                    <br></br>
                    <a href='./User/View/home' class='lienket'>TRUNG TÂM TRUYỀN THÔNG</a>
                    <a href='./User/View/home' class='lienket'>QUYỀN RIÊNG TƯ & PHÁP LÝ</a>
                    <a href='./User/View/home' class='lienket'>CÀI ĐẶT COOKIE</a>
                    <br></br>
                    <br></br>
                    <a href='./User/View/home' class='lienket'>SƠ ĐỒ TRANG WEB</a>
                    <a href='./User/View/home' class='lienket'>BẢN TIN</a>
                    <a href='./User/View/home' class='lienket'>KHẢ NĂNG TIẾP CẬN</a>
                </div>
                <div class="footer-1-right">
                    <a href="https://www.instagram.com/lamborghini/?hl=en" target="_blank" rel="noreferrer" class='lienket'><FontAwesomeIcon icon={faInstagram}/></a>
                    <a href='https://www.threads.net/@lamborghini' target='_blank' rel="noreferrer" class='lienket'><FontAwesomeIcon icon={faThreads} /></a>
                    <a href='https://www.facebook.com/Lamborghini/' target='_blank' rel="noreferrer" class='lienket'><FontAwesomeIcon icon={faFacebookF} /></a>
                    <a href='https://www.youtube.com/channel/UC9DXZC8BCDOW6pYAQKgozqw' target='_blank' rel="noreferrer" class='lienket'><FontAwesomeIcon icon={faYoutube} /></a>
                    <a href='https://twitter.com/Lamborghini' target='_blank' rel="noreferrer" class='lienket'><FontAwesomeIcon icon={faXTwitter} /></a>
                    <a href='https://www.tiktok.com/@lamborghini?lang=en' target='_blank' rel="noreferrer" class='lienket'><FontAwesomeIcon icon={faTiktok} /></a>
                    <a href='https://www.linkedin.com/company/automobili-lamborghini-s-p-a-' target='_blank' rel="noreferrer" class='lienket'><FontAwesomeIcon icon={faLinkedinIn} /></a>
                    <a href='https://weibo.com/lamborghinichina?is_all=1' target='_blank' rel="noreferrer" class='lienket'><FontAwesomeIcon icon={faWeibo} /></a>
                    <a href='https://i.youku.com/i/UMjg0MDg1ODMy' target='_blank' rel="noreferrer" class='lienket'><FontAwesomeIcon icon={faInstalod} /></a>
                    <a href='https://www.lamborghini.com/en-en/wechat' target='_blank' rel="noreferrer" class='lienket'><FontAwesomeIcon icon={faWeixin} /></a>
                    <a href='https://discord.com/invite/vet6ZBjpFd' target='_blank' rel="noreferrer" class='lienket'><FontAwesomeIcon icon={faDiscord} /></a>
                </div>
            </div>
            <div class="footer-2">
                <p>
                    <font>
                        <font>
                        Giá trị tiêu thụ và phát thải trên trang web đề cập đến IP địa lý của bạn. Giá trị này có thể không thực tế nếu 
                        bạn điều hướng bằng VPN hoặc nếu vị trí của nhà cung cấp dịch vụ Internet của bạn không chính xác. Nếu bạn cho 
                        rằng mình đã định vị địa lý không chính xác, hãy liên hệ với đại lý của bạn để nhận thông tin hợp lệ về mức tiêu 
                        thụ và khí thải trong khu vực của bạn.
                        </font>
                    </font>
                </p>
            </div>
            <div class="footer-3">
                <p>
                    <font>
                        <font>
                            Bản quyền © 2024 Automobile Lamborghini SpA là công ty cổ đông duy nhất thuộc Tập đoàn Audi.
                        </font>
                    </font>
                </p>
                <p>
                    <font>
                        <font>
                            Đã đăng ký Bản quyền. số VAT CNTT 00591801204
                        </font>
                    </font>
                </p>
                <p>
                    <font>
                        <font>
                            CẢNH BÁO VỀ VIỆC ƯU ĐÃI BẤT HỢP PHÁP CỔ PHIẾU ĐƯỢC CÁO BUỘC CỦA AUTOMOBILI LAMBORGHINI SPA
                        </font>
                    </font>
                </p>
                <p>
                    <font>
                        <font>
                            Automobile Lamborghini SpA đã nhận được thông báo rằng một số bên thứ ba ở các quốc gia khác nhau được cho là
                            đang chào bán cổ phần của Automobilei Lamborghini SpA. Những lời đề nghị này là bất hợp pháp và không bắt
                            nguồn từ Volkswagen Aktiengesellschaft cũng như từ bất kỳ công ty con nào của hãng.
                        </font>
                    </font>
                </p>
            </div>
        </div>
    </body>
    );
  };
  const Mobile = () => {
    return (
        <body>
        <div class="footer-Mobile"> 
            <div class="footer-1">
                <div class="footer-1-left">
                    <a href='./User/View/home' class='lienket'>CÔNG TY</a>
                    <a href='./User/View/home' class='lienket'>NGHỀ NGHIỆP</a>       
                    <a href='./User/View/home' class='lienket'>SỰ BỀN VỮNG</a>
                    <a href='./User/View/home' class='lienket'>QUYỀN RIÊNG TƯ & PHÁP LÝ</a>
                    <a href='./User/View/home' class='lienket'>SƠ ĐỒ TRANG WEB</a>
                    <a href='./User/View/home' class='lienket'>KHẢ NĂNG TIẾP CẬN</a>
                </div>
                <div class="footer-1-right">
                    <a href='./User/View/home' class='lienket'>TÀI CHÍNH</a>
                    <a href='./User/View/home' class='lienket'>LIÊN HỆ CHÚNG TÔI</a>
                    <a href='./User/View/home' class='lienket'>TRUNG TÂM TRUYỀN THÔNG</a>
                    <a href='./User/View/home' class='lienket'>CÀI ĐẶT COOKIE</a>
                    <a href='./User/View/home' class='lienket'>BẢN TIN</a>
                   
                </div>
            </div>
            <div class="footer-2">
                <p>
                    <font>
                        <font>
                        Giá trị tiêu thụ và phát thải trên trang web đề cập đến IP địa lý của bạn. Giá trị này có thể không thực tế nếu 
                        bạn điều hướng bằng VPN hoặc nếu vị trí của nhà cung cấp dịch vụ Internet của bạn không chính xác. Nếu bạn cho 
                        rằng mình đã định vị địa lý không chính xác, hãy liên hệ với đại lý của bạn để nhận thông tin hợp lệ về mức tiêu 
                        thụ và khí thải trong khu vực của bạn.
                        </font>
                    </font>
                </p>
            </div>
            <div class="footer-3">
                <p>
                    <font>
                        <font>
                            Bản quyền © 2024 Automobile Lamborghini SpA là công ty cổ đông duy nhất thuộc Tập đoàn Audi.
                        </font>
                    </font>
                </p>
                <p>
                    <font>
                        <font>
                            Đã đăng ký Bản quyền. số VAT CNTT 00591801204
                        </font>
                    </font>
                </p>
                <p>
                    <font>
                        <font>
                            CẢNH BÁO VỀ VIỆC ƯU ĐÃI BẤT HỢP PHÁP CỔ PHIẾU ĐƯỢC CÁO BUỘC CỦA AUTOMOBILI LAMBORGHINI SPA
                        </font>
                    </font>
                </p>
                <p>
                    <font>
                        <font>
                            Automobile Lamborghini SpA đã nhận được thông báo rằng một số bên thứ ba ở các quốc gia khác nhau được cho là
                            đang chào bán cổ phần của Automobilei Lamborghini SpA. Những lời đề nghị này là bất hợp pháp và không bắt
                            nguồn từ Volkswagen Aktiengesellschaft cũng như từ bất kỳ công ty con nào của hãng.
                        </font>
                    </font>
                </p>
            </div>
            <div class="footer-4">
                <a href="https://www.instagram.com/lamborghini/?hl=en" target="_blank" rel="noreferrer" class='lienket'><FontAwesomeIcon icon={faInstagram}/></a>
                <a href='https://www.threads.net/@lamborghini' target='_blank' rel="noreferrer" class='lienket'><FontAwesomeIcon icon={faThreads} /></a>
                <a href='https://www.facebook.com/Lamborghini/' target='_blank' rel="noreferrer" class='lienket'><FontAwesomeIcon icon={faFacebookF} /></a>
                <a href='https://www.youtube.com/channel/UC9DXZC8BCDOW6pYAQKgozqw' target='_blank' rel="noreferrer" class='lienket'><FontAwesomeIcon icon={faYoutube} /></a>
                <a href='https://twitter.com/Lamborghini' target='_blank' rel="noreferrer" class='lienket'><FontAwesomeIcon icon={faXTwitter} /></a>
                <a href='https://www.tiktok.com/@lamborghini?lang=en' target='_blank' rel="noreferrer" class='lienket'><FontAwesomeIcon icon={faTiktok} /></a>
                <a href='https://www.linkedin.com/company/automobili-lamborghini-s-p-a-' target='_blank' rel="noreferrer" class='lienket'><FontAwesomeIcon icon={faLinkedinIn} /></a>
                <a href='https://weibo.com/lamborghinichina?is_all=1' target='_blank' rel="noreferrer" class='lienket'><FontAwesomeIcon icon={faWeibo} /></a>
                <a href='https://i.youku.com/i/UMjg0MDg1ODMy' target='_blank' rel="noreferrer" class='lienket'><FontAwesomeIcon icon={faInstalod} /></a>
                <a href='https://www.lamborghini.com/en-en/wechat' target='_blank' rel="noreferrer" class='lienket'><FontAwesomeIcon icon={faWeixin} /></a>
                <a href='https://discord.com/invite/vet6ZBjpFd' target='_blank' rel="noreferrer" class='lienket'><FontAwesomeIcon icon={faDiscord} /></a>
            </div>
        </div>
    </body>
    );
  };
export default Footer;
