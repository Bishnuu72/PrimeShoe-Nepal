import React from 'react'

const CompanyForm = () => {
    const [company, setCompany] = React.useState({
        name: "",
        address: "",
        phone: "",
        email: "",
    });
    const handleChange = (e) => {
        setCompany({...company, [e.target.name] : e.target.value});
    };
  return (
    <>
        <div className="companyForm-details">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h4>Company Information</h4>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Company Name</label>
                                <input type="text" 
                                name='name' 
                                value={company.name}
                                onChange={handleChange}
                                className="form-control" 
                                id="exampleInputEmail1" 
                                aria-describedby="emailHelp"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address</label>
                                <input type="text" 
                                name='address' 
                                value={company.address}
                                onChange={handleChange}
                                className="form-control" 
                                id="exampleInputEmail1" 
                                aria-describedby="emailHelp"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone Number</label>
                                <input type="number" 
                                name='phone' 
                                value={company.phone}
                                onChange={handleChange}
                                className="form-control" 
                                id="exampleInputEmail1" 
                                aria-describedby="emailHelp"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email Address</label>
                                <input type="email" 
                                name='email' 
                                value={company.email}
                                onChange={handleChange}
                                className="form-control" 
                                id="exampleInputEmail1" 
                                aria-describedby="emailHelp"/>
                            </div>
                            <button type="submit" className="btn btn-primary company-btn">Submit</button>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <div className="preview-details">
                            <h4>Live Preview</h4>
                            <p>Company Name: {company.name}</p>
                            <p>Address: {company.address}</p>
                            <p>Phone: {company.phone}</p>
                            <p>Email Address: {company.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default CompanyForm
