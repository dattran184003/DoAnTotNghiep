import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';
import "./account.scss";

const AppointmentsList = () => {
    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [viewingDate, setViewingDate] = useState('');
    const [carViewingTime, setCarViewingTime] = useState('');
    const navigate = useNavigate();
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(() => {
        fetchAppointments();
    }, [currentPage, viewingDate, carViewingTime]);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('https://localhost:7175/api/Appointments/page', {
                params: {
                    viewingDate,
                    carViewingTime,
                    pageNumber: currentPage,
                    pageSize: pageSize
                }
            });
            const { items, totalItems } = response.data;

            if (items && totalItems !== undefined) {
                // Lấy tên người dùng cho mỗi cuộc hẹn
                const appointmentsWithUserNames = await Promise.all(
                    items.map(async (appointment) => {
                        const userResponse = await axios.get(`https://localhost:7175/api/Users/${appointment.userId}`);
                        const userName = userResponse.data.userName;
                        return { ...appointment, userName };
                    })
                );

                setAppointments(appointmentsWithUserNames);
                setTotalPages(Math.ceil(totalItems / pageSize));
            } else {
                toast.error('Phản hồi từ API không đúng định dạng');
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            toast.error('Lỗi khi lấy dữ liệu cuộc hẹn!');
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
        fetchAppointments();
    };

    const resetFilters = () => {
        setViewingDate('');
        setCarViewingTime('');
        setCurrentPage(1);
        fetchAppointments();
    };

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const toggleStatus = async (id) => {
        try {
            await axios.put(`https://localhost:7175/api/Appointments/${id}/toggle-status`);
            fetchAppointments(); // Refresh the appointments list
        } catch (error) {
            console.error('Lỗi khi thay đổi trạng thái', error);
        }
    };

    const openDetailsModal = async (id) => {
        try {
            const response = await axios.get(`https://localhost:7175/api/Appointments/${id}`);
            const appointmentData = response.data;

            // Fetch user details
            const userResponse = await axios.get(`https://localhost:7175/api/Users/${appointmentData.userId}`);
            const userName = userResponse.data.userName;

            // Fetch car details
            const carResponse = await axios.get(`https://localhost:7175/api/Cars/${appointmentData.carId}`);
            const carName = carResponse.data.name;

            setSelectedAppointment({
                ...appointmentData,
                userName: userName,
                carName: carName,
            });
        } catch (error) {
            console.error('Lỗi khi tải thông tin chi tiết cuộc hẹn', error);
            // Xử lý lỗi ở đây, ví dụ thông báo cho người dùng
        }
    };

    const closeDetailsModal = () => {
        setSelectedAppointment(null);
    };

    return (
        <div className="account">
            <Sidebar isOpen={isSidebarOpen} />
            <div className={`accountContainer ${isSidebarOpen ? "open" : ""}`}>
                <Navbar toggleSidebar={toggleSidebar} />
                <Container>
                    <h2 className="text-center my-4">Danh sách cuộc hẹn</h2>
                    <Row className="mb-3">
                        <Col md={5}>
                            <Form.Control
                                type="date"
                                placeholder="Tìm kiếm theo ngày"
                                value={viewingDate}
                                onChange={(e) => setViewingDate(e.target.value)}
                            />
                        </Col>
                        <Col md={5}>
                            <Form.Control
                                type="time"
                                placeholder="Tìm kiếm theo thời gian"
                                value={carViewingTime}
                                onChange={(e) => setCarViewingTime(e.target.value)}
                            />
                        </Col>
                        <Col md={2}>
                            <Button variant="secondary" onClick={resetFilters}>Đặt lại</Button>
                        </Col>
                    </Row>

                    <Table striped bordered hover responsive className="text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên người đặt</th>
                                <th>Ngày xem xe</th>
                                <th>Thời gian xem xe</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments && appointments.length > 0 ? (
                                appointments.map(appointment => (
                                    <tr key={appointment.id}>
                                        <td>{appointment.id}</td>
                                        <td>{appointment.userName}</td>
                                        <td>{new Date(appointment.viewingDate).toLocaleDateString()}</td>
                                        <td>{appointment.carViewingTime}</td>
                                        <td>{appointment.status ? 'Hoạt động' : 'Không hoạt động'}</td>
                                        <td>
                                            <Button variant="primary" style={{ margin: "5px" }} className="ml-2" onClick={() => openDetailsModal(appointment.id)}>
                                                Chi tiết
                                            </Button>
                                            <Button
                                                variant={appointment.status ? 'danger' : 'success'}
                                                onClick={() => toggleStatus(appointment.id)}
                                            >
                                                {appointment.status ? 'Hủy kích hoạt' : 'Kích hoạt'}
                                            </Button>
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

                    <Modal show={!!selectedAppointment} onHide={closeDetailsModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Chi tiết cuộc hẹn</Modal.Title>
                        </Modal.Header>
                        {selectedAppointment && (
                            <Modal.Body>
                                <p><strong>Tên tài khoản:</strong> {selectedAppointment.userName}</p>
                                <p><strong>Xe:</strong> {selectedAppointment.carName}</p>
                                <p><strong>Ngày xem xe:</strong> {new Date(selectedAppointment.viewingDate).toLocaleDateString()}</p>
                                <p><strong>Thời gian xem xe:</strong> {selectedAppointment.carViewingTime}</p>
                                <p><strong>Địa điểm:</strong> {selectedAppointment.location}</p>
                                <p><strong>Ghi chú:</strong> {selectedAppointment.note}</p>
                                <p><strong>Thông tin liên hệ:</strong> {selectedAppointment.contactInfo}</p>
                                <p><strong>Ngày tạo:</strong> {new Date(selectedAppointment.createdDate).toLocaleDateString()}</p>
                                <p><strong>Trạng thái:</strong> {selectedAppointment.status ? 'Hoạt động' : 'Không hoạt động'}</p>
                            </Modal.Body>
                        )}
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeDetailsModal}>
                                Đóng
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
                <ToastContainer />
            </div>
        </div>
    );
};

export default AppointmentsList;
