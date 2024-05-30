import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom'; 
import { server } from '../../server';
import styles from '../../styles/styles';

const ReportProduct = () => {
  const [productId, setProductId] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate(); 
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const productIdFromUrl = searchParams.get('productId');
    setProductId(productIdFromUrl);
  }, [searchParams]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);
    setMessage('');

    try {
      const response = await axios.post(`${server}/report/report-product/${productId}`, { reason });
      setMessage(response.data.message);
      setReason('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setMessage('An error occurred while reporting the product.');
      }
    }
  };

  // Function to handle back button click
  const handleBackButtonClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className={styles.modal}>
      <div className={styles['modal-content']} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 className={styles.heading}>Report a Product</h2>
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="productId" className={styles.productTitle}>Product ID:</label>
            <input
              type="text"
              id="productId"
              value={productId}
              readOnly // Make the input read-only since productId is automatically set
              className={styles.input}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="reason" className={styles.productTitle}>Reason:</label>
            <select
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className={styles.input}
            >
              <option value="">Select a reason</option>
              <option value="Inappropriate image">Inappropriate image</option>
              <option value="Nudity">Nudity</option>
              <option value="Spam">Spam</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <button type="submit" className={styles.button}>Report Product</button>
            {/* Back Button */}
            <button onClick={handleBackButtonClick} className={styles.button}>Back</button>
          </div>
        </form>
        {message && <p>{message}</p>}
        {errors.length > 0 && (
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReportProduct;
