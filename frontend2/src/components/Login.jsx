import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useContext } from 'react';
import {AuthContext} from '../context/AuthContext'

const Login = () => {
  const {login}=useContext(AuthContext);

  const [formData,setFormData]=useState({
    username:'',
    password:''
   });

   const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
    
   };

    const  handleSubmit=async (e)=>{
    e.preventDefault();
    
    if(formData.username && formData.password){
      login(formData.username);
    }
   }

  return (
    <div>
      <form onSubmit={handleSubmit} >

        <input type="text" name="username" value={formData.username} placeholder='enter username' onChange={handleChange} />
        <input type="password" name="password" value={formData.password} placeholder="enter password" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Login
