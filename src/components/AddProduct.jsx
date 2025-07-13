import React from 'react';
import axios from 'axios';

const AddProduct = () => {
    // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [product, setProduct] = React.useState({
        name: "",
        description: "",
        price: "",
        instock: "",
        image: "",
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("instock", product.instock);
        if(product.image){
            formData.append("image", product.image);
        }

        try {
            const response = await axios.post(`https://primeshoe-nepal.onrender.com/api/product/addproduct`, formData, {
                headers: {
                    "auth-token": localStorage.getItem("token"),
                }
            });

            if (response.data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Product Added',
                    text: 'Your product was added successfully!',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
                setProduct({ name: "", description: "", price: "", instock: "", image: "" }); // reset form
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong while adding the product.',
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Failed to connect to the server.',
            });
        }
    };

    const handleChange = (e) => {
        if (e.target.type === "file") {
            setProduct({
                ...product,
                [e.target.name]: e.target.files[0],
            });
        } else {
            setProduct({
                ...product,
                [e.target.name]: e.target.value
            });
        }
    };

    return (
        <div className="addproduct-details fcb-font">
            <div className="container">
                <h4 className='addproduct-title'>Add Product</h4>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" name='name'
                                    value={product.name} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type="text" className="form-control" id="description" name='description'
                                    value={product.description} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="number" className="form-control" id="price" name='price'
                                    value={product.price} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="instock" className="form-label">Instock</label>
                                <input type="number" className="form-control" id="instock" name='instock'
                                    value={product.instock} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Image</label>
                                <input type="file" className="form-control" id="image" name='image'
                                    onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-primary add-product-btn">Add</button>
                        </form>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct;
