import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col, Container, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';
import * as FileSaver from 'file-saver';
import "./account.scss";
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';

const AccountList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [detailUser, setDetailUser] = useState(null);
  const [formValues, setFormValues] = useState({
    id: '',
    userName: '',
    fullname: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  let index = 1;

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://localhost:7175/api/Users/page', {
        params: {
          search: searchTerm,
          pageNumber: currentPage,
          pageSize: pageSize,
        },
      });
      const { items, totalItems } = response.data;
      setUsers(items);
      setTotalPages(Math.ceil(totalItems / pageSize));
    } catch (error) {
      console.error('There was an error fetching the users!', error);
    }
  };

  const fetchUserDetail = async (id) => {
    try {
      const response = await axios.get(`https://localhost:7175/api/Users/${id}`);
      setDetailUser(response.data);
      setShowDetailModal(true);
    } catch (error) {
      console.error('There was an error fetching the user details!', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleExport = async () => {
    try {
      const response = await axios.get('https://localhost:7175/api/Users/export', {
        responseType: 'blob',
      });
      FileSaver.saveAs(response.data, 'Users.xlsx');
    } catch (error) {
      console.error('Error exporting Excel file', error);
    }
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

  const handleShowAddEditModal = (user = null) => {
    setEditUser(user);
    if (user) {
      setFormValues({
        id: user.id,
        userName: user.userName,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        password: '', // Clear password field when editing
      });
    } else {
      setFormValues({
        id: '',
        userName: '',
        fullname: '',
        email: '',
        phoneNumber: '',
        address: '',
        password: '',
      });
    }
    setShowAddEditModal(true);
  };

  const handleCloseAddEditModal = () => {
    setShowAddEditModal(false);
    setSuccessMessage(''); // Clear success message when closing modal
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editUser) {
        await axios.put(`https://localhost:7175/api/Users/${formValues.id}`, formValues);
        setSuccessMessage('Cập nhật người dùng thành công!');
      } else {
        const registerAdminModel = {
          username: formValues.userName,
          email: formValues.email,
          password: formValues.password || 'Password123!',
        };
        await axios.post(`https://localhost:7175/api/Users/register-admin`, registerAdminModel);
        setSuccessMessage('Thêm mới người dùng thành công!');
      }
      fetchUsers();
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  const handleToggleStatus = async (userId) => {
    try {
      await axios.put(`https://localhost:7175/api/Users/${userId}/status`);
      fetchUsers();
    } catch (error) {
      console.error('Error toggling user status', error);
    }
  };

  return (
    <div className="account">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`accountContainer ${isSidebarOpen ? "open" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <Container>
          <br />
          <Row className="mb-3">
            <Col xs={6}>
              <Button variant="success" onClick={() => handleShowAddEditModal()}>
                Thêm Quản trị viên
              </Button>
            </Col>
            <Col xs={6} className="d-flex justify-content-end">
              <Button variant="primary" onClick={handleExport}>
                Xuất Danh Sách Người Dùng
              </Button>
            </Col>
          </Row>
          <Form.Group controlId="search">
            <Form.Control
              type="text"
              placeholder="Tìm kiếm theo Họ và tên, Email, tên tài khoản"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Form.Group>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên tài khoản</th>
                <th>Họ và tên</th>
                <th>Email</th>
                <th>Điện thoại</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{index++}</td>
                  <td>{user.userName}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.status ? "Hoạt động" : "Không hoạt động"}</td>
                  <td>
                    <Button variant="info" style={{ margin: "5px" }} onClick={() => fetchUserDetail(user.id)}>
                      Chi tiết
                    </Button>
                    <Button variant="warning" style={{ margin: "5px" }} onClick={() => handleShowAddEditModal(user)}>
                      Sửa
                    </Button>
                    <Button
                      variant={user.status ? "danger" : "success"}
                      onClick={() => handleToggleStatus(user.id)}
                    >
                      {user.status ? "Không hoạt động" : "Hoạt động"}
                    </Button>
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

        <Modal show={showAddEditModal} onHide={handleCloseAddEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>{editUser ? 'Sửa thông tin' : 'Thêm quản trị viên'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              {successMessage && <Alert variant="success">{successMessage}</Alert>}
              <Form.Group controlId="formUsername">
                <Form.Label>Tên tài khoản</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên tài khoản"
                  name="userName"
                  value={formValues.userName}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
              {!editUser && (
                <Form.Group controlId="formPassword">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Nhập mật khẩu"
                    name="password"
                    value={formValues.password}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
              )}
              <Form.Group controlId="formFullname">
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập họ và tên"
                  name="fullname"
                  value={formValues.fullname}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Nhập email"
                  name="email"
                  value={formValues.email}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPhoneNumber">
                <Form.Label>Điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập số điện thoại"
                  name="phoneNumber"
                  value={formValues.phoneNumber}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formAddress">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập địa chỉ"
                  name="address"
                  value={formValues.address}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
              <Button variant="secondary" style={{ margin: "5px" }} onClick={handleCloseAddEditModal}>
                Đóng
              </Button>
              <Button style={{ margin: "5px" }} variant="primary" type="submit">
                {editUser ? 'Lưu thay đổi' : 'Thêm mới'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={showDetailModal} onHide={handleCloseDetailModal}>
          <Modal.Header closeButton>
            <Modal.Title>Chi tiết người dùng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Tên tài khoản:</strong> {detailUser?.userName}</p>
            <p><strong>Họ và tên:</strong> {detailUser?.fullname}</p>
            <p><strong>Email:</strong> {detailUser?.email}</p>
            <p><strong>Điện thoại:</strong> {detailUser?.phoneNumber}</p>
            <p><strong>Địa chỉ:</strong> {detailUser?.address}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetailModal}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AccountList;
