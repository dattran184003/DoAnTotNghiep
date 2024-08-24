import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./car.scss";
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';

const AddCar = () => {
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
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://localhost:7175/api/Models')
            .then(response => {
                setModels(response.data);
            })
            .catch(error => {
                console.error('Error fetching models:', error);
            });
    }, []);

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
        formData.append('imageFile', imageFile);

        try {
            const response = await axios.post('https://localhost:7175/api/Cars', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setShowSuccess(true);
            const carId = response.data.id;
            setTimeout(() => {
                navigate(`/admin/cars`);
            }, 1000);
        } catch (error) {
            toast.error('Lỗi khi thêm xe: ' + error.message);
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
                    {error && <Alert variant="danger">{error}</Alert>}
                    {showSuccess && <Alert variant="success">Thêm xe thành công!</Alert>}
                    <h2>Thêm xe mới</h2>
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
                                        as="select"
                                        name="engine"
                                        value={carData.engine}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Chọn động cơ</option>
                                        <option value="V8">Động cơ V8</option>
                                        <option value="V10">Động cơ V10</option>
                                        <option value="V12">Động cơ V12</option>
                                        <option value="W16">Động cơ W16</option>
                                        <option value="Hybrid">Động cơ Hybrid</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Hộp số</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="transmission"
                                        value={carData.transmission}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Chọn hộp số</option>
                                        <option value="Tự động">Tự động</option>
                                        <option value="Số sàn">Số sàn</option>
                                    </Form.Control>
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
                                    {imagePreview && <img src={imagePreview} alt="Preview" style={{ marginTop: '10px', maxHeight: '100px' }} />}
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Mã lực</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="horsepower"
                                    value={carData.horsepower}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Chọn mã lực</option>
                                    <option value="610">610 HP</option>
                                    <option value="640">640 HP</option>
                                    <option value="700">700 HP</option>
                                    <option value="730">730 HP</option>
                                    <option value="770">770 HP</option>
                                    <option value="800">800 HP</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Mô-men xoắn</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="torque"
                                    value={carData.torque}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Chọn mô-men xoắn</option>
                                    <option value="560">560 Nm</option>
                                    <option value="610">610 Nm</option>
                                    <option value="650">650 Nm</option>
                                    <option value="690">690 Nm</option>
                                    <option value="720">720 Nm</option>
                                    <option value="750">750 Nm</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Loại nhiên liệu</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="fuelType"
                                    value={carData.fuelType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Chọn loại nhiên liệu</option>
                                    <option value="Xăng">Xăng</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Mức tiêu thụ nhiên liệu (lít/100km)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="fuelConsumption"
                                    min={0}
                                    value={carData.fuelConsumption}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Hệ dẫn động</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="drivetrain"
                                    value={carData.drivetrain}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Chọn hệ dẫn động</option>
                                    <option value="FWD">FWD - Dẫn động cầu trước</option>
                                    <option value="RWD">RWD - Dẫn động cầu sau</option>
                                    <option value="AWD">AWD - Dẫn động 4 bánh</option>
                                </Form.Control>
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
                                <Form.Label>Chiều dài xe (mm)</Form.Label>
                                <Form.Control
                                    type="number"
                                    min={1000}
                                    name="length"
                                    value={carData.length}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Chiều rộng xe (mm)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="width"
                                    min={1000}
                                    value={carData.width}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Chiều cao xe (mm)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="height"
                                    min={1000}
                                    value={carData.height}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Chiều dài cơ sở (mm)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="wheelbase"
                                    min={1000}
                                    value={carData.wheelbase}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Trọng lượng xe (kg)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="curbWeight"
                                    min={500}
                                    value={carData.curbWeight}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button type="submit" onClick={handleSubmit}>Thêm xe</Button>
                        </Col>
                    </Row>
                    <ToastContainer />
                </Container>
            </div>
        </div>
    );
};

export default AddCar;
