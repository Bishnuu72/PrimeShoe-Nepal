import React from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [product, setProduct] = React.useState({
        name: "",
        description: "",
        price: "",
        instock: "",
        image: "",
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("Form submit")
        const formData = new FormData();
        formData.append("Name", product.name);
        formData.append("Description", product.description);
        formData.append("Price", product.price);
        formData.append("InStock", product.instock);
        // formData.append("Image of Form:", product.image);
        if(product.image){
            formData.append("image", product.image);
        }
        try {
            const response = axios.post("http://localhost:5000/api/product/addproduct", formData,{
                headers: {
                    // "content-Type" : "multipart/form-data",
                    "auth-token" : localStorage.getItem("token"),
                }
            });
            const data = await response.json();
            console.log("Post data",data);
            if (response) {
                alert("Product Added Successfully!");
            } else {
                alert("Error");
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    const handleChange = (e) => {
        if (e.target.type == "file") {
            setProduct({
                ...product,
                [e.target.name] : e.target.files[0],
            });
            console.log("Upload file", e.target.files[0]);
        } else {
            setProduct({
                ...product,
                [e.target.name] : e.target.value
            });
        }
    };

  return (
    <>
        <div className="addproduct-details">
            <div className="container">
                <h4 className='addproduct-title'>Add Product</h4>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" 
                                        className="form-control" 
                                        id="name" 
                                        name='name' 
                                        value={product.name} 
                                        onChange={handleChange}
                                        aria-describedby="emailHelp"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type="text" 
                                        className="form-control" 
                                        id="description" 
                                        name='description' 
                                        value={product.description} 
                                        onChange={handleChange}
                                        aria-describedby="emailHelp"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="text" 
                                        className="form-control" 
                                        id="price" 
                                        name='price' 
                                        value={product.price} 
                                        onChange={handleChange}
                                        aria-describedby="emailHelp"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Image</label>
                                <input type="file"                                        
                                        multiple
                                        className="form-control" 
                                        id="image"
                                        name='image'  
                                        onChange={handleChange}
                                        aria-describedby=""/>
                            </div>
                            <button type="submit" className="btn btn-primary">Add</button>
                        </form>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </div>
    </>
  )
}

export default AddProduct
