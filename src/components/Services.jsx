import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import ServicesContext from '../Context/ServicesContext';
import Footer from './Footer';


const Services = (props) => {
  const navigate = useNavigate();
  const services = useContext(ServicesContext);
  console.log("data from servicessss:",services);

  const handleServices = (serviceId, serviceTitle) => {
    // console.log("you clicked ", serviceTitle);
    navigate(`/service/${serviceTitle}`);
  }


  return (
    <div>
      <div className={`services-details bg-${props.mode} text-${props.cardText}`}>
        <div className="container">
          <h3>Our Services</h3>
          <p>At Prime Shoe Nepal, we don't just sell shoes — we deliver a complete footwear experience. Here's what makes our services stand out:</p>
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

export default Services
