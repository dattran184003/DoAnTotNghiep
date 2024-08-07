import React, { useState, useEffect, useRef } from 'react';
import Navbar from './module/navbar';
import "../Layout/activityHistoryLayout.css";
import { faBell, faCalendarDays, faMessage, faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from './module/footer';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { faCheck, faDownload, faFilePen, faQuestion, faXmark } from '@fortawesome/free-solid-svg-icons';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function ActivityHistory() {
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
    //jwwt
    const [user, setUser] = useState({});
    useEffect(() => {
      axios.get(`https://localhost:7175/api/Users`)
          .then(res => setUser(res.data));   
  }, []);
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
    //lịch hẹn
    const [appointments, setappointments] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7175/api/Appointments`)
            .then(res => setappointments(res.data));   
    }, []);
  // lịch sử đặt cọc
    const [DepositContracts, setDepositContracts] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7175/api/DepositContracts`)
            .then(res => setDepositContracts(res.data));   
    }, []);
  // xe
    const [car, setcar] = useState([]);
        useEffect(() => {
            axios.get(`https://localhost:7175/api/Cars`)
                .then(res => setcar(res.data));   
    }, []);
  //loại xe
  const [Models, setModels] = useState([]);
  useEffect(() => {
      axios.get(`https://localhost:7175/api/Models`)
          .then(res => setModels(res.data));   
    }, []);
  // chi tiết hơp đồng
  const [Showcontract, setShowcontract] = useState(false);
  const [activityHistory, setActivityHistory] = useState(true);
  const [ShowcontractID, setShowcontractID] = useState();
  const handleClickshowcontract = (event) => {
    setShowcontract(!Showcontract);
    setActivityHistory(!activityHistory);
    setShowcontractID(event.target.value);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  //chữ ký lưu hợp đồng
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
  //tri tiết lịch xem xe
  const [appointment, setappointment] = useState(false);
  const [appointmentID, setappointmentID] = useState();
  const handleClickshowappointment = (event) => {
    setappointment(!appointment);
    setActivityHistory(!activityHistory);
    setappointmentID(event.target.value);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <body class="Desktop">
        <Navbar/>
        <div class="ActivityHistory" style={{ display: activityHistory  ? 'flex ' :'none'  }}>
            <div class="contract-history">
                <h1>Lịch sử đặt cọc hợp đồng</h1>
                {DepositContracts.filter((id)=> id.userId === userId).slice().reverse().map(item =>
                <div class="form-contract">
                    <div class="form-contract-icon">
                        <FontAwesomeIcon icon={faFilePen} style={{height:"40%"}}/>
                    </div>
                    <div class="form-contract-infomation">
                        <span>{new Date(item.contractSigningDate).getDate() }/{new Date(item.contractSigningDate).getMonth() + 1}/{new Date(item.contractSigningDate).getFullYear()}</span>
                        {car.filter((car)=> car.id == item.carId).map(items =>
                        <>
                            <p>Quý khách đã đặt cọc xe {items.name}</p>
                            <button value={(item.id)} onClick={handleClickshowcontract }>Xem tri tiết</button>
                        </>
                        )}
                    </div>
                </div>
                )}
            </div>
            <div class="appointment-history">
                <h1>Lịch sử cuộc hẹn xem xe</h1>
                {appointments.filter((id)=> id.userId === userId).slice().reverse().map(item =>
                    <div class="form-appointment">
                        <div class="form-appointment-icon">
                            <FontAwesomeIcon icon={faCalendarDays} style={{height:"40%"}}/>
                        </div>
                        <div class="form-appointment-infomation">
                            <span>lúc {item.carViewingTime} ngày {new Date(item.viewingDate).getDate() }/{new Date(item.viewingDate).getMonth() + 1}/{new Date(item.viewingDate).getFullYear()}</span>
                            {car.filter((car)=> car.id == item.carId).map(items => 
                            <>
                              <p>Quý khách đã đặt cuộc hẹn xem xe {items.name}</p>
                            </> 
                            )}
                            <p>địa chỉ:{item.location}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
        <div style={{ display: Showcontract ? 'inline':'none'   }}>
        {DepositContracts.filter((id)=> id.userId === userId  && id.id == ShowcontractID).map(item =>
        <form class='contract'>
            <div  class='Showdeposits' ref={refContainer} >
                <h3 style={{textAlign:"center"}}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
                <h3 style={{textAlign:"center"}}><i>Độc lập – Tự do – Hạnh phúc</i></h3>
                <h3 style={{textAlign:"center"}}>— — — o0o — — —</h3>
                <h1 style={{textAlign:"center"}}>HỢP ĐỒNG ĐẶT CỌC MUA BÁN Ô TÔ</h1>
                <p style={{textAlign:"center",marginBottom:"46px"}}>Số:{item.carId}/{item.id}/HĐ</p>
                <p>Hôm nay, ngày  tháng năm  . Chúng tôi gồm có:</p>
                {/* bên A */}
                <p style={{marginLeft:"40px"}}><b>Bên nhận đặt cọc</b> (sau đây gọi là bên A):</p>
                <p>Ông : Nguyễn Trần Quốc Đạt .</p>
                <p>Sinh năm : 18/04/2003 .</p>
                <p>CMND/CCCD/Hộ chiếu số: 079203003058 cấp ngày 22/11/2021 tại Cục cảnh quản lý hành chính về trật tự xã hội Hồ Chí Minh</p>
                <p>Hộ khẩu thường trú : 59 Đường 9A,Long Bình, Thành phố Thủ Đức, Hồ Chí Minh.</p>
                {/* bên B */}
                <p style={{marginLeft:"40px"}}><b>Bên đặt cọc</b> (sau đây gọi là bên B):</p>
                {user.filter((user) => user.id == userId ).map(item =>
                <p>Ông/Bà : {item.fullname} </p>
                )}
                <p>Sinh năm : {item.contractPath}</p>
            <p>CMND/CCCD/Hộ chiếu số:  {item.intoMoney} cấp ngày tại  {item.quantity.toString().slice(-2)}/{item.quantity.toString().substring(4, 6)}/{item.quantity.toString().substring(0, 4)}</p>
                <p>Hộ khẩu thường trú : {item.deliveryAddress} </p>
                <p><b>Hai bên đồng ý thực hiện ký kết Hợp đồng đặt cọc với các thỏa thuận sau đây:</b></p>
                <h3>ĐIỀU 1</h3>
                <h3>TÀI SẢN ĐẶT CỌC</h3>
                <p>– Số tiền: 5.000.000 đồng (bằng chữ: năm triệu đồng).</p>
                <p>– Bên B giao cho bên A số tiền đặt cọc nêu trên vào ngày  tháng  năm </p>
                <h3>ĐIỀU 2</h3>
                <h3>THỜI HẠN HỦY ĐẶT CỌC</h3>
                <p>Thời hạn hủy đặt cọc: Trong thời hạn tháng  năm  (1 tuần), kể từ ngày  tháng  năm</p>
                <h3>ĐIỀU 3</h3>
                <h3>MỤC ĐÍCH ĐẶT CỌC</h3>
                <ol>
                <li>
                  {car.filter((car)=> car.id == item.carId).map(items => 
                    <>
                      Để đảm bảo cho việc bán và mua xe. Nhãn hiệu: Lamborghini, Tên xe:  {items.name}, Loại xe: {Models.filter((models)=> models.id == items.modelId).map(item => <>{item.name}</> )}, màu sơn: {item.note},
                      qua trình lây truyền: {items.transmission}, mã lực: {items.horsepower}  HP(M), mô-men xoắn: {items.torque} (Nm),
                      hệ thống truyền lực: {items.drivetrain}, số chỗ ngồi: {items.seatingCapacity}, chiều dài: {items.length} mm, 
                      chiều rộng: {items.width} mm, chiều cao: {items.height} mm.
                    </> 
                  )}   
                </li>
                <li>Thuế, lệ phí liên quan đến việc bán xe nêu trên do hai bên thỏa thuận như sau:</li>
                </ol>
                <p>+ Thuế thu nhập cá nhân và phí công chứng do bên bán chịu trách nhiệm nộp.</p>
                <p>+ Lệ phí trước bạ do bên mua chịu trách nhiệm nộp.</p>
                <h3>ĐIỀU 4</h3>
                <h3>NGHĨA VỤ VÀ QUYỀN CỦA BÊN A</h3>
                <p style={{marginLeft:"40px"}}><b>1.Bên A có các nghĩa vụ sau đây:</b></p>
                <p style={{textAlign:"center",margin:"0px"}}>1</p>
            </div>
            {/* trang 2 trong hợp đồng */}
            <div  class='Showdeposits' ref={refContainer}>
                <p style={{marginLeft:"80px"}}>a) Giao số tiền đặt cọc cho bên B theo thỏa thuận;</p>
                <p style={{marginLeft:"80px"}}>b) Giao kết và thực hiện nghĩa vụ đã thỏa thuận tại Điều 1, Điều 2, Điều 3 của hợp đồng này.</p>
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
                    Hai bên cam đoan trong thời hạn: <u>6</u> tháng , kể từ ngày  tháng  năm , hai bên tiến hành thủ tục công chứng mua bán xe nêu 
                    trên tại cơ quan có thẩm quyền theo quy định của pháp luật như đã thỏa thuận; trường hợp:
                </li>
                </ol>
                <p>
                – Quá thời hạn <u>6</u> tháng, kể từ ngày  tháng  năm . mà bên B không thực hiện thủ tục bán xe cho bên A theo quy định của pháp 
                luật thì bên B phải trả lại số tiền đặt cọc đã nhận của bên A là: 5.000.000 đồng (bằng chữ: năm triệu đồng) đồng thời phải nộp 
                phạt vi phạm cho bên A số tiền Tối đa 12% giá trị giá trị hợp đồng được quy định trong Luật Thương mại 2005. Tuy nhiên 
                chính sách của Lamborghini sẽ bồi thường hợp đồng là 15.000.000 đồng (bằng chữ: mười lăm triệu đồng).
                </p>
                <p>
                – Quá thời hạn <u>6</u> thánh, kể từ ngày  tháng  năm . mà bên A không thực hiện thủ tục mua xe theo quy định của pháp luật thì bên
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
                        <img src={`https://localhost:7175/${item.signature}`} alt="hinh"></img>
                      </div>
                      <div style={{height:"100px"}}>
                        <p style={{textAlign:"center"}}>(Ký và ghi rõ họ tên)</p>
                        {user.filter((user) => user.id == userId ).map(item =>
                        <p style={{textAlign:"center"}}><i>{item.fullname}</i></p>
                        )}
                      </div>
                  </div>
                </div>
                <p style={{textAlign:"center",margin:"0px"}}>2</p>
            </div>
         </form> 
        )}   
        {/* contron  Showdeposits */}
        <div class='Showdeposits-1'>
            <div class='icon-hexagon-5' style={{margin:"auto"}} onClick={handleClickshowcontract}>
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
      Nội dung cho màn hình dưới 1000px
    </body>
  );
};
export default ActivityHistory;
