import React, { useContext, useEffect, useRef, useState } from 'react';
import ProductContext from '../Context/ProductContext';
import { useNavigate, useParams } from 'react-router-dom';
import { BsThreeDots } from "react-icons/bs";
import EditProductModal from './EditProductModal';

const Product = ({ mode, cardText, cartToggleMode, cartMode }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const context = useContext(ProductContext);
  const params = useParams();
  const { searchQuery } = params;

  const {
    product,
    state: { cart, products },
    dispatch,
    allProduct,
    editProduct,
    deleteProduct
  } = context;

  const [menuVisible, setMenuVisible] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const menuRef = useRef(null);

  const toggleMenu = (id) => {
    setMenuVisible((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const closeEditModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const saveEdit = (updateData) => {
    editProduct(selectedProduct._id, updateData);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleProducts = (itemId, itemName) => {
    navigate(`/product/${itemName}`);
  };

  useEffect(() => {
    allProduct(searchQuery);
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible({});
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='fcb-font'>
      <div className={`product-details bg-${mode} text-${cardText}`}>
        <div className="container">
          <div className="row">
            {product.map((item) => (
              <div key={item._id} className="col-md-3 mb-4">
                <div className="card product-cards h-100">
                  <img
                    onClick={() => handleProducts(item._id, item.name)}
                    src={
                      item.image?.[0]
                        ? `${BACKEND_URL}/uploads/${item.image[0]}`
                        : "/imagenotfound.jpg"
                    }
                    className="card-img-top"
                    alt="Product"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className={`card-body bg-${mode} text-${cardText}`}>
                    <div className="title-content position-relative d-flex justify-content-between align-items-start">
                      <h5
                        className="card-title"
                        onClick={() => handleProducts(item._id, item.name)}
                        style={{ cursor: 'pointer' }}
                      >
                        {item.name}
                      </h5>
                      {/* <BsThreeDots
                        className="three-dots-icon"
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleMenu(item._id)}
                      /> */}
                      {menuVisible[item._id] && (
                        <div
                          ref={menuRef}
                          className="menu-options position-absolute bg-light border rounded shadow-sm p-2"
                          style={{ right: 0, top: '100%', zIndex: 10 }}
                        >
                          <button
                            className="dropdown-item text-dark"
                            onClick={() => openEditModal(item)}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="dropdown-item text-danger"
                            onClick={() => handleDelete(item._id)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">Price: {item.price} /-</p>

                    <div className="d-flex gap-2">
                      {cart && cart.some((p) => p._id === item._id) ? (
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: item,
                            })
                          }
                        >
                          Remove From Cart
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            if (!localStorage.getItem("token")) {
                              navigate("/login");
                            } else {
                              dispatch({
                                type: "ADD_TO_CART",
                                payload: item,
                              });
                            }
                          }}
                        >
                          Add To Cart
                        </button>
                      )}

                      <button
                        className="btn btn-success text-white"
                        onClick={() => {
                          if (!localStorage.getItem("token")) {
                            navigate("/login");
                          } else {
                            navigate(`/checkout/${item._id}`);
                          }
                        }}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>

                {modalVisible && selectedProduct && selectedProduct._id === item._id && (
                  <EditProductModal
                    product={selectedProduct}
                    onClose={closeEditModal}
                    onSave={saveEdit}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
