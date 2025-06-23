import React, { useState } from 'react'

const EditProductModal = ({product, onClose, onSave}) => {
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
    instock: product.instock,
    lifeSpan: product.lifeSpan
  });

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name] : e.target.value,
    });
  }

  return (
    <>
    <div className="modal-backdrop fade show"></div>
    <div className="modal open" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{display: "block"}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Edit Product
            </h5>
            <button className='btn-close' data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input 
                  type="text" 
                  className="form-control" 
                  id="name"
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea 
                  type="text" 
                  className="form-control" 
                  id="description"
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="lifeSpan" className="form-label">Life Span</label>
                  <input 
                  type="text" 
                  className="form-control" 
                  id="lifeSpan"
                  name='lifeSpan'
                  value={formData.lifeSpan}
                  onChange={handleChange}
                  aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price</label>
                  <input 
                  type="number" 
                  className="form-control" 
                  id="price"
                  name='price'
                  value={formData.price}
                  onChange={handleChange}
                  aria-describedby="emailHelp"/>
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={() => onSave(formData)}>Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default EditProductModal
