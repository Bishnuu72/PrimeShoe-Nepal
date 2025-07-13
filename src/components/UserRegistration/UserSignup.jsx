import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const navigate = useNavigate();
  const [credential, setCredential] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const isPasswordStrong = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credential;

    if (password !== cpassword) {
      return swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Passwords do not match!',
      });
    }

    if (!isPasswordStrong(password)) {
      return swal.fire({
        icon: 'warning',
        title: 'Weak Password',
        html: 'Password must be at least <b>8 characters</b> long and include at least one <b>uppercase</b> letter, one <b>lowercase</b> letter, one <b>number</b>, and one <b>special character</b>.',
      });
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email: email.toLowerCase(), password }),
      });

      const data = await response.json();
      console.log('Signup backend res', data);

      if (data && data.authToken) {
        localStorage.setItem('token', data.authToken);

        swal
          .fire({
            icon: 'success',
            title: 'Account Created!',
            text: 'Your account has been created successfully.',
            confirmButtonText: 'Go to Login',
            confirmButtonColor: '#3085d6',
          })
          .then(() => {
            navigate('/login');
          });
      } else {
        swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: data.message || 'Invalid credentials or user already exists.',
        });
      }
    } catch (error) {
      console.error('Signup error:', error);
      swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Something went wrong. Please try again later.',
      });
    }
  };

  return (
    <div className='container fcb-font'>
      <div className='row'>
        <div className='col-md-3'>
          <div className='one-details'>
            <h3 className='one-title'>Join Prime Shoe Nepal</h3>
            <p className='one-desc'>
              Create an account to discover the perfect pair of shoes for any occasion.
              <br />
              <strong>Prime Shoe Nepal</strong> brings comfort, style, and quality straight to your feet.
            </p>
          </div>
        </div>
        <div className='col-md-9'>
          <form onSubmit={handleSubmit} className='two-details'>
            <h3 className='two-title'>Sign Up</h3>
            <div className='signup-details'>
              <div className='signup-box'>
                <input
                  type='text'
                  name='name'
                  value={credential.name}
                  onChange={handleChange}
                  required
                />
                <label>Name</label>
                <span className='input-icon'>
                  <i className='fa-solid fa-user'></i>
                </span>
              </div>

              <div className='signup-box'>
                <input
                  type='email'
                  name='email'
                  value={credential.email}
                  onChange={handleChange}
                  required
                />
                <label>Email</label>
                <span className='input-icon'>
                  <i className='fa-solid fa-envelope'></i>
                </span>
              </div>

              <div className='signup-box'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={credential.password}
                  onChange={handleChange}
                  required
                />
                <label>Password</label>
                <span className='input-icon' onClick={() => setShowPassword(!showPassword)}>
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </span>
              </div>

              <div className='signup-box'>
                <input
                  type={showCPassword ? 'text' : 'password'}
                  name='cpassword'
                  value={credential.cpassword}
                  onChange={handleChange}
                  required
                />
                <label>Confirm Password</label>
                <span className='input-icon' onClick={() => setShowCPassword(!showCPassword)}>
                  <i className={`fa-solid ${showCPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </span>
              </div>

              <div className='signup-button'>
                <button className='signup-btn' type='submit'>
                  Sign Up
                </button>
              </div>

              <p className='acc-login'>
                Already have an account? <Link className='acc-auth' to='/login'>Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
