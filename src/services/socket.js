import {io} from 'socket.io-client'
const BACKEND_URL = import.meta.env.VITE_BACK_END_URL;

export const createSocketConnection = ()=>{
    const userToken = JSON.parse(localStorage.getItem('token')) || null;
    const user =  JSON.parse(localStorage.getItem('user'))
    console.log("User : ",user?.gameDetails?._id)
    return io(BACKEND_URL,{
        auth:{
            token:userToken,
            gameId: user?.gameDetails?._id
        }
    });
}