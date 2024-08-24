import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://localhost:7175/api/Users/login', {
        Username: username,
        Password: password
      });

      const { token, roles } = response.data;

      // Lưu trữ JWT vào localStorage
      localStorage.setItem('jwtToken', token);

      if (roles.includes('Admin')) {
        alert('Đăng nhập thành công với quyền Admin');
        navigate('/admin');
      } else {
        setErrorMessage('Tài khoản bạn không đủ quyền');
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage('Tài khoản hoặc mật khẩu không chính xác');
      } else {
        setErrorMessage('Lỗi kết nối đến máy chủ');
      }
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="login-form p-4 rounded shadow-lg bg-white" style={{ maxWidth: '600px', width: '100%' }}>
        <h2 className="text-center mb-4">Đăng nhập</h2>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
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

          <Form.Group controlId="formPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3 w-100">
            Đăng nhập
          </Button>
          
          {/* <Link to="/admin/forgotpassword">Quên mật khẩu?</Link> */}
        </Form>
      </div>
    </div>
  );
};

export default Login;
