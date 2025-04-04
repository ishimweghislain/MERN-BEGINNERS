import React, { useState } from 'react'
import "./AddUser.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import  toast  from 'react-hot-toast';
const AddUser = () => {
  const users ={ 
    name: "",
    email:"",
    address:""
  }

  const [user, setUser] = useState(users)
  const navigate = useNavigate();
  const inputHandler = (e) => {

    const {name, value}= e.target
    console.log(name, value);
    setUser({
      ...user, [name]: value
    });

  }

  //we are going to make a fucntion to add user to the database when we click submit button
  const submitForm = async (e)=>{
      e.preventDefault();
      await axios.post("http://localhost:8000/api/user", user)
      .then((response)=>{
        toast.success(response.data.message, {position:"top-right"})
        navigate("/get")
      })

      .catch((error)=>{
        console.log(error)
      })
  }
  return (
    
    
    <div className='addUser'>
      <div className='userButtons'>
        <Link to="/getuser" type='button' className='btn btn-secondary'> <i class="fa-solid fa-backward"></i> Back </Link>
         <Link to="/" type='button' className='btn btn-danger'> <i class="fa-solid fa-backward"></i> Logout | </Link>
         </div>
        <h3>Add a New User</h3>
        <form onSubmit={submitForm} className='addUserForm'>
            <div className='inputGroup'>
                <label htmlFor="name">Name</label>
                <input type="text" id='name' onChange={inputHandler} name='name' placeholder='Enter your name' />
                </div>

                <div className='inputGroup'>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" onChange={inputHandler} placeholder='Enter your email' id="email" />
                </div>

                <div className='inputGroup'>
                <label htmlFor="address">Address</label>
                <input type="text" name='address' onChange={inputHandler} id='address' placeholder='Enter your address' />
            </div>

            <div className='inputGroup'>
                <button type='submit' className='btn btn-primary'>Add User</button>
                </div>
        </form>
    </div>
  )
}

export default AddUser