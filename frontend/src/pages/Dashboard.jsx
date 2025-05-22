import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const Dashboard = () => {

  const navigate=useNavigate();
  //to store user data from backend 
  const [userData,setUserData]=useState(null);

  function handleLogout(){
    localStorage.removeItem("token");
    alert("Logout successfull");
    navigate("/signin");

  }

  useEffect(()=>{
    //getting token from frontend which stored 
    const token=localStorage.getItem("token");
     
    //sending backend a request to verify 
    axios.get("http://localhost:3000/dashboard",{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    .then(res=>{
      //IS token valid  to backend se user ka data ata hai aur userData me store hota hai

      setUserData(res.data);
    })
    .catch(err=>{
      console.error("Access denied",err);
      alert("Please log in again");
    });
  },[])
  return (
    <div>
       <h1>Welcome to Protected Dashboard</h1>
       {userData && <p>Welcom ,{userData.name}</p>}

       <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard;
