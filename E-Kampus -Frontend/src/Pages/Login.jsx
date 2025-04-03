import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const Login = () => {
  
  const [currentState,setCurrentState] = useState('Login')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler} action="" method="post" className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-600'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
        </div>
        { currentState === 'Login' ? ''  : <input type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name'  required /> }  
        <input type="email" placeholder='Email Here' className='w-full px-3 py-2 border border-gray-800' required/>
        <input type="password" placeholder='Password' className='w-full px-3 py-2 border border-gray-800' required/>
          <div className='w-full flex justify-between text-sm mt-[-8px]'>

            <Link to='/ForgotPassword'>
            <p className='cursor-pointer'>Forgot Password?</p>
            </Link>

            {
              currentState === 'Login'
              ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>
              : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>

              
            }
          </div>
          <button className='bg-black text-white font-light px-8 py-2 mt-4 active:bg-gray-700 cursor-pointer' type='submit'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
      </form>
    </div>
  )
}

export default Login