import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col, Form, Modal, Alert } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';
import "./service.scss";
import { Link } from 'react-router-dom';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [searchTerm, setSearchTerm] = useState('');

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editService, setEditService] = useState({});
    const [serviceType, setServiceType] = useState('');
    const [status, setStatus] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, [currentPage, searchTerm]);

   const fetchData = async () => {
    try {
        const response = await axios.get(`https://localhost:7175/api/Services/page`, {
            params: {
                search: searchTerm,
                pageNumber: currentPage,
                pageSize: pageSize
            }
        });

        const { items, totalItems } = response.data; // Adjust according to your API response structure

        setServices(items);
        setTotalPages(Math.ceil(totalItems / pageSize));
    } catch (error) {
        console.error('Error fetching service list:', error);
        toast.error('Failed to fetch service data!');
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

    const handleSearch = () => {
        setCurrentPage(1);
        fetchData();
    };

    const resetFilters = () => {
        setSearchTerm('');
        setCurrentPage(1);
        fetchData();
    };

      const handleAddService = async () => {
        try {
            await axios.post('https://localhost:7175/api/Services', {
                serviceType: serviceType,
            });
            toast.success('Thêm dịch vụ thành công!');
            fetchData();
            setShowAddModal(false);
            setServiceType('');
            setError(''); // Clear error message if any
        } catch (error) {
            console.error('Error adding service:', error);
            toast.error('Lỗi khi thêm dịch vụ!');
        }
    };

    const handleEditService = async () => {
        try {
            await axios.put(`https://localhost:7175/api/Services/${editService.id}`, {
                id: editService.id,
                serviceType: serviceType,
            });
            toast.success('Cập nhật dịch vụ thành công!');
            fetchData();
            setShowEditModal(false);
            setServiceType('');
            setEditService({});
            setError(''); // Clear error message if any
        } catch (error) {
            console.error('Error updating service:', error);
            toast.error('Lỗi khi cập nhật dịch vụ!');
        }
    };

    const openEditModal = (editService) => {
        setEditService(editService);
        setServiceType(editService.serviceType);
        setShowEditModal(true);
    };

    const handleToggleStatus = async (id) => {
        try {
            await axios.put(`https://localhost:7175/api/Services/${id}/status`);
            toast.success(`Thay đổi trạng thái dịch vụ có ID ${id} thành công!`);
            fetchData();
        } catch (error) {
            console.error(`Error toggling status of service with ID ${id}:`, error);
            toast.error(`Lỗi khi thay đổi trạng thái dịch vụ có ID ${id}!`);
        }
    };

    const handleDeleteService = async (id) => {
        try {
            await axios.delete(`https://localhost:7175/api/Services/${id}`);
            fetchData();
            console.log(`Dịch vụ có id ${id} đã được xóa thành công.`);
            toast.success('Xóa dịch vụ thành công!');
        } catch (error) {
            console.error(`Lỗi khi xóa dịch vụ có id ${id}:`, error);
            toast.error('Lỗi khi xóa dịch vụ!');
        }
    };

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="service">
            <Sidebar isOpen={isSidebarOpen} />
            <div className={`serviceContainer ${isSidebarOpen ? "open" : ""}`}>
                <Navbar toggleSidebar={toggleSidebar} />
                <Container>
                    <h2 className="text-center my-4">Danh sách dịch vụ</h2>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Control
                                type="text"
                                placeholder="Tìm kiếm theo loại dịch vụ"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Col>
                        <Col className="text-end">
                            <Button variant="primary" onClick={() => setShowAddModal(true)}>Thêm dịch vụ</Button>
                        </Col>
                    </Row>
                    <Table striped bordered hover responsive className="text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Loại dịch vụ</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services && services.length > 0 ? (
                                services.map(service => (
                                    <tr key={service.id}>
                                        <td>{service.id}</td>
                                        <td>{service.serviceType}</td>
                                        <td>{service.status ? 'Hoạt động' : 'Không hoạt động'}</td>
                                        <td>
                                            <Link to={`/admin/services/servicedetails/${service.id}` }>
                                            <Button variant="info">Xem Chi Tiết</Button>
                                        </Link>
                                        <Button variant="warning" style={{ margin: "5px" }} onClick={() => openEditModal(service)}>Sửa</Button>
                                        <Button variant={service.status ? "danger" : "success"} onClick={() => handleToggleStatus(service.id)}>
                                            {service.status ? "Ngưng hoạt động" : "Kích hoạt"}
                                        </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">Không có dữ liệu</td>
                                </tr>
                            )}
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

                <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thêm dịch vụ</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="serviceType">
                                <Form.Label>Loại dịch vụ</Form.Label>
                                <Form.Control type="text" placeholder="Nhập loại dịch vụ" value={serviceType} onChange={e => setServiceType(e.target.value)} />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Đóng</Button>
                            <Button variant="primary" onClick={handleAddService}>Thêm</Button>
                        </Modal.Footer>
                        {error && <Alert variant="danger">{error}</Alert>}
                    </Modal>

                    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Sửa dịch vụ</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="editServiceType">
                                <Form.Label>Loại dịch vụ</Form.Label>
                                <Form.Control type="text" placeholder="Nhập loại dịch vụ" value={serviceType} onChange={e => setServiceType(e.target.value)} />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowEditModal(false)}>Đóng</Button>
                            <Button variant="primary" onClick={handleEditService}>Lưu</Button>
                        </Modal.Footer>
                        {error && <Alert variant="danger">{error}</Alert>}
                    </Modal>
                <ToastContainer />
            </div>
        </div>
    );
};

export default ServiceList;
