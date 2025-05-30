import React from 'react'
import { createContext,useState } from 'react'

export const AuthContext =createContext();

export const AuthProvider = ({children}) => {

  const [username,setUsername]=useState('');
  const [isLoggedIN,setIsLoggedIn]=useState(false);

  const login=(name)=>{
     setUsername(name);
     setIsLoggedIn(true);
  };

  const logout=()=>{
    setUsername("");
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{username,isLoggedIN,login,logout}}>
        {children}
      </AuthContext.Provider>
  )
}

