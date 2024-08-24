import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./car.scss"; 
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';

const EditCar = () => {
    const { id } = useParams();
    const [carData, setCarData] = useState({
        modelId: '',
        name: '',
        year: '',
        price: '',
        engine: '',
        transmission: '',
        description: '',
        horsepower: '',
        torque: '',
        fuelType: '',
        fuelConsumption: '',
        drivetrain: '',
        seatingCapacity: '',
        length: '',
        width: '',
        height: '',
        wheelbase: '',
        curbWeight: '',
    });
    const [models, setModels] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await axios.get(`https://localhost:7175/api/Cars/${id}`);
                setCarData(response.data);
            } catch (error) {
                setError('Lỗi khi tải thông tin xe: ' + error.message);
            }
        };

        fetchCar();
        
        const fetchModels = async () => {
            try {
                const response = await axios.get('https://localhost:7175/api/Models');
                setModels(response.data);
            } catch (error) {
                console.error('Lỗi khi tải danh sách mẫu xe:', error);
            }
        };

        fetchModels();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData({ ...carData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in carData) {
            formData.append(key, carData[key]);
        }
        if (imageFile) {
            formData.append('imageFile', imageFile);
        }

        console.log('Entries của FormData:');
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const response = await axios.put(`https://localhost:7175/api/Cars/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Cập nhật thông tin xe thành công!');
            setTimeout(() => {
                navigate('/admin/cars', { state: { success: 'Cập nhật thông tin xe thành công!' } });
            }, 2000);
        } catch (error) {
            console.error('Phản hồi lỗi:', error.response);
            const errorDetails = error.response?.data?.errors || error.response?.data || error.message;
            toast.error('Lỗi khi cập nhật thông tin xe: ' + JSON.stringify(errorDetails));
        }
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
            <h2>Cập nhật thông tin xe</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Mẫu xe</Form.Label>
                            <Form.Control
                                as="select"
                                name="modelId"
                                value={carData.modelId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Chọn mẫu xe</option>
                                {models.map(model => (
                                    <option key={model.id} value={model.id}>{model.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên xe</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={carData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Năm sản xuất</Form.Label>
                            <Form.Control
                                type="number"
                                name="year"
                                min={1900}
                                value={carData.year}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Giá</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                min={1}
                                value={carData.price}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Động cơ</Form.Label>
                            <Form.Control
                                type="text"
                                name="engine"
                                value={carData.engine}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                         <Form.Group className="mb-3">
                            <Form.Label>Hộp số</Form.Label>
                            <Form.Control
                                type="text"
                                name="transmission"
                                value={carData.transmission}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={carData.description}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ảnh đại diện</Form.Label>
                            <Form.Control type="file" onChange={handleImageChange} accept=".jpg,.jpeg,.png" />
                            {imagePreview && <img src={imagePreview} alt="Xem trước" style={{ marginTop: '10px', maxHeight: '200px' }} />}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Cập nhật
                        </Button>
                    </Form>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Mã lực</Form.Label>
                        <Form.Control
                            type="number"
                            name="horsepower"
                            min={50}
                            value={carData.horsepower}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mô-men xoắn</Form.Label>
                        <Form.Control
                            type="number"
                            name="torque"
                            min={50}
                            value={carData.torque}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Loại nhiên liệu</Form.Label>
                        <Form.Control
                            type="text"
                            name="fuelType"
                            value={carData.fuelType}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mức tiêu thụ nhiên liệu</Form.Label>
                        <Form.Control
                            type="number"
                            name="fuelConsumption"
                            min={1}
                            step="0.1"
                            value={carData.fuelConsumption}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Hệ dẫn động</Form.Label>
                        <Form.Control
                            type="text"
                            name="drivetrain"
                            value={carData.drivetrain}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Số chỗ ngồi</Form.Label>
                        <Form.Control
                            type="number"
                            name="seatingCapacity"
                            min={1}
                            value={carData.seatingCapacity}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Chiều dài</Form.Label>
                        <Form.Control
                            type="number"
                            name="length"
                            min={1}
                            value={carData.length}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Chiều rộng</Form.Label>
                        <Form.Control
                            type="number"
                            name="width"
                            min={1}
                            value={carData.width}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Chiều cao</Form.Label>
                        <Form.Control
                            type="number"
                            name="height"
                            min={1}
                            value={carData.height}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Chiều dài cơ sở</Form.Label>
                        <Form.Control
                            type="number"
                            name="wheelbase"
                            min={1}
                            value={carData.wheelbase}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Trọng lượng</Form.Label>
                        <Form.Control
                            type="number"
                            name="curbWeight"
                            min={1}
                            value={carData.curbWeight}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
        </div>
        </div>
    );
};

export default EditCar;
