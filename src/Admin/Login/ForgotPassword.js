import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
    const [username, setUsername] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:7175/api/Users/ForgotPassword', { username });
            toast.success(response.data.message);
        } catch (error) {
            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
            }
        }
    };

    return (
        <Container className="mt-5">
            <h2>Quên mật khẩu</h2>
            <Form onSubmit={handleForgotPassword}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập tên đăng nhập"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">
                    Gửi
                </Button>
            </Form>
            <ToastContainer />
        </Container>
    );
}

export default ForgotPassword;
