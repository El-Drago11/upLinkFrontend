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
        <div className='border-2 border-white w-fit rounded-md md:fixed md:top-24 md:left-10'>
          <div className='flex flex-row gap-2 border-2 border-black flex-wrap rounded-md p-2'>
            <div>
              Admin: admin@gmail.com
            </div>
            <div>
              Password : admin@1
            </div>
          </div>
          <div className='flex flex-row gap-2 border-2 border-black flex-wrap rounded-md p-2 mt-2'>
            <div>
              User1 : test1@gmail.com
            </div>
            <div>
              Password : test@1
            </div>
          </div>
          <div className='flex flex-row gap-2 border-2 border-black flex-wrap rounded-md p-2 mt-2'>
            <div>
              User2 : test2@gmail.com
            </div>
            <div>
              Password : test@2
            </div>
          </div>
        </div>
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