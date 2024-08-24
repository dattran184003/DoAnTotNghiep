import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col, Form, Modal, Alert } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';
import "./promotion.scss";
import { Link } from 'react-router-dom';

const PromotionList = () => {
    const [promotions, setPromotions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [searchTerm, setSearchTerm] = useState('');

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editPromotion, setEditPromotion] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, [currentPage, searchTerm]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://localhost:7175/api/Promotions/page`, {
                params: {
                    search: searchTerm,
                    pageNumber: currentPage,
                    pageSize: pageSize
                }
            });

            const { items, totalItems } = response.data;

            setPromotions(items);
            setTotalPages(Math.ceil(totalItems / pageSize));
        } catch (error) {
            console.error('Error fetching promotion list:', error);
            toast.error('Failed to fetch promotion data!');
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

    const handleAddPromotion = async () => {
        try {
            await axios.post('https://localhost:7175/api/Promotions', {
                title: title,
                description: description,
                startDate: startDate,
                endDate: endDate
            });
            toast.success('Thêm khuyến mãi thành công!');
            fetchData();
            setShowAddModal(false);
            setTitle('');
            setDescription('');
            setStartDate('');
            setEndDate('');
            setError(''); // Clear error message if any
        } catch (error) {
            console.error('Error adding promotion:', error);
            toast.error('Lỗi khi thêm khuyến mãi!');
        }
    };

    const handleEditPromotion = async () => {
        try {
            await axios.put(`https://localhost:7175/api/Promotions/${editPromotion.id}`, {
                id: editPromotion.id,
                title: title,
                description: description,
                startDate: startDate,
                endDate: endDate
            });
            toast.success('Cập nhật khuyến mãi thành công!');
            fetchData();
            setShowEditModal(false);
            setTitle('');
            setDescription('');
            setStartDate('');
            setEndDate('');
            setEditPromotion({});
            setError(''); // Clear error message if any
        } catch (error) {
            console.error('Error updating promotion:', error);
            toast.error('Lỗi khi cập nhật khuyến mãi!');
        }
    };

    const openEditModal = (editPromotion) => {
        setEditPromotion(editPromotion);
        setTitle(editPromotion.title);
        setDescription(editPromotion.description);
        setStartDate(editPromotion.startDate);
        setEndDate(editPromotion.endDate);
        setShowEditModal(true);
    };

    const handleToggleStatus = async (id) => {
        try {
            await axios.put(`https://localhost:7175/api/Promotions/${id}/status`);
            toast.success(`Thay đổi trạng thái khuyến mãi có ID ${id} thành công!`);
            fetchData();
        } catch (error) {
            console.error(`Error toggling status of promotion with ID ${id}:`, error);
            toast.error(`Lỗi khi thay đổi trạng thái khuyến mãi có ID ${id}!`);
        }
    };

    const handleDeletePromotion = async (id) => {
        try {
            await axios.delete(`https://localhost:7175/api/Promotions/${id}`);
            fetchData();
            console.log(`Khuyến mãi có id ${id} đã được xóa thành công.`);
            toast.success('Xóa khuyến mãi thành công!');
        } catch (error) {
            console.error(`Lỗi khi xóa khuyến mãi có id ${id}:`, error);
            toast.error('Lỗi khi xóa khuyến mãi!');
        }
    };

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="promotion">
            <Sidebar isOpen={isSidebarOpen} />
            <div className={`promotionContainer ${isSidebarOpen ? "open" : ""}`}>
                <Navbar toggleSidebar={toggleSidebar} />
                <Container>
                    <h2 className="text-center my-4">Danh sách khuyến mãi</h2>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Control
                                type="text"
                                placeholder="Tìm kiếm theo tiêu đề khuyến mãi"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Col>
                        <Col className="text-end">
                            <Button variant="primary" onClick={() => setShowAddModal(true)}>Thêm khuyến mãi</Button>
                        </Col>
                    </Row>
                    <Table striped bordered hover responsive className="text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tiêu đề</th>
                                <th>Mô tả</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {promotions && promotions.length > 0 ? (
                                promotions.map(promotion => (
                                    <tr key={promotion.id}>
                                        <td>{promotion.id}</td>
                                        <td>{promotion.title}</td>
                                        <td>{promotion.description}</td>
                                        <td>{new Date(promotion.startDate).toLocaleDateString()}</td>
                                        <td>{new Date(promotion.endDate).toLocaleDateString()}</td>
                                        <td>{promotion.status ? 'Hoạt động' : 'Ngưng hoạt động'}</td>
                                        <td>
                                             <Link to={`/admin/promotions/promotiondetails/${promotion.id}` }>
                                            <Button variant="info">Xem Chi Tiết</Button>
                                        </Link>
                                            <Button variant="warning" style={{ margin: "5px" }} onClick={() => openEditModal(promotion)}>Sửa</Button>
                                            <Button variant={promotion.status ? "danger" : "success"} onClick={() => handleToggleStatus(promotion.id)}>
                                                {promotion.status ? "Ngưng hoạt động" : "Kích hoạt"}
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">Không có dữ liệu</td>
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
                        <Modal.Title>Thêm khuyến mãi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="title">
                            <Form.Label>Tiêu đề</Form.Label>
                            <Form.Control type="text" placeholder="Nhập tiêu đề" value={title} onChange={e => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control as="textarea" placeholder="Nhập mô tả" value={description} onChange={e => setDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="startDate">
                            <Form.Label>Ngày bắt đầu</Form.Label>
                            <Form.Control type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="endDate">
                            <Form.Label>Ngày kết thúc</Form.Label>
                            <Form.Control type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                        </Form.Group>
                        {error && <Alert variant="danger">{error}</Alert>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowAddModal(false)}>Đóng</Button>
                        <Button variant="primary" onClick={handleAddPromotion}>Thêm</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sửa khuyến mãi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="title">
                            <Form.Label>Tiêu đề</Form.Label>
                            <Form.Control type="text" placeholder="Nhập tiêu đề" value={title} onChange={e => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control as="textarea" placeholder="Nhập mô tả" value={description} onChange={e => setDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="startDate">
                            <Form.Label>Ngày bắt đầu</Form.Label>
                            <Form.Control type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="endDate">
                            <Form.Label>Ngày kết thúc</Form.Label>
                            <Form.Control type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                        </Form.Group>
                        {error && <Alert variant="danger">{error}</Alert>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>Đóng</Button>
                        <Button variant="primary" onClick={handleEditPromotion}>Lưu</Button>
                    </Modal.Footer>
                </Modal>

                <ToastContainer autoClose={3000} />
            </div>
        </div>
    );
};

export default PromotionList;
