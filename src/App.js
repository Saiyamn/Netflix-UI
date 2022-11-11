import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import './app.scss';
import Home from './pages/home/Home';
import Watch from './pages/watch/Watch';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import {AuthContext} from './authContext/AuthContext';
const App = () => {

  // NOTE:- JUST MAKE SURE TO CREATE A TOKEN STATE FOR THE USER AND UPDATE IT WITH LOGIN TOKEN. CURRENTLY THE TOKEN IS HARDCODED , (LOOK IN FEATURED, AND REGISTERED COMP, PAGES)
  const {user} = useContext(AuthContext);

  return (
      <Router>
        <Routes>
            <Route path="/" element={
              user?<Home/>: <Navigate to="/register"/> 
            }/> 
            <Route path="/register" element={
              user ? <Navigate to="/"/> : <Register/>
            }/>
            <Route path="/login" element={
              user ? <Navigate to="/"/> :<Login/>
            }/>    
            {
            user && ( 
              <>
                <Route path="/movies" element={<Home type="movies"/>}/>
                <Route path="/series" element={<Home type="series"/>}/>
                <Route path="/watch" element={<Watch/>}/> 
              </>
             )
            }
        </Routes>
      </Router>
   
  )
}

export default App;