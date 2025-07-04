import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '', address: '', profileImage: '' });
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', address: '' });
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await axios.get('http://localhost:5000/api/auth/getuser', {
          headers: { 'auth-token': token }
        });
        setUser(res.data);
        setFormData({
          name: res.data.name,
          email: res.data.email,
          address: res.data.address || ''
        });
      } catch (err) {
        console.error('Fetch user failed', err);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('address', formData.address);
      if (image) form.append('profileImage', image);

      const res = await axios.put('http://localhost:5000/api/auth/updateuser', form, {
        headers: {
          'auth-token': token,
          'Content-Type': 'multipart/form-data'
        }
      });
      setUser(res.data.updatedUser);
      setEditing(false);
      setImage(null);
      alert('Profile updated successfully');
    } catch (err) {
      console.error('Update failed', err);
      alert('Something went wrong!');
    }
  };

  // ✅ NEW: Handle image deletion
  const handleDeleteImage = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        'http://localhost:5000/api/auth/delete-profile-image',
        {},
        {
          headers: { 'auth-token': token }
        }
      );
      setUser(res.data.updatedUser);
      alert('Profile image deleted');
    } catch (err) {
      console.error('Failed to delete image', err);
      alert('Failed to delete image');
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="text-center mb-4">My Profile</h4>
      <div className="row align-items-center mb-5">
        <div className="col-md-3 text-center">
          {image || user.profileImage ? (
            <>
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : `data:image/jpeg;base64,${user.profileImage}`
                }
                alt="profile"
                className="img-fluid rounded-circle border"
                style={{ width: 200, height: 200, objectFit: 'cover' }}
              />
              {/* ✅ Show delete button if image is present */}
              {user.profileImage && !image && (
                <button className="btn btn-danger mt-2" onClick={handleDeleteImage}>
                  Delete Profile Image
                </button>
              )}
            </>
          ) : (
            // ✅ Show first letter of name in a circle with background
            <div
              className="rounded-circle d-flex justify-content-center align-items-center bg-secondary text-white fw-bold mx-auto"
              style={{ width: 200, height: 200, fontSize: 72 }}
            >
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}

          {editing && (
            <input
              type="file"
              className="form-control mt-2"
              accept="image/*"
              onChange={handleImageChange}
            />
          )}
        </div>

        <div className="col-md-9">
          {editing ? (
            <>
              <div className="row mb-2">
                <div className="col-md-4">
                  <label>Name:</label>
                  <input
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label>Email:</label>
                  <input
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label>Address:</label>
                  <input
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button className="btn btn-success me-2" onClick={handleUpdate}>
                Update
              </button>
              <button className="btn btn-secondary" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Address:</strong> {user.address ?? '—'}</p>
              <button className="btn btn-primary" onClick={() => setEditing(true)}>
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
