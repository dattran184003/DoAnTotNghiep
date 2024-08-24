import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { useHistory, useNavigate } from 'react-router-dom';

const DepositContractForm = () => {
  const [userId, setUserId] = useState('');
  const [carId, setCarId] = useState('');
  const [serviceDetailId, setServiceDetailId] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [promotionDetailId, setPromotionDetailId] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [intoMoney, setIntoMoney] = useState('');
  const [quantity, setQuantity] = useState('');
  const [contractSigningDate, setContractSigningDate] = useState('');
  const [carPickupDate, setCarPickupDate] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');
  const [contractPath, setContractPath] = useState('');
  const [signatureImage, setSignatureImage] = useState(null);
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSignatureImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('UserId', userId);
    formData.append('CarId', carId);
    formData.append('ServiceDetailId', serviceDetailId);
    formData.append('PaymentId', paymentId);
    formData.append('PromotionDetailId', promotionDetailId);
    formData.append('DeliveryAddress', deliveryAddress);
    formData.append('IntoMoney', intoMoney);
    formData.append('Quantity', quantity);
    formData.append('ContractSigningDate', contractSigningDate);
    formData.append('CarPickupDate', carPickupDate);
    formData.append('Note', note);
    formData.append('Status', status);
    formData.append('ContractPath', contractPath);
    formData.append('SignatureImage', signatureImage);

    try {
      const response = await axios.post('https://localhost:7175/api/DepositContracts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Contract created successfully!');
      setVariant('success');
      setTimeout(() => {
        navigate('/depositcontracts');
      }, 2000); // Delay for 2 seconds before redirecting
    } catch (error) {
      setMessage(`Error creating contract: ${error.message}`);
      setVariant('danger');
    }
  };

  return (
    <>
      {message && <Alert variant={variant}>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="userId">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="carId">
          <Form.Label>Car ID</Form.Label>
          <Form.Control
            type="text"
            value={carId}
            onChange={(e) => setCarId(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="serviceDetailId">
          <Form.Label>Service Detail ID</Form.Label>
          <Form.Control
            type="text"
            value={serviceDetailId}
            onChange={(e) => setServiceDetailId(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="paymentId">
          <Form.Label>Payment ID</Form.Label>
          <Form.Control
            type="text"
            value={paymentId}
            onChange={(e) => setPaymentId(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="promotionDetailId">
          <Form.Label>Promotion Detail ID</Form.Label>
          <Form.Control
            type="text"
            value={promotionDetailId}
            onChange={(e) => setPromotionDetailId(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="deliveryAddress">
          <Form.Label>Delivery Address</Form.Label>
          <Form.Control
            type="text"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="intoMoney">
          <Form.Label>Into Money</Form.Label>
          <Form.Control
            type="number"
            value={intoMoney}
            onChange={(e) => setIntoMoney(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="contractSigningDate">
          <Form.Label>Contract Signing Date</Form.Label>
          <Form.Control
            type="date"
            value={contractSigningDate}
            onChange={(e) => setContractSigningDate(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="carPickupDate">
          <Form.Label>Car Pickup Date</Form.Label>
          <Form.Control
            type="date"
            value={carPickupDate}
            onChange={(e) => setCarPickupDate(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="note">
          <Form.Label>Note</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Control
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="contractPath">
          <Form.Label>Contract Path</Form.Label>
          <Form.Control
            type="text"
            value={contractPath}
            onChange={(e) => setContractPath(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="signatureImage">
          <Form.Label>Signature Image</Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Contract
        </Button>
      </Form>
    </>
  );
};

export default DepositContractForm;
