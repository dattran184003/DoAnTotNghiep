import "./navbar.scss";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import MenuIcon from "@mui/icons-material/Menu";
import { Dropdown } from "react-bootstrap";
import { DarkModeContext } from "../context/darkModeContext";
import { useContext, useEffect, useState } from "react";

const Navbar = ({ toggleSidebar }) => {
  const { dispatch } = useContext(DarkModeContext);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Lấy JWT từ localStorage
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      // Giải mã phần payload của JWT
      const payload = JSON.parse(atob(jwtToken.split(".")[1]));
      // Lấy giá trị của thuộc tính 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
      const nameClaim =
        payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      setUsername(nameClaim);
    }
  }, []);

  const handleLogout = () => {
    // Xóa JWT từ localStorage
    localStorage.removeItem("jwtToken");
    // Redirect về trang /admin/login
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <MenuIcon className="toggle-icon" onClick={toggleSidebar} />
        </div>
        <div className="items">
          <div className="item">
            <NightsStayIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <Dropdown>
              <Dropdown.Toggle variant="default" id="dropdown-basic">
                {username}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/admin/profile">Hồ sơ</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
