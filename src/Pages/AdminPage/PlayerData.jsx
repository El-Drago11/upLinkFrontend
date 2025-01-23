import React, { useEffect, useState } from 'react'
import { getAllPlayersData } from '../../services/operations/adminApi';

const PlayerData = () => {

    const [getPlayer, setPlayer] = useState([]);

    const fetchPlayerDetails = async () => {
        const resp = await getAllPlayersData();
        setPlayer(resp)
    }

    useEffect(() => {
        fetchPlayerDetails();
    }, [])

    return (
        <div className='w-full mt-7 flex flex-col items-center'>
            <div className='w-full text-4xl font-extrabold text-center'>Player details</div>
            <table class="table-fixed w-11/12 text-center border-2 mt-10">
                <thead className='border-b-2 border-white'>
                    <tr className=' font-extrabold'>
                        <th className='border-r-2 border-white truncate py-4'>UserId</th>
                        <th className='border-r-2 border-white truncate py-4'>Approved</th>
                        <th className='border-r-2 border-white truncate py-4'>Email</th>
                        <th className='border-r-2 border-white truncate py-4'>Name</th>
                        <th className='border-r-2 border-white truncate py-4'>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getPlayer?.map((items) => (
                            <tr className='border-b-2 border-white font-semibold'>
                                <td className='border-r-2 border-white truncate py-4'>{items?._id}</td>
                                <td className={`border-r-2 border-white truncate py-4 ${items?.approved?" text-green-400":"text-red-600"}`}>{items?.approved ?"True":"False"}</td>
                                <td className='border-r-2 border-white truncate py-4'>{items?.email}</td>
                                <td className='border-r-2 border-white truncate capitalize py-4'>{items?.firstName+' '+items?.lastName}</td>
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