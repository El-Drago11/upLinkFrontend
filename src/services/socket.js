import {io} from 'socket.io-client'
const BACKEND_URL = import.meta.env.VITE_BACK_END_URL;

export const createSocketConnection = (userToken)=>{
    return io(BACKEND_URL,{
        auth:{
            token:userToken
        }
    });
}