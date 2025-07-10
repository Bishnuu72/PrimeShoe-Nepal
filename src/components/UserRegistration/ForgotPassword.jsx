import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Email Sent",
          text: "Check your inbox for password reset instructions.",
          confirmButtonColor: "#3085d6",
        });
        setEmail("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: data.error || "Something went wrong. Try again.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Unable to send request. Please try again later.",
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
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
