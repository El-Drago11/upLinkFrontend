import React, { useEffect, useState } from 'react'
import banana_img from '../assets/banana.png'
import banana1 from '../assets/banana1.png'
import banana2 from '../assets/banana2.png'
import clickSound from '../assets/clickSound.mp3'
import { createSocketConnection } from '../services/socket'

const BananaGame = () => {

    const [getCount,setCount] = useState(0);
    const [getBounce,setBounce] = useState(false);
    const userToken = JSON.parse(localStorage.getItem('token')) || null;

    const socketConnect = createSocketConnection()

    console.log("Token checked : ",socketConnect)

    const bounceEffect = ()=>{
        setBounce(true)
        setCount((prev)=>++prev)
        let audio = new Audio(clickSound)
        audio.play()

        setTimeout(()=>{
            setBounce(false)
        },100)
    }

    useEffect(()=>{

    },[])

    return (
        <div className='w-11/12 grid grid-cols-3 gap-4 my-auto mx-auto'>
            <div className=' bg-yellow-500 col-span-3 sm:col-span-2 flex justify-center items-center py-10 md:py-20 cursor-pointer relative'>
                <div className=' text-orange-500 text-[2rem] sm:text-[4rem] font-extrabold absolute top-1'>{getCount}</div>
                <img src={banana_img} className={`w-[30rem] h-[10rem] sm:h-[20rem] ${getBounce && 'rotate-[0.1rad] sm:rotate-[0.2rad]'}`} onClick={()=>bounceEffect()}/>
            </div>
            <div className='bg-yellow-600 col-span-3 sm:col-span-1 min-h-full flex flex-col items-center justify-center gap-4 py-10 sm:py-0'>
                <div className='grid grid-cols-3 border-2 sm:border-4 border-black rounded-md p-2 gap-4 mx-auto w-11/12'>
                    <div className='col-span-1 border-2 sm:border-4 border-black rounded-md flex items-center justify-center'>
                        <img src={banana1} className=' h-16 w-10 mx-auto py-2' />
                    </div>
                    <div className='col-span-2 text-white font-semibold  flex flex-col justify-center'>
                        <div>Click </div>
                        <div>Count : {getCount}</div>
                        {/* <div>Level</div> */}
                    </div>
                </div>
                {/* <div className='grid grid-cols-3 border-2 sm:border-4 border-black rounded-md p-2 gap-4 mx-auto w-11/12'>
                    <div className='col-span-1 border-2 sm:border-4 border-black rounded-md flex items-center justify-center'>
                        <img src={banana2} className='h-10 w-10 mx-auto' />
                    </div>
                    <div className='col-span-2 text-white font-semibold text-sm sm:text-xl flex flex-col justify-center'>
                        <div>Click</div>
                        <div>Price</div>
                        <div>Level</div>
                    </div>
                </div>
                <div className='grid grid-cols-3 border-2 sm:border-4 border-black rounded-md p-2 gap-4 mx-auto w-11/12'>
                    <div className='col-span-1 border-2 sm:border-4 border-black rounded-md flex items-center justify-center'>
                        <img src={banana_img} className='h-10 w-10 mx-auto' />
                    </div>
                    <div className='col-span-2 text-white font-semibold text-sm sm:text-xl flex flex-col justify-center'>
                        <div>Click</div>
                        <div>Price</div>
                        <div>Level</div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default BananaGame