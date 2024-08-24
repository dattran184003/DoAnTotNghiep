import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { useParams, useHistory, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const { token, email } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }
        try {
            const response = await axios.post('https://localhost:7175/api/users/reset-password', { token, email, password, confirmPassword });
            setMessage('Mật khẩu đã được đặt lại thành công');
            setError('');
            setTimeout(() => {
                navigate('/login'); // Redirect to login page after successful reset
            }, 2000);
        } catch (error) {
            setMessage('');
            setError(error.response.data);
        }
    };

    return (
        <div className="container">
            <h2>Đặt lại mật khẩu</h2>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formPassword">
                    <Form.Label>Mật khẩu mới</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Xác nhận mật khẩu</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Nhập lại mật khẩu mới"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Đặt lại mật khẩu
                </Button>
            </Form>
        </div>
    );
};

export default ResetPassword;
