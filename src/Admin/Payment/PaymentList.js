import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./account.scss";
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [paymentName, setPaymentName] = useState('');
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
  let index = 1;

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('https://localhost:7175/api/Payments');
      setPayments(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách Payment', error);
    }
  };

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setPaymentName('');
  };

  const handleAddPayment = async () => {
    try {
      const newPayment = {
        namePayment: paymentName,
        status: true // Mặc định khi thêm mới là true (hoạt động)
      };
      await axios.post('https://localhost:7175/api/Payments', newPayment);
      fetchPayments(); // Refresh danh sách Payments
      handleCloseAddModal();
      toast.success('Thêm Payment thành công!', { autoClose: 3000 });
    } catch (error) {
      console.error('Lỗi khi thêm Payment mới', error);
      toast.error('Lỗi khi thêm Payment', { autoClose: 3000 });
    }
  };

  const handleShowEditModal = (payment) => {
    setSelectedPayment(payment);
    setPaymentName(payment.namePayment);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedPayment(null);
    setPaymentName('');
  };

  const handleEditPayment = async () => {
    try {
      const editedPayment = {
        ...selectedPayment,
        namePayment: paymentName
      };
      await axios.put(`https://localhost:7175/api/Payments/${selectedPayment.id}`, editedPayment);
      fetchPayments(); // Refresh danh sách Payments
      handleCloseEditModal();
      toast.success('Chỉnh sửa Payment thành công!', { autoClose: 3000 });
    } catch (error) {
      console.error('Lỗi khi chỉnh sửa Payment', error);
      toast.error('Lỗi khi chỉnh sửa Payment', { autoClose: 3000 });
    }
  };

  const handleToggleStatus = async (payment) => {
    try {
      const toggledPayment = {
        ...payment,
        status: !payment.status // Đảo ngược trạng thái
      };
      await axios.put(`https://localhost:7175/api/Payments/${payment.id}`, toggledPayment);
      fetchPayments(); // Refresh danh sách Payments
      toast.success('Thay đổi trạng thái Payment thành công!', { autoClose: 3000 });
    } catch (error) {
      console.error('Lỗi khi thay đổi trạng thái Payment', error);
      toast.error('Lỗi khi thay đổi trạng thái Payment', { autoClose: 3000 });
    }
    };
    
      const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="account">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`accountContainer ${isSidebarOpen ? "open" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
    <Container>
      <h2 className="text-center">Danh sách Payments</h2>
      <Button variant="primary" onClick={handleShowAddModal}>Thêm Thanh toán</Button>
      <br /><br />
      <ToastContainer />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên thanh toán</th>
            <th className="text-center">Trạng thái</th>
            <th className="text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className="text-center">{index++}</td>
              <td>{payment.namePayment}</td>
              <td className="text-center">{payment.status ? 'Hoạt động' : 'Không hoạt động'}</td>
              <td className="text-center">
                <Button style={{ margin: "5px" }} variant="info" onClick={() => handleShowEditModal(payment)}>Chỉnh sửa</Button>{' '}
                <Button style={{ margin: "5px" }} variant={payment.status ? 'danger' : 'success'} onClick={() => handleToggleStatus(payment)}>
                  {payment.status ? 'Hủy kích hoạt' : 'Kích hoạt'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Thêm Payment */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm thanh toán mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="paymentName">
              <Form.Label>Tên thanh toán</Form.Label>
              <Form.Control type="text" value={paymentName} onChange={(e) => setPaymentName(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>Đóng</Button>
          <Button variant="primary" onClick={handleAddPayment}>Thêm</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Chỉnh sửa Payment */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thanh toán</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editPaymentName">
              <Form.Label>Tên thanh toán</Form.Label>
              <Form.Control type="text" value={paymentName} onChange={(e) => setPaymentName(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>Đóng</Button>
          <Button variant="primary" onClick={handleEditPayment}>Lưu thay đổi</Button>
        </Modal.Footer>
      </Modal>
              </Container>
          </div>
          </div>
  );
};

export default PaymentList;
