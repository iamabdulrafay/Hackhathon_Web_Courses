import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal,Alert ,Button} from 'react-bootstrap'; // Import Modal and Button from react-bootstrap
// import Button from '../components/button/Button';
import ButtonCustom from '../components/button/ButtonCustom';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const VerifyOtpForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to control success modal visibility
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get email from location state if available
  const initialEmail = location.state?.email || '';
  const [formEmail, setFormEmail] = useState(initialEmail);

  const handleEmailChange = (e) => {
    setFormEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/verify-otp/', { email: formEmail, otp }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('OTP verification successful:', response.data);
      setShowSuccessModal(true); // Show success modal on successful verification
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('OTP verification error:', error.response?.data || error.message);
      setError(error.response?.data?.detail || 'An error occurred');
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/'); // Redirect to home page after closing the modal
  };

  return (
    <div style={{width:"100vw" ,height:"100vh",display:"flex",alignItems:"center" ,justifyContent:"center", overflowY:'hidden'}}>

    <div className="otp_form">
      <div className="form">
        <h1 style={{overflowY:"hidden"}}>Verify OTP</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-input'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formEmail}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className='form-input'>
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={handleOtpChange}
              required
            />
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          <ButtonCustom text="confirm" type="submit">Verify OTP</ButtonCustom>
        </form>
      </div>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
  <Modal.Header closeButton>
    <Modal.Title>Registration Successful</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div className="text-center">
    <svg
  version="1.1"
  id="Layer_1"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  x="0px"
  y="0px"
  viewBox="0 0 117.72 117.72"
  style={{ enableBackground: 'new 0 0 117.72 117.72', width: '50px', height: '50px' }}
  xmlSpace="preserve"
>
  <style type="text/css">
    {`
      .st0 { fill: #01A601; }
    `}
  </style>
  <g>
    <path
      className="st0"
      d="M58.86,0c9.13,0,17.77,2.08,25.49,5.79c-3.16,2.5-6.09,4.9-8.82,7.21c-5.2-1.89-10.81-2.92-16.66-2.92
        c-13.47,0-25.67,5.46-34.49,14.29c-8.83,8.83-14.29,21.02-14.29,34.49c0,13.47,5.46,25.66,14.29,34.49
        c8.83,8.83,21.02,14.29,34.49,14.29s25.67-5.46,34.49-14.29c8.83-8.83,14.29-21.02,14.29-34.49c0-3.2-0.31-6.34-0.9-9.37
        c2.53-3.3,5.12-6.59,7.77-9.85c2.08,6.02,3.21,12.49,3.21,19.22c0,16.25-6.59,30.97-17.24,41.62
        c-10.65,10.65-25.37,17.24-41.62,17.24c-16.25,0-30.97-6.59-41.62-17.24C6.59,89.83,0,75.11,0,58.86
        c0-16.25,6.59-30.97,17.24-41.62S42.61,0,58.86,0L58.86,0z M31.44,49.19L45.8,49l1.07,0.28c2.9,1.67,5.63,3.58,8.18,5.74
        c1.84,1.56,3.6,3.26,5.27,5.1c5.15-8.29,10.64-15.9,16.44-22.9c6.35-7.67,13.09-14.63,20.17-20.98l1.4-0.54H114l-3.16,3.51
        C101.13,30,92.32,41.15,84.36,52.65C76.4,64.16,69.28,76.04,62.95,88.27l-1.97,3.8l-1.81-3.87c-3.34-7.17-7.34-13.75-12.11-19.63
        c-4.77-5.88-10.32-11.1-16.79-15.54L31.44,49.19L31.44,49.19z"
    />
  </g>
</svg>

      <h4 className="mt-3">Your registration was successful!</h4>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <ButtonCustom text="Close" onClick={handleCloseSuccessModal}>
      
    </ButtonCustom>
  </Modal.Footer>
  </Modal>
    </div>
    </div>
  );
};

export default VerifyOtpForm;
