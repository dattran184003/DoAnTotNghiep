import { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import "./account.scss";
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';
import axios from "axios";

const RegisterUser = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useState({});
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setAccount(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`https://localhost:7175/api/Users/register`, account)
            .then(() => navigate('/admin/accounts'))
            .catch(err => {
                // handle error if needed
                console.error("Có lỗi xảy ra:", err);
            });
    }

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="account">
            <Sidebar isOpen={isSidebarOpen} />
            <div className={`accountContainer ${isSidebarOpen ? "open" : ""}`}>
                <Navbar toggleSidebar={toggleSidebar} />
                <Container>
                    <br></br>
                    <Row className="justify-content-center">
                        <Col md={6} lg={4}>
                            <Form className="form-container" onSubmit={handleSubmit}>
                                <h2>Thêm người dùng</h2>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tên đăng nhập:</Form.Label>
                                    <Form.Control required placeholder="Username" type="text" name="username" onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mật khẩu:</Form.Label>
                                    <Form.Control required placeholder="Password" type="password" name="password" onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control required placeholder="Email" type="email" name="email" onChange={handleChange} />
                                </Form.Group>
                                <Button type="submit" variant="success">Đăng ký</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default RegisterUser;
