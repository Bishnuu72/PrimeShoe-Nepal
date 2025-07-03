import React from 'react'

const Profile = () => {
  return (
    <div>
      <div className="container profile-section">
        <h4>My Profile</h4>
        <div className="row">
            <div className="col-md-2 profile-img">
                <img src="/bishnu.jpg" alt="profile image" />
            </div>
            <div className="col-md-3 profile-main">
                <p className='profile-name'>Bishnu Kumar Yadav</p>
                <p>Admin</p>
                <p>Bishnuyadav857@gmail.com</p>
                <p>New Plaza, Kathmandu</p>
            </div>
            <div className="col-md-1 d-none d-md-block">
                <div className="vr h-100" style={{ width: "2px", backgroundColor: "#000" }}></div>
            </  div>
            <div className="col-md-2 profile-products">
                <h5>My Products</h5>
                <p>Total : No of Products</p>
                <button className="show-product">Show All</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
