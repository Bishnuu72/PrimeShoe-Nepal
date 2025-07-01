import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductContext from '../../Context/ProductContext';

const UserSignup = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showCPassword, setShowCPassword] = React.useState(false);

  const navigate = useNavigate();
  const [credential, setCredential] = React.useState({
      name: "",
      email: "",
      password: "",
      cpassword: "",
    });
    
    
    const handleSubmit = async(e) => {
      e.preventDefault();

      const {name, email, password, cpassword} = credential; //destructuring
      if(password !== cpassword){
        swal.fire ({
          icon: "error",
          title: "oops...",
          text: "Passwords donot match !",
        })
        return;
      }
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, password}),
      })
      const data = await response.json();
      console.log("Signup backend res", data);
      if(data){
        localStorage.setItem("token", data.authToken);
        navigate("/login");
      }
      else {
        alert("Invalid Credentials");
      }
  
      console.log("Signup form is submitted");
    };
  
    const handleChange = (e) => {
      setCredential({...credential, [e.target.name]:e.target.value})
    }
  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-3">
            <div className="one-details">
                <h3 className="one-title">Sign Up & Find a Friend for Life</h3>
                <p className="one-desc">Create an account to explore happy tails, loving hearts, and furry joy. <br />Namaste Paws is your trusted partner in pet parenting.</p>
            </div>
        </div>
        <div className="col-md-9">
            <form onSubmit={handleSubmit} className="two-details">
                <h3 className="two-title">Sign Up</h3>
                <div className="signup-details">
                    <div className="signup-box">
                      <input 
                      type="text" 
                      name="name" 
                      value={credential.name} 
                      onChange={handleChange} 
                      required />
                      <label>Name</label>
                      <span className="input-icon"><i className="fa-solid fa-user"></i></span>
                      </div>

                    <div className="signup-box"><input type="email" name='email' value={credential.email} onChange={handleChange} required />
                    <label>Email</label>
                    <span className="input-icon"><i className="fa-solid fa-envelope"></i></span>
                    </div>

                    <div className="signup-box"><input type={showPassword ? "text" : "password"} name='password' value={credential.password} onChange={handleChange} required />
                    <label>Password</label>
                    <span className="input-icon" onClick={() => setShowPassword(!showPassword)}><i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i></span>
                    </div>

                    <div className="signup-box"><input type={showCPassword ? "text" : "password"} name='cpassword' value={credential.cpassword} onChange={handleChange} required />
                    <label>Confirm Password</label>
                    <span className="input-icon" onClick={() => setShowCPassword(!showCPassword)}><i className={`fa-solid ${showCPassword ? "fa-eye-slash" : "fa-eye"}`}></i></span>
                    </div>
                    <div className="signup-button">
                        <button className="signup-btn">Sign Up</button>
                    </div>
                    <p className="acc-login">Already have an account? <Link className='acc-auth' to="/login">Login</Link></p>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default UserSignup
