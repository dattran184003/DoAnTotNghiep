import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import "./profile.scss";
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [userRoles, setUserRoles] = useState([]);
    const [user, setUser] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

                // Lấy thông tin người dùng từ API
                const response = await axios.get(`https://localhost:7175/api/Users/${userId}`);
                setUser(response.data);

                // Lấy danh sách quyền từ JWT
                const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                setUserRoles(Array.isArray(roles) ? roles : [roles]);

                setUserId(userId);
                setUsername(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleUpdateProfile = async (formData) => {
        try {
            const token = localStorage.getItem('jwtToken');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };

            // Cập nhật thông tin người dùng
            const updatedUser = { ...user, ...formData };
            await axios.put(`https://localhost:7175/api/Users/${userId}`, updatedUser, config);

            // Đóng modal và cập nhật lại thông tin người dùng
            setShowUpdateModal(false);
            fetchUserData();

            // Hiển thị thông báo thành công
            toast.success('Cập nhật thông tin cá nhân thành công!');
        } catch (error) {
            console.error('Error updating user profile:', error);
            toast.error('Cập nhật thông tin cá nhân thất bại!');
        }
    };

    const handleChangePassword = async (formData) => {
        try {
            const token = localStorage.getItem('jwtToken');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };

            await axios.put(`https://localhost:7175/api/Users/ChangePassword`, formData, config);

            // Đóng modal và thông báo thành công
            setShowChangePasswordModal(false);
            toast.success('Đổi mật khẩu thành công!');

            // Đăng xuất sau khi đổi mật khẩu
            // handleLogout();
        } catch (error) {
            console.error('Error changing password:', error);
            toast.error('Đổi mật khẩu thất bại!');
        }
    };

    const handleLogout = () => {
        // Xử lý khi click đăng xuất
        // Xóa JWT và chuyển hướng về trang đăng nhập
        localStorage.removeItem('jwtToken');
        navigate('/');
        toast.success('Đăng xuất thành công!');
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    };

    const handleCloseChangePasswordModal = () => {
        setShowChangePasswordModal(false);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile">
            <Sidebar isOpen={isSidebarOpen} />
            <div className={`profileContainer ${isSidebarOpen ? "open" : ""}`}>
                <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
                <Container>
                    <br />
                    <h2>Thông tin người dùng</h2>
                    <p><strong>Tên đăng nhập:</strong> {username}</p>
                    <p><strong>Tên đầy đủ:</strong> {user.fullname}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Số điện thoại:</strong> {user.phoneNumber}</p>
                    <p><strong>Địa chỉ:</strong> {user.address}</p>
                    <p><strong>Quyền hạn:</strong> {userRoles.join(', ')}</p>

                    <div className="profile-buttons">
                        <Button variant="primary" onClick={() => setShowUpdateModal(true)}>Cập nhật thông tin cá nhân</Button>
                        <Button variant="secondary" onClick={() => setShowChangePasswordModal(true)}>Đổi mật khẩu</Button>
                        <Button variant="danger" onClick={handleLogout}>Đăng xuất</Button>
                    </div>
                </Container>
            </div>

            {/* Modal for Update Profile */}
            <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật thông tin cá nhân</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        const formData = {
                            FullName: e.target.formFullName.value,
                            Email: e.target.formEmail.value,
                            PhoneNumber: e.target.formPhoneNumber.value,
                            Address: e.target.formAddress.value
                        };
                        handleUpdateProfile(formData);
                    }}>
                        <Form.Group controlId="formFullName">
                            <Form.Label>Họ và tên</Form.Label>
                            <Form.Control type="text" defaultValue={user.fullname} />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" defaultValue={user.email} />
                        </Form.Group>
                        <Form.Group controlId="formPhoneNumber">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control type="text" defaultValue={user.phoneNumber} />
                        </Form.Group>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control type="text" defaultValue={user.address} />
                        </Form.Group>
                        <br />
                        <Button variant="primary" type="submit">
                            Cập nhật
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal for Change Password */}
            <Modal show={showChangePasswordModal} onHide={handleCloseChangePasswordModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Đổi mật khẩu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        const formData = {
                            OldPassword: e.target.formOldPassword.value,
                            NewPassword: e.target.formNewPassword.value,
                            ConfirmPassword: e.target.formConfirmPassword.value
                        };
                        handleChangePassword(formData);
                    }}>
                        <Form.Group controlId="formOldPassword">
                            <Form.Label>Mật khẩu cũ</Form.Label>
                            <Form.Control type="password" placeholder="Nhập mật khẩu cũ" required />
                        </Form.Group>
                        <Form.Group controlId="formNewPassword">
                            <Form.Label>Mật khẩu mới</Form.Label>
                            <Form.Control type="password" placeholder="Nhập mật khẩu mới" required />
                        </Form.Group>
                        <Form.Group controlId="formConfirmPassword">
                            <Form.Label>Nhập lại mật khẩu mới</Form.Label>
                            <Form.Control type="password" placeholder="Nhập lại mật khẩu mới" required />
                        </Form.Group>
                        <br />
                        <Button variant="primary" type="submit">
                            Đổi mật khẩu
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <ToastContainer />
        </div>
    );
}

export default Profile;
