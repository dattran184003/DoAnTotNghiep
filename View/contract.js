import React, { useState, useEffect } from 'react';
import Navbar from './module/navbar';
import "../Layout/contractLayout.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCheck, faChevronLeft, faChevronRight, faDownload, faQrcode, faQuestion, faXmark } from '@fortawesome/free-solid-svg-icons';
import Footer from './module/footer';
import { useRef } from 'react';
import 'react-day-picker/dist/style.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DayPicker } from 'react-day-picker';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import { QrCode } from '@mui/icons-material';
import { jwtDecode } from "jwt-decode";
import PaymentPage from './PaymentPage';


function Contract() {
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
  const [city, setcity] = useState('');
  const [wards, setwards] = useState(0);
  const handleChange = (event) => {
    const selectedOption = event.target.value;
    setcity(selectedOption);
  };
  const handleChange1 = (event) => {
    const selectedOption1 = event.target.value;
    setwards(selectedOption1);
  };
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
  const TP = [
    { id: 0, name: 'Chọn tỉnh / thành phố', code: '' },
    { id: 1, name: 'Hồ Chí Minh', code: 'HCM' },
    { id: 2, name: 'Hà Nội', code: 'HN' },
    { id: 3, name: 'Đà Nẵng', code: 'DN' },
    { id: 4, name: 'Nha Trang', code: 'NT' },
    { id: 5, name: 'An Giang', code: 'AG' },
    { id: 6, name: 'Bà Rịa - Vũng Tàu', code: 'BRVT' },
    { id: 7, name: 'Bạc Liêu', code: 'BL' },
    { id: 8, name: 'Bắc Kạn', code: 'BK' },
    { id: 9, name: 'Bắc Giang', code: 'BG' },
    { id: 10, name: 'Bắc Ninh', code: 'BN' },
    { id: 11, name: 'Bến Tre', code: 'BT' },
    { id: 12, name: 'Cao Bằng', code: 'CB' },
    { id: 13, name: 'Đắk Lắk', code: 'DL' },
    { id: 14, name: 'Đắk Nông', code: 'DNG' },
    { id: 15, name: 'Điện Biên', code: 'DB' },
    { id: 16, name: 'Đồng Nai', code: 'DN' },
    { id: 17, name: 'Đồng Tháp', code: 'DT' },
    { id: 18, name: 'Gia Lai', code: 'GL' },
    { id: 19, name: 'Hà Giang', code: 'HG' },
    { id: 20, name: 'Hà Nam', code: 'HN' },
    { id: 21, name: 'Hà Tĩnh', code: 'HT' },
    { id: 22, name: 'Hải Dương', code: 'HD' },
    { id: 23, name: 'Hải Phòng', code: 'HP' },
    { id: 24, name: 'Hậu Giang', code: 'HG' },
    { id: 25, name: 'Hòa Bình', code: 'HB' },
    { id: 26, name: 'Hưng Yên', code: 'HY' },
    { id: 27, name: 'Khánh Hòa', code: 'KH' },
    { id: 28, name: 'Kiên Giang', code: 'KG' },
    { id: 29, name: 'Kon Tum', code: 'KT' },
    { id: 30, name: 'Lai Châu', code: 'LC' },
    { id: 31, name: 'Lâm Đồng', code: 'LD' },
    { id: 32, name: 'Lạng Sơn', code: 'LS' },
    { id: 33, name: 'Lào Cai', code: 'LC' },
    { id: 34, name: 'Nam Định', code: 'ND' },
    { id: 35, name: 'Nghệ An', code: 'NA' },
    { id: 36, name: 'Ninh Bình', code: 'NB' },
    { id: 37, name: 'Ninh Thuận', code: 'NT' },
    { id: 38, name: 'Phú Thọ', code: 'PT' },
    { id: 39, name: 'Phú Yên', code: 'PY' },
    { id: 40, name: 'Quảng Bình', code: 'QB' },
    { id: 41, name: 'Quảng Nam', code: 'QN' },
    { id: 42, name: 'Quảng Ngãi', code: 'QG' },
  ];
  const QH = [
    { id: 0, name: 'Chọn quận / huyện', code: '' },
    { id: 1, name: 'Quận 1', code: 'HCM' },
    { id: 2, name: 'Quận 2', code: 'HCM' },
    { id: 3, name: 'Quận 3', code: 'HCM' },
    { id: 4, name: 'Quận 4', code: 'HCM' },
    { id: 5, name: 'Quận 5', code: 'HCM' },
    { id: 6, name: 'Quận 6', code: 'HCM' },
    { id: 7, name: 'Quận 7', code: 'HCM' },
    { id: 8, name: 'Quận 8', code: 'HCM' },
    { id: 9, name: 'Quận 9', code: 'HCM' },
    { id: 10, name: 'Quận 10', code: 'HCM' },
    { id: 11, name: 'Quận 11', code: 'HCM' },
    { id: 12, name: 'Quận 12', code: 'HCM' },
    { id: 13, name: 'Thành phố Thủ Đức', code: 'HCM' },
    { id: 14, name: 'Huyện Bình Chánh', code: 'HCM' },
    { id: 15, name: 'Huyện Cần Giờ', code: 'HCM' },
    { id: 16, name: 'Huyện Củ Chi', code: 'HCM' },
    { id: 17, name: 'Huyện Hóc Môn', code: 'HCM' },
    { id: 18, name: 'Huyện Nhà Bè', code: 'HCM' },
    //hà nội
    { id: 19, name: 'Quận Ba Đình', code: 'HN' },
    { id: 20, name: 'Quận Hoàn Kiếm', code: 'HN' },
    { id: 21, name: 'Quận Hai Bà Trưng', code: 'HN' },
    { id: 22, name: 'Quận Đống Đa', code: 'HN' },
    { id: 23, name: 'Quận Tây Hồ', code: 'HN' },
    { id: 24, name: 'Quận Cầu Giấy', code: 'HN' },
    { id: 25, name: 'Quận Thanh Xuân', code: 'HN' },
    { id: 26, name: 'Quận Hoàng Mai', code: 'HN' },
    { id: 27, name: 'Quận Long Biên', code: 'HN' },
    { id: 28, name: 'Huyện Thanh Trì', code: 'HN' },
    { id: 29, name: 'Huyện Từ Liêm', code: 'HN' },
    { id: 30, name: 'Huyện Đan Phượng', code: 'HN' },
    { id: 31, name: 'Huyện Hoài Đức', code: 'HN' },
    { id: 32, name: 'Huyện Gia Lâm', code: 'HN' },
    { id: 33, name: 'Quận Hà Đông', code: 'HN' },
    { id: 34, name: 'Quận Nam Từ Liêm', code: 'HN' },
    { id: 35, name: 'Quận Bắc Từ Liêm', code: 'HN' },
    //đà năng
    { id: 36, name: 'Quận Hải Châu', code: 'DN' },
    { id: 37, name: 'Quận Sơn Trà', code: 'DN' },
    { id: 38, name: 'Quận Ngũ Hành Sơn', code: 'DN' },
    { id: 39, name: 'Quận Thanh Khê', code: 'DN' },
    { id: 40, name: 'Quận Liên Chiểu', code: 'DN' },
    { id: 41, name: 'Huyện Hòa Vang', code: 'DN' },
    { id: 42, name: 'Huyện Hoàng Sa', code: 'DN' },
    //nha trang
    { id: 43, name: 'Thành phố Nha Trang', code: 'NT' },
    { id: 44, name: 'Huyện Cam Lâm', code: 'NT' },
    { id: 45, name: 'Huyện Vạn Ninh', code: 'NT' },
    { id: 46, name: 'Huyện Ninh Hòa', code: 'NT' },
    { id: 47, name: 'Huyện Diên Khánh', code: 'NT' },
    { id: 48, name: 'Huyện Khánh Vĩnh', code: 'NT' },
    // an giang
    { id: 49, name: 'Thành phố Long Xuyên', code: 'AG' },
    { id: 50, name: 'Thị xã Tân Châu', code: 'AG' },
    { id: 51, name: 'Châu An Giang', code: 'AG' },
    { id: 52, name: 'Châu Thoại Sơn', code: 'AG' },
    { id: 53, name: 'Châu Phú Tân', code: 'AG' },
    { id: 54, name: 'Huyện Châu Phú', code: 'AG' },
    { id: 55, name: 'Huyện Tri Tôn', code: 'AG' },
    { id: 56, name: 'Huyện Tịnh Biên', code: 'AG' },
    { id: 57, name: 'Huyện An Phú', code: 'AG' },
    { id: 58, name: 'Huyện Thoại Lai', code: 'AG' },
    { id: 59, name: 'Huyện Vĩnh Châu', code: 'AG' },
    { id: 60, name: 'Huyện Tân Hiệp', code: 'AG' },
    //'Bà Rịa - Vũng Tàu'
    { id: 61, name: 'Thành phố Bà Rịa', code: 'BRVT' },
    { id: 62, name: 'Thành phố Vũng Tàu', code: 'BRVT' },
    { id: 63, name: 'Thị xã Châu Đức', code: 'BRVT' },
    { id: 64, name: 'Thị xã Long Khánh', code: 'BRVT' },
    { id: 65, name: 'Huyện Châu Đất', code: 'BRVT' },
    { id: 66, name: 'Huyện Đất Đỏ', code: 'BRVT' },
    { id: 67, name: 'Huyện Núi Thành', code: 'BRVT' },
    { id: 68, name: 'Huyện Tân Thành', code: 'BRVT' },
    { id: 69, name: 'Huyện Xuyên Mộc', code: 'BRVT' },
    //'Bạc Liêu'
    { id: 70, name: 'Thành phố Bạc Liêu', code: 'BL' },
    { id: 71, name: 'Huyện Phước Long', code: 'BL' },
    { id: 72, name: 'Huyện Hồng Dân', code: 'BL' },
    { id: 73, name: 'Huyện Vĩnh Lợi', code: 'BL' },
    { id: 74, name: 'Huyện Đông Hải', code: 'BL' },
    { id: 75, name: 'Huyện Giá Rai', code: 'BL' },
    { id: 76, name: 'Huyện Hòa Bình', code: 'BL' },
    //'Bắc Kạn'
    { id: 77, name: 'Thành phố Bắc Kạn', code: 'BK' },
    { id: 78, name: 'Huyện Chợ Mới', code: 'BK' },
    { id: 79, name: 'Huyện Na Rì', code: 'BK' },
    { id: 80, name: 'Huyện Bạch Thông', code: 'BK' },
    { id: 81, name: 'Huyện Chợ Đồn', code: 'BK' },
    { id: 82, name: 'Huyện Cao Bằng', code: 'BK' },
    { id: 83, name: 'Huyện Thuần Châu', code: 'BK' },
    //'Bắc Giang'
    { id: 84, name: 'Thành phố Bắc Giang', code: 'BG' },
    { id: 85, name: 'Huyện Yên Dũng', code: 'BG' },
    { id: 86, name: 'Huyện Lạng Giang', code: 'BG' },
    { id: 87, name: 'Huyện Sơn Động', code: 'BG' },
    { id: 88, name: 'Huyện Tân Yên', code: 'BG' },
    { id: 89, name: 'Huyện Hiệp Hòa', code: 'BG' },
    { id: 90, name: 'Huyện Việt Yên', code: 'BG' },
    { id: 91, name: 'Huyện Lục Ngạn', code: 'BG' },
    { id: 92, name: 'Huyện Yên Thế', code: 'BG' },
    { id: 93, name: 'Thị xã Dĩ An', code: 'BG' },
    //bắc ninh
    { id: 94, name: 'Thành phố Bắc Ninh', code: 'TPBN' },
    { id: 95, name: 'Thị xã Từ Sơn', code: 'TXTS' },
    { id: 96, name: 'Huyện Quế Võ', code: 'HYQV' },
    { id: 97, name: 'Huyện Yên Phong', code: 'HYYP' },
    { id: 98, name: 'Huyện Tiên Du', code: 'HYTD' },
    { id: 99, name: 'Huyện Lương Tài', code: 'HYLT' },
    { id: 100, name: 'Huyện Gia Bình', code: 'HYGB' },
    { id: 101, name: 'Huyện Thuận Thành', code: 'HYTC' },
    { id: 102, name: 'Huyện Bình Giang', code: 'HYBG' },
    //'Bến Tre'
    { id: 103, name: 'Thành phố Bến Tre', code: 'BT' },
    { id: 104, name: 'Huyện Châu Thành', code: 'BT' },
    { id: 105, name: 'Huyện Giồng Trôm', code: 'BT' },
    { id: 106, name: 'Huyện Ba Tri', code: 'BT' },
    { id: 107, name: 'Huyện Châu Đức', code: 'BT' },
    { id: 108, name: 'Huyện Tân Trụ', code: 'BT' },
    { id: 109, name: 'Huyện Mỏ Cày Bắc', code: 'BT' },
    { id: 110, name: 'Huyện Mỏ Cày Nam', code: 'BT' },
    //'Cao Bằng'
    { id: 111, name: 'Thành phố Cao Bằng', code: 'CB' },
    { id: 112, name: 'Thị xã Hà Quảng', code: 'CB' },
    { id: 113, name: 'Huyện Bảo Lâm', code: 'CB' },
    { id: 114, name: 'Huyện Bảo Lạc', code: 'CB' },
    { id: 115, name: 'Huyện Chợ Mới', code: 'CB' },
    { id: 116, name: 'Huyện Đồng Văn', code: 'CB' },
    { id: 117, name: 'Huyện Hạ Lang', code: 'CB' },
    { id: 118, name: 'Huyện Kim Bôi', code: 'CB' },
    { id: 119, name: 'Huyện Nguyên Bình', code: 'CB' },
    { id: 120, name: 'Huyện Phục Hoà', code: 'CB' },
    { id: 121, name: 'Huyện Quảng Uyên', code: 'CB' },
    { id: 122, name: 'Huyện Thạch An', code: 'CB' },
    { id: 123, name: 'Huyện Trà Lĩnh', code: 'CB' },
    { id: 124, name: 'Huyện Trùng Khánh', code: 'CB' },
    //'Đắk Lắk'
    { id: 125, name: 'Thành phố Buôn Ma Thuột', code: 'DL' },
    { id: 126, name: 'Huyện Ea H`leo', code: 'DL' },
    { id: 127, name: 'Huyện Krông Pắk', code: 'DL' },
    { id: 128, name: 'Huyện M`đrak', code: 'DL' },
    { id: 129, name: 'Huyện Ea Kar', code: 'DL' },
    { id: 130, name: 'Huyện Buôn Đôn', code: 'DL' },
    { id: 131, name: 'Huyện Cư M`gar', code: 'DL' },
    { id: 132, name: 'Huyện Ea Sup', code: 'DL' },
    { id: 133, name: 'Huyện Buôn Hồ', code: 'DL' },
    { id: 134, name: 'Huyện Lắk', code: 'DL' },
    //'Đắk Nông'
    { id: 135, name: 'Thành phố Gia Nghĩa', code: 'DNG' },
    { id: 136, name: 'Huyện Đắk Glong', code: 'DNG' },
    { id: 137, name: 'Huyện Đắk Mil', code: 'DNG' },
    { id: 138, name: 'Huyện Cư Jut', code: 'DNG' },
    { id: 139, name: 'Huyện Tuy Đức', code: 'DNG' },
    { id: 140, name: 'Huyện Ea H`leo', code: 'DNG' },
    { id: 141, name: 'Huyện M`đrak', code: 'DNG' },
    { id: 142, name: 'Huyện Buôn Đôn', code: 'DNG' },
    //'Điện Biên'
    { id: 143, name: 'Điện Biên', code: 'DB' }, 
    { id: 144, name: 'Huyện Điện Biên', code: 'DB' }, 
    { id: 145, name: 'Huyện Mường Ảng', code: 'DB' }, 
    { id: 146, name: 'Huyện Tuần Giáo', code: 'DB' }, 
    { id: 147, name: 'Huyện Con Cuông', code: 'DB' }, 
    { id: 148, name: 'Thành phố Điện Biên Phủ', code: 'DB' },
  ];
  const PX = [
    { name: 'Chọn phường / xã', code: 0 },
    { name: 'Phường Bến Nghé', code: '1'},
    { name: 'Phường Bến Thành', code: '1'},
    { name: 'Phường Cô Giang', code: '1'},
    { name: 'Phường Cầu Kho', code: '1'},
    { name: 'Phường Cầu Ông Lãnh', code: '1'},
    { name: 'Phường Đa Kao', code: '1'},
    { name: 'Phường Nguyễn Cư Trinh', code: '1'},
    { name: 'Phường Nguyễn Thái Bình', code: '1'},
    { name: 'Phường Phạm Ngũ Lão', code: '1'},
    { name: 'Phường Tân Định', code: '1'},
    { name: 'Phường An Khê', code: '2' },
    { name: 'Phường An Lợi Đông', code: '2' },
    { name: 'Phường An Bình', code: '2' },
    { name: 'Phường Bình An', code: '2' },
    { name: 'Phường Bình Chánh', code: '2' },
    { name: 'Phường Bình Đa', code: '2' },
    { name: 'Phường Bình Giang', code: '2' },
    { name: 'Phường Bình Hà', code: '2' },
    { name: 'Phường Bình Hưng Hòa', code: '2' },
    { name: 'Phường Bình Khánh', code: '2' },
    { name: 'Phường 10', code: '3' },
    { name: 'Phường 11', code: '3' },
    { name: 'Phường 12', code: '3' },
    { name: 'Phường 13', code: '3' },
    { name: 'Phường 14', code: '3' },
    { name: 'Phường Bến Nghé', code: '3' },
    { name: 'Phường Bến Thành', code: '3' },
    { name: 'Phường Tân Định', code: '3' },
    { name: 'Phường Võ Văn Tần', code: '3' },
    { name: 'Phường Nguyễn Cư Trinh', code: '3' },
    { name: 'Phường Tân Đảo', code: '4' },
    { name: 'Phường Tân Kiểu', code: '4' },
    { name: 'Phường Tân Phong', code: '4' },
    { name: 'Phường Tân Hiệp', code: '4' },
    { name: 'Phường Tân Hưng', code: '4' },
    { name: 'Phường Lái Thiêu', code: '4' },
    { name: 'Phường An Lợi Đông', code: '4' },
    { name: 'Phường An Khê', code: '4' },
    { name: 'Phường Khánh Mai', code: '4' },
    { name: 'Phường Vĩnh Khánh', code: '4' },
    { name: 'Phường 1', code: '5' },
    { name: 'Phường 2', code: '5' },
    { name: 'Phường 3', code: '5' },
    { name: 'Phường 4', code: '5' },
    { name: 'Phường 5', code: '5' },
    { name: 'Phường 6', code: '5' },
    { name: 'Phường 7', code: '5' },
    { name: 'Phường 8', code: '5' },
    { name: 'Phường 9', code: '5' },
    { name: 'Phường 10', code: '5' },
    { name: 'Phường 11', code: '5' },
    { name: 'Phường 13', code: '5' },
    { name: 'Phường 14', code: '5' },
    { name: 'Phường 15', code: '5' },
    { name: 'Phường Bình Tiên', code: '6' },
    { name: 'Phường Cầu Ông Lãnh', code: '6' },
    { name: 'Phường Cầu Kho', code: '6' },
    { name: 'Phường Đa Kao', code: '6' },
    { name: 'Phường E1', code: '6' },
    { name: 'Phường E2', code: '6' },
    { name: 'Phường E3', code: '6' },
    { name: 'Phường E4', code: '6' },
    { name: 'Phường E6', code: '6' },
    { name: 'Phường E7', code: '6' },
    { name: 'Phường Hậu Giang', code: '6' },
    { name: 'Phường Kiến Thành', code: '6' },
    { name: 'Phường Kim Biêu', code: '6' },
    { name: 'Phường Lãnh Cẩm Thịnh', code: '6' },
    { name: 'Phường Lê Văn Hưu', code: '6' },
    { name: 'Phường Phạm Đình Toai', code: '6' },
    { name: 'Phường Phường 11', code: '6' },
    { name: 'Phường Phường 12', code: '6' },
    { name: 'Phường Phường 13', code: '6' },
    { name: 'Phường Phường 14', code: '6' },
    { name: 'Phường Phường 15', code: '6' },
    { name: 'Phường Phường 16', code: '6' },
    { name: 'Phường Phường 17', code: '6' },
    { name: 'Phường Phường 18', code: '6' },
    { name: 'Phường Phường 19', code: '6' },
    { name: 'Phường Phường 20', code: '6' },
    { name: 'Phường Phường 21', code: '6' },
    { name: 'Phường Phường 22', code: '6' },
    { name: 'Phường Phường 27', code: '6' },
    { name: 'Phường Phường 28', code: '6' },
    { name: 'Phường Phường 29', code: '6' },
    { name: 'Phường Phường 30', code: '6' },
    { name: 'Phường Phường 31', code: '6' },
    { name: 'Phường Phường 32', code: '6' },
    { name: 'Phường Phường 33', code: '6' },
    { name: 'Phường Phường 34', code: '6' },
    { name: 'Phường Phường 35', code: '6' },
    { name: 'Phường Phường 36', code: '6' },
    { name: 'Phường Tân Hưng', code: '7' },
    { name: 'Phường Tân Kiên', code: '7' },
    { name: 'Phường Tân Phong', code: '7' },
    { name: 'Phường Tân Phú', code: '7' },
    { name: 'Phường Phú Thuận', code: '7' },
    { name: 'Phường Phú Mỹ', code: '7' },
    { name: 'Phường Tân Quy', code: '7' },
    { name: 'Phường Tân Châu', code: '7' },
    { name: 'Phường Him Lam', code: '7' },
    { name: 'Phường Phú Nhuận', code: '7' },
    { name: 'Phường 1', code: '8' },
    { name: 'Phường 2', code: '8' },
    { name: 'Phường 3', code: '8' },
    { name: 'Phường 4', code: '8' },
    { name: 'Phường 5', code: '8' },
    { name: 'Phường 6', code: '8' },
    { name: 'Phường 7', code: '8' },
    { name: 'Phường 8', code: '8' },
    { name: 'Phường 9', code: '8' },
    { name: 'Phường 10', code: '8' },
    { name: 'Phường 11', code: '8' },
    { name: 'Phường 12', code: '8' },
    { name: 'Phường 13', code: '8' },
    { name: 'Phường 14', code: '8' },
    { name: 'Phường 15', code: '8' },
    { name: 'Phường Long Thạnh Mỹ', code: '9' },
    { name: 'Phường Tân Sơn Nhất', code: '9' },
    { name: 'Phường Phước Long A', code: '9' },
    { name: 'Phường Phước Long B', code: '9' },
    { name: 'Phường Hiệp Phú', code: '9' },
    { name: 'Phường Linh Trung', code: '9' },
    { name: 'Phường Trường Thọ', code: '9' },
    { name: 'Phường Phú Hữu', code: '9' },
    { name: 'Phường Tăng Nhơn Phú A', code: '9' },
    { name: 'Phường Tăng Nhơn Phú B', code: '9' },
    { name: 'Phường Bùi Đình Túy', code: '10' },
    { name: 'Phường Đa Phúc', code: '10' },
    { name: 'Phường Đồng Phú', code: '10' },
    { name: 'Phường Hòa Long', code: '10' },
    { name: 'Phường Lý Thường Kiệt', code: '10' },
    { name: 'Phường Nguyễn Chí Thanh', code: '10' },
    { name: 'Phường Nguyễn Duy Trinh', code: '10' },
    { name: 'Phường Phạm Ngũ Lão', code: '10' },
    { name: 'Phường Tân Chay', code: '10' },
    { name: 'Phường Võ Văn Dũng', code: '10' },
    { name: 'Phường 3', code: '11' },
    { name: 'Phường 4', code: '11' },
    { name: 'Phường 5', code: '11' },
    { name: 'Phường 6', code: '11' },
    { name: 'Phường 7', code: '11' },
    { name: 'Phường 8', code: '11' },
    { name: 'Phường 9', code: '11' },
    { name: 'Phường 10', code: '11' },
    { name: 'Phường 11', code: '11' },
    { name: 'Phường 12', code: '11' },
    { name: 'Phường 13', code: '11' },
    { name: 'Phường 14', code: '11' },
    { name: 'Phường 15', code: '11' },
    { name: 'Phường 16', code: '11' },
    { name: 'Phường Thạnh Mỹ', code: '12' },
    { name: 'Phường Thới An', code: '12' },
    { name: 'Phường Trung Mỹ', code: '12' },
    { name: 'Phường Tân Thới Nhất', code: '12' },
    { name: 'Phường Tân Chánh Hiệp', code: '12' },
    { name: 'Phường Tân Thới Đông', code: '12' },
    { name: 'Phường Hiệp Thành', code: '12' },
    { name: 'Phường Đông Hưng Thịnh', code: '12' },
    { name: 'Phường Tăng Nhơn Phú A', code: '12' },
    { name: 'Phường Tăng Nhơn Phú B', code: '12' },
    { name: 'Phường Thạnh Lộc', code: '12' },
    { name: 'Phường Lê Thị Riêng', code: '12' },
    { name: 'Phường Tân Hưng Thuận', code: '12' },
    { name: 'Phường Tân Thới Hiệp', code: '12' },
    { name: 'Phường Tân Quy', code: '12' },
    { name: 'Phường Hiệp An', code: '12' },
    { name: 'Phường Thới An Đông', code: '12' },
    { name: 'Phường Linh Trung', code: '13' },
    { name: 'Phường Linh Chiểu', code: '13' },
    { name: 'Phường Linh Đông', code: '13' },
    { name: 'Phường Bình Thọ', code: '13' },
    { name: 'Phường Tam Hòa', code: '13' },
    { name: 'Phường Hiệp Bình Chánh', code: '13' },
    { name: 'Phường Thủ Thiêm', code: '13' },
    { name: 'Phường Trường Thọ', code: '13' },
    { name: 'Phường Tăng Nhơn Phú A', code: '13' },
    { name: 'Phường Tăng Nhơn Phú B', code: '13' },
    { name: 'Xã An Lợi Đông', code: '14' },
    { name: 'Xã Lê Minh Xuân', code: '14' },
    { name: 'Xã Tân Nhựt', code: '14' },
    { name: 'Xã Tân Túc', code: '14' },
    { name: 'Xã Trung An', code: '14' },
    { name: 'Xã Bình Lợi', code: '14' },
    { name: 'Xã Phạm Văn Chiêu', code: '14' },
    { name: 'Xã Quy Đức', code: '14' },
    { name: 'Xã Hưng Long', code: '14' },
    { name: 'Xã Lê Minh Xuân', code: '14' },
    { name: 'Thị trấn Tân Túc', code: '14' },
    { name: 'Xã An Lợi Đông', code: '15' },
    { name: 'Xã An Lợi Tây', code: '15' },
    { name: 'Xã An Thới Đông', code: '15' },
    { name: 'Xã An Thới Tây', code: '15' },
    { name: 'Xã Cần Thạnh', code: '15' },
    { name: 'Xã Đảo Cần Giờ', code: '15' },
    { name: 'Xã Long Hòa', code: '15' },
    { name: 'Xã Lý Văn Tám', code: '15' },
    { name: 'Xã Phước An', code: '15' },
    { name: 'Xã Tân An', code: '15' },
    { name: 'Xã An Nhơn Tây', code: '16' },
    { name: 'Xã An Phú Đông', code: '16' },
    { name: 'Xã An Thạnh Đông', code: '16' },
    { name: 'Xã Bình Mỹ', code: '16' },
    { name: 'Xã Đông Hòa', code: '16' },
    { name: 'Xã Hóc Hòa', code: '16' },
    { name: 'Xã Phước Hiệp', code: '16' },
    { name: 'Xã Phước Vĩnh An', code: '16' },
    { name: 'Xã Tam Đa', code: '16' },
    { name: 'Thị trấn Củ Chi', code: '16' },
    { name: 'Đông Thạnh', code: '17' },
    { name: 'Tân Thới Nhất', code: '17' },
    { name: 'Tân Xuân', code: '17' },
    { name: 'Trung Chánh', code: '17' },
    { name: 'Bà Điểm', code: '17' },
    { name: 'Đông Thạnh', code: '17' },
    { name: 'Nhị Bình', code: '17' },
    { name: 'Tân Quy', code: '17' },
    { name: 'Tân Thới Nhất', code: '17' },
    { name: 'Tân Xuân', code: '17' },
    { name: 'Xã Phước Lộc', code: '18' },
    { name: 'Xã Nhơn Đức', code: '18' },
    { name: 'Xã Tân Nhơn', code: '18' },
    { name: 'Xã Long Thới', code: '18' },
    { name: 'Xã Phước An', code: '18' },
    { name: 'Xã Phong Phú', code: '18' },
    { name: 'Xã Tân Kiên', code: '18' },
    { name: 'Xã Kiến Thành', code: '18' },
    { name: 'Xã Đa Phước', code: '18' },
    { name: 'Phường Phú Xuân', code: '18' },
    { name: 'Phường Tân Hưng', code: '18' },
    { name: 'Phường Lê Văn Lữ', code: '18' },
    { name: 'Phường Kênh 19/5', code: '18' },
    { name: 'Phường Nhơn Nghĩa', code: '18' },
    { name: 'Phường Phú Hội', code: '18' },
    { name: 'Phường Phước Kiến', code: '18' },
    { name: 'Phường Tên Lình', code: '18' },
    { name: 'Phường Tân Phong', code: '18' },
  ];
  const DVBB = [
    { id: 0, name: 'Dịck vụ bấm biển số xe', code: 'HCM' },
    { id: 1, name: 'Hồ Chí Minh', code: 'HCM' },
    { id: 2, name: 'Hà Nội', code: 'HN' },
    { id: 3, name: 'Đà Nẵng', code: 'DN' },
    { id: 4, name: 'Nha Trang', code: 'NT' },
    { id: 5, name: 'An Giang', code: 'AG' },
    { id: 6, name: 'Bà Rịa - Vũng Tàu', code: 'BRVT' },
    { id: 7, name: 'Bạc Liêu', code: 'BL' },
    { id: 8, name: 'Bắc Kạn', code: 'BK' },
    { id: 9, name: 'Bắc Giang', code: 'BG' },
    { id: 10, name: 'Bắc Ninh', code: 'BN' },
    { id: 11, name: 'Bến Tre', code: 'BT' },
    { id: 12, name: 'Cao Bằng', code: 'CB' },
    { id: 13, name: 'Đắk Lắk', code: 'DL' },
    { id: 14, name: 'Đắk Nông', code: 'DNG' },
    { id: 15, name: 'Điện Biên', code: 'DB' },
    { id: 16, name: 'Đồng Nai', code: 'DN' },
    { id: 17, name: 'Đồng Tháp', code: 'DT' },
    { id: 18, name: 'Gia Lai', code: 'GL' },
    { id: 19, name: 'Hà Giang', code: 'HG' },
    { id: 20, name: 'Hà Nam', code: 'HN' },
    { id: 21, name: 'Hà Tĩnh', code: 'HT' },
    { id: 22, name: 'Hải Dương', code: 'HD' },
    { id: 23, name: 'Hải Phòng', code: 'HP' },
    { id: 24, name: 'Hậu Giang', code: 'HG' },
    { id: 25, name: 'Hòa Bình', code: 'HB' },
    { id: 26, name: 'Hưng Yên', code: 'HY' },
    { id: 27, name: 'Khánh Hòa', code: 'KH' },
    { id: 28, name: 'Kiên Giang', code: 'KG' },
    { id: 29, name: 'Kon Tum', code: 'KT' },
    { id: 30, name: 'Lai Châu', code: 'LC' },
    { id: 31, name: 'Lâm Đồng', code: 'LD' },
    { id: 32, name: 'Lạng Sơn', code: 'LS' },
    { id: 33, name: 'Lào Cai', code: 'LC' },
    { id: 34, name: 'Nam Định', code: 'ND' },
    { id: 35, name: 'Nghệ An', code: 'NA' },
    { id: 36, name: 'Ninh Bình', code: 'NB' },
    { id: 37, name: 'Ninh Thuận', code: 'NT' },
    { id: 38, name: 'Phú Thọ', code: 'PT' },
    { id: 39, name: 'Phú Yên', code: 'PY' },
    { id: 40, name: 'Quảng Bình', code: 'QB' },
    { id: 41, name: 'Quảng Nam', code: 'QN' },
    { id: 42, name: 'Quảng Ngãi', code: 'QG' },
  ];
  const BH = [
    { name: 'Bảo hiểm tai nạn cho người ngồi trên xe',pice:'1.000.000'},
    { name: 'Bảo hiểm vật chất xe ô tô',pice:'3%'},
    { name: 'Bảo hiểm trách nhiệm dân sự tự nguyện',pice:'1.200.000'},
  ];
  const store = [
    { Address: '',store: 'Chọn store' },
    { Address: '11 Công Trường Mê Linh, Quận 1, Thành phố Hồ Chí Minh',store: 'Thành phố Hồ Chí Minh' },
    { Address: '12 Công Trường Mê Linh, Quận 2, Thành phố Hà Nội',store: 'Thành phố Hà Nội' },
    { Address: '13 Công Trường Mê Linh, Quận 3, Thành phố Đà Nẳng',store: 'Thành phố Đà Nẳng' },
    { Address: '14 Công Trường Mê Linh, Quận 4, Thành phố Nha Trang',store: 'Thành phố Nha Trang' },
  ];
  const Gio = [
    {value:1,buoi: '1'},
    {value:2,buoi: '1'},
    {value:3,buoi: '1'},
    {value:4,buoi: '1'},
    {value:5,buoi: '1'},
    {value:6,buoi: '1'},
    {value:7,buoi: '1'},
    {value:8,buoi: '1'},
    {value:9,buoi: '1'},
    {value:10,buoi: '1'},
    {value:11,buoi: '1'},
    {value:12,buoi: '1'},
    {value:13,buoi: '2'},
    {value:14,buoi: '2'},
    {value:15,buoi: '2'},
    {value:16,buoi: '2'},
    {value:17,buoi: '2'},
    {value:18,buoi: '2'},
    {value:19,buoi: '2'},
    {value:20,buoi: '2'},
    {value:21,buoi: '2'},
    {value:22,buoi: '2'},
    {value:23,buoi: '2'},
    {value:24,buoi: '2'},
  ];
  const Phut = [
    {value:"00"},
    {value:"01"},
    {value:"02"},
    {value:"03"},
    {value:"04"},
    {value:"05"},
    {value:"06"},
    {value:"07"},
    {value:"08"},
    {value:"09"},
    {value:"10"},
    {value:"11"},
    {value:"12"},
    {value:"13"},
    {value:"14"},
    {value:"15"},
    {value:"16"},
    {value:"17"},
    {value:"18"},
    {value:"19"},
    {value:"20"},
    {value:"21"},
    {value:"22"},
    {value:"23"},
    {value:"24"},
    {value:"25"},
    {value:"26"},
    {value:"27"},
    {value:"28"},
    {value:"29"},
    {value:"30"},
    {value:"31"},
    {value:"32"},
    {value:"33"},
    {value:"34"},
    {value:"35"},
    {value:"36"},
    {value:"37"},
    {value:"38"},
    {value:"39"},
    {value:"40"},
    {value:"41"},
    {value:"42"},
    {value:"43"},
    {value:"44"},
    {value:"45"},
    {value:"46"},
    {value:"47"},
    {value:"48"},
    {value:"49"},
    {value:"50"},
    {value:"51"},
    {value:"52"},
    {value:"53"},
    {value:"54"},
    {value:"55"},
    {value:"56"},
    {value:"57"},
    {value:"58"},
    {value:"59"},
    {value:"60"},
  ];
  const Back =[
    {id:1,img:"",back:"---- ---- ---- ---- -------",number:"---------",Qr:"icon-Qr.jpg",href:"http:"},
    {id:2,img:"/imges/logo/l1.jpg",back:"Ngân Hàng TMCP Quân đội",number:"8763539465",Qr:"Qr-mc.jpg",href:"http:"},
    {id:3,img:"/imges/logo/l11.png",back:"Ví điện tử MOMO",number:"0909471800",Qr:"Qr-momo.jpg",href:"https://me.momo.vn/j8IyuAIzuWfkFDTjioIW/4QbY7ZvmxxV9ezq"},
    {id:4,img:"/imges/logo/l12.jpg",back:"Ví điện tử VNPAY",number:"0909471800",Qr:"icon-Qr.jpg",href:"http:"},
  ];
  const paymentURL = 'https://example.com/momo/payment?amount=100000&description=Thanh toán đơn hàng #123';
  const [Backvaleu,setBackvaleu] = useState(1);
  const [showp, setshowp] = useState(false);
  const [showp1, setshowp1] = useState(false);
  const [showp2, setshowp2] = useState(false);
  const [showp3, setshowp3] = useState(false);
  const [showp4, setshowp4] = useState(false);
  const [Showcontract, setShowcontract] = useState(true);
  const [Showcontract1, setShowcontract1] = useState(false);
  const [Showcontract2, setShowcontract2] = useState(false);
  const [Buoi, setBuoi] = useState(0);
  const [Gionhan, setGionhan] = useState(0);
  const [Phutnhan, setPhutnhan] = useState(0);
  const [selectedStore, setSelectedStore] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [selectedDay, setSelectedDay] = useState(null);
  const [inputDiachi, setInputinputDiachi] = useState('');
  const [selectedWard, setSelectedWard] = useState("");

  const backimg = (event) => {
    setBackvaleu(event.target.alt);
  };
  const handleInputChangeDiachi = (event) => {
    setInputinputDiachi(event.target.value);
  };
  const handleDayChange = (event) => {
    const Daye = event.target.value;
    setSelectedDay(Daye);
  };
  const handleStoreChange = (event) => {
    const selectedStore = event.target.value;
    setSelectedStore(selectedStore);

    // Tìm địa chỉ của store được chọn
    const address = store.find((store) => store.store === selectedStore).Address;
    setStoreAddress(address);
  };
  const handleChangeBuoi = (event) => {
    setBuoi(event.target.value);
  };
  const handleChangeGio = (event) => {
    setGionhan(event.target.value);
  };
  const handleChangePhut = (event) => {
    setPhutnhan(event.target.value);
  };
  
  // code an toàn trươc khi làm hươp đồng
  const [securityCode, setSecurityCode] = useState('');
  const correctCode = '689124'; // Mã bảo mật chính xác
  const [message, setMessage] = useState('Người dùng phải nhập mã an toàn để làm hợp đồng');
  const handleInputChange = (event) => {
    setSecurityCode(event.target.value);
  };
  const handleClickShowcontract = () => {
    setShowcontract(!Showcontract);
    setShowcontract1(!Showcontract1);
    const isCodeCorrect = securityCode === correctCode;
    if(securityCode === correctCode)
    {
      setMessage('Mã an toàn đã đúng !');
    }
    else
    {
      setMessage('Mã an toàn không đúng đúng !');
    }
  };
  const isButtonDisabled = securityCode !== correctCode;
  const handleClickShowcontract1 = () => {
    setShowcontract(!Showcontract);
    setShowcontract2(!Showcontract2);
  };
  //
  const [click, setclick] = useState(true);
  const [click1, setclick1] = useState(false);
  const handleClickcontract = () => {
    setclick(!click);
    setclick1(!click1);
  };
  const handleClickcontract1 = () => {
    setclick1(!click1);
    setclick(!click);
  };
  const handleClickshowp = () => {
    setshowp(true);
  };
  const handleClickshowp1 = () => {
    setshowp1(true);
  };
  const handleClickshowp2 = () => {
    setshowp2(true);
  };
  const handleClickshowp3 = () => {
    setshowp3(true);
  };
  const handleClickshowp4 = () => {
    setshowp4(true);
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
  }, []);

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
  const year = currentDate.getFullYear();
 
  const [signatureImage, setSignatureImage] = useState(null);

  const canvasRef = useRef(null); // Ref for the canvas element
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [hasDrawing, setHasDrawing] = useState(false);

  const handleMouseDown = (event) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = event.nativeEvent;
    setLastX(offsetX);
    setLastY(offsetY);
  };

  const handleMouseMove = (event) => {
    if (isDrawing) {
      const { offsetX, offsetY } = event.nativeEvent;
      const ctx = canvasRef.current.getContext('2d'); // Get 2D context
      ctx.beginPath(); // Start a new path
      ctx.moveTo(lastX, lastY); // Move to the last position
      ctx.lineTo(offsetX, offsetY); // Draw a line to the current position
      ctx.strokeStyle = 'black'; // Set stroke style (color)
      ctx.lineWidth = 1.5; // Set line width
      ctx.stroke(); // Draw the line
      setLastX(offsetX); // Update lastX for the next line
      setLastY(offsetY); // Update lastY for the next line
      setHasDrawing(true); // Mark that a drawing exists

      // Convert canvas to PNG data URL and update signatureImage
      const canvasData = canvasRef.current.toDataURL('image/png');
      setSignatureImage(canvasData);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleClearSignature = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setHasDrawing(false);
    setSignatureImage(null); // Clear signatureImage state
  };

  const handleClear = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setHasDrawing(false);
  };
  const refContainer = useRef(null);
  const handleDownloadPDF = () => {
    const element = refContainer.current;
    const element1 = refContainer.current;
    html2canvas(element, element1)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        // Thay đổi kích thước hình ảnh trước khi thêm vào PDF
        const resizedImage = new Image();
        resizedImage.onload = () => {
          const canvas2 = document.createElement('canvas');
          const ctx2 = canvas2.getContext('2d');
          canvas2.width = 800; // Kích thước mong muốn cho hình ảnh
          canvas2.height = 1123; // Kích thước mong muốn cho hình ảnh
          ctx2.drawImage(resizedImage, 0, 0, 800, 1123); // Vẽ hình ảnh đã thu nhỏ lên canvas2
          const resizedImgData = canvas2.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(resizedImgData, 'JPEG', 0, 0);
          pdf.save('Contract(1).pdf');
        };
        resizedImage.src = imgData;
      })
      .catch((err) => {
        console.error(err);
      });
      html2canvas(element1)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        // Thay đổi kích thước hình ảnh trước khi thêm vào PDF
        const resizedImage = new Image();
        resizedImage.onload = () => {
          const canvas2 = document.createElement('canvas');
          const ctx2 = canvas2.getContext('2d');
          canvas2.width = 800; // Kích thước mong muốn cho hình ảnh
          canvas2.height = 1123; // Kích thước mong muốn cho hình ảnh
          ctx2.drawImage(resizedImage, 0, 0, 800, 1123); // Vẽ hình ảnh đã thu nhỏ lên canvas2
          const resizedImgData = canvas2.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(resizedImgData, 'JPEG', 0, 0);
          pdf.save('Contract(2).pdf');
        };
        resizedImage.src = imgData;
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // gửi email
  //
  const { carId } = useParams();
  const {color} = useParams();
  const [car, setcar] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7175/api/Cars`)
            .then(res => setcar(res.data));   
    }, []);
    const [user, setUser] = useState([]);
    useEffect(() => {
      axios.get(`https://localhost:7175/api/Users`)
          .then(res => setUser(res.data));   
    }, []);   
// cập nhật dư liệu
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setphone] = useState('');
  const [CMND, setCMND] = useState('');
  const [daycap, setdaycap] = useState('');
  const [ngaycap, setNgaycap] = useState('');
  const [birth, setbirth] = useState('');
  const [mau, setmau] = useState('');
  const [deliveryAddress, setdeliveryAddress] = useState('');
  const [intoMoney, setintoMoney] = useState();

  const handleSubmituser = async (event) => {
    event.preventDefault();
    const newDate = daycap.split('/');
    const convertedDate = `${newDate[2]}${newDate[1]}${newDate[0]}`;
    setNgaycap(convertedDate);
    try {
     
      const response = await axios.put(
        `https://localhost:7175/api/Users/${userId}` ,
        {
          fullname: name,
          email: email,
          phoneNumber: phone,
          address: deliveryAddress,
          id:userId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (response.status === 200) { // Handle successful update based on API response
        alert('Có lỗi xảy ra khi cập nhật thông tin người dùng!');
        // Optionally, reset form or redirect to user profile page
      } else {
        alert('Cập nhật thông tin người dùng thành công!'); // Informative error message
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Có lỗi xảy ra khi cập nhật thông tin người dùng.'); // Informative error message
    } 

  };
  const [Cars, setCars] = useState([]);
  useEffect(() => {
    const id =carId ; // Thay thế bằng ID thực tế của chiếc xe
    axios.get(`https://localhost:7175/api/Cars/${id}`)
      .then(res => {
        setCars(res.data);
        if (res.data && res.data.price) {
          setintoMoney(res.data.price);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmitupdate = async (e) => {
    e.preventDefault();
    if (!hasDrawing) {
      alert('Vui lòng ký tên trước khi xác nhận');
      return;
    }
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL('image/png');
    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob(resolve, 'image/png'); // Convert data URL to Blob
    });
    const formData = new FormData();
    formData.append('UserId', userId);//
    formData.append('CarId', carId);//
    formData.append('DeliveryAddress', deliveryAddress);// hậu khẩu tc =
    formData.append('SignatureImage', blob, 'signature.png');//
    formData.append('ContractPath',birth );//
    formData.append('Note', color ); //
    formData.append('IntoMoney',CMND  );//
    formData.append('Quantity', ngaycap);//
    formData.append('ServiceDetailId',1 ); //
    formData.append('PaymentId',1 );//
    formData.append('PromotionDetailId', 1);//
    formData.append('Status', 2);
    formData.append('signature', 'signatures/5883b6a0-335d-48d9-a883-2ce287f280cc.jpg');

    // Handle signature image if provided
    // const blobData = await fetch(signatureImage).then((response) => response.blob());
    // // Append the Blob to the form data as 'SignatureImage'
    // formData.append('SignatureImage', blobData, 'signature.png'); // Optional filename
    try {
      const response = await axios.post(
        'https://localhost:7175/api/DepositContracts',
        formData,
        {
          headers: {
            'accept': '*/*',
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Response:', response.data);
      alert('ký hợp đồng đặt xe thành công');
      // Handle successful response here (e.g., display success message)
    } catch (error) {
      console.error('Error:', error);
      // Handle errors here (e.g., display error message)
      alert('ký hợp đồng đặt xe thất bại');
    }
  };
  //loại xe
  const [Models, setModels] = useState([]);
  useEffect(() => {
      axios.get(`https://localhost:7175/api/Models`)
          .then(res => setModels(res.data));   
    }, []);
  return (
    <body class='Desktop'>
      <Navbar/>
      {car.filter((car) => car.id == carId).map(item =>
      <div class='contract-past-1' style={{ display: Showcontract ? 'flex' : 'none' }}>
        <div class='contract-past-1-left'>
          <div class='contract-past-1-left-1'>
            <h1 style={{fontSize:"60px",margin:"20px 0px"}}>Lamborghini</h1>
            <h3>Thông tin khách hàng </h3>
            {user.filter((user) => user.id == userId ).map(item =>
            <form onSubmit={handleSubmituser}>
              <input type='text' placeholder="Họ và tên" style={{width:"96%"}} pattern="[^\d]*" value={name} onChange={(event) => setName(event.target.value)}></input>
              <div style={{display:"flex"}}>
                <input type='email' placeholder="Email" style={{width:"70%"}} value={item.email} onChange={(event) => setEmail(event.target.value)}></input>
                <input type='text' placeholder="Số điện thoại" style={{width:"30%",marginLeft:"10px"}} maxlength="10" minlength="10" value={phone} onChange={(event) => setphone(event.target.value)}></input>
              </div>
              <div style={{display:"flex"}}>
                <input type='text' placeholder="Hộ khẩu thường trú" style={{width:"70%"}} value={deliveryAddress} onChange={(event) => setdeliveryAddress(event.target.value)}></input>
                <input type='text' placeholder="Ngày sinh" style={{width:"30%",marginLeft:"10px"}} value={birth} onChange={(event) => setbirth(event.target.value)}></input>
              </div>
              <div style={{display:"flex"}}>
                <input type='text' placeholder="CMND/CCCD/Hộ chiếu số" style={{width:"70%"}} value={CMND} onChange={(event) => setCMND(event.target.value)}></input>
                <input type='text' placeholder="Cấp ngày" style={{width:"30%",marginLeft:"10px"}} value={daycap} onChange={(event) => setdaycap(event.target.value)} ></input>
              </div>
              <div style={{display:"flex",justifyContent:"center"}}>
                <button style={{width:"30%",marginLeft:"10px",height:"46.6px"}} type="submit">Xác nhận</button>
              </div>
            </form>
             )}
            <h3>Phương thức nhận xe</h3>
            <div class='contract-radio' onClick={handleClickcontract}>
              <span style={{margin:"0px",padding:"0px 2px",border:click ?"1px solid #e8e8e8":"1px solid #005cc8",borderRadius:"2px"}}>
                <FontAwesomeIcon icon={faCheck} style={{width:"16px",height:"16px",borderRadius:"2px",margin:"0px",padding:"0px",color:"#fff",backgroundColor:click ?"#fff":"#005cc8"}}/>
              </span>
              <span>Giao xe tân nơi</span>
              <span style={{float:"right",margin:"0px"}}>5,000,000 vnđ</span>
            </div>
            <div class='contract-radio' onClick={handleClickcontract1}>
              <span style={{margin:"0px",padding:"0px 2px",border:click1 ?"1px solid #e8e8e8":"1px solid #005cc8",borderRadius:"2px"}}>
                <FontAwesomeIcon icon={faCheck} style={{width:"16px",height:"16px",borderRadius:"2px",margin:"0px",padding:"0px",color:"#fff",backgroundColor:click1 ?"#fff":"#005cc8"}}/>
              </span>
              <span>Nhận tại store</span>
              <span style={{float:"right",margin:"0px"}}>Miễn phí</span>
            </div>
            <h3 style={{marginTop:"20px",display:click ?"none":"flex"}}>Chọn địa chỉ nhận xe</h3>
            <div style={{width:"100%",display:click ?"none":"flex"}}>
              <div class='contract-list'>
                <div style={{width:"90%",position:"relative"}}>
                  <p style={{ display: showp ? 'inline' : 'none' }}>Chọn tỉnh / thành phố</p>
                  <select onClick={handleClickshowp} onChange={handleChange}>
                    {TP.map((item) => (
                      <option key={item.id} value={item.code}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{width:"10%",display:"flex"}} >
                  <hr></hr>
                  <FontAwesomeIcon icon={faCaretDown} style={{color:"#757575"}} />
                </div>
              </div>
              <div class='contract-list'style={{marginLeft:"10px"}}>
                <div style={{width:"90%",position:"relative"}}>
                  <p style={{ display: showp1 ? 'inline' : 'none' }}>Chọn quận / huyện</p>
                  <select onClick={handleClickshowp1}  onChange={handleChange1}>
                    {QH.filter((item) => item.code === city).map((item) => (
                      <option value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{width:"10%",display:"flex"}}>
                  <hr></hr>
                  <FontAwesomeIcon icon={faCaretDown} style={{color:"#757575"}} />
                </div>
              </div>
            </div>
            <div style={{width:"100%",display:click ?"none":"flex"}}>
              <div class='contract-list'>
                <div style={{width:"90%",position:"relative"}}>
                  <p style={{ display: showp2 ? 'inline' : 'none' }}>Chọn phường / xã</p>
                  <select onClick={handleClickshowp2} onChange={(e) => setSelectedWard(e.target.value)}>
                    { PX.filter((item) => item.code === wards).map((item) => (
                      <option value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{width:"10%",display:"flex"}}>
                  <hr></hr>
                  <FontAwesomeIcon icon={faCaretDown} style={{color:"#757575"}} />
                </div>
              </div>
              <input type='text' placeholder="Số nhà / tên đường" style={{width:"50%",marginLeft:"10px"}} onChange={handleInputChangeDiachi}></input>
            </div>
            <div style={{width:"100%",display:click ?"none":"flex",border:"1px solid #d9d9d9",borderRadius:"5px",marginBottom:"10px"}}>
              <span style={{margin:"13.5px 23px",fontSize:"14px"}}>Địa chỉ: {inputDiachi},{selectedWard}  , {QH.filter((item) => item.id == wards).map((item) => (<span style={{margin:"0px"}}>{item.name}</span>))}, {TP.filter((item) => item.code === city).map((item) => (<span style={{margin:"0px"}}>{item.name}</span>))}</span>
            </div>
            <div style={{width:"100%",display:click ?"none":"flex"}}>
              <input style={{width:"100%"}} type='text' placeholder="Ghi chú: "></input>
              <button style={{marginLeft:"10px",height:"46.6px"}} >Xát nhận</button>
            </div>
            <h3 style={{marginTop:"20px",display:click1 ?"none":"flex"}}>Chọn địa chỉ store</h3>
            <div style={{width:"100%",display:click1 ?"none":"flex"}}>
              <div class='contract-list'>
                <div style={{width:"90%",position:"relative"}}>
                  <p style={{ display: showp1 ? 'inline' : 'none' }}>Chọn store</p>
                  <select onClick={handleClickshowp1} value={selectedStore} onChange = {handleChange1 ,handleStoreChange} >
                    {store.map((item) => (
                      <option key={item.id} value={item.store}>
                        {item.store}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{width:"10%",display:"flex"}} >
                  <hr></hr>
                  <FontAwesomeIcon icon={faCaretDown} style={{color:"#757575"}} />
                </div>
              </div>
              <div class='contract-list'style={{marginLeft:"10px"}}>
                <div style={{width:"90%",position:"relative"}}>
                  <p style={{ display: showp1 ? 'inline' : 'none' }}>Chọn giờ nhận xe</p>
                  <div style={{display:"flex"}} onClick={handleClickshowp1}  onChange={handleChange1}>
                    <select style={{paddingLeft:"10px",paddingRight:"0px"}} onChange={handleChangeBuoi}>
                      <option value={0}>chọn buổi</option>
                      <option value={1}>AM</option>
                      <option value={2}>PM</option>
                    </select>
                    /
                    <select style={{paddingLeft:"5px",paddingRight:"0px"}} onChange={handleChangeGio}>
                      <option>Chọn giờ</option>
                      {Gio.filter((item) => item.buoi === Buoi).map((item) => (
                      <option key={item.id} >
                        {item.value}:00
                      </option>
                      ))}
                    </select>
                    /
                    <select style={{paddingLeft:"5px",paddingRight:"5px"}} onChange={handleChangePhut}>
                      <option>Chọn phút</option>
                      {Phut.map((item) => (
                      <option key={item.id} >
                        {item.value}
                      </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={{width:"10%",display:"flex"}}>
                  <hr></hr>
                  <FontAwesomeIcon icon={faCaretDown} style={{color:"#757575"}} />
                </div>
              </div>
            </div>
            <div style={{width:"100%",display:click1 ?"none":"flex"}}>
              <div class='contract-list' style={{marginRight:"10px"}}>
                <div style={{width:"90%",position:"relative"}}>
                  <p style={{ display: showp1 ? 'inline' : 'none' }}>Chọn ngày nhận xe</p>
                        <DayPicker
                            mode="single"
                            selected={selectedDay} 
                            onChange={handleDayChange}
                          />
                </div>
              </div>
              <div style={{display:"block",width:"100%"}}>
                <div class='contract-list'style={{display:"block",height:"max-content",width:"90%",padding:"5%"}}>
                  <div>
                    <h4>Store nhận xe: <i><u>{storeAddress}</u></i></h4>
                    <h4>Ngày nhận xe:  <i><u>{selectedDay}</u></i></h4>
                    <h4>Thời gian nhận xe: <i><u>{Gionhan} giờ {Phutnhan} phút</u></i></h4>
                  </div>
                  <div style={{display:"flex",textAlign:"center",justifyContent:"center"}}>
                    <button>Xát nhận</button>
                  </div>
                </div>
                <div class='contract-list'style={{display:"block",height:"max-content",width:"90%",padding:"5%"}}>
                  <input style={{border:"none",padding:"0px",width:"100%"}} type='text' placeholder="Ghi chú: "></input>
                </div>
              </div>
            </div>
            <h3 style={{marginTop:"20px"}}>Chọn phương thức thanh toán</h3>
            <div style={{width:"100%",display:"flex"}}>
              <div class='contract-list' style={{display:"block"}} >
                <img src='/imges/logo/l1.jpg' alt="2"  onClick={backimg}></img>
                <img src='/imges/logo/l11.png' alt="3"  onClick={backimg}></img>
                <img src='/imges/logo/l12.jpg' alt="4"  onClick={backimg}></img>
                <div class="img-Qr">
                  {Back.filter((item) => item.id == Backvaleu).map((item) => (
                    <>
                      <img src={`/imges/logo/${item.Qr}`} alt=''></img>
                      <h4 style={{width:"100%",textAlign:"center"}}>{item.back}</h4>
                    </>
                    ))}
                </div>
                <div style={{display:"flex",textAlign:"center",justifyContent:"center",marginBottom:"20px" }}>
                {Back.filter((back) => back.id == Backvaleu).map((item) => (
                    <div >
                        {item.id === 4 ? (
                              <PaymentPage/>
                            ) : (
                              <a href="https://me.momo.vn/j8IyuAIzuWfkFDTjioIW/4QbY7ZvmxxV9ezq" target="_blank" style={{ color: "#000", textDecoration: "none", border: "1px solid #000", padding: "10px 20px"}} rel="noreferrer">Link chuyển khoản</a>
                        )}
                    </div>
                ))}
                </div>   
                <div>
                  <h4 style={{margin:"5px 0px"}}>Số tài khoản</h4>
                  <div class='contract-bank'>
                  {Back.filter((item) => item.id == Backvaleu).map((item) => (
                      <>
                        <span>{item.number}</span>
                      </>
                    ))}
                  </div>
                  <h4 style={{margin:"5px 0px"}}>Người nhận</h4>
                  <div class='contract-bank'>
                    <span>Nguyễn Trần Quốc Đạt</span>
                  </div>
                </div>
              </div>
              <div class='contract-list' style={{marginLeft:"10px",display:"block"}}>
                
                <div>
                  <h3>Lưu ý cho quý khách hàng:</h3>
                  <ol>
                    <li>Quý khách xem mình đã nhập đủ các thông tin bên trên chưa?</li>
                    <li>Quý khách xem xét các điều khoản của công ty/chi nhánh công ty ở Việt Nam.</li>
                    <li>
                       Nếu quý khách chọn thanh toán bằng mã QR vui lòng chụp màng hình sau khi thanh toán/chuyển khoản để đảm bảo quyền lợi của mình khi kệ thống bị sai sót.
                    </li>
                    <li>
                      Nếu quý khách chọn thanh toán bằng Link thanh tóa quý khách vui là kiểm tra Email để lấy link thanh tóa, và vui 
                      lòng chụp lại màng hình khi thanh tóa thành công.
                    </li>
                    <li>Quý khách lưu hợp đồng đặt cọc xe đã ký kết của mình về thiết bị thông minh.</li>
                  </ol>
                </div>
              </div>
            </div>
            <h3 style={{marginTop:"20px"}}>Xe hợp đồng</h3>
            <div style={{width:"100%",display:"flex",marginBottom:"10px"}}>
              <p style={{width:"40%",height:"1px",backgroundColor:"#000",margin:"auto 10px"}}></p>
              <input type="password" placeholder="Mã an toàn" value={securityCode} onChange={handleInputChange} style={{margin:"0px",width:"30%",height:"10px",textAlign:"center"}}></input>
              <p style={{width:"40%",height:"1px",backgroundColor:"#000",margin:"auto 10px"}}></p>
            </div>
            <div style={{width:"100%",display:"flex",marginBottom:"10px"}}>
              <p style={{maxWidth:"40%",minWidth:"15%",height:"1px",backgroundColor:"#000",margin:"auto 10px"}}></p>
              <p style={{maxWidth:"90%",minWidth:"15%",margin:"auto"}}>{message}</p>
              <p style={{maxWidth:"40%",minWidth:"15%",height:"1px",backgroundColor:"#000",margin:"auto 10px"}}></p>
            </div>
            <div style={{width:"100%",display:"flex"}}>
              <button onClick={handleClickShowcontract} disabled={isButtonDisabled}>Làm hợp đồng đặt cọc xe</button>
              <button style={{marginLeft:"10px"}} onClick={handleClickShowcontract1}>xem trước hợp đồng đặt cọc xe</button>
            </div>
          </div>
        </div>
        <div class='contract-past-1-right'>
          <div class='contract-past-1-right-1'>
            <div  class='contract-past-1-right-1-left'>
              <img src={`/imges/car/${item.mainImage}`} alt="hinh"></img>
            </div>
            <div class='contract-past-1-right-1-right'>
              <h2>{item.name}</h2>
              <h2 >{item.price}.000.000.000 VNĐ</h2>
            </div>
          </div>
          <hr></hr>
          <div class='contract-past-1-right-2'>
            <h3>Dịch vụ store</h3>
            <div class='contract-list'>
              <div style={{width:"90%",position:"relative"}}>
                <p style={{ display: showp3 ? 'inline' : 'none' }}>Dịck vụ bấm biển số xe</p>
                <select onClick={handleClickshowp3}>
                  { DVBB.map((item) => (
                    <option>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{width:"10%",display:"flex"}}>
                <hr></hr>
                <FontAwesomeIcon icon={faCaretDown} style={{color:"#757575"}} />
              </div>
            </div>
            <div class='contract-radio'>
              <input type="checkbox" value="" style={{margin:"0px 10px"}}></input>
              <span>Bảo hiểm tai nạn cho người ngồi trên xe</span>
            </div>
            <div class='contract-radio'>
              <input type="checkbox"value="" style={{margin:"0px 10px"}}></input>
              <span>Bảo hiểm vật chất xe ô tô</span>
            </div>
            <div class='contract-radio'>
              <input type="checkbox" value="" style={{margin:"0px 10px"}}></input>
              <span>Bảo hiểm trách nhiệm dân sự tự nguyện</span>
            </div>
          </div>
          <hr></hr>
          <div class='contract-past-1-right-2'>
            <h3>Tạm tính</h3>
            <div class='Provisional'>
              <div class='Provisional-left'>
                <p>{item.name}</p>
                <p>Dịck vụ bấm biển số xe / Thành phố Hồ Chí Minh</p>
                <p>Bảo hiểm tai nạn cho người ngồi trên xe</p>
                <p>Bảo hiểm vật chất xe ô tô</p>
                <p>Bảo hiểm trách nhiệm dân sự tự nguyện</p>
              </div>
              <div class='Provisional-right'>
                <p>{item.price}.000.000.000 vnđ</p>
                <p>5.000.000 vnđ</p>
                <p>2.000.000 vnđ</p>
                <p>{(item.price * 2)/100}.000.000 vnđ</p>
                <p>3.000.000 vnđ</p>
              </div>
            </div>
          </div>
          <hr></hr>
          <div class='contract-past-1-right-2'>
            <div class='Provisional'>
              <div class='Provisional-left'>
                <p>Tổng cộng</p>
              </div>
              <div class='Provisional-right'>
                <p>{item.price}.000.000.000 vnđ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      {car.filter((car) => car.id == carId).map(item =>
      <div style={{ display: Showcontract1 ? 'inline':'none'}}>
        <form class='contract' onSubmit={handleSubmitupdate}>
            <div  class='Showdeposits'  ref={refContainer} >
                <h3 style={{textAlign:"center"}}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
                <h3 style={{textAlign:"center"}}><i>Độc lập – Tự do – Hạnh phúc</i></h3>
                <h3 style={{textAlign:"center"}}>— — — o0o — — —</h3>
                <h1 style={{textAlign:"center"}}>HỢP ĐỒNG ĐẶT CỌC MUA BÁN Ô TÔ</h1>
                <p style={{textAlign:"center",marginBottom:"46px"}}>Số:......./......./HĐ</p>
                <p>Hôm nay, ngày <u>{day}</u> tháng <u>{month}</u> năm <u>{year}</u> . Chúng tôi gồm có:</p>
                {/* bên A */}
                <p style={{marginLeft:"40px"}}><b>Bên nhận đặt cọc</b> (sau đây gọi là bên A):</p>
                <p>Ông :<span>Nguyễn Trần Quốc Đạt</span></p>
                <p>Sinh năm : <span>18/04/2003</span></p>
                <p>CMND/CCCD/Hộ chiếu số:<span>079203003058</span>cấp ngày<span>22/11/2021</span></p>
                <p>Hộ khẩu thường trú :<span>59 Đường 9A,Long Bình, Thành phố Thủ Đức, Hồ Chí Minh</span></p>
                {/* bên B */}
                <p style={{marginLeft:"40px"}}><b>Bên đặt cọc</b> (sau đây gọi là bên B):</p>
                <p>Ông/Bà :<span>{name}</span></p>
                <p>Sinh năm :<span>{birth}</span></p>
                <p>CMND/CCCD/Hộ chiếu số:<span>{CMND}</span>cấp ngày<span>{daycap}</span></p>
                <p>Hộ khẩu thường trú :<span>{deliveryAddress}</span></p>
                <p><b>Hai bên đồng ý thực hiện ký kết Hợp đồng đặt cọc với các thỏa thuận sau đây:</b></p>
                <h3>ĐIỀU 1</h3>
                <h3>TÀI SẢN ĐẶT CỌC</h3>
                <p>– Số tiền: 5.000.000 đồng (bằng chữ: năm triệu đồng).</p>
                <p>– Bên B giao cho bên A số tiền đặt cọc nêu trên vào ngày <u>{day}</u> tháng <u>{month}</u> năm <u>{year}</u></p>
                <h3>ĐIỀU 2</h3>
                <h3>THỜI HẠN HỦY ĐẶT CỌC</h3>
                <p>Thời hạn hủy đặt cọc: Trong thời hạn <u>{day +7}</u> tháng <u>{month}</u> năm <u>{year}</u> (1 tuần), kể từ ngày <u>{day}</u> tháng <u>{month}</u> năm <u>{year}</u></p>
                <h3>ĐIỀU 3</h3>
                <h3>MỤC ĐÍCH ĐẶT CỌC</h3>
                <ol>
                <li> 
                  Để đảm bảo cho việc bán và mua xe. Nhãn hiệu: Lamborghini, Tên xe:  {item.name}, Loại xe: {Models.filter((models)=> models.id == item.modelId).map(item => <>{item.name}</> )}, màu sơn: {color},
                  qua trình lây truyền: {item.transmission}, mã lực: {item.horsepower}  HP(M), mô-men xoắn: {item.torque} (Nm),
                  hệ thống truyền lực: {item.drivetrain}, số chỗ ngồi: {item.seatingCapacity}, chiều dài: {item.length} mm, 
                  chiều rộng: {item.width} mm, chiều cao: {item.height} mm.
                </li>
                <li>Thuế, lệ phí liên quan đến việc bán xe nêu trên do hai bên thỏa thuận như sau:</li>
                </ol>
                <p>+ Thuế thu nhập cá nhân và phí công chứng do bên bán chịu trách nhiệm nộp.</p>
                <p>+ Lệ phí trước bạ do bên mua chịu trách nhiệm nộp.</p>
                <h3>ĐIỀU 4</h3>
                <h3>NGHĨA VỤ VÀ QUYỀN CỦA BÊN A</h3>
                <p style={{marginLeft:"40px"}}><b>1.Bên A có các nghĩa vụ sau đây:</b></p>
                <p style={{marginLeft:"80px"}}>a) Giao số tiền đặt cọc cho bên B theo thỏa thuận;</p>
                <p style={{marginLeft:"80px"}}>b) Giao kết và thực hiện nghĩa vụ đã thỏa thuận tại Điều 1, Điều 2, Điều 3 của hợp đồng này.</p>
                <p style={{textAlign:"center",margin:"0px"}}>1</p>
            </div>
            {/* trang 2 trong hợp đồng */}
            <div  class='Showdeposits' ref={refContainer}>
                <p style={{marginLeft:"40px"}}><b>2. Bên A có các quyền sau đây:</b></p>
                <p style={{marginLeft:"80px"}}>
                Nhận lại số tiền đặt cọc từ bên B hoặc được trừ khi thực hiện nghĩa vụ trả tiền cho bên B trong trường hợp hai bên ký kết hợp
                đồng mua bán đã nêu tại Điều 1, Điều 2 hợp đồng này;
                </p>
                <h3>ĐIỀU 5</h3>
                <h3>NGHĨA VỤ VÀ QUYỀN CỦA BÊN B</h3>
                <p style={{marginLeft:"40px"}}><b>1.Bên B có các nghĩa vụ sau đây:</b></p>
                <p style={{marginLeft:"80px"}}>a) Giao kết và thực hiện nghĩa vụ đã thỏa thuận tại Điều 1, Điều 2, Điều 3 của hợp đồng này.</p>
                <div style={{display:"flex",margin:"0px 0px 0px 80px"}}>
                <p style={{margin:"0px 3px 0px 0px"}}>b)</p>
                <p style={{margin:"0"}}>
                    Trả lại số tiền đặt cọc cho bên A hoặc trừ khi thực hiện nghĩa vụ trả tiền của bên A trong trường hợp hai bên ký kết hợp 
                    đồng mua bán theo cam kết hợp đồng này.
                </p>
                </div>
                <p style={{marginLeft:"40px"}}><b>2. Bên B có các quyền sau đây:</b></p>
                <div style={{display:"flex",margin:"0px 0px 0px 80px"}}>
                <p style={{margin:"0px 2px 0px 0px"}}>a)</p>
                <p style={{margin:"0"}}>
                    Yêu cầu bên A thanh toán số tiền mua xe còn lại khi hai bên ký kết hợp đồng mua bán xe nêu tại Điều 1, Điều 2, Điều 3 hợp đồng
                    này; trong trường hợp hai bên ký kết hợp đồng mua bán thì tiền đặt cọc kể trên được khấu trừ vào nghĩa vụ trả tiền của bên A
                    theo Hợp đồng mua bán.
                </p>
                </div>
                <div style={{display:"flex",margin:"0px 0px 0px 80px"}}>
                <p style={{margin:"0px 2px 0px 0px"}}>b)</p>
                <p style={{margin:"0"}}>
                    Không trả lại số tiền đã nhận cọc cho bên A nếu bên A từ chối không ký hợp đồng mua bán theo thỏa thuận của hợp đồng này.
                </p>
                </div>
                <h3>ĐIỀU 6</h3>
                <h3>PHƯƠNG THỨC GIẢI QUYẾT TRANH CHẤP</h3>
                <p>
                Trong quá trình thực hiện Hợp đồng, nếu phát sinh tranh chấp, các bên cùng nhau thương lượng giải quyết trên nguyên tắc tôn 
                trọng quyền lợi của nhau. Trong trường hợp không giải quyết được, thì một trong hai bên có quyền khởi kiện để yêu cầu tòa án 
                có thẩm quyền giải quyết theo quy định của pháp luật.
                </p>
                <h3>ĐIỀU 7</h3>
                <h3>CAM ĐOAN CỦA CÁC BÊN</h3>
                <p style={{marginLeft:"40px"}}><b>Bên A và bên B chịu trách nhiệm trước pháp luật về những lời cam đoan sau đây:</b></p>
                <ol style={{marginLeft:"40px"}}>
                <li>Việc giao kết Hợp đồng này hoàn toàn tự nguyện, không bị lừa dối hoặc ép buộc;</li>
                <li>Thực hiện đúng và đầy đủ tất cả các thỏa thuận đã ghi trong Hợp đồng này;</li>
                <li>Việc giao nhận số tiền đặt cọc theo hợp đồng này do hai bên tự thực hiện, chịu trách nhiệm trước pháp luật.</li>
                <li>
                    Hai bên cam đoan trong thời hạn: <u>6</u> tháng , kể từ ngày <u>{day}</u> tháng <u>{month}</u> năm <u>{year}</u>, hai bên tiến hành thủ tục công chứng mua bán xe nêu 
                    trên tại cơ quan có thẩm quyền theo quy định của pháp luật như đã thỏa thuận; trường hợp:
                </li>
                </ol>
                <p>
                – Quá thời hạn <u>6</u> tháng, kể từ ngày <u>{day}</u> tháng <u>{month}</u> năm <u>{year}</u>. mà bên B không thực hiện thủ tục bán xe cho bên A theo quy định của pháp 
                luật thì bên B phải trả lại số tiền đặt cọc đã nhận của bên A là: 5.000.000 đồng (bằng chữ: năm triệu đồng) đồng thời phải nộp 
                phạt vi phạm cho bên A số tiền Tối đa 12% giá trị giá trị hợp đồng được quy định trong Luật Thương mại 2005. Tuy nhiên 
                chính sách của Lamborghini sẽ bồi thường hợp đồng là 15.000.000 đồng (bằng chữ: mười lăm triệu đồng).
                </p>
                <p>
                – Quá thời hạn <u>6</u> thánh, kể từ ngày <u>{day}</u> tháng <u>{month}</u> năm <u>{year}</u>. mà bên A không thực hiện thủ tục mua xe theo quy định của pháp luật thì bên
                A mất số tiền đã đặt cọc là: 5.000.000 đồng (bằng chữ: 5.000.000 đồng).
                </p>
                <h3>ĐIỀU 8</h3>
                <h3>ĐIỀU KHOẢN CUỐI CÙNG</h3>
                <p>Hai bên đã hiểu rõ quyền, nghĩa vụ, lợi ích hợp pháp của mình và hậu quả pháp lý của việc giao kết Hợp đồng này.</p>
                <div style={{display:"flex",width:"100%"}}>
                  <div style={{width:"50%"}}>
                      <div style={{height:"150px"}}>
                      <p style={{textAlign:"center",marginBottom:"0px"}}><b>Bên A</b></p>
                      <img src='/imges/logo/chữ kýremovebg-preview.png' alt="hinh"></img>
                      </div>
                      <div style={{height:"100px"}}>
                      <p style={{textAlign:"center"}}>(Ký và ghi rõ họ tên)</p>
                      <p style={{textAlign:"center"}}><i>Nguyễn Trần Quốc Đạt</i></p>
                      </div>
                  </div>
                  <div style={{width:"50%"}}>
                      <div style={{height:"150px"}}>
                        <p style={{textAlign:"center",marginBottom:"0px"}}><b>Bên B</b></p>
                        <div style={{display:"flex"}}>
                            <canvas
                            ref={canvasRef} // Attach event listeners to the canvas
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            width={500}
                            height={150}
                            // style={{ border: '1px solid #e8e8e8' }}
                            />
                            {hasDrawing && (
                            <>
                              <button onClick={handleClear}>Xóa</button>
                             
                            </>
                            )}
                        </div>
                      </div>
                      <div style={{height:"100px"}}>
                        <p style={{textAlign:"center"}}>(Ký và ghi rõ họ tên)</p>
                        <p style={{display:'flex',justifyContent:"center"}}><i>{name}</i></p>
                      </div>
                  </div>
                </div>
                <p style={{textAlign:"center",margin:"0px"}}>2</p>
            </div>
         </form>    
        {/* contron  Showdeposits */}
        <div class='Showdeposits-1'>
            <div class='icon-hexagon-5' style={{margin:"auto"}} onClick={handleClickShowcontract}>
              <div class='icon-hexagon-6'>
                  <FontAwesomeIcon icon={faXmark} class='icon-hexagon-right' />
              </div>   
            </div> 
            <hr></hr>
            <div class='icon-hexagon-5' style={{margin:"auto"}} >
              <div class='icon-hexagon-6'>
                  <FontAwesomeIcon icon={faQuestion} class='icon-hexagon-right'/>
              </div> 
            </div>
            <hr></hr>
            <div class='icon-hexagon-5' style={{margin:"auto"}} onClick={handleDownloadPDF}>
              <div class='icon-hexagon-6'>
                  <FontAwesomeIcon icon={faDownload} class='icon-hexagon-right'/>
              </div>   
            </div>
            <hr></hr>
            <div class='icon-hexagon-5' style={{margin:"auto"}} onClick={handleSubmitupdate}>
              <div class='icon-hexagon-6'>
                  <FontAwesomeIcon icon={faCheck} class='icon-hexagon-right'/>
              </div>   
            </div>
        </div>
      </div>
      )}
      <div style={{ display: Showcontract2 ? 'inline':'none'   }}>
        <form class='contract' onSubmit={handleSubmitupdate}>
            <div  class='Showdeposits'  ref={refContainer} >
                <h3 style={{textAlign:"center"}}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
                <h3 style={{textAlign:"center"}}><i>Độc lập – Tự do – Hạnh phúc</i></h3>
                <h3 style={{textAlign:"center"}}>— — — o0o — — —</h3>
                <h1 style={{textAlign:"center"}}>HỢP ĐỒNG ĐẶT CỌC MUA BÁN Ô TÔ</h1>
                <p style={{textAlign:"center",marginBottom:"46px"}}>Số:......./......./HĐ</p>
                <p>Hôm nay, ngày <u>{day}</u> tháng <u>{month}</u> năm <u>{year}</u> . Chúng tôi gồm có:</p>
                {/* bên A */}
                <p style={{marginLeft:"40px"}}><b>Bên nhận đặt cọc</b> (sau đây gọi là bên A):</p>
                <p>Ông : Nguyễn Trần Quốc Đạt .</p>
                <p>Sinh năm : 18/04/2003 .</p>
                <p>CMND/CCCD/Hộ chiếu số: 079203003058 cấp ngày 22/11/2021 tại Cục cảnh quản lý hành chính về trật tự xã hội Hồ Chí Minh</p>
                <p>Hộ khẩu thường trú : 59 Đường 9A,Long Bình, Thành phố Thủ Đức, Hồ Chí Minh.</p>
                {/* bên B */}
                <p style={{marginLeft:"40px"}}><b>Bên đặt cọc</b> (sau đây gọi là bên B):</p>
                <p>Ông/Bà : <input type='text' placeholder={name}></input></p>
                <p>Sinh năm : <input type='text' placeholder={birth}></input></p>
                <p>CMND/CCCD/Hộ chiếu số: <input type='text' placeholder={CMND}></input> cấp ngày <input type='text'></input> tại <input type='text'></input></p>
                <p>Hộ khẩu thường trú :<input type='text'></input></p>
                <p><b>Hai bên đồng ý thực hiện ký kết Hợp đồng đặt cọc với các thỏa thuận sau đây:</b></p>
                <h3>ĐIỀU 1</h3>
                <h3>TÀI SẢN ĐẶT CỌC</h3>
                <p>– Số tiền: 5.000.000 đồng (bằng chữ: năm triệu đồng).</p>
                <p>– Bên B giao cho bên A số tiền đặt cọc nêu trên vào ngày <u>{day}</u> tháng <u>{month}</u> năm <u>{year}</u></p>
                <h3>ĐIỀU 2</h3>
                <h3>THỜI HẠN HỦY ĐẶT CỌC</h3>
                <p>Thời hạn hủy đặt cọc: Trong thời hạn <u>{day +7}</u> tháng <u>{month}</u> năm <u>{year}</u> (1 tuần), kể từ ngày <u>{day}</u> tháng <u>{month}</u> năm <u>{year}</u></p>
                <h3>ĐIỀU 3</h3>
                <h3>MỤC ĐÍCH ĐẶT CỌC</h3>
                <ol>
                <li> 
                  Để đảm bảo cho việc bán và mua xe. Nhãn hiệu: Lamborghini, Tên xe:  ……………., Loại xe: ……………., màu sơn: …………….,
                  qua trình lây truyền: ……………., mã lực: …………….  HP(M), mô-men xoắn: ……………. (Nm),
                  hệ thống truyền lực: ……………., số chỗ ngồi: ……………., chiều dài: ……………. mm, 
                  chiều rộng: ……………. mm, chiều cao: ……………. mm.
                </li>
                <li>Thuế, lệ phí liên quan đến việc bán xe nêu trên do hai bên thỏa thuận như sau:</li>
                </ol>
                <p>+ Thuế thu nhập cá nhân và phí công chứng do bên bán chịu trách nhiệm nộp.</p>
                <p>+ Lệ phí trước bạ do bên mua chịu trách nhiệm nộp.</p>
                <h3>ĐIỀU 4</h3>
                <h3>NGHĨA VỤ VÀ QUYỀN CỦA BÊN A</h3>
                <p style={{marginLeft:"40px"}}><b>1.Bên A có các nghĩa vụ sau đây:</b></p>
                <p style={{marginLeft:"80px"}}>a) Giao số tiền đặt cọc cho bên B theo thỏa thuận;</p>
                <p style={{marginLeft:"80px"}}>b) Giao kết và thực hiện nghĩa vụ đã thỏa thuận tại Điều 1, Điều 2, Điều 3 của hợp đồng này.</p>
                <p style={{textAlign:"center",margin:"0px"}}>1</p>
            </div>
            {/* trang 2 trong hợp đồng */}
            <div  class='Showdeposits' ref={refContainer}>
                
                <p style={{marginLeft:"40px"}}><b>2. Bên A có các quyền sau đây:</b></p>
                <p style={{marginLeft:"80px"}}>
                Nhận lại số tiền đặt cọc từ bên B hoặc được trừ khi thực hiện nghĩa vụ trả tiền cho bên B trong trường hợp hai bên ký kết hợp
                đồng mua bán đã nêu tại Điều 1, Điều 2 hợp đồng này;
                </p>
                <h3>ĐIỀU 5</h3>
                <h3>NGHĨA VỤ VÀ QUYỀN CỦA BÊN B</h3>
                <p style={{marginLeft:"40px"}}><b>1.Bên B có các nghĩa vụ sau đây:</b></p>
                <p style={{marginLeft:"80px"}}>a) Giao kết và thực hiện nghĩa vụ đã thỏa thuận tại Điều 1, Điều 2, Điều 3 của hợp đồng này.</p>
                <div style={{display:"flex",margin:"0px 0px 0px 80px"}}>
                <p style={{margin:"0px 3px 0px 0px"}}>b)</p>
                <p style={{margin:"0"}}>
                    Trả lại số tiền đặt cọc cho bên A hoặc trừ khi thực hiện nghĩa vụ trả tiền của bên A trong trường hợp hai bên ký kết hợp 
                    đồng mua bán theo cam kết hợp đồng này.
                </p>
                </div>
                <p style={{marginLeft:"40px"}}><b>2. Bên B có các quyền sau đây:</b></p>
                <div style={{display:"flex",margin:"0px 0px 0px 80px"}}>
                <p style={{margin:"0px 2px 0px 0px"}}>a)</p>
                <p style={{margin:"0"}}>
                    Yêu cầu bên A thanh toán số tiền mua xe còn lại khi hai bên ký kết hợp đồng mua bán xe nêu tại Điều 1, Điều 2, Điều 3 hợp đồng
                    này; trong trường hợp hai bên ký kết hợp đồng mua bán thì tiền đặt cọc kể trên được khấu trừ vào nghĩa vụ trả tiền của bên A
                    theo Hợp đồng mua bán.
                </p>
                </div>
                <div style={{display:"flex",margin:"0px 0px 0px 80px"}}>
                <p style={{margin:"0px 2px 0px 0px"}}>b)</p>
                <p style={{margin:"0"}}>
                    Không trả lại số tiền đã nhận cọc cho bên A nếu bên A từ chối không ký hợp đồng mua bán theo thỏa thuận của hợp đồng này.
                </p>
                </div>
                <h3>ĐIỀU 6</h3>
                <h3>PHƯƠNG THỨC GIẢI QUYẾT TRANH CHẤP</h3>
                <p>
                Trong quá trình thực hiện Hợp đồng, nếu phát sinh tranh chấp, các bên cùng nhau thương lượng giải quyết trên nguyên tắc tôn 
                trọng quyền lợi của nhau. Trong trường hợp không giải quyết được, thì một trong hai bên có quyền khởi kiện để yêu cầu tòa án 
                có thẩm quyền giải quyết theo quy định của pháp luật.
                </p>
                <h3>ĐIỀU 7</h3>
                <h3>CAM ĐOAN CỦA CÁC BÊN</h3>
                <p style={{marginLeft:"40px"}}><b>Bên A và bên B chịu trách nhiệm trước pháp luật về những lời cam đoan sau đây:</b></p>
                <ol style={{marginLeft:"40px"}}>
                <li>Việc giao kết Hợp đồng này hoàn toàn tự nguyện, không bị lừa dối hoặc ép buộc;</li>
                <li>Thực hiện đúng và đầy đủ tất cả các thỏa thuận đã ghi trong Hợp đồng này;</li>
                <li>Việc giao nhận số tiền đặt cọc theo hợp đồng này do hai bên tự thực hiện, chịu trách nhiệm trước pháp luật.</li>
                <li>
                    Hai bên cam đoan trong thời hạn: <u>6</u> tháng , kể từ ngày <u>{day}</u> tháng <u>{month}</u> năm <u>{year}</u>, hai bên tiến hành thủ tục công chứng mua bán xe nêu 
                    trên tại cơ quan có thẩm quyền theo quy định của pháp luật như đã thỏa thuận; trường hợp:
                </li>
                </ol>
                <p>
                – Quá thời hạn <u>6</u> tháng, kể từ ngày <u>{day}</u> tháng <u>{month}</u> năm <u>{year}</u>. mà bên B không thực hiện thủ tục bán xe cho bên A theo quy định của pháp 
                luật thì bên B phải trả lại số tiền đặt cọc đã nhận của bên A là: 5.000.000 đồng (bằng chữ: năm triệu đồng) đồng thời phải nộp 
                phạt vi phạm cho bên A số tiền Tối đa 12% giá trị giá trị hợp đồng được quy định trong Luật Thương mại 2005. Tuy nhiên 
                chính sách của Lamborghini sẽ bồi thường hợp đồng là 15.000.000 đồng (bằng chữ: mười lăm triệu đồng).
                </p>
                <p>
                – Quá thời hạn <u>6</u> thánh, kể từ ngày <u>{day}</u> tháng <u>{month}</u> năm <u>{year}</u>. mà bên A không thực hiện thủ tục mua xe theo quy định của pháp luật thì bên
                A mất số tiền đã đặt cọc là: 5.000.000 đồng (bằng chữ: 5.000.000 đồng).
                </p>
                <h3>ĐIỀU 8</h3>
                <h3>ĐIỀU KHOẢN CUỐI CÙNG</h3>
                <p>Hai bên đã hiểu rõ quyền, nghĩa vụ, lợi ích hợp pháp của mình và hậu quả pháp lý của việc giao kết Hợp đồng này.</p>
                <div style={{display:"flex",width:"100%"}}>
                  <div style={{width:"50%"}}>
                      <div style={{height:"150px"}}>
                      <p style={{textAlign:"center",marginBottom:"0px"}}><b>Bên A</b></p>
                      <img src='/imges/logo/chữ kýremovebg-preview.png' alt="hinh"></img>
                      </div>
                      <div style={{height:"100px"}}>
                      <p style={{textAlign:"center"}}>(Ký và ghi rõ họ tên)</p>
                      <p style={{textAlign:"center"}}><i>Nguyễn Trần Quốc Đạt</i></p>
                      </div>
                  </div>
                  <div style={{width:"50%"}}>
                      <div style={{height:"150px"}}>
                        <p style={{textAlign:"center",marginBottom:"0px"}}><b>Bên B</b></p>
                        <div style={{display:"flex"}}>
                            <canvas
                            ref={canvasRef} // Attach event listeners to the canvas
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            width={500}
                            height={150}
                            // style={{ border: '1px solid #e8e8e8' }}
                            />
                            {hasDrawing && (
                            <>
                              <button onClick={handleClear}>Xóa</button>
                             
                            </>
                            )}
                        </div>
                      </div>
                      <div style={{height:"100px"}}>
                        <p style={{textAlign:"center"}}>(Ký và ghi rõ họ tên)</p>
                        <input type='text'style={{display:'flex',margin:"auto"}}></input>
                      </div>
                  </div>
                </div>
                <p style={{textAlign:"center",margin:"0px"}}>2</p>
            </div>
         </form>    
        {/* contron  Showdeposits */}
        <div class='Showdeposits-1'>
            <div class='icon-hexagon-5' style={{margin:"auto"}} onClick={handleClickShowcontract1}>
              <div class='icon-hexagon-6'>
                  <FontAwesomeIcon icon={faXmark} class='icon-hexagon-right' />
              </div>   
            </div> 
            <hr></hr>
            <div class='icon-hexagon-5' style={{margin:"auto"}} >
              <div class='icon-hexagon-6'>
                  <FontAwesomeIcon icon={faQuestion} class='icon-hexagon-right'/>
              </div> 
            </div>
            <hr></hr>
            <div class='icon-hexagon-5' style={{margin:"auto"}} onClick={handleDownloadPDF}>
              <div class='icon-hexagon-6'>
                  <FontAwesomeIcon icon={faDownload} class='icon-hexagon-right'/>
              </div>   
            </div>
            <hr></hr>
            <div class='icon-hexagon-5' style={{margin:"auto"}}>
              <div class='icon-hexagon-6'>
                  <FontAwesomeIcon icon={faCheck} class='icon-hexagon-right'/>
              </div>   
            </div>
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
      <Footer/>
    </body>
  );
};
export default Contract;

