import React from 'react'
import { useParams } from 'react-router-dom'

const UserDetails = () => {
    const params = useParams();
    const {id, username, age} = params; //destructuring
  return (
    <div className='container mt-4'>
      <h4>This is user Details page</h4>
      <p>user id: {id}</p>
      <p>user name: {username}</p>
      <p>age: {age}</p>
    </div>
  )
}

export default UserDetails
