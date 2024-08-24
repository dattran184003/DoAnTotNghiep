import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./car.scss"; 
import Sidebar from '../Layout/sidebar/Sidebar';
import Navbar from '../Layout/navbar/Navbar';

const AddCarImages = () => {
    const { carId } = useParams();
    const [imageFiles, setImageFiles] = useState({});
    const [imagePreviews, setImagePreviews] = useState(Array(10).fill(null));
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [cars, setCars] = useState([]);
    const [selectedCarId, setSelectedCarId] = useState(carId || '');
    const navigate = useNavigate();
    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await axios.get('https://localhost:7175/api/CarImages/cars-without-images');
            setCars(response.data);
            if (!carId && response.data.length > 0) {
                setSelectedCarId(response.data[0].id);
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách xe:', error);
            toast.error('Lỗi khi lấy danh sách xe! vì không có xe nào chưa thêm');
        }
    };

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        const newImageFiles = { ...imageFiles, [`ImageFile${index + 1}`]: file };

        setImageFiles(newImageFiles);
        const newImagePreviews = [...imagePreviews];
        newImagePreviews[index] = URL.createObjectURL(file);
        setImagePreviews(newImagePreviews);
    };

    const handleCarSelect = (e) => {
        setSelectedCarId(parseInt(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in imageFiles) {
            formData.append(key, imageFiles[key]);
        }
        formData.append('CarId', selectedCarId);

        try {
            await axios.post(`https://localhost:7175/api/CarImages/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setShowSuccess(true);
            setError('');
            toast.success('Tải lên hình ảnh thành công!');
            navigate('/admin/carimages');
        } catch (error) {
             navigate('/admin/carimages');
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
                    {showSuccess && <Alert variant="success">Tải lên hình ảnh thành công!</Alert>}
                    <h2>Thêm hình ảnh cho xe</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Chọn xe</Form.Label>
                            <Form.Control as="select" onChange={handleCarSelect} value={selectedCarId}>
                                {cars.map(car => (
                                    <option key={car.id} value={car.id}>{car.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Row>
                            {Array.from({ length: 10 }, (_, index) => (
                                <Col xs={12} md={6} key={index}>
                                    <Form.Group className="mb-3" key={index}>
                                        <Form.Label>Chọn hình ảnh {index + 1}</Form.Label>
                                        <Form.Control 
                                            type="file" 
                                            onChange={(e) => handleImageChange(e, index)} 
                                            accept=".jpg,.jpeg,.png" 
                                        />
                                        {imagePreviews[index] && (
                                            <img 
                                                src={imagePreviews[index]} 
                                                alt={`Xem trước hình ảnh ${index + 1}`} 
                                                style={{ marginTop: '10px', maxHeight: '200px' }} 
                                            />
                                        )}
                                    </Form.Group>
                                </Col>
                            ))}
                        </Row>
                        <Button type="submit">Tải lên hình ảnh</Button>
                    </Form>
                    <ToastContainer />
                </Container>
            </div>
        </div>
    );
};

export default AddCarImages;
