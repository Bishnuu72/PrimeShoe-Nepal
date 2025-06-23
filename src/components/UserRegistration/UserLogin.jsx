import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserLogin = () => {

  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const [credential, setCredential] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    const {email, password} = credential; //destructuring
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}),
    })
    const data = await response.json();
    if(data.success){
      localStorage.setItem("token", "xyz");
      navigate("/");
    }
    else {
      alert("Invalid Credentials");
    }

    console.log("Login form is submitted");
  };

  const handleChange = (e) => {
    setCredential({...credential, [e.target.name]:e.target.value})
  }
  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-4">
            <form onSubmit={handleSubmit} className="left-details">
                <h3 className="left-title">Login</h3>
                <div className="login-details">
                    <div className="login-box">
                      <input 
                      type="email" 
                      name="email" 
                      value={credential.email} 
                      onChange={handleChange} 
                      required/>
                      <label>Email</label>
                      <span className="input-icon"><i className="fa-solid fa-envelope"></i></span>
                      </div>
                      
                      
                    <div className="login-box">
                      <input 
                      type={showPassword ? "text" : "password"} 
                      name="password" 
                      value={credential.password} 
                      onChange={handleChange}
                      required />
                      <label>Password</label>
                      <span className="input-icon" onClick={() => setShowPassword(!showPassword)}><i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i></span>
                      </div>
                    <div className="login-button">
                        <button className="login-btn">Login</button>
                    </div>
                    <p className="acc-login">Don't have an account? <Link className='acc-auth' to="/signup">Sign Up</Link></p>
                </div>
            </form>
        </div>
        <div className="col-md-8">
            <div className="right-details">
                <h3 className="right-title">Welcome Back to Namaste Paws!</h3>
                <p className="right-desc">Log in to continue your journey with our adorable paws. View saved pets, track adoption status, and explore new arrivals waiting for their forever home.</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
