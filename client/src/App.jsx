import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Auth from './pages/Auth.jsx'
import { useEffect } from 'react'
import axios from 'axios'

export const ServerUrl = "https://talentprobe.onrender.com"
function App() {
  useEffect(()=> {
    const getUser = async () => {
      try {
        const result = await axios.get(ServerUrl + "/api/user/currentUser",{
          withCredentials: true
        })
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  },[])
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/auth' element={<Auth/>} />
    </Routes>
  )
}

export default App