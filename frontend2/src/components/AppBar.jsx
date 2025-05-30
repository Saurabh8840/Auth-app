import React, { useContext } from 'react'
import {AuthContext} from '../context/AuthContext';

const AppBar = () => {
  const {username,isLoggedIn}=useContext(AuthContext);
  return (
    <div  className='w-full flex justify-between items-center px-6 py-4 bg-blue-600'>
      <h3>My App</h3>
      {isLoggedIn && <p>Welcome, {user.username}!</p>}
    </div>
  )
}

export default AppBar;
