import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductContext from '../Context/ProductContext';

const SearchResult = ({mode, cardText, cartToggleMode, cartMode}) => {
    const {searchQuery} = useParams();
    const context = useContext(ProductContext);

    const {state:{cart}, allProduct, product, dispatch} = context;
    console.log("all products search", product)

    useEffect(() => {
        allProduct(searchQuery)
    }, [searchQuery]);
  return (
    <div>
        <div className={`product-details bg-${mode} text-${cardText}`}>
            <div className="container">
              <div className="row">
              {product.map((item) => {
                return(
                  <div key={item._id} className="col-md-3">
                  <div className="card product-cards">
                  <img onClick={()=>handleProducts(item._id, item.name)} src={item.image?.[0] ? `http://localhost:5000/uploads/${item.image[0]}` : "/imagenotfound.jpg"} className="card-img-top" alt="Product Image"/>
                  <div className={`card-body bg-${mode} text-${cardText}`}>
                    <div className="title-content">
                      <h5 className="card-title" onClick={()=>handleProducts(item._id, item.name)}>{item.name}</h5>
                    </div>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">Price: {item.price} /-</p>
        
                    {/* Ternary Operator */}
                    {cart && cart.some((p) => p._id === item._id) ? (
                      <button href="#" className="btn btn-danger" onClick={()=>dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: item,
                    })}>Remove From Cart</button>
                    ) : (
                      <button href="#" className="btn btn-primary" onClick={()=>dispatch({
                      type: "ADD_TO_CART",
                      payload: item,
                    })}>Add To Cart</button>
                    )}
                    
        
                  </div>
              </div>
              </div>
                )
              })
                }
              </div>
            </div>
        </div>
    </div>
  )
}

export default SearchResult
