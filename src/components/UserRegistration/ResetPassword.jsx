import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { id, token } = useParams();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Both passwords must match!',
        confirmButtonColor: '#d33',
      });
    }

    try {
      const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${id}/${token}`, {
        password,
      });

      if (res.data.Status === 'Success') {
        Swal.fire({
          icon: 'success',
          title: 'Password Reset',
          text: 'Your password has been successfully reset.',
          confirmButtonColor: '#3085d6',
        });
        navigate('/login');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: res.data.message || 'Reset failed. Token may be expired.',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Something went wrong. Please try again later.',
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center fcb-font" style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <div className="card p-4 shadow border-0" style={{ width: '100%', maxWidth: '460px', borderRadius: '16px' }}>
        <h3 className="text-center text-primary mb-2">🔒 Reset Password</h3>
        <p className="text-center text-muted mb-4">Create a new password to access your account.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              id="newPassword"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ fontFamily: "Poppins, sans-serif" }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ fontFamily: "Poppins, sans-serif" }}
            />
          </div>

          <div className="form-check mb-4">
            <input
              type="checkbox"
              className="form-check-input"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className="form-check-label" htmlFor="showPassword">Show Password</label>
          </div>

          <button type="submit" className="btn btn-primary w-100">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
