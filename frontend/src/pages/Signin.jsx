import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Signin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/signin", formData);
      localStorage.setItem("token",res.data.token);
      alert("Signin successful");
      navigate("/dashboard");
    } catch (err) {
      console.error("Signin failed", err.response?.data || err.message);
      alert("Signin failed");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="username"
        placeholder="Enter email"
        value={formData.username}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={formData.password}
        onChange={handleChange}
      />

      <button type="submit">Signin</button>
      <button type="button" onClick={() => navigate('/')}>Go to SignUp</button>

    </form>
  );
};

export default Signin;
