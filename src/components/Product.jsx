import React, {useContext, useEffect, useState} from 'react';
import Card from './Card';
import ProductContext from '../Context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { BsThreeDots } from "react-icons/bs";
import EditProductModal from './EditProductModal';



const Product = ({mode, cardText, cartToggleMode, cartMode}) => {
  const navigate = useNavigate();
  const context = useContext(ProductContext);
  const { product, state:{cart, products}, dispatch, allProduct, editProduct, deleteProduct } = context;
  
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const toggleMenu = (id) => {
    console.log("togge menu id is:", id);
    setMenuVisible((prevState) => ({
      ...prevState, [id] : !prevState[id],
    }))
  }

  const closeEditModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  }

  const saveEdit = (updateData) => {
    console.log("Save edit Product::", updateData);
    editProduct(selectedProduct._id, updateData);
  }

  const handleDelete = (id) => {
    console.log("Delete item is", id)
    deleteProduct(id);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
    console.log("Editing product is:::", product)
  }

  useEffect(() => {
    allProduct();
  }, []);

  const handleProducts = (itemId, itemName, price) => {
    console.log("You clicked", itemName);
    navigate(`/product/${itemName}`);
  }
  return (
    <>
    <div className={`product-details bg-${mode} text-${cardText}`}>
      <div className="container">
      <div className="row">
      {product.map((item) => {
        return(
          <div key={item._id} className="col-md-3">
          <div className="card product-cards">
          <img onClick={()=>handleProducts(item._id, item.name)} src={item.img} className="card-img-top" alt={item.img}/>
          <div className={`card-body bg-${mode} text-${cardText}`}>
            <div className="title-content">
              <h5 className="card-title" onClick={()=>handleProducts(item._id, item.name)}>{item.name}</h5>
              <BsThreeDots className='three-dots-icon' onClick={()=> toggleMenu(item._id)} />
              {
                menuVisible[item._id] && (
                  <div className="menu-options">
                    <button onClick={()=> openEditModal(item)}>✏️ Edit</button>
                    <button onClick={()=> handleDelete(item._id)}>🗑️ Delete</button>
                  </div>
                )
              }

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
      { modalVisible && selectedProduct && selectedProduct._id === item._id && (
        <EditProductModal product={selectedProduct} onClose = {closeEditModal} onSave = {saveEdit} />
      )}
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

export default Product
