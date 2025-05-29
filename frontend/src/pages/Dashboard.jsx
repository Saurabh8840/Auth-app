import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  //to store user data from backend
  const [userData, setUserData] = useState(null);

  function handleLogout() {
    localStorage.removeItem("token");
    alert("Logout successfull");
    navigate("/signin");
  }

  useEffect(() => {
    //getting token from frontend which stored
    const token = localStorage.getItem("token");

    //sending backend a request to verify
    axios
      .get("http://localhost:3000/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        //IS token valid  to backend se user ka data ata hai aur userData me store hota hai
        console.log("api response is:", res.data);
        setUserData(res.data);
      })
      .catch((err) => {
        console.error("Access denied", err);
        alert("Please log in again");
      });
  }, []);
  return (
    <section className="w-screen min-h-screen bg-black text-white">
      <div className="w-full flex justify-between items-center px-6 py-4 bg-blue-600">
        <div className="text-3xl font-bold">Auth System Demo</div>
        <div className="flex items-center gap-6">
          {userData ? (
            <div>Welcome, {userData.firstName}!</div>
          ) : (
            <div>Loading user info...</div>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded text-white"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="w-full flex justify-end px-6 py-4 bg-fuchsia-300">
            <div className="text-xl font-semibold flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 "/>
              
               Use Contex API : ON
            </div>
      </div>
      <div className="p-6">
        <h1 className="text-xl font-semibold mb-4">
          Welcome to Auth System Dashboard
        </h1>
        <h3>
          This demo showcases two approaches to managing authentication state in
          React:
        </h3>
        <ul className="list-disc list-inside mt-2">
          <li>State Lifting</li>
          <li>Context API</li>
        </ul>
        <h3 className="mt-2">
          Use the toggle above to switch between the two approaches.
        </h3>
      </div>
    </section>
  );
};

export default Dashboard;
