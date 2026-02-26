import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Auth from './pages/Auth.jsx'

export const ServerUrl = "https://talentprobe.onrender.com"
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/auth' element={<Auth/>} />
    </Routes>
  )
}

export default App