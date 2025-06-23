import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ProductContext from '../Context/ProductContext'

const Navbar = ({title, mode, toggleMode, text, loginToggleMode, loginText, loginMode}) => {
  const context = useContext(ProductContext);
  const { state:{cart}} = context;
  console.log("Navbar-Cart", cart);
  return (
    <div>
    <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode} py-3`}>
    <div className="container-fluid">
    {/* <Link className="navbar-brand" to="/"><img src="/NamastePawsLogo.jpg" alt="Namaste Paws" style={{ height: '80px' }} /></Link> */}
    <Link className="navbar-brand" to="/"><i className="fa-solid fa-paw me-2"></i> {title}</Link>
    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    </button> */}

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        <li className="nav-item mx-2">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item mx-2">
          <Link className="nav-link" to="/products">Products</Link>
        </li>
        <li className="nav-item mx-2">
          <Link className="nav-link" to="/services">Services</Link>
        </li>
        <li className="nav-item mx-2">
          <Link className="nav-link" to="news">News</Link>
        </li>
        <li className="nav-item mx-2">
          <Link className="nav-link" to="/blog">Blogs</Link>
        </li>
        <li className="nav-item mx-2">
          <Link className="nav-link" to="/about">About Us</Link>
        </li>
        <li className="nav-item mx-2">
          <Link className="nav-link" to="/contact">Contact Us</Link>
        </li>
        <li className="nav-item mx-2 dropdown">
          <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Category
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" to="/dogs">Dogs</Link></li>
            <li><Link className="dropdown-item" to="/cats">Cats</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" to="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
      <Link to="/cartitems">
      <button type="button" className={`btn btn-primary mx-3 position-relative bg-${mode} text-${loginMode} pet-cart`}>
        <i className="fa-solid fa-cart-shopping"></i>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {cart.length}
          <span className="visually-hidden">unread messages</span>
        </span>
      </button>
      </Link>
      <button onClick={toggleMode} className={`btn mode-btn text-${loginMode}`}>{text}</button>
      <button type='button' onClick={loginToggleMode} className={`btn notify-btn text-${loginMode}`}>{loginText}</button>
      <Link className={`auth-btn text-${loginMode}`} to="/signup">Sign Up</Link>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
