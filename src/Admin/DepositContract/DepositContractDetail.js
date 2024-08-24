import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import "./contract.scss"; 
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';

const DepositContractDetail = () => {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const fetchContract = async () => {
    try {
      const response = await axios.get(`https://localhost:7175/api/DepositContracts/detail/${id}`);
      setContract(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContract();
  }, [id]);
    
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleUpdateStatus = async () => {
    try {
      if (selectedStatus !== null) {
        await axios.put(`https://localhost:7175/api/DepositContracts/updateStatus/${id}`, {
          status: selectedStatus
        });
        await fetchContract(); // Refresh contract detail after update
        setShowStatusDropdown(false); // Hide dropdown after update
        alert("Cập nhật trạng thái thành công!"); // Show success message
      }
    } catch (error) {
      console.error('Error updating contract status:', error);
      alert("Cập nhật trạng thái thất bại!"); // Show error message
    }
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(parseInt(status)); // Ensure status is parsed as integer
  };

  const renderStatusDropdown = () => {
    return (
      <DropdownButton
        id="status-dropdown"
        title="Chọn trạng thái mới"
        onSelect={handleStatusSelect}
        variant="primary"
      >
        <Dropdown.Item eventKey={0}>Yêu thích</Dropdown.Item>
        <Dropdown.Item eventKey={1}>Đã đặt cọc</Dropdown.Item>
        <Dropdown.Item eventKey={2}>Đã ký hợp đồng</Dropdown.Item>
        <Dropdown.Item eventKey={3}>Hoàn thành</Dropdown.Item>
        <Dropdown.Item eventKey={4}>Hủy bỏ</Dropdown.Item>
      </DropdownButton>
    );
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <h4>Error: {error}</h4>
      </Container>
    );
  }

  return (
    <div className="contract">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`contractContainer ${isSidebarOpen ? "open" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <Container>
          <br />
          {contract ? (
            <Card>
              <Card.Header>
                <h3>Chi tiết hợp đồng đặt cọc</h3>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <p><strong>Tên người dùng:</strong> {contract.userName}</p>
                    <p><strong>Tên xe:</strong> {contract.carName}</p>
                    <p><strong>Tên dịch vụ:</strong> {contract.serviceName}</p>
                    <p><strong>Giá dịch vụ:</strong> {contract.servicePrice.toLocaleString()} VND</p>
                    <p><strong>Phương thức thanh toán:</strong> {contract.paymentMethod}</p>
                    <p><strong>Giảm giá khuyến mãi:</strong> {contract.promotionDiscount}%</p>
                  </Col>
                  <Col md={6}>
                    <p><strong>Địa chỉ giao hàng:</strong> {contract.deliveryAddress}</p>
                    <p><strong>Tổng tiền:</strong> {contract.intoMoney.toLocaleString()} VND</p>
                    <p><strong>Số lượng:</strong> {contract.quantity}</p>
                    <p><strong>Ngày ký hợp đồng:</strong> {new Date(contract.contractSigningDate).toLocaleDateString()}</p>
                    <p><strong>Ngày nhận xe:</strong> {new Date(contract.carPickupDate).toLocaleDateString()}</p>
                    <p><strong>Màu:</strong> {contract.note}</p>
                    <p><strong>Trạng thái:</strong> {getStatusLabel(contract.status)}</p>
                    <p><strong>CMNN:</strong> {contract.contractPath}</p>
                    <p><strong>Chữ ký:</strong> <img src={`https://localhost:7175/${contract.signature}`} alt="Chữ ký" width="200" height="100" /></p>
                    {contract.status === 3 || contract.status === 4 ? null : (
                      <div>
                        {renderStatusDropdown()}
                        <Button style={{ margin: "5px" }} variant="primary" onClick={handleUpdateStatus}>
                          Lưu trạng thái
                        </Button>
                      </div>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ) : (
            <h4>Không tìm thấy hợp đồng</h4>
          )}
        </Container>
      </div>
    </div>
  );
};

const getStatusLabel = (status) => {
  switch (status) {
    case 0: return 'Yêu thích';
    case 1: return 'Đã đặt cọc';
    case 2: return 'Đã ký hợp đồng';
    case 3: return 'Hoàn thành';
    case 4: return 'Hủy bỏ';
    default: return 'Unknown';
  }
};

export default DepositContractDetail;
