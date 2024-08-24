import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col, Form, Modal, Alert } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';
import "./model.scss"; // Điều chỉnh CSS nếu cần

const ModelList = () => {
    const [models, setModels] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editModel, setEditModel] = useState({});
    const [modelName, setModelName] = useState('');
    const [modelBrand, setModelBrand] = useState('');
    const [brands, setBrands] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
        fetchBrands();
    }, [currentPage, searchTerm]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://localhost:7175/api/Models/page`, {
                params: {
                    search: searchTerm,
                    pageNumber: currentPage,
                    pageSize: pageSize
                }
            });
            const { items, totalItems } = response.data;

            if (items && totalItems !== undefined) {
                // Lấy thông tin hãng xe cho mỗi mẫu xe
                const modelsWithBrands = await Promise.all(
                    items.map(async (model) => {
                        const brandResponse = await axios.get(`https://localhost:7175/api/Brands/${model.brandId}`);
                        const brandName = brandResponse.data.name;
                        return { ...model, brandName };
                    })
                );

                setModels(modelsWithBrands);
                setTotalPages(Math.ceil(totalItems / pageSize));
            } else {
                toast.error('Phản hồi từ API không đúng định dạng');
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách mẫu xe:', error);
            toast.error('Lỗi khi lấy dữ liệu mẫu xe!');
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

   const fetchBrands = async () => {
        try {
            const response = await axios.get(`https://localhost:7175/api/Brands`);
            setBrands(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách thương hiệu:', error);
        }
    };

    const handleAddModel = async () => {
        try {
            const response = await axios.post('https://localhost:7175/api/Models', {
                name: modelName,
                brandId: parseInt(modelBrand),
            });
            toast.success('Thêm mẫu xe thành công!');
            fetchData();
            setShowAddModal(false);
            setModelName('');
            setModelBrand('');
            setError('');
        } catch (error) {
            console.error('Lỗi khi thêm mẫu xe:', error.response ? error.response.data : error.message);
            toast.error('Lỗi khi thêm mẫu xe!');
        }
    };

    const handleEditModel = async () => {
        try {
            const response = await axios.put(`https://localhost:7175/api/Models/${editModel.id}`, {
                id: editModel.id,
                name: modelName,
                brandId: parseInt(modelBrand),
            });
            toast.success('Cập nhật mẫu xe thành công!');
            fetchData();
            setShowEditModal(false);
            setModelName('');
            setModelBrand('');
            setEditModel({});
            setError('');
        } catch (error) {
            console.error('Lỗi khi cập nhật mẫu xe:', error);
            toast.error('Lỗi khi cập nhật mẫu xe!');
        }
    };

    const openEditModal = (model) => {
        setEditModel(model);
        setModelName(model.name);
        setModelBrand(model.brandId.toString());
        setShowEditModal(true);
    };
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="model">
            <Sidebar isOpen={isSidebarOpen} />
            <div className={`modelContainer ${isSidebarOpen ? "open" : ""}`}>
                <Navbar toggleSidebar={toggleSidebar} />
                <Container>
                    <h2 className="text-center my-4">Danh sách mẫu xe</h2>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Control
                                type="text"
                                placeholder="Tìm kiếm theo tên mẫu xe"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col className="text-end">
                             <Button variant="primary" onClick={() => setShowAddModal(true)}>Thêm mẫu xe</Button>
                        </Col>
                    </Row>
                    <Table striped bordered hover responsive className="text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên mẫu xe</th>
                                <th>Hãng xe</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {models && models.length > 0 ? (
                                models.map(model => (
                                    <tr key={model.id}>
                                        <td>{model.id}</td>
                                        <td>{model.name}</td>
                                        <td>{model.brandName}</td> 
                                        <td>
                                            <Button variant="info" style={{ margin: "5px" }} onClick={() => openEditModal(model)}>Sửa</Button>
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
                    <Modal.Title>Thêm mẫu xe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="modelName">
                        <Form.Label>Tên</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên" value={modelName} onChange={e => setModelName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="modelBrand">
                        <Form.Label>Thương hiệu</Form.Label>
                        <Form.Control as="select" value={modelBrand} onChange={e => setModelBrand(e.target.value)}>
                            <option value="">Chọn thương hiệu</option>
                            {brands.map(brand => (
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Đóng</Button>
                    <Button variant="primary" onClick={handleAddModel}>Thêm</Button>
                </Modal.Footer>
                {error && <Alert variant="danger">{error}</Alert>}
            </Modal>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Sửa mẫu xe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="editModelName">
                        <Form.Label>Tên</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên" value={modelName} onChange={e => setModelName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="editModelBrand">
                        <Form.Label>Thương hiệu</Form.Label>
                        <Form.Control as="select" value={modelBrand} onChange={e => setModelBrand(e.target.value)}>
                            <option value="">Chọn thương hiệu</option>
                            {brands.map(brand => (
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Đóng</Button>
                    <Button variant="primary" onClick={handleEditModel}>Lưu</Button>
                </Modal.Footer>
                {error && <Alert variant="danger">{error}</Alert>}
            </Modal>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

        </div>
    </div>
);
};

export default ModelList;
