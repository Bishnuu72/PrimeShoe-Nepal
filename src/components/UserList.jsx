import React from 'react'
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const navigate = useNavigate();
    const users = [
        {_id:1, name: "Bishnu", age:20},
        {_id:2, name: "Manshi", age:18},
        {_id:3, name: "B4M", age:19},
        {_id:4, name: "Wow", age:20},
    ];
    
    const handleUser =(userId, userName, age)=> {
      console.log("You clicked", userName)
      navigate(`/${userId}/${userName}/${age}`) //template literal
    }

  return (
    <div className='container mt-4'>
      <h4>Our Users List</h4>
      <ul>
        {users.map((user) => {
          return (
            <li key={user._id} onClick={()=>handleUser(user._id, user.name, user.age)}>{user.name}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default UserList
