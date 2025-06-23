import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import ServicesContext from '../Context/ServicesContext';


const ServicesHome = () => {
  const navigate = useNavigate();
  const services = useContext(ServicesContext);
  console.log("data from servicessss:",services);

  const handleServices = (serviceId, serviceTitle) => {
    // console.log("you clicked ", serviceTitle);
    navigate(`/service/${serviceTitle}`);
  }


  return (
    <div>
      <div className="services-details">
        <div className="container">
          <h3>Our Services</h3>
          <p>At Namaste Paws, we believe every pet deserves love, care, and attention. Our mission is to provide top-notch services <br />that ensure your furry friends are happy, healthy, and well-groomed.</p>
          <div className="row">
            {services.map((service) =>{
              return(
                <>
              <div key={service._id} className="col-md-3" onClick={() =>handleServices(service._id, service.title)}>
              <div className="services-icon">
                <i className={service.icon}></i> <p>{service.title}</p>
              </div>
              </div>
            </>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesHome
