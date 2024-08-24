import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AddCardIcon from "@mui/icons-material/AddCard";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SettingsSystemDaydreamIcon from "@mui/icons-material/SettingsSystemDaydream";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ImageIcon from "@mui/icons-material/Image";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import GavelIcon from "@mui/icons-material/Gavel";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import PaymentIcon from "@mui/icons-material/Payment";
import RateReviewIcon from "@mui/icons-material/RateReview";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../context/darkModeContext";

const Sidebar = ({ isOpen }) => {
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/";
    alert("Đăng xuất thành công");
  };
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="top">
        <Link to="/admin" className="logo-link">
          <span className="logo">Quản trị viên Lamborghini</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Danh sách</p>
          <li>
            <Link to={"/admin/accounts"}>
              <PersonOutlineIcon className="icon" />
              <span>Tài khoản</span>
            </Link>
          </li>
          <li>
            <Link to={"/admin/brands"}>
              <BrandingWatermarkIcon className="icon" />
              <span>Thương hiệu</span>
            </Link>
          </li>
          <li>
            <Link to={"/admin/models"}>
              <AddBusinessIcon className="icon" />
              <span>Mẫu xe</span>
            </Link>
          </li>
          <li>
            <Link to={"/admin/cars"}>
              <DirectionsCarIcon className="icon" />
              <span>Xe</span>
            </Link>
          </li>
          <li>
            <Link to={"/admin/carimages"}>
              <ImageIcon className="icon" />
              <span>Hình chi tiết Xe</span>
            </Link>
          </li>
          <li>
            <Link to={"/admin/colors"}>
              <ColorLensIcon className="icon" />
              <span>Màu xe</span>
            </Link>
          </li>
          <li>
            <Link to={"/admin/depositcontracts"}>
              <GavelIcon className="icon" />
              <span>Hợp đồng đặt cọc</span>
            </Link>
          </li>
          <li>
            <Link to={"/admin/news"}>
              <NewspaperIcon className="icon" />
              <span>Tin tức</span>
            </Link>
          </li>
          <li>
            <Link to={"/admin/appointments"}>
              <BookOnlineIcon className="icon" />
              <span>Lịch hẹn</span>
            </Link>
          </li>
          {/* <li>
            <Link to={"/admin/carfeedbacks"}>
              <FeedbackIcon className="icon" />
              <span>Phản hồi sản phẩm</span>
            </Link>
          </li>
          <li>
            <Link to={"/admin/brandfeedbacks"}>
              <ChatBubbleIcon className="icon" />
              <span>Phản hồi cửa hàng</span>
            </Link>
          </li>
          <li>
            <Link to={"/admin/contacts"}>
              <ContactSupportIcon className="icon" />
              <span>Liên hệ</span>
            </Link>
          </li> */}
          <li>
            <Link to={"/admin/services"}>
              <RoomServiceIcon className="icon" />
              <span>Dịch vụ</span>
            </Link>
          </li>
          <li>
            <Link to={"/admin/payments"}>
              <PaymentIcon className="icon" />
              <span>Thanh toán</span>
            </Link>
          </li>
          <li>
            <Link to={"/admin/reviews"}>
              <RateReviewIcon className="icon" />
              <span>Đánh giá</span>
            </Link>
          </li>
          <li>
            <Link to={"/admin"}>
              <MonetizationOnIcon className="icon" />
              <span>Thống kê</span>
            </Link>
          </li>
          <li>
            <Link to={"/admin/promotions"}>
              <LoyaltyIcon className="icon" />
              <span>Khuyến mãi</span>
            </Link>
          </li>
          <p className="title">Người dùng</p>
          <li>
            <Link to={"/admin/profile"}>
              <AccountCircleIcon className="icon" />
              <span>Hồ sơ</span>
            </Link>
          </li>
          <li className="logout">
            <button onClick={handleLogout} className="link-button">
              <ExitToAppIcon className="icon" />
              <span>Đăng Xuất</span>
            </button>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
