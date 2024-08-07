import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For redirection
// import Button from '../button/Button';
import { Alert } from 'react-bootstrap'; // Import Alert component from react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import ButtonCustom from '../button/ButtonCustom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const [error, setError] = useState(null); // To store error messages
  const [success, setSuccess] = useState(null); // To store success messages
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/register/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Registration successful:', response.data);
      setSuccess("Registration successful! Redirecting to OTP verification...");
      setError(null); // Clear any previous errors
      setTimeout(() => {
        navigate('/verify-otp'); // Redirect to OTP verification page
      }, 2000); // Wait for 2 seconds to show the success alert
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      setError(error.response?.data?.detail || 'An error occurred');
      setSuccess(null); // Clear any previous success messages
    }
  };

  return (
    <>
    
    {/* Display alerts outside of the form */}
    
    
    <div className="r_form">
      

      <div className="form">
        <h1>Register Here.</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-input'>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-input'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-input'>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-input'>
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              required
            />
          </div>
          <ButtonCustom width="100%" height="20%" text="Submit" type="submit" />
        </form>
        {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" className="mt-3">
          {success}
        </Alert>
      )}
      </div>
      
    </div>
    </>
  );
};

export default RegisterForm;
