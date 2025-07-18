import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const lowerCaseEmail = email.trim().toLowerCase();

    // ✅ Email format validation
    const isValidEmail = /\S+@\S+\.\S+/.test(lowerCaseEmail);
    if (!isValidEmail) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/forgot-password`,
        { email: lowerCaseEmail },
        { withCredentials: true }
      );

      if (res.data.Status === "Success") {
        Swal.fire({
          icon: "success",
          title: "Email Sent",
          text: "Check your inbox for password reset instructions.",
        });
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: res.data.message || "Something went wrong.",
        });
      }
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 404) {
        Swal.fire({
          icon: "error",
          title: "Email Not Registered",
          text: "This email is not associated with any account.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Unable to send request. Please try again later.",
        });
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center fcb-font" style={{ minHeight: "100vh" }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: "450px", width: "100%", borderRadius: "15px" }}>
        <h3 className="text-center mb-3 text-primary">Forgot Password</h3>
        <p className="text-muted text-center mb-4">Enter your email to receive a reset link</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ fontFamily: "Poppins, sans-serif" }}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
        </form>
        <div className="text-center mt-3">
          <Link to="/login" className="text-decoration-none text-secondary">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
