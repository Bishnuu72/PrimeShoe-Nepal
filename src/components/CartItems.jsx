import React, { useContext } from 'react'
import ProductContext from '../Context/ProductContext';
import { MdDelete } from "react-icons/md";

const CartItems = () => {
    const context = useContext(ProductContext);
    const { state:{cart}, dispatch} = context;
    const grandTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  return (
    <>
    <div className='cart-items'>
        <div className="container mt-5">
            <div className="productcontainer-cart">
                {cart.length === 0 ? (
                    <div className="alert alert-info cart-empty" role="alert">
                        <p>No items in the cart</p>
                    </div>
                    ) : (
                    <>
                        <h3>My Shoes Cart</h3>
                        <p className='head-p'>I have <span className="cart-p">{cart.length}</span> shoes in my Cart</p>
                        <div className="row">
                            <div className="col-md-1 cart-checkbox">
                                <div className="cart-title"><input type="checkbox" /></div>
                                <div className="cart-title"><MdDelete className='cart-cb' /></div>
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
                            {cart?.map((item) => (
                                <li key={item._id}>
                                    <div className="row">
                                        <div className="col-md-1 cart-title"><input type="checkbox" /></div>
                                        <div className="col-md-2 mb-3 cart-img">
                                            <img src={item.image?.[0] ? `http://localhost:5000/uploads/${item.image[0]}` : "/imagenotfind.jpg"} style={{width:"100%", height:"100%"}} alt={item.name} />
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
                                            <select value={item.qty}
                                            onChange={(e) => dispatch({
                                                type: "UPDATE_CART_ITEM",
                                                payload: { _id: item._id, qty: e.target.value},
                                            })}
                                            className='form-control cart-amt'
                                            >
                                                {[...Array(item.instock).keys()].map((x) => (
                                                    <option key={x+1} value={x+1}>
                                                        {x+1}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>
                                        <div className="col-md-1">
                                            <button className="btn btn-danger"
                                            onClick={() => dispatch({
                                                type: "REMOVE_FROM_CART",
                                                payload: item,
                                            })}>
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
                        <div className="grand-summary">
                            {/* <div className="total-title">Total Items: {cart.length}</div> */}
                            <h4>Grand Total: {grandTotal} /-</h4>
                            <button className="btn btn-primary cart-checkout">Proceed To Checkout</button>
                        </div>
                    </>
                )}
                
            </div>
            
        </div>
    </div>
    </>
  )
}

export default CartItems
