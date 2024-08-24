import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./car.scss"; 
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';

const EditCarImages = () => {
  const { id } = useParams(); // Extract the ID from the URL
  const [carImages, setCarImages] = useState({
    ImageFile1: null,
    ImageFile2: null,
    ImageFile3: null,
    ImageFile4: null,
    ImageFile5: null,
    ImageFile6: null,
    ImageFile7: null,
    ImageFile8: null,
    ImageFile9: null,
    ImageFile10: null,
  });
  const [carId, setCarId] = useState(null); // Store the CarId
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current car images and CarId if necessary
    axios.get(`https://localhost:7175/api/CarImages/${id}`)
      .then(response => {
        setCarId(response.data.carId); // Assuming response contains carId
        setCarImages(response.data);
      })
      .catch(error => {
        console.error('Lỗi khi tải hình ảnh xe:', error);
        setError('Lỗi khi tải hình ảnh xe.');
      });
  }, [id]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setCarImages({ ...carImages, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    Object.keys(carImages).forEach((key) => {
      if (carImages[key]) {
        formData.append(key, carImages[key]);
      }
    });
    formData.append('CarId', carId);

    try {
      const response = await axios.put(`https://localhost:7175/api/CarImages/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Hình ảnh xe đã được cập nhật thành công.');
      setTimeout(() => {
        navigate('/admin/carimages'); // Redirect to car images list after success
      }, 2000); // Wait for 2 seconds before redirecting
    } catch (err) {
      setError('Đã xảy ra lỗi khi cập nhật hình ảnh xe.');
    }
  };


    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="car">
            <Sidebar isOpen={isSidebarOpen} />
            <div className={`carContainer ${isSidebarOpen ? "open" : ""}`}>
                <Navbar toggleSidebar={toggleSidebar} />
    <Container>
      <h2>Chỉnh sửa Hình ảnh Xe</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          {[...Array(10)].map((_, index) => (
            <Col xs={12} md={6} key={index}>
              <Form.Group controlId={`ImageFile${index + 1}`}>
                <Form.Label>Hình ảnh {index + 1}</Form.Label>
                <Form.Control
                  type="file"
                  name={`ImageFile${index + 1}`}
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Col>
          ))}
              </Row>
              <br />
        <Button variant="primary" type="submit">
          Cập nhật Hình ảnh
        </Button>
      </Form>
          </Container>
        </div>
        </div>
  );
};

export default EditCarImages;
