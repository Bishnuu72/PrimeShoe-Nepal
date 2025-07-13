import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import ProductContext from '../Context/ProductContext';

const ProductDetails = ({mode, cardText}) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const params = useParams();
    const {itemname} = params;
    const {product} = useContext(ProductContext);
    const items = product.find((item) => item.name === itemname);
    if(!items) {
      return <div className="container fcb-font"><p>Product Not Found!</p></div>;
    }
  return (
    <>
      <div className={`productdetails-page fcb-font bg-${mode} text-${cardText}`}>
        <div className='container'>
          <div className="row">
            <div className="col-md-6">
              <div className="pd-details">
                <h3> {items.name}</h3>
                <p>{items.description}</p>
                <p>
                  <b>Color:</b> {items.color}
                </p>
                <p>{items.intro}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="pd-img">
                <img src={items.image?.[0] ? `${BACKEND_URL}/uploads/${items.image[0]}` : "/imagenotfound.jpg"} alt={items.image} />
              </div>
            </div>
          </div>
      </div>
      </div>
    </>
  )
}

export default ProductDetails
