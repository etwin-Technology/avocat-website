// src/pages/ConfirmationPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api'; // Your API service

function ConfirmationPage() {
  const { referenceNumber } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/appointments/${referenceNumber}`);
        setAppointment(response.data.data.appointment);
      } catch (err) {
        setError('Appointment not found');
        console.error('Error fetching appointment:', err);
      } finally {
        setLoading(false);
      }
    };

    if (referenceNumber) {
      fetchAppointment();
    } else {
      navigate('/');
    }
  }, [referenceNumber, navigate]);

  if (loading) {
    return (
      <div className="confirmation-container">
        <div className="loading">Loading appointment details...</div>
      </div>
    );
  }

  if (error || !appointment) {
    return (
      <div className="confirmation-container">
        <div className="error-message">
          <h2>Appointment Not Found</h2>
          <p>The appointment reference {referenceNumber} was not found.</p>
          <button onClick={() => navigate('/appointment')}>
            Book New Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="success-icon">✓</div>
        <h1>Appointment Confirmed!</h1>
        <p className="success-message">
          Your appointment has been successfully booked.
        </p>
        
        <div className="appointment-details">
          <h2>Appointment Details</h2>
          <div className="detail-row">
            <span className="label">Reference Number:</span>
            <span className="value">{appointment.referenceNumber}</span>
          </div>
          <div className="detail-row">
            <span className="label">Date:</span>
            <span className="value">{appointment.formattedDate || appointment.preferredDate}</span>
          </div>
          <div className="detail-row">
            <span className="label">Time:</span>
            <span className="value">{appointment.preferredTime}</span>
          </div>
          <div className="detail-row">
            <span className="label">Service:</span>
            <span className="value">{appointment.serviceType}</span>
          </div>
          <div className="detail-row">
            <span className="label">Client:</span>
            <span className="value">{appointment.clientName}</span>
          </div>
          <div className="detail-row">
            <span className="label">Status:</span>
            <span className="value status-pending">{appointment.status}</span>
          </div>
        </div>

        <div className="actions">
          <button 
            className="btn-primary"
            onClick={() => window.print()}
          >
            Print Confirmation
          </button>
          <button 
            className="btn-secondary"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>

        <div className="instructions">
          <h3>What's Next?</h3>
          <ul>
            <li>You will receive a confirmation email shortly</li>
            <li>Please arrive 10 minutes before your appointment</li>
            <li>Bring any relevant documents with you</li>
            <li>Contact us if you need to reschedule</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;