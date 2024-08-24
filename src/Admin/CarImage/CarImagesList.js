import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import "./car.scss";
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';

const CarImagesList = () => {
    const [carImages, setCarImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(20); // Initialize totalPages
    const [searchTerm, setSearchTerm] = useState('');
    const [pageSize, setPageSize] = useState(6);
    const [showModal, setShowModal] = useState(false);
    const [selectedCarImage, setSelectedCarImage] = useState(null);
    const navigate = useNavigate();
    const baseUrl = "https://localhost:7175"; // Define baseUrl here

    useEffect(() => {
        fetchCarImages();
    }, [currentPage, searchTerm]);

    const fetchCarImages = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/CarImages/GetCarImagesWithCarNames`, {
                params: {
                    pageNumber: currentPage,
                    pageSize: pageSize, // Adjust the pageSize as needed
                    carName: searchTerm
                }
            });
            setCarImages(response.data);
            const paginationInfo = JSON.parse(response.headers['x-pagination']);
            if (paginationInfo) {
                const totalCount = paginationInfo.totalCount;
                const calculatedTotalPages = Math.ceil(totalCount / pageSize); 
                setTotalPages(calculatedTotalPages); // Update totalPages state
            }
        } catch (error) {
            console.error('Error fetching car images:', error);
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

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset currentPage when performing a new search
    };

    const openModal = (carImage) => {
        setSelectedCarImage(carImage);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedCarImage(null);
        setShowModal(false);
    };

    const deleteCarImage = async (id) => {
        try {
            await axios.delete(`${baseUrl}/api/CarImages/${id}`); // Use baseUrl here
            toast.success('Xóa hình ảnh thành công!');
            fetchCarImages(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting car image:', error);
            toast.error('Error deleting car image!');
        }
    };

    const renderModal = () => {
        return (
            <Modal show={showModal} onHide={closeModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết hình ảnh xe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCarImage && (
                        <div>
                            <p><strong>Tên xe:</strong> {selectedCarImage.carName}</p>
                            <Row>
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <Col key={index} xs={6} sm={4} lg={2} className="mb-3">
                                        <p><strong>Hình {index + 1}</strong></p>
                                        {selectedCarImage[`imageUrl${index + 1}`] ? (
                                            <img
                                                src={`${baseUrl}${selectedCarImage[`imageUrl${index + 1}`]}`}
                                                alt={`Ảnh ${index + 1}`}
                                                className="img-fluid"
                                                style={{ maxWidth: '100%' }}
                                            />
                                        ) : (
                                            <p className="text-muted">Chưa có ảnh</p>
                                        )}
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        );
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
                    <h2 className="text-center my-4">Danh sách hình ảnh xe</h2>
                    <Row className="mb-3">
                        <Col md={6}>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Tìm kiếm theo tên xe"
                                    onChange={handleSearch}
                                />
                            </InputGroup>
                        </Col>
                        <Col md={6} className="text-md-end">
                            <Button variant="primary" onClick={() => navigate('/admin/carimages/add')}>Thêm Xe</Button>
                        </Col>
                    </Row>
                    <Table striped bordered hover responsive className="text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên xe</th>
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <th key={index}>Ảnh {index + 1}</th>
                                ))}
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carImages.map(carImage => (
                                <tr key={carImage.id}>
                                    <td>{carImage.id}</td>
                                    <td>{carImage.carName}</td>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                        <td key={index}>
                                            {carImage[`imageUrl${index + 1}`] && (
                                                <img
                                                    src={`${baseUrl}${carImage[`imageUrl${index + 1}`]}`}
                                                    alt={`Ảnh ${index + 1}`}
                                                    style={{ maxWidth: '100px' }}
                                                />
                                            )}
                                        </td>
                                    ))}
                                    <td>
                                        <Button variant="info" style={{ margin: "5px" }} size="sm" onClick={() => openModal(carImage)}>
                                            Chi tiết
                                        </Button>
                                        <Button variant="secondary" style={{ margin: "5px" }} size="sm" onClick={() => navigate(`/admin/carimages/edit/${carImage.id}`)}> Sửa </Button>
                                        <Button variant="danger" size="sm" onClick={() => deleteCarImage(carImage.id)}>
                                            Xóa
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
                    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
                    {renderModal()}
                </Container>
            </div>
        </div>
    );
};

export default CarImagesList;
