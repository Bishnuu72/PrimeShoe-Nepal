import React from 'react';
import bishnu from "../assets/bishnu.jpg";
import shoes from "../assets/about-two.jpg";

const AboutContent = (props) => {
  return (
    <div>
      <div className={`about-one bg-${props.mode} text-${props.cardText}`}>
        <div className="container">
            <div className="row">
                <div className="col-md-7">
                    <div className="about1-details">
                        <div className={`about1-title bg-${props.mode} text-${props.cardText}`}>
                            <h3>PrimeShoe Nepal Story</h3>

                            <p>Welcome to Prime Shoe – your trusted destination for quality footwear. Whether you’re into sneakers, formal shoes, or sports cleats, we bring you the finest selection to match your style, comfort, and confidence.</p>
                            <p>Founded in 2025 by a passionate team of fashion-forward thinkers, Prime Shoe was built on the idea that great shoes create powerful first impressions. What began as a small idea turned into a mission to deliver stylish, durable, and affordable footwear for everyone.</p>
                            <p>From everyday sneakers to elegant formal shoes, athletic football boots to casual wear, we offer carefully curated collections made with quality, comfort, and style in mind.</p>

                            <p>Our mission is to make stylish, high-quality shoes accessible to everyone. Our vision is to become a leading online footwear destination that blends trend with trust.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="about1-img">
                        <img src={bishnu} alt="Founder Image" />
                        <h5 className="img-name">Bishnu Kumar Yadav</h5>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="about2-img">
                        <img src={shoes} alt="pet-doctorize" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="about2-details">
                        <div className="about2-title">
                            <h3>Why Choose Us ?</h3>
                        </div>
                        <p>
                            <li>High-quality, handpicked collections</li>
                            <li>Affordable prices with frequent discounts</li>
                            <li>Fast shipping and easy returns</li>
                            <li>Responsive customer support</li>
                            <li>Responsive customer support</li>
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AboutContent
