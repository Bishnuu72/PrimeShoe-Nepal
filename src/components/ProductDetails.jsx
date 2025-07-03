import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import ProductContext from '../Context/ProductContext';

const ProductDetails = () => {
    const params = useParams();
    const {itemname} = params;
    const {product} = useContext(ProductContext);
    const items = product.find((item) => item.name === itemname);
    if(!items) {
      return <div className="container"><p>Product Not Found!</p></div>;
    }
  return (
    <>
      <div className="productdetails-page">
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
                <img src={items.image?.[0] ? `http://localhost:5000/uploads/${items.image[0]}` : "/imagenotfound.jpg"} alt={items.image} />
              </div>
            </div>
          </div>
      </div>
      </div>
    </>
  )
}

export default ProductDetails
