import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductContext from '../Context/ProductContext';

const SearchResult = ({ mode, cardText, cartToggleMode, cartMode }) => {
  // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { searchQuery } = useParams();
  const context = useContext(ProductContext);

  const { state: { cart }, allProduct, product, dispatch } = context;

  useEffect(() => {
    allProduct(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (product.length === 0) {
      Swal.fire({
        title: 'Products Not Found',
        text: `No results for "${searchQuery}"`,
        icon: 'warning',
        confirmButtonText: 'OK',
        customClass: {
        title: 'fcb-font',
        popup: 'fcb-font',
        htmlContainer: 'fcb-font',
        confirmButton: 'fcb-font',
        cancelButton: 'fcb-font'
      }
      });
    }
  }, [product, searchQuery]);

  const handleProducts = (id, name) => {
    console.log(`Clicked on ${name} with id ${id}`);
  };

  return (
    <div className={`product-details bg-${mode} text-${cardText} fcb-font`}>
      <div className="container">
        <div className="row">
          {product.length === 0 ? (
            <div className="text-center my-5">
              <h4>No Products Found for "<span className="text-warning">{searchQuery}</span>"</h4>
            </div>
          ) : (
            product.map((item) => (
              <div key={item._id} className="col-md-3 mb-4">
                <div className="card product-cards">
                  <img
                    onClick={() => handleProducts(item._id, item.name)}
                    src={
                      item.image?.[0]
                        ? `https://primeshoe-nepal.onrender.com/uploads/${item.image[0]}`
                        : '/imagenotfound.jpg'
                    }
                    className="card-img-top"
                    alt="Product"
                  />
                  <div className={`card-body bg-${mode} text-${cardText}`}>
                    <h5 className="card-title" onClick={() => handleProducts(item._id, item.name)}>
                      {item.name}
                    </h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">Price: {item.price} /-</p>

                    {cart && cart.some((p) => p._id === item._id) ? (
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          dispatch({ type: 'REMOVE_FROM_CART', payload: item })
                        }
                      >
                        Remove From Cart
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          dispatch({ type: 'ADD_TO_CART', payload: item })
                        }
                      >
                        Add To Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
