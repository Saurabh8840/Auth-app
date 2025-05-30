// import { useState } from 'react';
// import Login from './components/Login';
// import Home from './components/Home';
// import AppBar from './components/AppBar';



// function App() {
//   const [isLogged,setIsLogged]=useState(false);
//   const [username,setUsername]=useState('');

//   const handleLogin=(name)=>{
//     setUsername(name);
//     setIsLogged(true);
//   }

//   return (
//     <>
//      <AppBar  username={username} isLogged={isLogged}/>
//       <h2>My App</h2>
//       {isLogged?<Home/>:<Login />}
      
//     </>
//   )
// }

// export default App


//context api

import Login from './components/Login';
import Home from './components/Home';
import AppBar from './components/AppBar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const { isLoggedIN } = useContext(AuthContext);

  return (
    <>
      <AppBar />
      <h2>My App</h2>
      {isLoggedIN ? <Home /> : <Login />}
    </>
  );
}

export default App;
