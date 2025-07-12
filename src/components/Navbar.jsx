import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductContext from '../Context/ProductContext';
import { toast } from 'react-toastify';

const Navbar = ({ title, mode, toggleMode, text, loginToggleMode, loginText, loginMode }) => {
  const context = useContext(ProductContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showCategory, setShowCategory] = useState(false); // NEW

  const { state: { cart } } = context;

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`)
    } else {
      alert("Product Not Found");
      navigate("/");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    toast.success("You have logged out successfully!");
    navigate('/');
  };

  return (
    <div className={`bg-${mode} shadow-sm fcb-font`}>
      {/* Top Row */}
      <div className="container-fluid py-2 px-4 d-flex justify-content-between align-items-center border-bottom">
        {/* Left - Brand */}
        <Link className={`navbar-brand fs-4 fw-bold text-${loginMode}`} to="/">
          <i className="fa-solid fa-shoe-prints me-2"></i>{title}
        </Link>

        {/* Center - Search with hamburger */}
        <div className="d-flex align-items-center flex-grow-1 mx-3" style={{ maxWidth: "700px" }}>
          {/* Hamburger Category Icon */}
          <div className="dropdown me-2">
            <button
              className={`btn btn-outline-${loginMode} dropdown-toggle`}
              type="button"
              id="categoryDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
              <li><Link className="dropdown-item" to="/category/nike">Nike</Link></li>
              <li><Link className="dropdown-item" to="/category/puma">Puma</Link></li>
              <li><Link className="dropdown-item" to="/category/adidas">Adidas</Link></li>
              <li><Link className="dropdown-item" to="/category/reebok">Reebok</Link></li>
              <li><Link className="dropdown-item" to="/category/converse">Converse</Link></li>
            </ul>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="d-flex flex-grow-1">
            <input
              className="form-control me-2"
              type="search"
              name="searchQuery"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for products..."
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>

        {/* Right - Buttons */}
        <div className="d-flex align-items-center gap-3">

          {/* Cart Button */}
          <Link to="/cartitems">
            <button type="button" className={`btn btn-outline-${loginMode} position-relative`}>
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
              </span>
            </button>
          </Link>

          {/* Theme Toggle Button */}
          <button onClick={toggleMode} className={`btn btn-outline-${loginMode}`}>
            {text}
          </button>

          {/* Auth Buttons */}
          {localStorage.getItem('token') ? (
            <button className={`btn btn-outline-${loginMode}`} onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/signup">
              <button className={`btn btn-outline-${loginMode}`}>Sign Up</button>
            </Link>
          )}

          {/* Profile Icon */}
          <button 
            className={`btn btn-outline-${loginMode}`} 
            onClick={() => {
              const token = localStorage.getItem("token");
              if (token) {
                navigate("/profile");
              } else {
                toast.warn("Please log in to view your profile!");
                navigate("/login");
              }
            }}
          >
            <i className="fa-solid fa-user"></i>
          </button>

        </div>
      </div>

      {/* Bottom Row - Navigation */}
      <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode} nav-bar`}>
        <div className="container justify-content-center">
          <div className="collapse navbar-collapse show justify-content-center">
            <ul className="navbar-nav mb-2 mb-lg-0 d-flex justify-content-center">
              <li className="nav-item mx-3">
                <Link 
                  className="nav-link nav-link-underline" 
                  to="/">Home
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link 
                  className="nav-link nav-link-underline" 
                  to="/products">Products
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link 
                  className="nav-link nav-link-underline" 
                  to="/services">Services
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link 
                  className="nav-link nav-link-underline" 
                  to="/news">News
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link 
                  className="nav-link nav-link-underline" 
                  to="/blog">Blogs
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link 
                  className="nav-link nav-link-underline" 
                  to="/faq-section">FAQs
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link 
                  className="nav-link nav-link-underline" 
                  to="/about">About Us
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link 
                  className="nav-link nav-link-underline" 
                  to="/contact">Contact Us
                </Link>
              </li>
              <li className="nav-item mx-3 dropdown">
                <Link 
                  className="nav-link dropdown-toggle nav-link-underline" 
                  to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Category
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/dogs">Dogs</Link></li>
                  <li><Link className="dropdown-item" to="/cats">Cats</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <hr style={{ margin: 0, borderTop: `2px solid ${mode === 'light' ? '#ccc' : '#fff'}` }} /> */}
    </div>
  );
};

export default Navbar;
