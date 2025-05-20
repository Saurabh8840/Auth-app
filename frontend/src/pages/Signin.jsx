import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const Signin = () => {

  const [formData,setFormData]=useState({
    email:"",
    password:""
  }
    
  );
  return (
    <form onSubmit={handleSubmit}>

      <input 
      type="email" 
      placeholder='enter email'
      value={FormData.email}
      onChnage={handleChange}
       />

       <input 
      type="password" 
      placeholder='enter password'
      value={FormData.password}
      onChnage={handleChange}
       />


    </form>
  )
}

export default Signin
