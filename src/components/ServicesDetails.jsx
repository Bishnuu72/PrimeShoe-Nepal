import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import ServicesContext from '../Context/ServicesContext';

const ServicesDetails = () => {
    const params = useParams();
    const {servicetitle} = params;
    const services = useContext(ServicesContext);
    const servicesData = services.find((service) => service.title === servicetitle);
    if(!servicesData) {
        return <div className="container"><p>Services Not Found!</p></div>
    }

  return (
    <div className='service-details fcb-font'>
    <div className='container'>
      <div className="row">
        <div className="col-md-6">
            <h3>{servicetitle}</h3>
            <p>{servicesData.description}</p>
            <li>{servicesData.point1}</li>
            <li>{servicesData.point2}</li>
            <li>{servicesData.point3}</li>
            <li>{servicesData.point4}</li>
        </div>
        <div className="col-md-6">
            <div className="service-img">
                <img src={servicesData.img} alt={servicetitle} />
            </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ServicesDetails
