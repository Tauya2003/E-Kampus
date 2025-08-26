import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import AxiosApiService from '../services/axiosApiService'

const Login = () => {
  
  const [currentState, setCurrentState] = useState('Login')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const { navigate } = useContext(ShopContext)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (currentState === 'Login') {
        // Handle login
        const response = await AxiosApiService.login({
          email: formData.email,
          password: formData.password
        })
        
        if (response.success) {
          localStorage.setItem('token', response.token)
          toast.success('Login successful!')
          navigate('/')
        }
      } else {
        // Handle registration
        const response = await AxiosApiService.register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
        
        if (response.success) {
          toast.success('Registration successful!')
          setCurrentState('Login')
        }
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-600'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
        </div>
        {currentState === 'Login' ? '' : (
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className='w-full px-3 py-2 border border-gray-800' 
            placeholder='Name'  
            required 
          />
        )}  
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder='Email Here' 
          className='w-full px-3 py-2 border border-gray-800' 
          required
        />
        <input 
          type="password" 
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder='Password(Input REG number)' 
          className='w-full px-3 py-2 border border-gray-800' 
          required
        />
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <Link to='/ForgotPassword'>
            <p className='cursor-pointer'>Forgot Password?</p>
          </Link>

          {currentState === 'Login' ? (
            <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>
          ) : (
            <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
          )}
        </div>
        <button 
          className={`bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer ${
            loading ? 'opacity-50 cursor-not-allowed' : 'active:bg-gray-700'
          }`}
          type='submit'
          disabled={loading}
        >
          {loading ? 'Processing...' : (currentState === 'Login' ? 'Sign In' : 'Sign Up')}
        </button>
      </form>
    </div>
  )
}

export default Login