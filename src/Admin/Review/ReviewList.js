import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./account.scss";
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [searchTerm, setSearchTerm] = useState('');
    const [contractId, setContractId] = useState(null);
    const [pointFilter, setPointFilter] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);
    const [editReview, setEditReview] = useState({});
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        fetchData();
    }, [currentPage, searchTerm, contractId, pointFilter]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:7175/api/Reviews/page', {
                params: {
                    searchTerm,
                    contractId,
                    pointFilter,
                    pageNumber: currentPage,
                    pageSize
                }
            });
            const { reviews, totalCount } = response.data;

            setReviews(reviews);
            setTotalPages(Math.ceil(totalCount / pageSize));
        } catch (error) {
            console.error('Lỗi khi lấy danh sách đánh giá:', error);
            toast.error('Lỗi khi lấy dữ liệu đánh giá!');
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
        setContractId(null);
        setPointFilter(null);
        setCurrentPage(1);
        fetchData();
    };

    const openEditModal = (review) => {
        setEditReview(review);
        setComment(review.comment);
        setShowEditModal(true);
    };

    const handleDeleteReview = async (id) => {
        try {
            await axios.delete(`https://localhost:7175/api/Reviews/${id}`);
            toast.success(`Xóa đánh giá có ID ${id} thành công!`);
            fetchData(); // Sau khi xóa, cập nhật lại danh sách đánh giá
        } catch (error) {
            console.error(`Lỗi khi xóa đánh giá có ID ${id}:`, error);
            toast.error(`Lỗi khi xóa đánh giá có ID ${id}!`);
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
            <h2 className="text-center my-4">Danh sách đánh giá</h2>
            <Row className="mb-3">
                <Col md={4}>
                    <Form.Control
                        type="text"
                        placeholder="Tìm kiếm theo tên tài khoản"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
                <Col md={3}>
                    <Form.Control
                        type="number"
                        placeholder="ID hợp đồng"
                        value={contractId || ''}
                        onChange={(e) => setContractId(e.target.value === '' ? null : parseInt(e.target.value))}
                    />
                </Col>
                <Col md={3}>
                    <Form.Control
                        as="select"
                        value={pointFilter || ''}
                        onChange={(e) => setPointFilter(e.target.value === '' ? null : parseInt(e.target.value))}
                    >
                        <option value="">Chọn điểm</option>
                        <option value="1">1 điểm</option>
                        <option value="2">2 điểm</option>
                        <option value="3">3 điểm</option>
                        <option value="4">4 điểm</option>
                        <option value="5">5 điểm</option>
                    </Form.Control>
                </Col>
                <Col md={2}>
                    <Button variant="outline-secondary" className="mx-2" onClick={resetFilters}>Đặt lại</Button>
                </Col>
            </Row>
            <Table striped bordered hover responsive className="text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Người dùng</th>
                        <th>ID hợp đồng</th>
                        <th>Điểm</th>
                        <th>Bình luận</th>
                        <th>Ngày đánh giá</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews && reviews.length > 0 ? (
                        reviews.map(review => (
                            <tr key={review.id}>
                                <td>{review.id}</td>
                                <td>{review.userName}</td>
                                <td>{review.depositContractId}</td>
                                <td>{review.point}</td>
                                <td>{review.comment}</td>
                                <td>{new Date(review.reviewDate).toLocaleDateString()}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDeleteReview(review.id)}>
                                    Xóa
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



            <ToastContainer />
                </Container>
            </div>
            </div>
    );
};

export default ReviewList;
