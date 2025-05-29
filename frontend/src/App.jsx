import { Routes,Route,BrowserRouter } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

import './App.css'
import ProtectedRoute from './compoents/ProtectedRoute'

function App() {
  
  return (
    <>
      <BrowserRouter>
         <Routes>
          <Route path='/' element={<Signup/>}  />
          <Route path='/signin' element={<Signin/>}  />
          <Route path='/dashboard' element={ <ProtectedRoute> <Dashboard/></ProtectedRoute>}   /> 
         </Routes>
      </BrowserRouter>
    </>
    

  )
}

export default App
