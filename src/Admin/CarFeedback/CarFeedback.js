import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
import "./account.scss";
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';

const CarFeedback = () => {
    const token = localStorage.getItem('jwtToken');
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    let senderId = null;
    if (token) {
        const decodedToken = jwtDecode(token);
        senderId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    } else {
        console.error("JWT token không được tìm thấy trong localStorage.");
    }

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (senderId) {
            axios.get(`https://localhost:7175/api/CarFeedbacks/GetUserFeedback/${senderId}`)
                .then(response => {
                    setUsers(response.data);
                })
                .catch(error => {
                    console.error("Đã xảy ra lỗi khi lấy danh sách người dùng!", error);
                });
        }
    }, [senderId]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (selectedUser && senderId) {
                try {
                    const response = await axios.get(`https://localhost:7175/api/CarFeedbacks/GetCarFeedbackMessages/${senderId}/${selectedUser.id}`);
                    setMessages(response.data);
                } catch (error) {
                    console.error("Đã xảy ra lỗi khi lấy tin nhắn!", error);
                }
            }
        };

        fetchMessages();
    }, [selectedUser, senderId]);

    const sendFeedback = () => {
        if (!selectedUser) {
            console.error("Thông tin người dùng không hợp lệ.");
            return;
        }

        const depositContractId = messages.length > 0 ? messages[0].depositContractId : null;

        if (!depositContractId) {
            console.error("Không tìm thấy Mã hợp đồng.");
            return;
        }

        const feedback = {
            UserId: selectedUser.id,
            AdminId: senderId,
            MessageAdmin: newMessage,
            DepositContractId: depositContractId
        };

        axios.post('https://localhost:7175/api/CarFeedbacks/SendCarFeedback', feedback)
            .then(response => {
                setMessages([...messages, response.data]);
                setNewMessage('');
            })
            .catch(error => {
                console.error("Đã xảy ra lỗi khi gửi phản hồi!", error);
            });
    };

    if (!token) {
        return <div>JWT token không có sẵn, vui lòng đăng nhập lại.</div>;
    }

 return (
    <div className="account">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`accountContainer ${isSidebarOpen ? "open" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
             <Container>
                 <h3>Danh sách phản hồi xe</h3>
                <Row>
                    <Col md={4}>
                        <Card>
                            <Card.Header>Danh sách người dùng</Card.Header>
                            <Card.Body>
                                <ul className="list-group">
                                    {users.map(user => (
                                        <li key={user.id} className={`list-group-item ${selectedUser && selectedUser.id === user.id ? 'active' : ''}`} onClick={() => setSelectedUser(user)}>
                                            {user.userName}
                                        </li>
                                    ))}
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card>
                            <Card.Header>Phản hồi xe hơi từ {selectedUser ? selectedUser.userName : '...'}</Card.Header>
                            <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                {selectedUser ? (
                                    messages.map((msg, index) => (
                                        <div key={index} style={{ textAlign: msg.adminId === senderId ? 'right' : 'left', marginBottom: '10px', clear: 'both' }}>
                                            {msg.messageUser !== null && (
                                                <p style={{ maxWidth: '80%', wordWrap: 'break-word', borderRadius: '10px', padding: '10px', background: msg.userId === senderId ? '#007bff' : '#f0f0f0', color: msg.userId === senderId ? '#fff' : '#000', float: msg.userId === senderId ? 'right' : 'left', clear: 'both' }}>
                                                    {msg.userId === senderId ? 'Bạn' : selectedUser.userName}: {msg.messageUser} <br />
                                                    {msg.depositContractId && (
                                                        <small>Mã hợp đồng: {msg.depositContractId}</small>
                                                    )}
                                                </p>
                                            )}
                                            {msg.messageAdmin !== null && (
                                                <p style={{ maxWidth: '80%', wordWrap: 'break-word', borderRadius: '10px', padding: '10px', background: msg.adminId === senderId ? '#007bff' : '#f0f0f0', color: msg.adminId === senderId ? '#fff' : '#000', float: msg.adminId === senderId ? 'right' : 'left', clear: 'both' }}>
                                                    {msg.adminId === senderId ? 'Bạn' : 'Admin'}: {msg.messageAdmin} <br />
                                                    {msg.depositContractId && (
                                                        <small>Mã hợp đồng: {msg.depositContractId}</small>
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p>Chọn người dùng để xem phản hồi.</p>
                                )}
                            </Card.Body>
                            {selectedUser && (
                                <Card.Footer>
                                    <Form>
                                        <Form.Group controlId="newMessage">
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập tin nhắn của bạn"
                                                value={newMessage}
                                                onChange={e => setNewMessage(e.target.value)}
                                            />
                                        </Form.Group>
                                        <br />
                                        <Button variant="primary" onClick={sendFeedback}>
                                            Gửi
                                        </Button>
                                    </Form>
                                </Card.Footer>
                            )}
                        </Card>
                    </Col>
                </Row>
             </Container>
             </div>
        </div>
    );
};

export default CarFeedback;
