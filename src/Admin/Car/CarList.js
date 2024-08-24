import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col, Container, Modal } from 'react-bootstrap';
import axios from 'axios';
import * as FileSaver from 'file-saver';
import { Link, useNavigate } from 'react-router-dom';
import "./car.scss"; 
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [showDetailModal, setShowDetailModal] = useState(false);
    const [detailCar, setDetailCar] = useState(null);
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    
  useEffect(() => {
    fetchCars();
  }, [currentPage, searchTerm, minYear, maxYear, minPrice, maxPrice]);

  const fetchCars = async () => {
    try {
      const response = await axios.get('https://localhost:7175/api/Cars/page', {
        params: {
          searchTerm: searchTerm,
          page: currentPage,
          PAGE_SIZE: pageSize,
          minYear: minYear,
          maxYear: maxYear,
          minPrice: minPrice,
          maxPrice: maxPrice,
        },
      });
      const { data, totalCount } = response.data;
      setCars(data);
      setTotalPages(Math.ceil(totalCount / pageSize));
    } catch (error) {
      console.error('There was an error fetching the cars!', error);
    }
  };

  const fetchCarDetail = async (id) => {
    try {
      const response = await axios.get(`https://localhost:7175/api/Cars/${id}`);
      setDetailCar(response.data);
      setShowDetailModal(true);
    } catch (error) {
      console.error('There was an error fetching the car details!', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMinYearChange = (e) => {
    setMinYear(parseInt(e.target.value));
  };

  const handleMaxYearChange = (e) => {
    setMaxYear(parseInt(e.target.value));
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(parseFloat(e.target.value));
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(parseFloat(e.target.value));
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
    <div className="car">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`carContainer ${isSidebarOpen ? "open" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
      <Container>
         <h2 className="text-center">Danh sách xe</h2>

            <div className="mb-3">
                <input type="text" className="form-control" placeholder="Tìm kiếm theo tên xe" onChange={handleSearch} />
            </div>
        <Row className="mb-3">
          <Col xs={3}>
            <Form.Group controlId="minYear">
              <Form.Control
                type="number"
                placeholder="Năm sản xuất từ"
                value={minYear}
                onChange={handleMinYearChange}
              />
            </Form.Group>
          </Col>
          <Col xs={3}>
            <Form.Group controlId="maxYear">
              <Form.Control
                type="number"
                placeholder="Năm sản xuất đến"
                value={maxYear}
                onChange={handleMaxYearChange}
              />
            </Form.Group>
          </Col>
          <Col xs={3}>
            <Form.Group controlId="minPrice">
              <Form.Control
                type="number"
                placeholder="Giá từ"
                value={minPrice}
                onChange={handleMinPriceChange}
              />
            </Form.Group>
          </Col>
          <Col xs={3}>
            <Form.Group controlId="maxPrice">
              <Form.Control
                type="number"
                placeholder="Giá đến"
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
            </Form.Group>
          </Col>
              </Row>
            <Button variant="primary" onClick={() => navigate('/admin/cars/add')}>Thêm Xe</Button>
                  <br />
                  <br />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên xe</th>
              <th>Mẫu xe</th>
              <th>Năm sản xuất</th>
              <th>Giá</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.name}</td>
                <td>{car.model.name}</td>
                <td>{car.year}</td>
                <td>{car.price} VNĐ</td>
                <td>
                  <Link to={`/admin/cars/${car.id}`} >
                        <Button style={{ margin: "5px" }} variant="info">Xem chi tiết</Button>
                    </Link>
                    <Link  to={`/admin/cars/edit/${car.id}`}>
                        <Button variant="warning" >Sửa</Button>
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

export default CarList;
