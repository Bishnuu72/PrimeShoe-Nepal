import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Home from "./components/Home.jsx";

import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Product from './components/Product.jsx';
import About from './components/About.jsx';
import Blog from './components/Blog.jsx';
import Contact from './components/Contact.jsx';
import News from './components/News.jsx';
import UserList from './components/UserList.jsx';
import UserDetails from './components/UserDetails.jsx';
import ProductState from './Context/ProductState.jsx';
import UserSignup from './components/UserRegistration/UserSignup.jsx';
import UserLogin from './components/UserRegistration/UserLogin.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import Services from './components/Services.jsx';
import ServicesDetails from './components/ServicesDetails.jsx';
import ServicesData from './Context/ServicesData.jsx';
import Footer from './components/Footer.jsx';
import CartItems from './components/CartItems.jsx';
import AddProduct from './components/AddProduct.jsx';
import CompanyForm from './components/CompanyForm.jsx';
import Blog1 from './components/Blog1.jsx';
import Dogs from './components/Dogs.jsx';
import Cats from './components/Cats.jsx';

function App() {
  const [mode, setMode] = useState("light");
  const [text, setText] = useState(<i className="fa-solid fa-moon"></i>);
  const [alert, setAlert] = useState(null);
  const [cardText, setCardText] = useState("dark");
  const [textColor, setTextColor] = useState("light");
  const [secColor, setSecColor] = useState("white");
  const [loginText, setLoginText] = useState("Notify");
  const [loginMode, setLoginMode] = useState("dark");
  const [cartMode, setCartMode] = useState("Add to cart");

  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      setText(<i class="fa-solid fa-moon"></i>);
      showAlert("Light Mode has been enabled", "success");
      setCardText("dark");
      setLoginMode("dark");
      setTextColor("light");
      setSecColor("white");
    }else {
      setMode("dark");
      setText(<i class="fa-solid fa-sun"></i>);
      showAlert("Dark Mode has been enabled", "success");
      setCardText("light");
      setLoginMode("light");
      setTextColor("success");
      setSecColor("secondary");
    }
  };

  const loginToggleMode = () => {
    if (loginText === "Notify") {
      setLoginText("Done");
     toast("Notify Successfully!"); 
    }else {
      setLoginText("Notify");
      toast("Done Successfully!");
    }
  };

  const cartToggleMode = () => {
    if(cartMode === "Add to cart") {
      setCartMode("Added to cart");
      toast("Product added to Cart successfully!");
    }else {
      setCartMode("Add to cart");
      toast("Product removed from Cart");
    }
  }

  const showAlert =(message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  }

  let title = "PrimeShoe NP"; //passing props

  const notify = () => toast("Form submitted successfully!");

  return (
    <>
    <ProductState>
    <Router>
      <Navbar title = {title} mode={mode} text={text} toggleMode={toggleMode} loginToggleMode={loginToggleMode} loginText={loginText} loginMode={loginMode} />
      <Alert alert={alert} />
      <ToastContainer notify={notify} />
    {/* <button onClick={notify}>Toastify</button> */}
      
      <ServicesData>
        <Routes>
          <Route path="/" element={<Home mode={mode} cardText={cardText} cartToggleMode={cartToggleMode} cartMode={cartMode} notify={notify} />} />
          <Route path="/products" element={<Product mode={mode} cardText={cardText} cartToggleMode={cartToggleMode} cartMode={cartMode} />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About mode={mode} cardText={cardText} />} />
          <Route path="/blog" element={<Blog mode={mode} cardText={cardText} />} />
          <Route path="/contact" element={<Contact mode={mode} cardText={cardText} textColor={textColor} secColor={secColor} />} />
          <Route path="/news" element={<News mode={mode} cardText={cardText} />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/:id/:username/:age" element={<UserDetails />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/product/:itemname" element={<ProductDetails />} />
          <Route path="/service/:servicetitle" element={<ServicesDetails />} />
          <Route path="/cartitems" element={<CartItems />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/companyform" element={<CompanyForm />} />
          <Route path="/blog1" element={<Blog1 />} />
          <Route path="/dogs" element={<Dogs />} />
          <Route path="/cats" element={<Cats />} />
      </Routes>
      </ServicesData>
      <Footer mode={mode} cardText={cardText} />
    </Router>
    </ProductState>
    </>
  )
}

export default App
