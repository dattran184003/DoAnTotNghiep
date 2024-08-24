import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { Card, ListGroup, Form, Button, Container, Row, Col } from 'react-bootstrap';
import "./contact.scss"; 
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';

const Chat = () => {
    const token = localStorage.getItem('jwtToken');
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    
    let senderId = null;
    let adminName = null;
    if (token) {
        const decodedToken = jwtDecode(token);
        senderId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        adminName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    } else {
        console.error("JWT token không được tìm thấy trong localStorage.");
    }

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (senderId) {
            axios.get(`https://localhost:7175/api/Contacts/GetUserContacts/${senderId}`)
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
                    const response = await axios.get(`https://localhost:7175/api/Contacts/GetMessages/${senderId}/${selectedUser.id}`);
                    setMessages(response.data);
                } catch (error) {
                    console.error("Đã xảy ra lỗi khi lấy tin nhắn!", error);
                }
            }
        };

        fetchMessages();
    }, [selectedUser, senderId]);

    const sendMessage = () => {
        const contact = {
            UserId: selectedUser.id,
            AdminId: senderId,
            MessageAdmin: newMessage // Tin nhắn từ admin gửi đi
        };

        axios.post('https://localhost:7175/api/Contacts/SendMessage', contact)
            .then(response => {
                setMessages([...messages, response.data]);
                setNewMessage('');
            })
            .catch(error => {
                console.error("Đã xảy ra lỗi khi gửi tin nhắn!", error);
            });
    };

    if (!token) {
        return <div>JWT token không có sẵn, vui lòng đăng nhập lại.</div>;
    }

    return (
        <div className="car">
            <Sidebar isOpen={isSidebarOpen} />
            <div className={`carContainer ${isSidebarOpen ? "open" : ""}`}>
                <Navbar toggleSidebar={toggleSidebar} />
                <Container>
                    <h3>Danh sách liên hệ</h3>
                    <Row>
                        <Col md={4}>
                            <Card>
                                <Card.Header>Danh sách người dùng</Card.Header>
                                <ListGroup variant="flush">
                                    {users.map(user => (
                                        <ListGroup.Item 
                                            key={user.id} 
                                            onClick={() => setSelectedUser(user)} 
                                            action
                                            className={selectedUser?.id === user.id ? 'active' : ''}
                                        >
                                            {user.userName}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card>
                        </Col>
                        <Col md={8}>
                            <Card>
                                <Card.Header>Chat với {selectedUser ? selectedUser.userName : '...'}</Card.Header>
                                <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    {selectedUser ? (
                                        messages.map((msg, index) => (
                                            <div key={index} style={{ textAlign: msg.adminId === senderId ? 'right' : 'left', marginBottom: '10px', clear: 'both' }}>
                                                {msg.messageUser !== null && (
                                                    <p style={{ maxWidth: '80%', wordWrap: 'break-word', borderRadius: '10px', padding: '10px', background: msg.userId === senderId ? '#007bff' : '#f0f0f0', color: msg.userId === senderId ? '#fff' : '#000', float: msg.userId === senderId ? 'right' : 'left', clear: 'both' }}>
                                                        {msg.userId === senderId ? 'Bạn' : selectedUser.userName}: {msg.messageUser}
                                                    </p>
                                                )}
                                                {msg.messageAdmin !== null && (
                                                    <p style={{ maxWidth: '80%', wordWrap: 'break-word', borderRadius: '10px', padding: '10px', background: msg.adminId === senderId ? '#007bff' : '#f0f0f0', color: msg.adminId === senderId ? '#fff' : '#000', float: msg.adminId === senderId ? 'right' : 'left', clear: 'both' }}>
                                                        {msg.adminId === senderId ? 'Bạn' : selectedUser.userName}: {msg.messageAdmin}
                                                    </p>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p>Vui lòng chọn một người dùng để bắt đầu chat.</p>
                                    )}
                                </Card.Body>

                                <Card.Footer>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Nhập tin nhắn..."
                                            disabled={!selectedUser}
                                        />
                                        <Button className="mt-2" onClick={sendMessage} disabled={!selectedUser}>Gửi</Button>
                                    </Form.Group>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Chat;
