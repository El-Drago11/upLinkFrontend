import React from 'react'
import Navbar from './Pages/Navbar'
import Signup from './Pages/Signup'
import { Routes,Route } from 'react-router-dom'
import Login from './Pages/Login'
import BananaGame from './Pages/PlayerPage/BananaGame'
import PlayerRoute from './utils/PlayerRoute'
import AdminRoute from './utils/AdminRoute'
import PlayerData from './Pages/AdminPage/PlayerData'

const App = () => {
  return (
    <div className='w-screen min-h-screen bg-black text-white flex flex-col'>
      <div className='w-full min-h-fit'>
        <Navbar/>
      </div>
      <div className='w-full min-h-[90vh]'>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/admin/dashboard" element={<AdminRoute><PlayerData/></AdminRoute>}/>
            <Route path="/BananaGame" element={<PlayerRoute><BananaGame/></PlayerRoute>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App