import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const StatusUpdateForm = ({ id, onUpdateSuccess }) => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.put(`https://localhost:7175/api/DepositContracts/updateStatus/${id}`, 
        { status: parseInt(status) },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      onUpdateSuccess();
      toast.success('Cập nhật trạng thái thành công!');
    } catch (err) {
      setError(err.message);
      toast.error('Có lỗi xảy ra khi cập nhật trạng thái.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formStatus">
        <Form.Label>Thay đổi trạng thái</Form.Label>
        <Form.Control as="select" value={status} onChange={handleStatusChange} required>
          <option value="">Chọn trạng thái</option>
          <option value="0">Yêu thích</option>
          <option value="1">Đã đặt cọc</option>
          <option value="2">Đã ký hợp đồng</option>
          <option value="3">Hoàn thành</option>
          <option value="4">Hủy bỏ</option>
        </Form.Control>
      </Form.Group>
      {error && <p className="text-danger">{error}</p>}
      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Đang lưu...' : 'Lưu'}
      </Button>
    </Form>
  );
};

export default StatusUpdateForm;
