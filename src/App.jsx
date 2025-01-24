import React, { useEffect } from 'react'
import Navbar from './Pages/Navbar'
import Signup from './Pages/Signup'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './Pages/Login'
import BananaGame from './Pages/PlayerPage/BananaGame'
import PlayerRoute from './utils/PlayerRoute'
import AdminRoute from './utils/AdminRoute'
import PlayerData from './Pages/AdminPage/PlayerData'

const App = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if (token) {
      const userType = user.accountType;
      if (userType == 'Admin') {
        navigate('/admin/dashboard')
      }
      else if (userType == 'Player') {
        navigate('/BananaGame')
      }
      else {
        localStorage.clear();
        dispatch(setUser(null));
        dispatch(setToken(null));
        dispatch(setGameData(null))
      }
    }
  }, [])


  return (
    <div className='w-screen min-h-screen bg-black text-white flex flex-col'>
      <div className='w-full min-h-fit'>
        <Navbar />
      </div>
      <div className='w-full min-h-[90vh]'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/dashboard" element={<AdminRoute><PlayerData /></AdminRoute>} />
          <Route path="/BananaGame" element={<PlayerRoute><BananaGame /></PlayerRoute>} />
        </Routes>
      </div>
    </div>
  )
}

export default App