import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Title from './Title'
import { logUrl } from '../App'
import { toast } from 'react-toastify'

const Login = () => {
    const [email,setEmail ] = useState('')
    const [password,setPassword ] = useState('')
    const [username,setUname ] = useState('')
    const navigate = useNavigate()

    // Note: setToken should be passed from parent component or context
    const setToken = (token) => {
        localStorage.setItem('token', token)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault(); // Prevent default form submission
    
        try {
            const response = await axios.post(logUrl, { email, password, username });
    
            console.log(response); // Ensure response is defined here before using it
    
            if (response.data.success) {
                setToken(response.data.token);  // Assuming setToken is defined
                navigate('/Add');  // Ensure useNavigate is imported and used correctly
            } else {
                toast.error(response.data.message); 
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Login failed. Please try again.");
        }
    };
        

  return (
    <div className='min-h-screen bg-gradient-to-black from-blue-50 via-white to-gray-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {/* Header Section */}
        <div className='text-center mb-8'>
          <div className='bg-white w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl border-4 border-blue-100'>
            <div className='text-4xl font-bold text-blue-600'>UZ</div>
          </div>
          <div className='text-5xl font-black text-gray-900 mb-3 tracking-tight'>
            <Title text1={'ADMIN'} text2={'PANEL'}/>
          </div>
          <p className='text-gray-600 text-base font-medium'>Welcome back! Please sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className='bg-white rounded-2xl shadow-xl p-8 border border-gray-100'>
          <form onSubmit={onSubmitHandler} className='space-y-6'>
            {/* Username Field */}
            <div className='space-y-2'>
              <label className='text-sm font-semibold text-gray-700 block'>Username</label>
              <div className='relative'>
                <input 
                  onChange={(e)=>setUname(e.target.value)} 
                  value={username} 
                  className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 focus:bg-white text-gray-900' 
                  type="text" 
                  placeholder='Enter your username' 
                  required 
                />
                <div className='absolute inset-y-0 right-3 flex items-center pointer-events-none'>
                  <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className='space-y-2'>
              <label className='text-sm font-semibold text-gray-700 block'>Email Address</label>
              <div className='relative'>
                <input 
                  onChange={(e)=>setEmail(e.target.value)} 
                  value={email} 
                  className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 focus:bg-white text-gray-900' 
                  type="email" 
                  placeholder='your@email.com' 
                  required 
                />
                <div className='absolute inset-y-0 right-3 flex items-center pointer-events-none'>
                  <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className='space-y-2'>
              <label className='text-sm font-semibold text-gray-700 block'>Password</label>
              <div className='relative'>
                <input 
                  onChange={(e)=>setPassword(e.target.value)} 
                  value={password} 
                  className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 focus:bg-white text-gray-900' 
                  type="password" 
                  placeholder='Enter your password' 
                  required
                />
                <div className='absolute inset-y-0 right-3 flex items-center pointer-events-none'>
                  <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'></path>
                  </svg>
                </div>
              </div>
              <p className='text-xs text-gray-500 mt-1'>Use your registration number as password</p>
            </div>

            {/* Login Button */}
            <button 
              className='w-full bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-800 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-lg' 
              type="submit"
            > 
              <span className='flex items-center justify-center'>
                <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'></path>
                </svg>
                LOGIN
              </span>
            </button>
          </form>

          {/* Footer */}
          <div className='mt-8 text-center'>
            <div className='flex items-center justify-center space-x-2 text-xs text-gray-500'>
              <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
              <span>Secure Admin Access</span>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className='text-center mt-6'>
          <p className='text-xs text-gray-500'>
            E-Kampus UZ  © ENACTUS2025
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login