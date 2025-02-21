import React, { useEffect, useState } from 'react'
import '../App.css'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/operations/authApi';
import { useDispatch } from 'react-redux';
import { setLoginLoading } from '../Store/profileReducer';


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const userDataSubmission = async (data) => {
        dispatch(setLoginLoading(true))
        const { email, password } = data;
        await login(email, password, dispatch, navigate)
        return;
    }

    useEffect(() => {
        let token = localStorage.getItem('token');
        let user = JSON.parse(localStorage.getItem('user'))
        if (token !== 'null' && user?.accountType == 'Admin') {
            return navigate('/admin/dashboard')
        }
        if (token !== 'null' && user?.accountType === 'Player') {
            return navigate('/BananaGame')
        }

    })

    return (
        <div className='w-11/12 sm:w-full min-h-[90vh] flex  flex-col md:flex-row gap-10 justify-center items-center mx-auto'>
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
            <div className='flex flex-col p-4 bg-yellow-400 min-h-[25rem] rounded-lg items-center justify-evenly'>
                <div className='text-[2rem] text-center font-extrabold h-fit'>Login</div>
                <form onSubmit={handleSubmit(userDataSubmission)}>
                    <label>
                        <p className='mt-4'>Email Address</p>
                        <input type='email' name='email' placeholder='Enter Email address' className='p-2 text-black w-full rounded-lg'{...register("email", { required: true })} />
                        {errors.email && <span className='text-red-600'>Email required</span>}
                    </label>
                    <label className='w-1/2'>
                        <p>Password</p>
                        <input type='password' name='password' placeholder='Enter Password' className='p-2 text-black w-full rounded-lg' {...register("password", { required: true })} />
                        {errors.password && <span className='text-red-600'>Password required</span>}
                    </label>
                    <button type='submit' className='bg-yellow-50 text-black w-full mt-4 py-2 px-4 rounded-full'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login