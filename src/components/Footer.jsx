import React from 'react'
import { Link } from 'react-router-dom'

const Footer = (props) => {
  return (
    <div className={`footer-section bg-${props.mode} text-${props.cardText}`}>
      <hr className={`footer-line text-${props.cardText}`} />
        <div className="container">
            <div className="row">
              <div className="col-md-5">
                <div className="footer1-details">
                    <Link to="/"><h3 className={`footer1-title text-${props.cardText}`}>PrimeShoe NP</h3></Link>
                    <p>Your ultimate destination for stylish, comfortable, and high-quality footwear. From trendy sneakers to classic formals and sporty football boots, we deliver premium shoes for every step you take.</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="footer2-details">
                    <h4 className="footer2-title">Subscribe</h4>
                    <div className="footer2-subscribe">
                      <input type="text" placeholder='First Name' />
                      <input type="text" placeholder='Email' />
                    </div>
                    <div className="subscribe-btn">
                      <button className="subs-btn bg-dark text-light">SUBSCRIBE</button>
                    </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="footer3-details">
                    <h4 className="footer3-title">Use Cases</h4>
                    <div className="footer3-list">
                      <li>Web-designer</li>
                      <li>Marketers</li>
                      <li>Small Business</li>
                      <li>Website Builder</li>
                    </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="footer4-details">
                  <h4 className="footer4-title">Company</h4>
                    <div className="footer4-list">
                        <li><Link to="/" className={`bg-${props.mode} text-${props.cardText}`}>Home</Link></li>
                        <li><Link to="/products" className={`bg-${props.mode} text-${props.cardText}`}>Products</Link></li>
                        <li><Link to="/blog" className={`bg-${props.mode} text-${props.cardText}`}>Blogs</Link></li>
                        <li><Link to="/about" className={`bg-${props.mode} text-${props.cardText}`}>About Us</Link></li>
                        <li><Link to="/contact" className={`bg-${props.mode} text-${props.cardText}`}>Contact Us</Link></li>
                    </div>
                </div>
              </div>
            </div>
        </div>
        <div className="copyright-details bg-dark text-light">
          <div className="container">
            <div className="copyright-section">
              <div className="footer-copyright">
                &copy; 2025 All Rights Reserved
              </div>
              <div className="footer-down">
                <li>Privacy Policy</li>
                <li>Terms of Use</li>
                <li>Sales and Refunds</li>
                <li>Legal</li>
                <li>Site Map</li>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Footer
