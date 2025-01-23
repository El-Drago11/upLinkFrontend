import React from 'react'
import Navbar from './Pages/Navbar'
import Signup from './Pages/Signup'
import { Routes,Route } from 'react-router-dom'
import Login from './Pages/Login'
import BananaGame from './Pages/BananaGame'
import PlayerRoute from './utils/PlayerRoute'

const App = () => {
  return (
    <div className='w-screen min-h-screen bg-black text-white flex flex-col'>
      <div className='w-full min-h-fit'>
        <Navbar/>
      </div>
      <div className='w-full my-auto'>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/BananaGame" element={<PlayerRoute><BananaGame/></PlayerRoute>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App