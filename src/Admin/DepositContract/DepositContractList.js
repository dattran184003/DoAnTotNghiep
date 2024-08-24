import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./contract.scss"; 
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';

const DepositContractList = () => {
  const [contracts, setContracts] = useState([]);
  const [contractId, setContractId] = useState('');
  const [userName, setUserName] = useState(''); // Biến để tìm kiếm theo tên người dùng
  const [carName, setCarName] = useState(''); // Biến để tìm kiếm theo tên xe
  const [status, setStatus] = useState('');
  const [signingDateFrom, setSigningDateFrom] = useState('');
  const [signingDateTo, setSigningDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetchContracts();
  }, [currentPage, contractId, userName, carName, status, signingDateFrom, signingDateTo]);

  const fetchContracts = async () => {
    try {
      const response = await axios.get('https://localhost:7175/api/DepositContracts/page', {
        params: {
          contractId: contractId,
          userName: userName, // Gửi tên người dùng lên API
          carName: carName, // Gửi tên xe lên API
          status: status,
          signingDateFrom: signingDateFrom,
          signingDateTo: signingDateTo,
          pageNumber: currentPage,
          pageSize: pageSize,
        },
      });
      const { items, totalItems } = response.data;
      setContracts(items || []);
      setTotalPages(Math.ceil(totalItems / pageSize));
    } catch (error) {
      console.error('There was an error fetching the contracts!', error);
    }
  };

  // Các hàm xử lý thay đổi input
  const handleContractIdChange = (e) => {
    setContractId(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleCarNameChange = (e) => {
    setCarName(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSigningDateFromChange = (e) => {
    setSigningDateFrom(e.target.value);
  };

  const handleSigningDateToChange = (e) => {
    setSigningDateTo(e.target.value);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="contract">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`contractContainer ${isSidebarOpen ? "open" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <Container>
          <h2 className="text-center">Danh sách hợp đồng đặt cọc</h2>
          <Row className="mb-3">
            <Col xs={3}>
              <Form.Group controlId="contractId">
                <Form.Control
                  type="text"
                  placeholder="ID Hợp đồng"
                  value={contractId}
                  onChange={handleContractIdChange}
                />
              </Form.Group>
            </Col>
            <Col xs={5}>
              <Form.Group controlId="userName">
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm theo tên người dùng" 
                  value={userName}
                  onChange={handleUserNameChange}
                />
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group controlId="carName">
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm theo tên Xe" 
                  value={carName}
                  onChange={handleCarNameChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Form.Group controlId="signingDateFrom">
                <Form.Label>Tìm kiếm theo ngày ký từ</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Ngày ký từ" 
                  value={signingDateFrom}
                  onChange={handleSigningDateFromChange}
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group controlId="signingDateTo">
                <Form.Label>Tìm kiếm theo ngày ký đến</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Ngày ký đến" // 
                  value={signingDateTo}
                  onChange={handleSigningDateToChange}
                />
              </Form.Group>
            </Col>
            
          </Row>
          <Row style={{ margin: "15px" }}>
            <Col xs={4}>
              <Form.Group controlId="status">
                <Form.Control
                  as="select"
                  value={status}
                  onChange={handleStatusChange}
                >
                  <option value="">Trạng thái</option>
                  <option value="0">Yêu thích</option>
                  <option value="1">Đã đặt cọc</option>
                  <option value="2">Đã ký hợp đồng</option>
                  <option value="3">Hoàn thành</option>
                  <option value="4">Hủy bỏ</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={4}>
            <Button variant="primary" onClick={() => navigate('/admin/depositcontracts/add')}>Thêm Hợp đồng</Button>
              </Col>
          </Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>ID Hợp đồng</th>
                <th>Tên người dùng</th>
                <th>Tên xe</th>
                <th>Đường dẫn hợp đồng</th>
                <th>Trạng thái</th>
                <th>Ngày ký</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract, index) => (
                <tr key={contract.id}>
                  <td>{index + 1}</td>
                  <td>{contract.id}</td>
                  <td>{contract.userName}</td>
                  <td>{contract.carName}</td>
                  <td>{contract.contractPath}</td>
                  <td>{['Yêu thích', 'Đã đặt cọc', 'Đã ký hợp đồng', 'Hoàn thành', 'Hủy bỏ'][contract.status]}</td>
                  <td>{new Date(contract.contractSigningDate).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/admin/depositcontracts/${contract.id}`}>
                      <Button style={{ margin: "5px" }} variant="info">Xem chi tiết</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-center my-4">
            <Button variant="outline-primary" onClick={prevPage} disabled={currentPage === 1}>
              Trang trước
            </Button>
            <span className="mx-2">Trang {currentPage}</span>
            <Button variant="outline-primary" onClick={nextPage} disabled={currentPage === totalPages}>
              Trang sau
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default DepositContractList;
