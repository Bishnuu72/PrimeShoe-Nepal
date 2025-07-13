import React, { useContext, useState, useEffect } from 'react';
import ProductContext from '../Context/ProductContext';
import { MdDelete } from "react-icons/md";

const CartItems = ({mode, cardText, secColor}) => {
  // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const context = useContext(ProductContext);
  const { state: { cart }, dispatch } = context;

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setSelectAll(selectedItems.length === cart.length && cart.length > 0);
  }, [selectedItems, cart]);

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedItems(newSelectAll ? cart.map(item => item._id) : []);
  };

  const toggleSelectItem = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = () => {
    selectedItems.forEach(id => {
      const itemToRemove = cart.find(item => item._id === id);
      if (itemToRemove) {
        dispatch({ type: "REMOVE_FROM_CART", payload: itemToRemove });
      }
    });
    setSelectedItems([]);
    setSelectAll(false);
  };

  const grandTotal = selectedItems.reduce((acc, id) => {
    const item = cart.find(p => p._id === id);
    return item ? acc + item.price * item.qty : acc;
  }, 0);

  return (
    <div className={`cart-items fcb-font bg-${mode} text-${cardText}`}>
      <div className="container pt-5">
        <div className="productcontainer-cart">
          {cart.length === 0 ? (
            <div className="alert alert-info cart-empty" role="alert">
              <p>No items in the cart</p>
            </div>
          ) : (
            <>
              <h3>My Shoes Cart</h3>
              <p className={`head-p text-${cardText}`}>
                I have <span className="cart-p">{cart.length}</span> shoes in my Cart
              </p>

              <div className="row">
                <div className="col-md-1 cart-checkbox">
                  <div className="cart-title">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                    />
                  </div>
                  <div className="cart-title">
                    <MdDelete
                      className='cart-cb'
                      style={{ cursor: 'pointer' }}
                      onClick={handleDeleteSelected}
                    />
                  </div>
                </div>
                <div className="col-md-2 cart-title">Shoes Photos</div>
                <div className="col-md-3 cart-title">Shoes Details</div>
                <div className="col-md-2 cart-title">Stock</div>
                <div className="col-md-1 cart-title">Rate</div>
                <div className="col-md-1 cart-title">QTY</div>
                <div className="col-md-1 cart-title">Remove</div>
                <div className="col-md-1 cart-title">Total</div>
              </div>
              <hr />

              <ul className="product-list">
                {cart.map((item) => (
                  <li key={item._id}>
                    <div className="row align-items-center">
                      <div className="col-md-1 cart-title">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item._id)}
                          onChange={() => toggleSelectItem(item._id)}
                        />
                      </div>
                      <div className="col-md-2 mb-3 cart-img">
                        <img
                          src={item.image?.[0] ? `http://localhost:5000/uploads/${item.image[0]}` : "/imagenotfind.jpg"}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          alt={item.name}
                        />
                      </div>
                      <div className="col-md-3">
                        <h5>{item.name}</h5>
                        <p><b>Color:</b> {item.color}</p>
                        <h6>Rs. {item.price}</h6>
                      </div>
                      <div className="col-md-2">
                        <li>Instock - ({item.instock} pcs)</li>
                      </div>
                      <div className="col-md-1">
                        <h6>Rs. {item.price}</h6>
                      </div>
                      <div className="col-md-1">
                        <select
                          value={item.qty}
                          onChange={(e) => dispatch({
                            type: "UPDATE_CART_ITEM",
                            payload: { _id: item._id, qty: Number(e.target.value) },
                          })}
                          className='form-control cart-amt'
                        >
                          {[...Array(item.instock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-1">
                        <button
                          className="btn btn-danger"
                          onClick={() => dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: item,
                          })}
                        >
                          <MdDelete className='cart-del-icon' />
                        </button>
                      </div>
                      <div className="col-md-1">
                        Rs. {item.price * item.qty}
                      </div>
                    </div>
                    <hr />
                  </li>
                ))}
              </ul>

              <div className="grand-summary d-flex justify-content-between align-items-center">
                <h5 className="m-0">
                  Grand Total (Selected): <span className='text-success'>Rs. {grandTotal}</span> /-
                </h5>
                <button
                  className="btn btn-primary cart-checkout"
                  disabled={selectedItems.length === 0}
                >
                  Proceed To Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
