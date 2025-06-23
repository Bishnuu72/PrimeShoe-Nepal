import React from 'react';
import img1 from "../assets/img1.jpg";

const Card = (props) => {

  return (
    <section className={`bg-${props.mode} text-${props.cardText} card-section`}>
      <div className="container">
        <h4>Our Products</h4>
        <div className="row top-row">
            <div className="col-md-4">
                <div className="card">
                    <img src={img1} alt="sports image" />
                    <div className={`bg-${props.mode} text-${props.cardText} card-details`}>
                        <h4 className="title">Product-Name</h4>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos nihil officia blanditiis reprehenderit pariatur ipsum qui, possimus ad, nostrum saepe animi, commodi ex sapiente ullam quasi natus suscipit neque! Libero!</p>
                        <button onClick={props.cartToggleMode} className="card-btn">{props.cartMode}</button>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card">
                    <img src={img1} alt="sports image" />
                    <div className={`bg-${props.mode} text-${props.cardText} card-details`}>
                        <h4 className="title">Product-Name</h4>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos nihil officia blanditiis reprehenderit pariatur ipsum qui, possimus ad, nostrum saepe animi, commodi ex sapiente ullam quasi natus suscipit neque! Libero!</p>
                        <button onClick={props.cartToggleMode} className="card-btn">{props.cartMode}</button>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card">
                    <img src={img1} alt="sports image" />
                    <div className={`bg-${props.mode} text-${props.cardText} card-details`}>
                        <h4 className="title">Product-Name</h4>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos nihil officia blanditiis reprehenderit pariatur ipsum qui, possimus ad, nostrum saepe animi, commodi ex sapiente ullam quasi natus suscipit neque! Libero!</p>
                        <button onClick={props.cartToggleMode} className="card-btn">{props.cartMode}</button>
                    </div>
                </div>
            </div>
            </div>
            
            <div className="row">
            <div className="col-md-4">
                <div className="card">
                    <img src={img1} alt="sports image" />
                    <div className={`bg-${props.mode} text-${props.cardText} card-details`}>
                        <h4 className="title">Card-Name</h4>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos nihil officia blanditiis reprehenderit pariatur ipsum qui, possimus ad, nostrum saepe animi, commodi ex sapiente ullam quasi natus suscipit neque! Libero!</p>
                        <button className="card-btn">Add to Cart</button>
                    </div>
                    
                </div>
            </div>
            <div className="col-md-4">
                <div className="card">
                    <img src={img1} alt="sports image" />
                    <div className={`bg-${props.mode} text-${props.cardText} card-details`}>
                        <h4 className="title">Card-Name</h4>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos nihil officia blanditiis reprehenderit pariatur ipsum qui, possimus ad, nostrum saepe animi, commodi ex sapiente ullam quasi natus suscipit neque! Libero!</p>
                        <button className="card-btn">Add to Cart</button>
                    </div>
                    
                </div>
            </div>
            <div className="col-md-4">
                <div className="card">
                    <img src={img1} alt="sports image" />
                    <div className={`bg-${props.mode} text-${props.cardText} card-details`}>
                        <h4 className="title">Card-Name</h4>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos nihil officia blanditiis reprehenderit pariatur ipsum qui, possimus ad, nostrum saepe animi, commodi ex sapiente ullam quasi natus suscipit neque! Libero!</p>
                        <button className="card-btn">Add to Cart</button>
                    </div>
                    
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Card
