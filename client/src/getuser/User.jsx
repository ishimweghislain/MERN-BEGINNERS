import React, { useEffect, useState } from 'react'
import "./User.css"
import axios from "axios";
import  toast  from 'react-hot-toast';
import { Link } from 'react-router-dom';
const User = () => {

  //we are going now to connect our frontend to the backend
  const [users, setUsers] = useState([])
  useEffect(() =>{
    const fetchData = async()=> {

      try {

        const response = await axios.get("http://localhost:8000/api/users")
        setUsers(response.data)
        
      } catch (error) {
        console.log("Error fetching data", error)
      }
    }

    fetchData()
  },[])  //we added an empty array as a second argument to useEffect so that it runs only once when the component mounts


  const deleteUser = async (userId) =>{
     await axios.delete(`http://localhost:8000/api/delete/user/${userId}`)
     .then((response) =>{
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId))
      toast.success(response.data.message, {position: "top-right"})
     })
     
    
     .catch((error) =>{
      console.log("Error deleting user", error)

     })
  }

  return (
   <div className='userTable'>
    <Link to="/add" type='button' className='btn btn-primary'>
      Add User <i class="fa-solid fa-user-plus"></i>
    </Link>
    {users.length === 0?(
      <div className='noUser'>
        <h1>No Users Found in Database</h1>
        <p>Please add a new user</p>
      </div>
    ):(
      <table className='table table-bordered'>
   <thead>
    <tr>
      <th scope='col'>S.NO</th>
      <th scope='col'>Name</th>
      <th scope='col'>Email</th>
      <th scope='col'>Address</th>
      <th scope='col'>Actions</th>
    </tr>
   </thead>

   <tbody>
    {users.map((user, index) =>{
      return(
  
        <tr>
        <td>{index + 1}</td>
        <td>{user.name}</td> 
        <td>{user.email}</td>
        <td>{user.address}</td>
        <td className='actionbuttons'>
  
          <Link to={`/update/` +user._id} type='button' className='btn btn-info'>
          <i class="fa-solid fa-pen-to-square"></i>
          </Link>
       
        <button
        onClick={() => deleteUser(user._id)}
        type='button' className='btn btn-danger'>
        <i class="fa-solid fa-trash"></i> 
        </button>
  
        </td>
      </tr>
      )
    })}
   
   </tbody>
    </table>
    )}
   
   </div>
  )
}

export default User