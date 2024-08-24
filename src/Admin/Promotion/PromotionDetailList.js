import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./promotion.scss"; // Đảm bảo file promotion.scss đã được tạo và chỉnh sửa theo ý muốn của bạn
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';

const PromotionDetailList = () => {
  const { id } = useParams();
  const [promotionDetails, setPromotionDetails] = useState([]);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [editPromotionDetail, setEditPromotionDetail] = useState(null);
  const [formValues, setFormValues] = useState({
    carId: '',
    discount: '',
  });
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPromotionDetails();
    fetchCars();
  }, [id]);

  const fetchPromotionDetails = async () => {
    try {
      const response = await axios.get(`https://localhost:7175/api/PromotionDetails/promotiondetail`, {
        params: { promotionId: id }
      });
      setPromotionDetails(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching promotion details', error);
      setError('Error fetching promotion details');
      setPromotionDetails([]);
    }
  };

  const fetchCars = async () => {
    try {
      const response = await axios.get(`https://localhost:7175/api/Cars`);
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars', error);
      setError('Error fetching cars');
      setCars([]);
    }
  };

  const handleShowAddEditModal = (promotionDetail = null) => {
    setEditPromotionDetail(promotionDetail);
    if (promotionDetail) {
      setFormValues({
        carId: promotionDetail.carId.toString(),
        discount: promotionDetail.discount.toString(),
      });
    } else {
      setFormValues({
        carId: '',
        discount: '',
      });
    }
    setShowAddEditModal(true);
  };

  const handleCloseAddEditModal = () => {
    setShowAddEditModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editPromotionDetail) {
        const updatedPromotionDetail = { ...editPromotionDetail, ...formValues };
        await axios.put(`https://localhost:7175/api/PromotionDetails/${editPromotionDetail.id}`, updatedPromotionDetail);
        toast.success('Cập nhật thành công!');
      } else {
        await axios.post(`https://localhost:7175/api/PromotionDetails`, { ...formValues, promotionId: id });
        toast.success('Thêm mới thành công!');
      }
      fetchPromotionDetails();
      handleCloseAddEditModal();
    } catch (error) {
      console.error('Error submitting form', error);
      if (error.response) {
        console.error('API Error:', error.response.data);
        setError('Lỗi từ API: ' + error.response.data);
        toast.error('Lỗi từ API: ' + error.response.data);
      } else {
        console.error('Network Error:', error.message);
        setError('Lỗi mạng: ' + error.message);
        toast.error('Lỗi mạng: ' + error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7175/api/PromotionDetails/${id}`);
      toast.success('Xóa thành công!');
      fetchPromotionDetails();
    } catch (error) {
      console.error('Error deleting promotion detail', error);
      toast.error('Lỗi khi xóa chi tiết khuyến mãi');
    }
  };

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="account">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`accountContainer ${isSidebarOpen ? "open" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <Container>
          <h2>Chi tiết khuyến mãi</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <Button variant="success" onClick={() => handleShowAddEditModal()}>
            Thêm Chi Tiết Khuyến Mãi
          </Button>
          <br />
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                {/* <th>Promotion ID</th>
                <th>Car ID</th> */}
                <th>Tên xe</th>
                <th>Giảm Giá (%)</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {promotionDetails.map((detail) => (
                <tr key={detail.id}>
                  <td>{detail.id}</td>
                  {/* <td>{detail.promotionId}</td>
                  <td>{detail.carId}</td> */}
                  <td>{detail.car.name}</td>
                  <td>{detail.discount}</td>
                  <td>
                    <Button variant="warning" style={{ marginRight: '5px' }} onClick={() => handleShowAddEditModal(detail)}>
                      Sửa
                    </Button>
                    {/* <Button variant="danger" onClick={() => handleDelete(detail.id)}>
                      Xóa
                    </Button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal show={showAddEditModal} onHide={handleCloseAddEditModal}>
            <Modal.Header closeButton>
              <Modal.Title>{editPromotionDetail ? 'Sửa Chi Tiết Khuyến Mãi' : 'Thêm Chi Tiết Khuyến Mãi'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="carId">
                  <Form.Label>Chọn xe</Form.Label>
                  <Form.Control as="select" name="carId" value={formValues.carId} onChange={handleFormChange} required>
                    <option value="">Chọn xe</option>
                    {cars.map((car) => (
                      <option key={car.id} value={car.id}>{car.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="discount">
                  <Form.Label>Giảm Giá (%)</Form.Label>
                  <Form.Control type="number" name="discount" value={formValues.discount} onChange={handleFormChange} required />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">
                  {editPromotionDetail ? 'Cập nhật' : 'Thêm mới'}
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
          <ToastContainer />
        </Container>
      </div>
    </div>
  );
};

export default PromotionDetailList;
