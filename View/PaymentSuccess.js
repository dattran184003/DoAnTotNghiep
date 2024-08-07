// src/components/PaymentSuccess.jsx
import React, { useEffect, useRef, useState } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import { Alert, Container, Row, Col, Card, Button } from 'react-bootstrap';
import queryString from 'query-string';

const PaymentSuccess = () => {
    const [paymentData, setPaymentData] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate(); // Sử dụng hook useNavigate

  const handleGoBack = () => {
    navigate(-4); // Sử dụng navigate(-1) để quay lại trang trước
  };
    useEffect(() => {
        const parsedData = queryString.parse(location.search);
        if (parsedData.vnp_ResponseCode === '00') {
            setPaymentData(parsedData);
        } else {
            setError('Thanh toán thất bại');
        }
    }, [location.search]);
    const [copied, setCopied] = useState(false);
    const textRef = useRef(null);
  
    const handleCopy = () => {
      const text = textRef.current.textContent;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
    return (
        <>
        <Container style={{display:"flex",justifyContent:"center",margin:"40px"}}>
            <Row  style={{border:"1px solid #000",width:"max-content",padding:"20px",borderRadius:"10px"}}>
                <Col >
                    {error && <Alert variant="danger">{error}</Alert>}
                    {paymentData && (
                        <Card>
                            <Card.Header>Thanh toán thành công</Card.Header>
                            <Card.Header style={{textAlign:"center"}}>--------o0o--------</Card.Header>
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
                                    <strong>Mã an toàn: </strong>
                                </Card.Text>
                                <Card.Text>
                                    <div style={{display:"flex"}}>
                                        <h2 style={{color:"#ff0000"}} ref={textRef}>689124</h2>
                                        <button onClick={handleCopy} style={{margin:" 0px 15px",padding:"5px 20px",backgroundColor:" #0066ff",color:"#fff",border:"none"}}>
                                            {copied ? 'Đã copy' : 'Copy'}
                                        </button>
                                    </div>
                                </Card.Text>
                                {/* <Card.Text>
                                    <strong>Thông tin đơn hàng:</strong> {paymentData.vnp_OrderInfo}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Ngày thanh toán:</strong> {paymentData.vnp_PayDate}
                                </Card.Text> */}
                            </Card.Body>
                        </Card>
                    )}
                </Col>
                <Col style={{display:"flex"}}>
                    <Button onClick={handleGoBack} style={{margin:"auto",padding:"10px 25px",backgroundColor:" #0066ff",color:"#fff",border:"none"}}>Tiếp Tục</Button>
                </Col>
            </Row>
        </Container>
        </>
    );
};

export default PaymentSuccess;
