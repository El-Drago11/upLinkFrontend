import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { setUser } from '../Store/profileReducer';
import { setToken } from '../Store/authReducer';

const Navbar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const {user} =  useSelector((store)=>store.profile)
  const dispatch = useDispatch();

  const logOutUser = ()=>{
    localStorage.clear();
    dispatch(setUser(null));
    dispatch(setToken(null));
    navigate('/')
  }

  return (
    <div className='w-full py-3 px-6 flex items-center justify-between bg-slate-950'>
        <div className='font-bold text-orange-600 text-2xl'>
            Uplink
        </div>
        <div>
          {user?
            <button className='rounded-full bg-red-600 py-1 px-2 sm:px-4 font-bold border-none' onClick={()=>logOutUser()}>Logout</button>  
            :
            (location?.pathname === "/signup" 
            ?
            <button className='rounded-full bg-green-600 py-1 px-2 sm:px-4 font-bold border-none' onClick={()=>navigate('/')}>Log In</button>              
            :
            <button className='rounded-full bg-red-600 py-1 px-2 sm:px-4 font-bold border-none' onClick={()=>navigate('/signup')}>Sign In</button>  
            )
          }
        </div>
    </div>
  )
}

export default Navbar