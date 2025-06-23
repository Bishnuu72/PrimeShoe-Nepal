import React from 'react';

const Banner = () => {
  const bannerDetails = [
    {
      _id: 1,
      img: "/BannerImages/Banner1.jpg",
      title: "Elegant Brown Leather Oxford Shoes",
      desc: "Polished brown leather Oxford shoes with fine brogue detailing, perfect for formal occasions, business wear, and timeless sophistication.",
    },
    {
      _id: 2,
      img: "/BannerImages/Banner2.jpg",
      title: "Classic Canvas Kicks in Black & White",
      desc: "Iconic high-top sneakers styled in bold black and white, symbolizing streetwear, attitude, and timeless urban fashion appeal.",
    },
  ];
  console.log("Banner details:", bannerDetails);

  return (
    <div>
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-indicators">
    {bannerDetails.map((banner, index) => {
      return (
        <button 
      key={banner._id} 
      type="button" 
      data-bs-target="#carouselExampleCaptions" 
      data-bs-slide-to={index} 
      className={index === 0 ? "active" : ""} 
      aria-current={index === 0 ? "true" : undefined} 
      aria-label={`Slide ${index + 1}`}
      ></button>
      )
    })}
  </div>

  <div className="carousel-inner">
    {bannerDetails.map((banner, index) => {
      return (
        <div 
      key={banner._id}
      className={`carousel-item ${index === 0 ? "active" : ""}`}>
      <img src={banner.img} 
      className="d-block w-100" 
      alt={banner.title}
      />
      <div 
      className="carousel-caption d-none d-md-block banner-text">
        <h5>{banner.title}</h5>
        <p>{banner.desc}</p>
      </div>
    </div>
      )
    })}
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}

export default Banner
