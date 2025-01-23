import React, { useState } from 'react'
import '../App.css'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signUp } from '../services/operations/authApi';


const Signup = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const userDataSubmission = async(data) => {
        const { firstName, lastName, email, phoneNumber, password, confirmPassword } = data;
        console.log("Form submit : ", data)
        if (password != confirmPassword) {
            toast.error("Password doen't match");
            return;
        }
        else {
            await signUp(firstName, lastName, email, password, confirmPassword, phoneNumber, navigate)
        }
    }

    return (
        <div className='w-11/12 sm:w-full min-h-[90vh] h-full flex justify-center mx-auto'>
            <div className='flex flex-col p-4 bg-yellow-400 rounded-lg min-h-fit'>
                <div className='text-[2rem] text-center font-extrabold h-fit'>SIGN UP</div>
                <form onSubmit={handleSubmit(userDataSubmission)}>
                    <div className='flex flex-row justify-between gap-4 mt-4 w-full'>
                        <label className='w-1/2'>
                            <p>First Name</p>
                            <input type='First Name' name='firstName' placeholder='First Name' className='p-2 text-black w-full rounded-lg' {...register('firstName', { required: true })} />
                            {errors.firstName && <span className='text-red-600'>FirstName required</span>}
                        </label>
                        <label className='w-1/2'>
                            <p>Last Name</p>
                            <input type='Last Name' name='lastName' placeholder='Last Name' className='p-2 text-black w-full rounded-lg' {...register("lastName", { required: true })} />
                            {errors.lastName && <span className='text-red-600'>LastName required</span>}
                        </label>
                    </div>
                    <label>
                        <p className='mt-4'>Email Address</p>
                        <input type='email' name='email' placeholder='Enter Email address' className='p-2 text-black w-full rounded-lg'{...register("email", { required: true })} />
                        {errors.email && <span className='text-red-600'>Email required</span>}
                    </label>
                    <label>
                        <p className='mt-4'>Phone Number</p>
                        <input type='phone number' name='phoneNumber' placeholder='+91-123456789' className='p-2 text-black w-full rounded-lg'{...register("phoneNumber", { required: true })} maxLength={10} />
                        {errors.phoneNumber && <span className='text-red-600'>Phone-Number required</span>}
                    </label>
                    <div className='flex flex-row gap-4 mt-4'>
                        <label className='w-1/2'>
                            <p>Password</p>
                            <input type='password' name='password' placeholder='Enter Password' className='p-2 text-black w-full rounded-lg' {...register("password", { required: true })} />
                            {errors.password && <span className='text-red-600'>Password required</span>}
                        </label>
                        <label className='w-1/2'>
                            <p>Confirm Password</p>
                            <input type='password' name='confirmPassword' placeholder='Confirm-Password' className='p-2 text-black w-full rounded-lg' {...register("confirmPassword", { required: true })} />
                            {errors.confirmPassword && <span className='text-red-600'>Confirm-Password required</span>}
                        </label>
                    </div>
                    <button type='submit' className='bg-yellow-50 text-black w-full mt-4 py-2 px-4 rounded-full'>Create Account</button>
                </form>
            </div>
        </div>
    )
}

export default Signup