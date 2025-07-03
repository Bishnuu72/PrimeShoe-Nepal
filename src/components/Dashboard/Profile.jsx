import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await axios.get('http://localhost:5000/api/auth/getuser', {
          headers: {
            "content-Type" : "application/json",
            "auth-token": localStorage.getItem("token"),
          }
        });

        setUser(res.data);
        setFormData({ name: res.data.name, email: res.data.email });
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    fetchUser();
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData({ name: user.name, email: user.email });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        'http://localhost:5000/api/auth/updateuser',
        formData,
        {
          headers: {
            "content-Type" : "application/json",
            "auth-token": localStorage.getItem("token"),
          }
        }
      );

      setUser(res.data.updatedUser);
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="container mt-4">
      <h4>My Profile</h4>
      <div className="row mt-3">
        <div className="col-md-2">
          <img src="/bishnu.jpg" alt="profile" className="img-fluid rounded-circle" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
        </div>
        <div className="col-md-5">
          {editing ? (
            <>
              <div className="mb-2">
                <label>Name:</label>
                <input className="form-control" name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div className="mb-2">
                <label>Email:</label>
                <input className="form-control" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <button className="btn btn-success me-2" onClick={handleUpdate}>Update</button>
              <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Location:</strong> New Plaza, Kathmandu</p>
              <button className="btn btn-primary" onClick={handleEdit}>Edit Profile</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
