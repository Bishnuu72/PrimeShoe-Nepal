import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Country, State } from 'country-state-city';
import { useNavigate } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import ProductContext from '../../Context/ProductContext';

const Profile = ({mode, cardText, secColor}) => {
  // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '', email: '', address: '', country: '', state: '', dob: '', phone: '', profileImage: ''
  });
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', address: '', country: '', state: '', dob: '', phone: ''
  });
  const [image, setImage] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);

  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);
  const [menuVisible, setMenuVisible] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const menuRef = useRef(null);
  const context = useContext(ProductContext);

  const {
    editProduct,
    deleteProduct
  } = context;

  useEffect(() => {
    setCountryList(Country.getAllCountries());

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await axios.get(`http://localhost:5000/api/auth/getuser`, {
          headers: { 'auth-token': token }
        });
        setUser(res.data);
        setFormData({
          name: res.data.name,
          email: res.data.email,
          address: res.data.address || '',
          country: res.data.country || '',
          state: res.data.state || '',
          dob: res.data.dob || '',
          phone: res.data.phone || ''
        });
        if (res.data.country) {
          const states = State.getStatesOfCountry(res.data.country);
          setStateList(states);
        }
      } catch (err) {
        Swal.fire({ icon: 'error', title: 'Fetch Error', text: 'Could not fetch user data' });
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'country') {
      const states = State.getStatesOfCountry(value);
      setStateList(states);
      setFormData(prev => ({ ...prev, state: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    Swal.fire({
      title: 'Upload Image?',
      text: `${file.name} will be used as your new profile image.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setImage(file);
        Swal.fire({ icon: 'success', title: 'Image Selected', text: 'Click "Update" to save changes.' });
      } else {
        e.target.value = '';
        setImage(null);
      }
    });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const form = new FormData();
      for (let key in formData) form.append(key, formData[key]);
      if (image) form.append('profileImage', image);

      const res = await axios.put(`http://localhost:5000/api/auth/updateuser`, form, {
        headers: {
          'auth-token': token,
          'Content-Type': 'multipart/form-data'
        }
      });

      setUser(res.data.updatedUser);
      setEditing(false);
      setImage(null);
      Swal.fire({ icon: 'success', title: 'Profile Updated', text: 'Your profile has been updated.' });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Update Failed', text: 'Something went wrong.' });
    }
  };

  const handleDeleteImage = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`http://localhost:5000/api/auth/delete-profile-image`, {}, {
        headers: { 'auth-token': token }
      });
      setUser(res.data.updatedUser);
      Swal.fire({ icon: 'success', title: 'Image Deleted', text: 'Profile image removed.' });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Delete Failed', text: 'Could not delete image.' });
    }
  };

  // ✅ Added fetchProducts function
  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/product/allproduct`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // ✅ Call it in useEffect
  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleMenu = (id) => {
    setMenuVisible((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const saveEdit = (updateData) => {
    editProduct(selectedProduct._id, updateData);
  };

  // ✅ Updated handleDelete to show alert and refresh list
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      Swal.fire({
        icon: 'success',
        title: 'Product Deleted',
        text: 'The product has been removed successfully.',
        timer: 2000,
        showConfirmButton: false,
      });
      fetchProducts(); // Refresh list
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Delete Failed',
        text: 'An error occurred while deleting the product.',
      });
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleProducts = (itemId, itemName) => {
    navigate(`/product/${itemName}`);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuVisible({});
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <div className={`container-fluid bg-dark-subtle min-vh-100 py-5 fcb-font bg-${mode} text-${cardText}`}>
      <div className="container">
        <div className={`card shadow-lg p-5 rounded-4 border-0 mb-5 bg-${mode} text-${cardText}`}>
          <div className="text-center mb-4">
            <h2 className="text-uppercase text-primary fw-bold">Personal Information</h2>
          </div>
          <div className="row g-5 align-items-start">
            <div className="col-md-4 text-center">
              {image || user.profileImage ? (
                <>
                  <div className="position-relative d-inline-block profile-img-container">
                    <img
                      src={image ? URL.createObjectURL(image) : `data:image/jpeg;base64,${user.profileImage}`}
                      alt="Profile"
                      className="img-fluid rounded-circle border border-3 shadow profile-img"
                      style={{ width: 180, height: 180, objectFit: 'cover' }}
                    />
                    <label
                      htmlFor="uploadImg"
                      className="position-absolute top-0 end-0 translate-middle badge bg-light border shadow"
                      style={{ cursor: 'pointer' }}
                      title="Update"
                    >
                      <i className="fa-solid fa-camera text-dark"></i>
                    </label>
                    <input id="uploadImg" type="file" hidden accept="image/*" onChange={handleImageChange} />
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-sm btn-outline-danger" onClick={handleDeleteImage}>
                      <i className="fa-solid fa-trash"></i> Remove
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="rounded-circle d-flex justify-content-center align-items-center bg-secondary text-white fw-bold mx-auto shadow"
                    style={{ width: 180, height: 180, fontSize: 64 }}>
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <label htmlFor="uploadImg" className="btn btn-outline-dark mt-3">
                    <i className="fa-solid fa-camera"></i> Upload
                  </label>
                  <input id="uploadImg" type="file" hidden accept="image/*" onChange={handleImageChange} />
                </>
              )}
            </div>

            <div className="col-md-8">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h3 className="mb-0">{user.name || 'Your Name'}</h3>
                  <p className="text-muted mb-1">Admin</p>
                </div>
                {!editing && (
                  <button className="btn btn-outline-primary btn-sm" onClick={() => setEditing(true)}>
                    <i className="fa-solid fa-pen-to-square me-1"></i> Edit
                  </button>
                )}
              </div>

              {editing ? (
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Date of Birth:</label>
                    <input type="date" className="form-control" name="dob" value={formData.dob} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone:</label>
                    <input className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email:</label>
                    <input className="form-control" name="email" value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Address:</label>
                    <input className="form-control" name="address" value={formData.address} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Country:</label>
                    <select className="form-select" name="country" value={formData.country} onChange={handleChange}>
                      <option value="">-- Select Country --</option>
                      {countryList.map(c => (
                        <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">State:</label>
                    <select className="form-select" name="state" value={formData.state} onChange={handleChange}>
                      <option value="">-- Select State --</option>
                      {stateList.map(s => (
                        <option key={s.isoCode} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="d-flex justify-content-end gap-3 mt-4">
                    <button className="btn btn-success" onClick={handleUpdate}>
                      <i className="fa-solid fa-check me-1"></i> Update
                    </button>
                    <button className="btn btn-secondary" onClick={() => setEditing(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="row row-cols-1 row-cols-md-2 g-3">
                  <div><strong>Date of Birth:</strong> <span className="text-muted">{user.dob || '—'}</span></div>
                  <div><strong>Phone:</strong> <span className="text-muted">{user.phone || '—'}</span></div>
                  <div><strong>Email:</strong> <span className="text-muted">{user.email}</span></div>
                  <div><strong>Address:</strong> <span className="text-muted">{user.address || '—'}</span></div>
                  <div><strong>Country:</strong> <span className="text-muted">{Country.getCountryByCode(user.country)?.name || '—'}</span></div>
                  <div><strong>State:</strong> <span className="text-muted">{user.state || '—'}</span></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile - myProducts  */}
        <div className={`card shadow-sm p-4 rounded-4 border-0 bg-${mode} text-${cardText}`}>
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <h5 className="text-primary mb-0">My Products</h5>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-success btn-sm"
                onClick={() => navigate('/addproduct')}
              >
                <i className="fa-solid fa-plus me-1"></i> Add Product
              </button>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setShowProducts(!showProducts)}
              >
                {showProducts ? "Hide Products" : "View My Products"}
              </button>
            </div>
          </div>

          <p className="text-muted">You have {products.length} product(s).</p>

          {showProducts && (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-3">
              {products.map((product, idx) => (
                <div key={product._id || idx} className="col">
                  <div className="card h-100 shadow-sm border-0 position-relative">
                    {product.image?.[0] ? (
                      <img
                        src={`http://localhost:5000/uploads/${product.image[0]}`}
                        alt={product.title}
                        className="card-img-top"
                        style={{ height: "250px", objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        className="bg-secondary text-white d-flex justify-content-center align-items-center"
                        style={{ height: "250px" }}
                      >
                        No Image
                      </div>
                    )}
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <h5 className="card-title text-primary">{product.title}</h5>
                        <div className="position-relative">
                          <BsThreeDots onClick={() => toggleMenu(product._id)} style={{ cursor: 'pointer' }} />
                          {menuVisible[product._id] && (
                            <div
                              ref={menuRef}
                              className="position-absolute bg-light border rounded shadow p-2"
                              style={{ right: 0, zIndex: 999 }}
                            >
                              <button className="dropdown-item" onClick={() => openEditModal(product)}>✏️ Edit</button>
                              <button className="dropdown-item text-danger" onClick={() => handleDelete(product._id)}>🗑️ Delete</button>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="card-text text-muted">
                        {product.description?.substring(0, 100) || "No description"}
                      </p>
                      <p className="card-text fw-semibold text-dark">
                        Price: {product.price} /-
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>



      </div>
    </div>
  );
};

export default Profile;