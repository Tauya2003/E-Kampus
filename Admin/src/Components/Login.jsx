import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, Link } from 'react-router-dom'
import Navbar from './Navbar'
import Title from './Title'
import { logUrl } from '../App'

const Login = () => {
    const [email,setEmail ] = useState('')
    const [password,setPassword ] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.post(logUrl + '/api/user/admin',{email,password})
            console.log(response)
            {/*if (response.data.success) {
                setToken(response.data.token)
                } else {
                 toast.error(response.data.message)
                }
                 */}
            console.log(email,password)
        } catch (error) {
            console.log(error)
            
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full shadow-2xl '>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <div className='text-2xl'>
            <Title text1={'ADMIN'} text2={'PANEL'}/>
        </div>
            <form onSubmit={onSubmitHandler}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium border-gray-700 mb-2'>Email Address</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-400 outline-none' type="email" placeholder='your@email.com' required />
                </div>
                <div>
                    <p className='text-sm font-medium border-gray-700 mb-2'>Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-400 outline-none' type="Password" placeholder='Enter your Password' required/>
                </div>

                <Link to='/Add'>
                <button className='rounded-md cursor-pointer w-full px-4 py-2 mt-4 bg-black text-white active:bg-gray-700' type="submit"> LOGIN </button>
                </Link>
            </form>
        </div>

    </div>
  )
}

export default Login