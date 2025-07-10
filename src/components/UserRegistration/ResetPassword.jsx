import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams(); // Extract token from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return Swal.fire({
        icon: 'error',
        title: 'Mismatch',
        text: 'Passwords do not match!',
      });
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, token }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your password has been reset successfully!',
        });
        navigate("/login");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: data.message || 'Password reset failed. Try again.',
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Something went wrong. Try again later.',
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '450px', borderRadius: '15px' }}>
        <h3 className="text-center text-primary mb-3">Reset Your Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="newPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter new password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm new password"
            />
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="showPasswordCheck"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className="form-check-label" htmlFor="showPasswordCheck">
              Show Password
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
