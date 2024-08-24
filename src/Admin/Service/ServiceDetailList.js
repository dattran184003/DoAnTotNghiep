import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./service.scss"; 
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';

const ServiceDetailList = () => {
    const { id } = useParams();
    const [serviceDetails, setServiceDetails] = useState([]);
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [editServiceDetail, setEditServiceDetail] = useState(null);
    const [formValues, setFormValues] = useState({
        serviceId: '',
        name: '',
        servicePrice: '',
        description: '',
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchServiceDetails();
    }, [id]);

    const fetchServiceDetails = async () => {
        try {
            const response = await axios.get(`https://localhost:7175/api/ServiceDetails/servicedetail`, {
                params: { serviceId: id }
            });
            setServiceDetails(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching service details', error);
            setError('Error fetching service details');
            setServiceDetails([]);
        }
    };

    const handleShowAddEditModal = (serviceDetail = null) => {
        setEditServiceDetail(serviceDetail);
        if (serviceDetail) {
            setFormValues({
                serviceId: serviceDetail.serviceId.toString(),
                name: serviceDetail.name,
                servicePrice: serviceDetail.servicePrice.toString(),
                description: serviceDetail.description,
            });
        } else {
            setFormValues({
                serviceId: '',
                name: '',
                servicePrice: '',
                description: '',
            });
        }
        setShowAddEditModal(true);
    };

    const handleCloseAddEditModal = () => {
        setShowAddEditModal(false);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editServiceDetail) {
                const updatedServiceDetail = { ...editServiceDetail, ...formValues };
                await axios.put(`https://localhost:7175/api/ServiceDetails/${editServiceDetail.id}`, updatedServiceDetail);
                toast.success('Cập nhật thành công!');
            } else {
                await axios.post(`https://localhost:7175/api/ServiceDetails`, { ...formValues, serviceId: id });
                toast.success('Thêm mới thành công!');
            }
            fetchServiceDetails();
            handleCloseAddEditModal();
        } catch (error) {
            console.error('Error submitting form', error);
            if (error.response) {
                console.error('API Error:', error.response.data);
                setError('Lỗi từ API: ' + error.response.data);
                toast.error('Lỗi từ API: ' + error.response.data);
            } else {
                console.error('Network Error:', error.message);
                setError('Lỗi mạng: ' + error.message);
                toast.error('Lỗi mạng: ' + error.message);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7175/api/ServiceDetails/${id}`);
            toast.success('Xóa thành công!');
            fetchServiceDetails();
        } catch (error) {
            console.error('Error deleting service detail', error);
            toast.error('Lỗi khi xóa chi tiết dịch vụ');
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            await axios.put(`https://localhost:7175/api/ServiceDetails/${id}/status`);
            fetchServiceDetails();
            toast.success(`Thay đổi trạng thái chi tiết dịch vụ có id ${id} thành công!`);
        } catch (error) {
            console.error(`Lỗi khi thay đổi trạng thái chi tiết dịch vụ có id ${id}:`, error);
            toast.error(`Lỗi khi thay đổi trạng thái chi tiết dịch vụ có id ${id}!`);
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
                    <h2>Chi tiết dịch vụ</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <Button variant="success" onClick={() => handleShowAddEditModal()}>
                        Thêm Chi Tiết Dịch Vụ
                    </Button>
                    <br />
                    <br />
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên dịch vụ</th>
                                <th>Giá dịch vụ</th>
                                <th>Mô tả</th>
                                <th>Trạng thái</th>
                                <th>Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {serviceDetails.map((detail) => (
                                <tr key={detail.id}>
                                    <td>{detail.id}</td>
                                    <td>{detail.name}</td>
                                    <td>{detail.servicePrice}</td>
                                    <td>{detail.description}</td>
                                    <td>{detail.status ? "Hoạt động" : "Không hoạt động"}</td>
                                    <td>
                                        <Button variant="warning" style={{ marginRight: '5px' }} onClick={() => handleShowAddEditModal(detail)}>
                                            Sửa
                                        </Button>
                                        <Button  variant={detail.status ? "danger" : "success"} onClick={() => handleToggleStatus(detail.id)}>
                                            {detail.status ? "Không hoạt động" : "Hoạt động"}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Modal show={showAddEditModal} onHide={handleCloseAddEditModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{editServiceDetail ? 'Sửa Chi Tiết Dịch Vụ' : 'Thêm Chi Tiết Dịch Vụ'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="name">
                                    <Form.Label>Tên dịch vụ</Form.Label>
                                    <Form.Control type="text" name="name" value={formValues.name} onChange={handleFormChange} required />
                                </Form.Group>
                                <Form.Group controlId="servicePrice">
                                    <Form.Label>Giá dịch vụ</Form.Label>
                                    <Form.Control type="number" name="servicePrice" value={formValues.servicePrice} onChange={handleFormChange} required />
                                </Form.Group>
                                <Form.Group controlId="description">
                                    <Form.Label>Mô tả</Form.Label>
                                    <Form.Control as="textarea" rows={3} name="description" value={formValues.description} onChange={handleFormChange} required />
                                </Form.Group>
                                <br />
                                <Button variant="primary" type="submit">
                                    {editServiceDetail ? 'Cập nhật' : 'Thêm mới'}
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>

                    <ToastContainer />
                </Container>
            </div>
        </div>
    );
};

export default ServiceDetailList;
