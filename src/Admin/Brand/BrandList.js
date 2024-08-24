import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Container, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./brand.scss";
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [show, setShow] = useState(false);
  const [brandToEdit, setBrandToEdit] = useState(null);
  const [brandName, setBrandName] = useState('');

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async (search = '') => {
    try {
      const response = await axios.get(`https://localhost:7175/api/Brands/search`, { params: { search } });
      setBrands(response.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
      toast.error('Không tìm nạp được thương hiệu.');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    fetchBrands(e.target.value);
  };

  const handleShow = (brand = null) => {
    setBrandToEdit(brand);
    setBrandName(brand ? brand.name : '');
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSave = async () => {
    try {
      if (brandToEdit) {
        await axios.put(`https://localhost:7175/api/Brands/${brandToEdit.id}`, { id: brandToEdit.id, name: brandName });
        toast.success('Cập nhật thương hiệu thành công!');
      } else {
        await axios.post('https://localhost:7175/api/Brands', { name: brandName });
        toast.success('Đã thêm thương hiệu thành công!');
      }
      fetchBrands(searchTerm);
      handleClose();
    } catch (error) {
      console.error('Error saving brand:', error);
      toast.error('Không lưu được thương hiệu.');
    }
  };

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="brand">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`brandContainer ${isSidebarOpen ? "open" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <Container>
          <h3>Danh sách thương hiệu</h3>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm theo tên"
            value={searchTerm}
            onChange={handleSearch}
            className="mb-3"
          />
          <Button variant="primary" onClick={() => handleShow()}>Thêm thương hiệu</Button>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr key={brand.id}>
                  <td>{brand.id}</td>
                  <td>{brand.name}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleShow(brand)}>Sửa</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{brandToEdit ? 'Chỉnh sửa thương hiệu' : 'Thêm thương hiệu'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Tên</Form.Label>
                  <Form.Control
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Đóng</Button>
              <Button variant="primary" onClick={handleSave}>Lưu</Button>
            </Modal.Footer>
          </Modal>

          <ToastContainer />
        </Container>
      </div>
    </div>
  );
};

export default BrandList;
