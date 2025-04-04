import React, { useEffect, useState } from 'react'
import "./UpdateUser.css"
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import  toast  from 'react-hot-toast';
const UpdateUser = () => {
  const users ={ 
    name: "",
    email:"",
    address:""
  }

  const [user, setUser] = useState(users)
  const {id} = useParams(); //for retruving the id from the url of the user
  const navigate = useNavigate();


  const inputHandler = (e) => {
    const {name, value}= e.target
    console.log(name, value);
    setUser({
      ...user, [name]: value
    });

  }

  useEffect(() =>{
    axios.get(`http://localhost:8000/api/users/${id}`)
    .then((response) =>{
        setUser(response.data)
    })

    .catch((error) =>{
        console.log(error)
    })
  },[id]) //we are going to fetch the data of the user we want to update using the id we got from the url

  //we are going to make a fucntion to add user to the database when we click submit button
  const submitForm = async (e)=>{
      e.preventDefault();
      await axios.put(`http://localhost:8000/api/update/user/${id}`, user)
      .then((response)=>{
        toast.success(response.data.message, {position:"top-right"})
        navigate("/")
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
        <h3>Update User</h3>
        <form onSubmit={submitForm} className='addUserForm'>
            <div className='inputGroup'>
                <label htmlFor="name">Name</label>
                <input type="text" id='name' value={user.name} onChange={inputHandler} name='name' placeholder='Enter your name' />
                </div>

                <div className='inputGroup'>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" value={user.email} onChange={inputHandler} placeholder='Enter your email' id="email" />
                </div>

                <div className='inputGroup'>
                <label htmlFor="address">Address</label>
                <input type="text" name='address' value={user.address} onChange={inputHandler} id='address' placeholder='Enter your address' />
            </div>

            <div className='inputGroup'>
                <button type='submit' className='btn btn-primary'>Update User</button>
                </div>
        </form>
    </div>
  )
}

export default UpdateUser