import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';
import "./color.scss";

const ColorList = () => {
    const [colors, setColors] = useState([]);
    const [cars, setCars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [carName, setCarName] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [colorToDelete, setColorToDelete] = useState(null);
    const [colorToEdit, setColorToEdit] = useState(null);
    const [newColor, setNewColor] = useState({
        colorName: '',
        colorCode: '',
        carId: '',
        price: '',
        quantity: ''
    });

    useEffect(() => {
        fetchData();
    }, [currentPage, carName, price]);

    const fetchData = async () => {
        const carsData = await fetchCars();
        setCars(carsData);
        fetchColors(carsData);
    };

    const fetchCars = async () => {
        try {
            const response = await axios.get('https://localhost:7175/api/Cars');
            return response.data;
        } catch (error) {
            console.error('Error fetching cars:', error);
            toast.error('Lỗi khi lấy dữ liệu xe!');
            return [];
        }
    };

    const fetchColors = async (carsData) => {
        try {
            const response = await axios.get('https://localhost:7175/api/Colors/page', {
                params: {
                    carName,
                    price,
                    pageNumber: currentPage,
                    pageSize: pageSize
                }
            });
            const { items, totalItems } = response.data;

            if (items && totalItems !== undefined) {
                const colorsWithCarNames = items.map(color => {
                    const car = carsData.find(car => car.id === color.carId);
                    return {
                        ...color,
                        carName: car ? car.name : 'N/A'
                    };
                });
                setColors(colorsWithCarNames);
                setTotalPages(Math.ceil(totalItems / pageSize));
            } else {
                toast.error('Phản hồi từ API không đúng định dạng');
            }
        } catch (error) {
            console.error('Error fetching colors:', error);
            toast.error('Lỗi khi lấy dữ liệu màu sắc!');
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
        setCarName('');
        setPrice('');
        setCurrentPage(1);
        fetchData();
    };

    const handleAddColor = async () => {
        try {
            await axios.post('https://localhost:7175/api/Colors', newColor);
            toast.success('Màu sắc được thêm thành công!');
            setShowAddModal(false);
            fetchData();
        } catch (error) {
            console.error('Lỗi khi thêm màu sắc:', error);
            toast.error('Lỗi khi thêm màu sắc!');
        }
    };

    const handleEditColor = async () => {
        try {
            await axios.put(`https://localhost:7175/api/Colors/${colorToEdit.id}`, colorToEdit);
            toast.success('Màu sắc được cập nhật thành công!');
            setShowEditModal(false);
            fetchData();
        } catch (error) {
            console.error('Lỗi khi cập nhật màu sắc:', error);
            toast.error('Lỗi khi cập nhật màu sắc!');
        }
    };

    const handleDeleteColor = async () => {
        try {
            await axios.delete(`https://localhost:7175/api/Colors/${colorToDelete}`);
            toast.success('Màu sắc được xóa thành công!');
            setShowDeleteModal(false);
            fetchData();
        } catch (error) {
            console.error('Lỗi khi xóa màu sắc:', error);
            toast.error('Lỗi khi xóa màu sắc!');
        }
    };

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="color">
            <Sidebar isOpen={isSidebarOpen} />
            <div className={`colorContainer ${isSidebarOpen ? "open" : ""}`}>
                <Navbar toggleSidebar={toggleSidebar} />
                <Container>
                    <h2 className="text-center my-4">Danh sách màu sắc xe</h2>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Control
                                type="text"
                                placeholder="Tìm kiếm theo tên xe"
                                value={carName}
                                onChange={(e) => setCarName(e.target.value)}
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Control
                                type="number"
                                min={0}
                                placeholder="Tìm kiếm theo giá"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">

                        <Col className="text-end">
                            <Button variant="primary" onClick={() => setShowAddModal(true)}>Thêm màu</Button>
                        </Col>
                    </Row>
                    <Table striped bordered hover responsive className="text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên màu</th>
                                <th>Mã màu</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Tên xe</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {colors && colors.length > 0 ? (
                                colors.map(color => (
                                    <tr key={color.id}>
                                        <td>{color.id}</td>
                                        <td>{color.colorName}</td>
                                        <td>{color.colorCode}</td>
                                        <td>{color.price}</td>
                                        <td>{color.quantity}</td>
                                        <td>{color.carName}</td>
                                        <td>
                                            <Button variant="secondary" size="sm" onClick={() => {
                                                setColorToEdit(color);
                                                setShowEditModal(true);
                                            }}>
                                                Sửa
                                            </Button>
                                            {' '}
                                            <Button variant="danger" size="sm" onClick={() => {
                                                setColorToDelete(color.id);
                                                setShowDeleteModal(true);
                                            }}>
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
                </Container>

                {/* Add Color Modal */}
                <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm màu sắc mới</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="colorName">
                                <Form.Label>Tên màu</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={newColor.colorName}
                                    onChange={(e) => setNewColor({ ...newColor, colorName: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="colorCode">
                                <Form.Label>Mã màu</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={newColor.colorCode}
                                    onChange={(e) => setNewColor({ ...newColor, colorCode: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="carId">
                                <Form.Label>Xe</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={newColor.carId}
                                    onChange={(e) => setNewColor({ ...newColor, carId: e.target.value })}
                                >
                                    <option value="">Chọn xe</option>
                                    {cars.map(car => (
                                        <option key={car.id} value={car.id}>{car.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="price">
                                <Form.Label>Giá</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={newColor.price}
                                    onChange={(e) => setNewColor({ ...newColor, price: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="quantity">
                                <Form.Label>Số lượng</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={newColor.quantity}
                                    onChange={(e) => setNewColor({ ...newColor, quantity: e.target.value })}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                            Đóng
                        </Button>
                        <Button variant="primary" onClick={handleAddColor}>
                            Thêm màu
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Edit Color Modal */}
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sửa màu sắc</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="editColorName">
                                <Form.Label>Tên màu</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={colorToEdit?.colorName}
                                    onChange={(e) => setColorToEdit({ ...colorToEdit, colorName: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="editColorCode">
                                <Form.Label>Mã màu</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={colorToEdit?.colorCode}
                                    onChange={(e) => setColorToEdit({ ...colorToEdit, colorCode: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="editCarId">
                                <Form.Label>Xe</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={colorToEdit?.carId}
                                    onChange={(e) => setColorToEdit({ ...colorToEdit, carId: e.target.value })}
                                >
                                    <option value="">Chọn xe</option>
                                    {cars.map(car => (
                                        <option key={car.id} value={car.id}>{car.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="editPrice">
                                <Form.Label>Giá</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={colorToEdit?.price}
                                    onChange={(e) => setColorToEdit({ ...colorToEdit, price: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="editQuantity">
                                <Form.Label>Số lượng</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={colorToEdit?.quantity}
                                    onChange={(e) => setColorToEdit({ ...colorToEdit, quantity: e.target.value })}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                            Đóng
                        </Button>
                        <Button variant="primary" onClick={handleEditColor}>
                            Lưu thay đổi
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Delete Color Modal */}
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Xác nhận xóa màu sắc</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Bạn có chắc chắn muốn xóa màu sắc này?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            Hủy
                        </Button>
                        <Button variant="danger" onClick={handleDeleteColor}>
                            Xóa
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default ColorList;
