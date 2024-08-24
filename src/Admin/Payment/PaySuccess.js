// src/components/PaymentSuccess.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Alert, Container, Row, Col, Card } from 'react-bootstrap';
import queryString from 'query-string';

const PaymentSuccess = () => {
    const [paymentData, setPaymentData] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const parsedData = queryString.parse(location.search);
        if (parsedData.vnp_ResponseCode === '00') {
            setPaymentData(parsedData);
        } else {
            setError('Thanh toán thất bại');
        }
    }, [location.search]);

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="8">
                    {error && <Alert variant="danger">{error}</Alert>}
                    {paymentData && (
                        <Card>
                            <Card.Header>Thanh toán thành công</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <strong>Mã giao dịch:</strong> {paymentData.vnp_TransactionNo}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Số tiền:</strong> {(paymentData.vnp_Amount / 100).toLocaleString()} VND
                                </Card.Text>
                                <Card.Text>
                                    <strong>Mã ngân hàng:</strong> {paymentData.vnp_BankCode}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Loại thẻ:</strong> {paymentData.vnp_CardType}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Thông tin đơn hàng:</strong> {paymentData.vnp_OrderInfo}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Ngày thanh toán:</strong> {paymentData.vnp_PayDate}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default PaymentSuccess;
