import React, { useEffect, useState } from 'react'
import { getAllPlayersData, updatePlayerStatus } from '../../services/operations/adminApi';
import { createSocketConnection } from '../../services/socket';
import toast from 'react-hot-toast';

const PlayerData = () => {
    const socket = createSocketConnection();
    const [getPlayer, setPlayer] = useState([]);
    const [getCurrentPageNumber,setCurrentPageNumber] = useState(1);
    const [getTotalPageNumber,setTotalPageNumber] = useState(10);

    const fetchNext = async()=>{
        if(getCurrentPageNumber<getTotalPageNumber){
            fetchPlayerDetails(getCurrentPageNumber+1);
            setCurrentPageNumber((prev)=>prev+1)
        }
        return;
    }

    const fetchPrevious = async()=>{
        if(getCurrentPageNumber>1){
            fetchPlayerDetails(getCurrentPageNumber-1);
            setCurrentPageNumber((prev)=>prev-1)
        }
        return;
    }

    const fetchPlayerDetails = async (getCurrentPageNumber=1) => {
        const resp = await getAllPlayersData(getCurrentPageNumber);
        setPlayer(resp?.data)
        setTotalPageNumber(resp?.totalPages)
    }

    const playerStatus = async(playerId)=>{
        const resp = await updatePlayerStatus(playerId)
        if(resp.status===200){
            fetchPlayerDetails();
            socket.emit('block-user',{playerId})
        }
    }



    // Update the Players details
    useEffect(() => {
        socket.on('player-updated', ()=>{
            fetchPlayerDetails()
        });
        return () => {
            socket.off('player-updated');
        };
    }, []);

    useEffect(() => {
        fetchPlayerDetails();
    }, [])


    return (
        <div className='w-full mt-7 flex flex-col items-center relative'>
            <div className='w-full text-4xl font-extrabold text-center'>Player details</div>
            <table class="table-fixed w-11/12 text-center border-2 mt-10">
                <thead className='border-b-2 border-white'>
                    <tr className=' font-extrabold'>
                        <th className='border-r-2 border-white truncate py-4'>S.No</th>
                        <th className='border-r-2 border-white truncate py-4'>PlayerId</th>
                        <th className='border-r-2 border-white truncate py-4'>Approved(Toggle)</th>
                        <th className='border-r-2 border-white truncate py-4'>Email</th>
                        <th className='border-r-2 border-white truncate py-4'>Name</th>
                        <th className='border-r-2 border-white truncate py-4'>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getPlayer?.map((items,index) => (
                            <tr className='border-b-2 border-white font-semibold'>
                                <td className='border-r-2 border-white truncate py-4'>{index+1}</td>
                                <td className='border-r-2 border-white truncate py-4'>{items?._id}</td>
                                <td className={`border-r-2 border-white truncate py-4  cursor-pointer`} onClick={()=>playerStatus(items?._id)}><button className={`${items?.approved ? " bg-green-400" : "bg-red-600"} p-2 rounded-full shadow-yellow-100 w-1/2 truncate`}>{items?.approved ? "Approved" : "Block"}</button></td>
                                <td className='border-r-2 border-white truncate py-4'>{items?.email}</td>
                                <td className='border-r-2 border-white truncate capitalize py-4'>{items?.firstName + ' ' + items?.lastName}</td>
                                <td className='border-r-2 border-white truncate py-4'>{items?.gameDetails.clickCount}</td>
                            </tr>
                        ))
                    }
                   
                </tbody>
            </table>
            <div className='w-11/12 my-4 flex justify-between'>
                <button className={`${getCurrentPageNumber<=1 ? 'bg-slate-700 cursor-not-allowed':"bg-red-600 py-2"} rounded-md px-4`} onClick={()=>fetchPrevious()}>Prev</button>
                <button className={`${getCurrentPageNumber>=getTotalPageNumber ? 'bg-slate-700 cursor-not-allowed':"bg-red-600 py-2"} py-2 rounded-md px-4`} onClick={()=>fetchNext()}>Next</button>
            </div>
        </div>
    )
}

export default PlayerData