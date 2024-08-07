import React, { useState, useEffect, useRef } from 'react';
import Navbar from './module/navbar';
import "../Layout/chatLayout.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { faLocationArrow, faPlus } from '@fortawesome/free-solid-svg-icons';

function Chat() {
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
    const [dateTime, setDateTime] = useState(new Date());// lấy ngày giờ hiện tạo
    setInterval(() => {
        setDateTime(new Date());
    }, 1000);

    const [inputValue, setInputValue] = useState(''); // Lưu trữ nội dung input

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSave = () => {
        // Lưu nội dung input vào localStorage hoặc database
        console.log('Lưu nội dung:', inputValue);
    };
    const user =[
        {id:1, name:"Lê phước sang",text:"Tôi Là trình trả lời tự động của LAMBORGHINI bạn có thể hỏi tui về các chủ đề bên dưới.",time:"6/26/2024, 4:54:36"},
        {id:2, name:"nguyễn trần quốc đạt",text:"Tôi Là trình trả lời tự động của LAMBORGHINI bạn có thể hỏi tui về các chủ đề bên dưới.",time:"6/27/2024, 4:56:36"},
        {id:1, name:"Lê phước sang",text:"Tôi Là trình trả lời tự động của LAMBORGHINI bạn có thể hỏi tui về các chủ đề bên dưới.1",time:"6/28/2024, 7:54:36"},
        {id:1, name:"Lê phước sang",text:"Tôi Là trình trả lời tự động của LAMBORGHINI bạn có thể hỏi tui về các chủ đề bên dưới2.",time:"6/26/2024, 4:53:36"},
        {id:2, name:"nguyễn trần quốc đạt",text:"Tôi Là trình trả lời tự động của LAMBORGHINI bạn có thể hỏi tui về các chủ đề bên dưới.",time:"6/27/2024, 3:56:36"},
        {id:1, name:"Lê phước sang",text:"Tôi Là trình trả lời tự động của LAMBORGHINI bạn.",time:"6/25/2024, 8:54:36"},
    ];
    const sortedUsers = user.sort((a, b) => new Date(a.time) - new Date(b.time));
    const [activeId, setActiveId] = useState(0); // Lưu trữ ID của div đang được hiển thị
    const handleClick = (id) => {
      setActiveId(id); // Cập nhật ID của div khi click button
    };
    // phần hỏi đám
  const [cauhoi1, setcauhoi1] = useState(false);
  const [cauhoi2, setcauhoi2] = useState(false);
  const [cauhoi3, setcauhoi3] = useState(false);
  const [cauhoi4, setcauhoi4] = useState(false);
  const [cauhoi5, setcauhoi5] = useState(false);
  const [cauhoi6, setcauhoi6] = useState(false);
  const [dapan1, setdapan1] = useState('');
  const [dapan2, setdapan2] = useState('');
  const [dapan3, setdapan3] = useState('');
  const [dapan4, setdapan4] = useState('');
  const [dapan5, setdapan5] = useState('');
  const handleClickcauhoi1 = (event) => {
    setcauhoi1(true);
  }
  const handleClickcauhoi2 = (event) => {
    setcauhoi2(true);
    setdapan1(event.target.value);
  }
  const handleClickcauhoi3 = (event) => {
    setcauhoi3(true);
    setdapan2(event.target.value);
  }
  const handleClickcauhoi4 = (event) => {
    setcauhoi4(true);
    setdapan3(event.target.value);
  }
  const handleClickcauhoi5 = (event) => {
    setcauhoi5(true);
    setdapan4(event.target.value);
  }
  const handleClickcauhoi6 = (event) => {
    setcauhoi6(true);
    setdapan5(event.target.value);
  };
  const car=[
    {name:"Lamborghini Aventador SVJ (LP770-4)",Present:"1",dynamic:"1",speed:"1",Engine:"1"},
    {name:"Lamborghini Aventador S (LP740-4)",Present:"1",dynamic:"1",speed:"1",Engine:"0"},
    {name:"Lamborghini Aventador LP750-SV",Present:"1",dynamic:"1",speed:"0",Engine:"1"},
    {name:"Lamborghini Aventador LP700-4",Present:"1",dynamic:"1",speed:"0",Engine:"0"},
    {name:"Lamborghini Huracan LP610-4",Present:"1",dynamic:"0",speed:"1",Engine:"1"},
    {name:"Lamborghini Huracan LP580-2",Present:"1",dynamic:"0",speed:"1",Engine:"0"},
    {name:"Lamborghini Huracan Performante",Present:"1",dynamic:"0",speed:"0",Engine:"1"},
    {name:"Lamborghini Huracan EVO",Present:"1",dynamic:"0",speed:"0",Engine:"0"},
    {name:"Lamborghini Huracan STO",Present:"0",dynamic:"1",speed:"1",Engine:"1"},
    {name:"Lamborghini Urus",Present:"0",dynamic:"1",speed:"1",Engine:"0"},
    {name:"Lamborghini Urus S",Present:"0",dynamic:"1",speed:"0",Engine:"1"},
    {name:"Lamborghini Urus Performante",Present:"0",dynamic:"0",speed:"1",Engine:"1"},
    {name:"Lamborghini Sian SKP 37",Present:"0",dynamic:"0",speed:"1",Engine:"0"},
    {name:"Lamborghini Revuelto",Present:"0",dynamic:"0",speed:"0",Engine:"1"},
  ];
  return (
    <body class='Desktop'>
      <Navbar/>
      <div class='chat'>
        <div class='chat-left'>
            <button onClick={() => handleClick(0)}>Nói chuyện với chúng tôi</button>
            <button onClick={() => handleClick(1)}>Công ty và Lịch sử</button>
            <button onClick={() => handleClick(2)}>Sản phẩm</button>
            <button onClick={() => handleClick(3)}>Chính sách</button>
            <button onClick={() => handleClick(4)}>Dịch vụ</button>
            <button onClick={() => handleClick(5)}>Đại lý</button>
            <button onClick={() => handleClick(6)}>Gợi ý sản phẩm </button>{/* <p>{dateTime.toLocaleString()}</p> */}
        </div>
       
        <div class='chat-right' style={{ display: 0 === activeId ? 'block' : 'none' }}>
            <div class='chat-right-1' >
                <div class='chat-right-robot'>
                    <div class='chat-right-robot-2'>
                        <img src='/imges/logo/user1.png' alt="hinh" ></img>
                    </div>
                    <div class='chat-right-robot-1'>
                        <p>Tôi Là trình trả lời tự động của LAMBORGHINI bạn có thể hỏi tui về các chủ đề bên dưới.</p>
                        <button  onClick={() => handleClick(1)}>Sản phẩn</button>
                        <button  onClick={() => handleClick(2)}>Công ty</button>
                        <button  onClick={() => handleClick(3)}>Chính sách</button>
                        <button  onClick={() => handleClick(4)}>Dịch vụ</button>
                        <button  onClick={() => handleClick(5)}>Đại lý</button>
                        <button  onClick={() => handleClick(6)}>Gợi ý sản phẩm </button>
                    </div>
                </div>
                {sortedUsers.map((user) => (
                      <div style={{width:"100%",display:"block"}} >
                        <div class={user.id === 1 ? ("user-1"):("user-2")}>
                          <span> {user.name} {user.time}</span>
                          <p>{user.text}</p>
                        </div>
                      </div>
                ))}
            </div>
            <form>
                <div style={{border:"1.5px solid #000",borderRadius:"50%",width:"15px",height:"15px",display:"flex",textAlign:"center",justifyContent:"center",padding:"2px",margin:"10px"}}>
                    <FontAwesomeIcon icon={faPlus} />
                </div>
                <input type='text' placeholder="Câu hỏi của bạn dành cho chúng tôi là gì ?"  value={inputValue}
                onChange={handleInputChange}
                onKeyPress={(event) => {
                if (event.key === 'Enter') {
                    handleSave();
                }
                }}> 
                </input>
                <div style={{display:"flex",textAlign:"center",justifyContent:"center",margin:"5px 10px"}}>
                    <FontAwesomeIcon icon={faLocationArrow} style={{transform:"rotate(45deg)",height:"30px"}} onClick={handleSave}/>
                </div>
            </form>
        </div>
        {/* công ty */}
        <div class='chat-right' style={{ display: 1 === activeId ? 'block' : 'none' }}>
            <div class='chat-right-1'>
                <div class='chat-right-robot'>
                    <div class='chat-right-robot-2'>
                        <img src='/imges/logo/user1.png' alt="hinh" ></img>
                    </div>
                    <div class='chat-right-robot-1'>
                        <p>Tôi Là trình trả lời tự động của LAMBORGHINI bạn đang có thắc mắc gì về công ty của chúng tôi.</p>
                        <button>Chụ sở chính</button>
                        <button>Lịch sử công ty</button>
                        <button>Người đứng đầu</button>
                    </div>
                </div>
                {/* {sortedUsers.map((user) => (
                      <div style={{width:"100%",display:"block"}} >
                        <div class={user.id === 1 ? ("user-1"):("user-2")}>
                          <span> {user.name} {user.time}</span>
                          <p>{user.text}</p>
                        </div>
                      </div>
                ))} */}
            </div>
            <form>
                <div style={{border:"1.5px solid #000",borderRadius:"50%",width:"15px",height:"15px",display:"flex",textAlign:"center",justifyContent:"center",padding:"2px",margin:"10px"}}>
                    <FontAwesomeIcon icon={faPlus} />
                </div>
                <input type='text' placeholder="Câu hỏi của bạn dành cho chúng tôi là gì ?"  value={inputValue}
                onChange={handleInputChange}
                onKeyPress={(event) => {
                if (event.key === 'Enter') {
                    handleSave();
                }
                }}> 
                </input>
                <div style={{display:"flex",textAlign:"center",justifyContent:"center",margin:"5px 10px"}}>
                    <FontAwesomeIcon icon={faLocationArrow} style={{transform:"rotate(45deg)",height:"30px"}} onClick={handleSave}/>
                </div>
            </form>
          </div>
          {/* san pham */}
          <div class='chat-right' style={{ display: 2 === activeId ? 'block' : 'none' }}>
            <div class='chat-right-1'>
            <div class='chat-right-robot'>
                    <div class='chat-right-robot-2'>
                        <img src='/imges/logo/user1.png' alt="hinh" ></img>
                    </div>
                    <div class='chat-right-robot-1'>
                        <p>Tôi Là trình trả lời tự động của LAMBORGHINI bạn đang có thắc mắc gì về sản phẩm của chúng tôi.</p>
                        <button>Sản phẩn</button>
                        <button>dòng sản phẩm</button>
                        <button>số lượng sản phẩn</button>
                    </div>
                </div>
                {/* {sortedUsers.map((user) => (
                      <div style={{width:"100%",display:"block"}} >
                        <div class={user.id === 1 ? ("user-1"):("user-2")}>
                          <span> {user.name} {user.time}</span>
                          <p>{user.text}</p>
                        </div>
                      </div>
                ))} */}
            </div>
            <form>
                <div style={{border:"1.5px solid #000",borderRadius:"50%",width:"15px",height:"15px",display:"flex",textAlign:"center",justifyContent:"center",padding:"2px",margin:"10px"}}>
                    <FontAwesomeIcon icon={faPlus} />
                </div>
                <input type='text' placeholder="Câu hỏi của bạn dành cho chúng tôi là gì ?"  value={inputValue}
                onChange={handleInputChange}
                onKeyPress={(event) => {
                if (event.key === 'Enter') {
                    handleSave();
                }
                }}> 
                </input>
                <div style={{display:"flex",textAlign:"center",justifyContent:"center",margin:"5px 10px"}}>
                    <FontAwesomeIcon icon={faLocationArrow} style={{transform:"rotate(45deg)",height:"30px"}} onClick={handleSave}/>
                </div>
            </form>
          </div>
          {/* đai ly*/}
          <div class='chat-right' style={{ display: 5 === activeId ? 'block' : 'none' }}>
            <div class='chat-right-1'>
              <div class='chat-right-robot'>
                    <div class='chat-right-robot-2'>
                        <img src='/imges/logo/user1.png' alt="hinh" ></img>
                    </div>
                    <div class='chat-right-robot-1'>
                        <p>Tôi Là trình trả lời tự động của LAMBORGHINI bạn đang có thắc mắc gì về đại lý của chúng tôi.</p>
                        <button>các đại lý ở Việt Nam</button>
                        <button>Địa chỉ</button>
                    </div>
                </div>
                {/* {sortedUsers.map((user) => (
                      <div style={{width:"100%",display:"block"}} >
                        <div class={user.id === 1 ? ("user-1"):("user-2")}>
                          <span> {user.name} {user.time}</span>
                          <p>{user.text}</p>
                        </div>
                      </div>
                ))} */}
            </div>
            <form>
                <div style={{border:"1.5px solid #000",borderRadius:"50%",width:"15px",height:"15px",display:"flex",textAlign:"center",justifyContent:"center",padding:"2px",margin:"10px"}}>
                    <FontAwesomeIcon icon={faPlus} />
                </div>
                <input type='text' placeholder="Câu hỏi của bạn dành cho chúng tôi là gì ?"  value={inputValue}
                onChange={handleInputChange}
                onKeyPress={(event) => {
                if (event.key === 'Enter') {
                    handleSave();
                }
                }}> 
                </input>
                <div style={{display:"flex",textAlign:"center",justifyContent:"center",margin:"5px 10px"}}>
                    <FontAwesomeIcon icon={faLocationArrow} style={{transform:"rotate(45deg)",height:"30px"}} onClick={handleSave}/>
                </div>
            </form>
          </div>
          {/*chinh sán*/}
          <div class='chat-right' style={{ display: 3 === activeId ? 'block' : 'none' }}>
            <div class='chat-right-1'>
              <div class='chat-right-robot'>
                  <div class='chat-right-robot-2'>
                      <img src='/imges/logo/user1.png' alt="hinh" ></img>
                  </div>
                  <div class='chat-right-robot-1'>
                      <p>Tôi Là trình trả lời tự động của LAMBORGHINI bạn đang có thắc mắc gì về chính sách của chúng tôi.</p>
                      <button>Các chính sách của công ty</button>
                      <button>chính sách</button>
                  </div>
              </div>
                {/* {sortedUsers.map((user) => (
                      <div style={{width:"100%",display:"block"}} >
                        <div class={user.id === 1 ? ("user-1"):("user-2")}>
                          <span> {user.name} {user.time}</span>
                          <p>{user.text}</p>
                        </div>
                      </div>
                ))} */}
            </div>
            <form>
              <div style={{border:"1.5px solid #000",borderRadius:"50%",width:"15px",height:"15px",display:"flex",textAlign:"center",justifyContent:"center",padding:"2px",margin:"10px"}}>
                  <FontAwesomeIcon icon={faPlus} />
              </div>
              <input type='text' placeholder="Câu hỏi của bạn dành cho chúng tôi là gì ?"  value={inputValue}
              onChange={handleInputChange}
              onKeyPress={(event) => {
              if (event.key === 'Enter') {
                  handleSave();
              }
              }}> 
              </input>
              <div style={{display:"flex",textAlign:"center",justifyContent:"center",margin:"5px 10px"}}>
                  <FontAwesomeIcon icon={faLocationArrow} style={{transform:"rotate(45deg)",height:"30px"}} onClick={handleSave}/>
              </div>
            </form>
          </div>
          {/*dich vụ*/}
          <div class='chat-right' style={{ display: 4 === activeId ? 'block' : 'none' }}>
            <div class='chat-right-1'>
              <div class='chat-right-robot'>
                  <div class='chat-right-robot-2'>
                      <img src='/imges/logo/user1.png' alt="hinh" ></img>
                  </div>
                  <div class='chat-right-robot-1'>
                      <p>Tôi Là trình trả lời tự động của LAMBORGHINI bạn đang có thắc mắc gì về dịch vụ của chúng tôi.</p>
                      <button>Các dịch vụ của công ty</button>
                      <button>dịch vụ</button>
                  </div>
              </div>
                {/* {sortedUsers.map((user) => (
                      <div style={{width:"100%",display:"block"}} >
                        <div class={user.id === 1 ? ("user-1"):("user-2")}>
                          <span> {user.name} {user.time}</span>
                          <p>{user.text}</p>
                        </div>
                      </div>
                ))} */}
            </div>
            <form>
              <div style={{border:"1.5px solid #000",borderRadius:"50%",width:"15px",height:"15px",display:"flex",textAlign:"center",justifyContent:"center",padding:"2px",margin:"10px"}}>
                  <FontAwesomeIcon icon={faPlus} />
              </div>
              <input type='text' placeholder="Câu hỏi của bạn dành cho chúng tôi là gì ?"  value={inputValue}
              onChange={handleInputChange}
              onKeyPress={(event) => {
              if (event.key === 'Enter') {
                  handleSave();
              }
              }}> 
              </input>
              <div style={{display:"flex",textAlign:"center",justifyContent:"center",margin:"5px 10px"}}>
                  <FontAwesomeIcon icon={faLocationArrow} style={{transform:"rotate(45deg)",height:"30px"}} onClick={handleSave}/>
              </div>
            </form>
          </div>
           {/*hỏi toi*/}
           <div class='chat-right' style={{ display: 6 === activeId ? 'block' : 'none' }}>
            <div class='chat-right-1' >
              <div class='chat-right-robot'>
                  <div class='chat-right-robot-2'>
                      <img src='/imges/logo/user1.png' alt="hinh" ></img>
                  </div>
                  <div class='chat-right-robot-1'>
                      <p>Bạn đang không biết chọn sản phẩm (dòng xe) nào của LAMBORGHINI. Hãy làm khảo sát cùng chúng tôi để lựa chọn sản phẩm phù
                         hợp với bạn nhất.
                      </p>
                      <button onClick={handleClickcauhoi1}>Bắt đầu</button>
                      <button>Không cần thiết</button>
                  </div>
              </div>
              <div class='chat-right-robot' style={{ display: cauhoi1 ? 'flex' : 'none' }}>
                  <div class='chat-right-robot-2'>
                      <img src='/imges/logo/user1.png' alt="hinh" ></img>
                  </div>
                  <div class='chat-right-robot-1'>
                      <h3>câu hỏi: 1</h3>
                      <p>Bạn có đam mê tốc độ không ? (nếu không chắc chắn hãy chọ có)
                      </p>
                      <button onClick={handleClickcauhoi2} value={1} style={{color: dapan1 === '1' ?"#ea4335":""}}>Có</button>
                      <button onClick={handleClickcauhoi2} value={0} style={{color: dapan1 === '0' ?"#ea4335":""}}>Không</button>
                  </div>
              </div>
              <div class='chat-right-robot' style={{ display: cauhoi2 ? 'flex' : 'none' }}>
                  <div class='chat-right-robot-2'>
                      <img src='/imges/logo/user1.png' alt="hinh" ></img>
                  </div>
                  <div class='chat-right-robot-1'>
                      <h3>câu hỏi: 2</h3>
                      <p>Bạn có thích chơi thể thao không ? (nếu không chắc chắn hãy chọ có)
                      </p>
                      <button onClick={handleClickcauhoi3} value={1} style={{color: dapan2 === '1' ?"#ea4335":""}}>Có</button>
                      <button onClick={handleClickcauhoi3} value={0} style={{color: dapan2 === '0' ?"#ea4335":""}}>Không</button>
                  </div>
              </div>
              <div class='chat-right-robot' style={{ display: cauhoi3 ? 'flex' : 'none' }}>
                  <div class='chat-right-robot-2'>
                      <img src='/imges/logo/user1.png' alt="hinh" ></img>
                  </div>
                  <div class='chat-right-robot-1'>
                      <h3>câu hỏi: 3</h3>
                      <p>Bạn có phải người thích gây chý ý không ? (nếu không chắc chắn hãy chọ có)
                      </p>
                      <button onClick={handleClickcauhoi4} value={1} style={{color: dapan3 === '1' ?"#ea4335":""}}>Có</button>
                      <button onClick={handleClickcauhoi4} value={0} style={{color: dapan3 === '0' ?"#ea4335":""}}>Không</button>
                  </div>
              </div>
              <div class='chat-right-robot' style={{ display: cauhoi4 ? 'flex' : 'none' }}>
                  <div class='chat-right-robot-2'>
                      <img src='/imges/logo/user1.png' alt="hinh" ></img>
                  </div>
                  <div class='chat-right-robot-1'>
                      <h3>câu hỏi: 4</h3>
                      <p>Bạn có thích những màu nổi bật không ? (nếu không chắc chắn hãy chọ có)
                      </p>
                      <button onClick={handleClickcauhoi5} value={1} style={{color: dapan4 === '1' ?"#ea4335":""}}>Có</button>
                      <button onClick={handleClickcauhoi5} value={0} style={{color: dapan4 === '0' ?"#ea4335":""}}>Không</button>
                  </div>
              </div>
              <div class='chat-right-robot' style={{ display: cauhoi5 ? 'flex' : 'none' }}>
                  <div class='chat-right-robot-2'>
                      <img src='/imges/logo/user1.png' alt="hinh" ></img>
                  </div>
                  <div class='chat-right-robot-1'>
                      <h3>câu hỏi: 5</h3>
                      <p>Bạn có thích sự hoài niệm không ? (nếu không chắc chắn hãy chọ có)
                      </p>
                      <button onClick={handleClickcauhoi6} value={1} style={{color: dapan5 === '1' ?"#ea4335":""}}>Có</button>
                      <button onClick={handleClickcauhoi6} value={0} style={{color: dapan5 === '0' ?"#ea4335":""}}>Không</button>
                  </div>
              </div>
              <div class='chat-right-robot' style={{ display: cauhoi6 ? 'flex' : 'none' }}>
                  <div class='chat-right-robot-2'>
                      <img src='/imges/logo/user1.png' alt="hinh" ></img>
                  </div>
                  <div class='chat-right-robot-1'>
                      <h3>Chúng tôi sẽ gợi ý một số mẫu xe hợp với tính cách và sở thích của bạn.</h3>
                      <p>Chúng tôi sẽ gợi ý một số màu sắc xe phù hợp với bạn là: {dapan4 === '1' ? "trắng, cam, xanh dương, xanh lá" : "đen, xanh dương đậm, xanh lá đấm, tím đen"}...</p>
                      <p>Danh sách xe phù hợp với bạn.</p>
                      { car.filter((item) => item.speed == dapan1 && item.dynamic == dapan2 &&  item.Engine == dapan3 &&  item.Present == dapan5).map((item) => (
                      <p>
                        - {item.name}
                      </p>
                    ))}
                  </div>
              </div>
                {/* {sortedUsers.map((user) => (
                      <div style={{width:"100%",display:"block"}} >
                        <div class={user.id === 1 ? ("user-1"):("user-2")}>
                          <span> {user.name} {user.time}</span>
                          <p>{user.text}</p>
                        </div>
                      </div>
                ))} */}
            </div>
            <form>
              <div style={{border:"1.5px solid #000",borderRadius:"50%",width:"15px",height:"15px",display:"flex",textAlign:"center",justifyContent:"center",padding:"2px",margin:"10px"}}>
                  <FontAwesomeIcon icon={faPlus} />
              </div>
              <input type='text' placeholder="Câu hỏi của bạn dành cho chúng tôi là gì ?"  value={inputValue}
              onChange={handleInputChange}
              onKeyPress={(event) => {
              if (event.key === 'Enter') {
                  handleSave();
              }
              }}> 
              </input>
              <div style={{display:"flex",textAlign:"center",justifyContent:"center",margin:"5px 10px"}}>
                  <FontAwesomeIcon icon={faLocationArrow} style={{transform:"rotate(45deg)",height:"30px"}} onClick={handleSave}/>
              </div>
            </form>
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
export default Chat;
