import React, {useContext, useEffect} from 'react';
import Card from './Card';
import ProductContext from '../Context/ProductContext';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';


const ProductHome = ({mode, cardText, cartToggleMode, cartMode}) => {
  const navigate = useNavigate();
  const context = useContext(ProductContext);
  const { product, state:{cart, products}, dispatch, count, news, fetchData } = context;
  console.log("products:", product);
  console.log("products:", products);
  console.log("cart", cart);
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleProducts = (itemId, itemName, price) => {
    console.log("You clicked", itemName);
    navigate(`/product/${itemName}`);
  }
  return (
    <>
    <div className="product-details">
      <div className="container">
      <div className="row">
      {product.map((item) => {
        return(
          <div key={item._id} className="col-md-3">
        <div className="card">
          <img onClick={()=>handleProducts(item._id, item.name)} src={item.img} className="card-img-top" alt={item.img}/>
          <div className="card-body">
            <h5 className="card-title" onClick={()=>handleProducts(item._id, item.name)}>{item.name}</h5>
            <p className="card-text" onClick={()=>handleProducts(item._id, item.name)}>{item.description}</p>
            <a href="#" className="btn btn-primary" onClick={()=>dispatch({
              type: "ADD_TO_CART",
              payload: item,
            })}>Add To Cart</a>
          </div>
      </div>
      </div>
        )
      })
        }
      </div>
    </div>
    </div>
    {/* <Card mode={mode} cardText={cardText} cartToggleMode={cartToggleMode} cartMode={cartMode}/> */}
    </>
  );
};

export default ProductHome
