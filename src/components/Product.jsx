import React, { useContext, useEffect, useState } from 'react';
import ProductContext from '../Context/ProductContext';
import { useNavigate, useParams } from 'react-router-dom';
import { BsThreeDots } from "react-icons/bs";
import EditProductModal from './EditProductModal';

const Product = ({ mode, cardText, cartToggleMode, cartMode }) => {
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

  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  useEffect(() => {
    allProduct(searchQuery);
  }, [searchQuery]);

  const handleProducts = (itemId, itemName) => {
    navigate(`/product/${itemName}`);
  };

  return (
    <>
      <div className={`product-details bg-${mode} text-${cardText}`}>
        <div className="container">
          <div className="row">
            {product.map((item) => (
              <div key={item._id} className="col-md-3">
                <div className="card product-cards">
                  <img
                    onClick={() => handleProducts(item._id, item.name)}
                    src={
                      item.image?.[0]
                        ? `http://localhost:5000/uploads/${item.image[0]}`
                        : "/imagenotfound.jpg"
                    }
                    className="card-img-top"
                    alt="Product"
                  />
                  <div className={`card-body bg-${mode} text-${cardText}`}>
                    <div className="title-content">
                      <h5
                        className="card-title"
                        onClick={() => handleProducts(item._id, item.name)}
                      >
                        {item.name}
                      </h5>
                      <BsThreeDots
                        className="three-dots-icon"
                        onClick={() => toggleMenu(item._id)}
                      />
                      {menuVisible[item._id] && (
                        <div className="menu-options">
                          <button onClick={() => openEditModal(item)}>✏️ Edit</button>
                          <button onClick={() => handleDelete(item._id)}>🗑️ Delete</button>
                        </div>
                      )}
                    </div>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">Price: {item.price} /-</p>

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
    </>
  );
};

export default Product;
