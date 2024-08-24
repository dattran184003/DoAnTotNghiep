import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';
import "./car.scss"; 
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchCarDetail = async () => {
      try {
        const response = await axios.get(`https://localhost:7175/api/Cars/Detail/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetail();
  }, [id]);

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="car">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`carContainer ${isSidebarOpen ? "open" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <Container>
          <br />
          <Row>
            <Col md={6}>
              <Image src={`https://localhost:7175/${car.mainImage}`} fluid />
            </Col>
            <Col md={6}>
              <h2>{car.name}</h2>
              <h3>{car.modelName}</h3>
              <div className="car-specs">
                <div className="spec-item">
                  <strong>Năm sản xuất:</strong> <span>{car.year}</span>
                </div>
                <div className="spec-item">
                  <strong>Giá:</strong> <span>{car.price} VNĐ</span>
                </div>
                <div className="spec-item">
                  <strong>Động cơ:</strong> <span>{car.engine}</span>
                </div>
                <div className="spec-item">
                  <strong>Hộp số:</strong> <span>{car.transmission}</span>
                </div>
                <div className="spec-item">
                  <strong>Mô tả:</strong> <span>{car.description}</span>
                </div>
                <div className="spec-item">
                  <strong>Công suất:</strong> <span>{car.horsepower}</span>
                </div>
                <div className="spec-item">
                  <strong>Momen xoắn:</strong> <span>{car.torque}</span>
                </div>
                <div className="spec-item">
                  <strong>Loại nhiên liệu:</strong> <span>{car.fuelType}</span>
                </div>
                <div className="spec-item">
                  <strong>Độ tiêu thụ nhiên liệu:</strong> <span>{car.fuelConsumption} L/100 km</span>
                </div>
                <div className="spec-item">
                  <strong>Hệ dẫn động:</strong> <span>{car.drivetrain}</span>
                </div>
                <div className="spec-item">
                  <strong>Số chỗ ngồi:</strong> <span>{car.seatingCapacity}</span>
                </div>
                <div className="spec-item">
                  <strong>Chiều dài:</strong> <span>{car.length} mm</span>
                </div>
                <div className="spec-item">
                  <strong>Chiều rộng:</strong> <span>{car.width} mm</span>
                </div>
                <div className="spec-item">
                  <strong>Chiều cao:</strong> <span>{car.height} mm</span>
                </div>
                <div className="spec-item">
                  <strong>Chiều dài cơ sở:</strong> <span>{car.wheelbase} mm</span>
                </div>
                <div className="spec-item">
                  <strong>Trọng lượng không tải:</strong> <span>{car.curbWeight} kg</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default CarDetail;
