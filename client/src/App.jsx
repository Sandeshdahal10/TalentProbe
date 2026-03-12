import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Auth from './pages/Auth.jsx'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData, setChecked } from './redux/userSlice.js'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import InterviewPage from './pages/InterviewPage.jsx'
import InterviewHistory from './pages/InterviewHistory.jsx'
import Pricing from './pages/Pricing.jsx'
import InterviewReport from './pages/InterviewReport.jsx'

export const ServerUrl = "http://localhost:8000";
function App() {

  const dispatch = useDispatch();
  useEffect(()=> {
    const getUser = async () => {
      try {
        const result = await axios.get(ServerUrl + "/api/user/currentUser",{
          withCredentials: true
        })
        dispatch(setUserData(result.data));
        dispatch(setChecked(true));
      } catch (error) {
        console.log(error);
        dispatch(setUserData(null));
        dispatch(setChecked(true));
      }
    }
    getUser();
  },[dispatch])
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/auth' element={<Auth/>} />
      <Route path='/interview' element={<ProtectedRoute><InterviewPage/></ProtectedRoute>} />
      <Route path='/history' element={<ProtectedRoute><InterviewHistory/></ProtectedRoute>} />
      <Route path='/pricing' element={<Pricing/>} />
      <Route path='/report/:id' element={<ProtectedRoute><InterviewReport/></ProtectedRoute>} />
    </Routes>
  )
}

export default App