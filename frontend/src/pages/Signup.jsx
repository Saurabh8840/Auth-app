import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const Signup = () => {

  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/signup", formData);
      console.log("Signup Success", res.data);
      alert("Signup successful");
    } catch (err) {
      console.error("Signup failed", err.response?.data || err.message);
      alert("Signup failed yes");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="username"
        placeholder="Enter email"
        onChange={handleChange}
        value={formData.username}
      />

      <input
        type="password"
        name="password"
        placeholder="Enter password"
        onChange={handleChange}
        value={formData.password}
      />

      <input
        type="text"
        name="firstName"
        placeholder="Enter first name"
        onChange={handleChange}
        value={formData.firstName}
      />

      <input
        type="text"
        name="lastName"
        placeholder="Enter last name"
        onChange={handleChange}
        value={formData.lastName}
      />

      <button type="submit">Signup</button>
      <button type="button" onClick={() => navigate('/signin')}>Go to Signin</button>

    </form>
  );
};

export default Signup;
