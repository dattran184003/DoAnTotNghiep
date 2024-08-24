import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col, Form, Modal, Alert } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';
import "./new.scss"; 

const NewList = () => {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [searchTerm, setSearchTerm] = useState('');

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editNew, setEditNew] = useState({});
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newImage, setNewImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, [currentPage, searchTerm]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://localhost:7175/api/News/page`, {
                params: {
                    search: searchTerm,
                    pageNumber: currentPage,
                    pageSize: pageSize
                }
            });
            const { items, totalItems } = response.data;

            if (items && totalItems !== undefined) {
                setNews(items);
                setTotalPages(Math.ceil(totalItems / pageSize));
            } else {
                toast.error('Phản hồi từ API không đúng định dạng');
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách tin tức:', error);
            toast.error('Lỗi khi lấy dữ liệu tin tức!');
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

    const handleAddNew = async () => {
        try {
            const formData = new FormData();
            formData.append('title', newTitle);
            formData.append('content', newContent);
            formData.append('imageFile', newImage);

            const response = await axios.post('https://localhost:7175/api/News', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Bài báo được thêm:', response.data);
            fetchData(currentPage, searchTerm);
            setShowAddModal(false);
            setNewTitle('');
            setNewContent('');
            setNewImage(null);
            setPreviewImage(null);
            toast.success('Thêm bài báo thành công!');
        } catch (error) {
            console.error('Lỗi khi thêm bài báo:', error.response ? error.response.data : error.message);
            toast.error('Lỗi khi thêm bài báo!');
        }
    };

    const handleEdit = async () => {
        try {
            const formData = new FormData();
            formData.append('id', editNew.id);
            formData.append('title', newTitle);
            formData.append('content', newContent);
            formData.append('imageFile', newImage);

            const response = await axios.put(`https://localhost:7175/api/News/${editNew.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Bài báo được cập nhật:', response.data);
            fetchData(currentPage, searchTerm);
            setShowEditModal(false);
            setNewTitle('');
            setNewContent('');
            setNewImage(null);
            setEditNew({});
            setPreviewImage(null);
            toast.success('Cập nhật bài báo thành công!');
        } catch (error) {
            console.error('Lỗi khi cập nhật bài báo:', error);
            toast.error('Lỗi khi cập nhật bài báo!');
        }
    };

    const openEditModal = (editNew) => {
        setEditNew(editNew);
        setNewTitle(editNew.title);
        setNewContent(editNew.content);
        setShowEditModal(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7175/api/News/${id}`);
            fetchData(currentPage, searchTerm);
            console.log(`Bài báo có id ${id} đã được xóa thành công.`);
            toast.success('Xóa bài báo thành công!');
        } catch (error) {
            console.error(`Lỗi khi xóa bài báo có id ${id}:`, error);
            toast.error('Lỗi khi xóa bài báo!');
        }
    };

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="new">
            <Sidebar isOpen={isSidebarOpen} />
            <div className={`newContainer ${isSidebarOpen ? "open" : ""}`}>
                <Navbar toggleSidebar={toggleSidebar} />
                <Container>
                    <h2 className="text-center my-4">Danh sách tin tức</h2>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Control
                                type="text"
                                placeholder="Tìm kiếm theo tiêu đề tin tức"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Col>
                        <Col className="text-end">
                            <Button variant="primary" onClick={() => setShowAddModal(true)}>Thêm tin tức</Button>
                        </Col>
                    </Row>
                    <Table striped bordered hover responsive className="text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tiêu đề</th>
                                <th>Ảnh</th>
                                <th>Nội dung</th>
                                <th>Ngày Viết</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {news && news.length > 0 ? (
                                news.map(news => (
                                    <tr key={news.id}>
                                        <td>{news.id}</td>
                                        <td>{news.title}</td>
                                        <td><img src={`https://localhost:7175/images/new/${news.image}`} alt="Hình ảnh" style={{ maxWidth: '100px' }} /></td>
                                        <td>{new Date(news.dateSubmitted).toLocaleDateString()}</td>
                                        <td>{news.content}</td>
                                        <td>
                                           <Button variant="info"  style={{ margin: "5px" }} onClick={() => openEditModal(news)}>Sửa</Button>
                                            <Button variant="danger" onClick={() => handleDelete(news.id)}>Xóa</Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">Không có dữ liệu</td>
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
                        <Modal.Title>Thêm bài báo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="newTitle">
                            <Form.Label>Tiêu đề</Form.Label>
                            <Form.Control type="text" placeholder="Nhập tiêu đề" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="newContent">
                            <Form.Label>Nội dung</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Nhập nội dung" value={newContent} onChange={e => setNewContent(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="newImage">
                            <Form.Label>Ảnh đính kèm</Form.Label>
                            <Form.Control type="file" onChange={handleImageChange} />
                            {previewImage && <img src={previewImage} alt="Preview" style={{ maxWidth: '100px', marginTop: '10px' }} />}
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowAddModal(false)}>Đóng</Button>
                        <Button variant="primary" onClick={handleAddNew}>Thêm</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sửa bài báo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="editTitle">
                            <Form.Label>Tiêu đề</Form.Label>
                            <Form.Control type="text" placeholder="Nhập tiêu đề" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="editContent">
                            <Form.Label>Nội dung</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Nhập nội dung" value={newContent} onChange={e => setNewContent(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="editImage">
                            <Form.Label>Ảnh đính kèm</Form.Label>
                            <Form.Control type="file" onChange={handleImageChange} />
                            {previewImage && <img src={previewImage} alt="Preview" style={{ maxWidth: '100px', marginTop: '10px' }} />}
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>Đóng</Button>
                        <Button variant="primary" onClick={handleEdit}>Lưu</Button>
                    </Modal.Footer>
                </Modal>

                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </div>
        </div>
    );
};

export default NewList;
