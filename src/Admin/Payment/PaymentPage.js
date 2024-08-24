import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';

const PaymentPage = () => {
    const [error, setError] = useState('');

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
                    <h1>Thanh Toán VNPAY</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Button variant="primary" onClick={handlePayment}>
                        Thanh toán
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default PaymentPage;
