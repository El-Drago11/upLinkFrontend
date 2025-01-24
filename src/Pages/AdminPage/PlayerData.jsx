import React, { useEffect, useState } from 'react'
import { getAllPlayersData, updatePlayerStatus } from '../../services/operations/adminApi';
import { createSocketConnection } from '../../services/socket';


const PlayerData = () => {
    const socket = createSocketConnection();
    const [getPlayer, setPlayer] = useState([]);

    const fetchPlayerDetails = async () => {
        const resp = await getAllPlayersData();
        setPlayer(resp)
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
            console.log("User player data updated : ")
            fetchPlayerDetails()
        });
        return () => {
            socket.off('player-updated');
        };
    }, []);

    useEffect(() => {
        fetchPlayerDetails();
    }, [])

    useEffect(() => {
        return () => {
            socket.disconnect();
        }
    }, [])

    return (
        <div className='w-full mt-7 flex flex-col items-center'>
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
                                <td className={`border-r-2 border-white truncate py-4  cursor-pointer`} onClick={()=>playerStatus(items?._id)}><button className={`${items?.approved ? " bg-green-400" : "bg-red-600"} p-2 rounded-full shadow-yellow-100 w-1/2`}>{items?.approved ? "Approved" : "Block"}</button></td>
                                <td className='border-r-2 border-white truncate py-4'>{items?.email}</td>
                                <td className='border-r-2 border-white truncate capitalize py-4'>{items?.firstName + ' ' + items?.lastName}</td>
                                <td className='border-r-2 border-white truncate py-4'>{items?.gameDetails.clickCount}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}

export default PlayerData