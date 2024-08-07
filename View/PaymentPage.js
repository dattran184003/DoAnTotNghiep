import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handlePayment = async () => {
        const orderType = 'Hợp đồng đặt cọc';
        const amount = 5000000; // Giá trị cố định
        const orderDescription = 'thanh toán vnpay online';
        const name = 'Nguyen Van A'; // Giá trị cố định

        try {
            const response = await axios.post('https://localhost:7175/api/payments/pay', {
                orderType,
                amount: parseFloat(amount),
                orderDescription,
                name
            });
            window.location.href = response.data;
        } catch (error) {
            setError('Có lỗi xảy ra khi tạo URL thanh toán. Vui lòng thử lại.');
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Button variant="primary" onClick={handlePayment} style={{ textDecoration: "none", border: "1px solid #000", padding: "10px 20px",width:"100%" }}>
                        Thanh toán
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default PaymentPage;
