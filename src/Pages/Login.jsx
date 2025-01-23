import React, { useState } from 'react'
import '../App.css'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/operations/authApi';
import { useDispatch } from 'react-redux';


const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const userDataSubmission = async (data) => {
        const { email, password } = data;
        await login(email, password,dispatch,navigate)
        return;
    }

    return (
        <div className='w-11/12 sm:w-full flex justify-center items-center mx-auto'>
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