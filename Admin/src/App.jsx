import React, { useEffect, useState } from 'react'
import Login from './Components/Login'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import Orders from './pages/Orders'
import Add from './Pages/Add'
import List from './pages/List'
import {ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Routes,Route } from 'react-router-dom'

//export const backendURL = import.meta

export const regUrl = 'https://towidhonza.softwarez.co.zw/accounts/register/'
export const logUrl = 'https://towidhonza.softwarez.co.zw/accounts/login/'

const App = () => {

  const [token, setToken ] = useState('')
  
 
  //useEffect(()=>{
  //    localStorage.setItem('token', token)
 // }, [token])

  
  return (
    
      <div className='bg-gray-50  min-h-screen transition-colors duration-300'>
        
        
        <Login /> 
          
            <Navbar />
            <hr className='border-gray-200 dark:border-gray-700' />
            <div className='flex w-full'>
              <Sidebar/>
              <div className='mx-auto my-8 ml-[max[5vw,25px]] text-gray-600 text-base w-[70%]'>
                <Routes>
                  <Route path='/Add' element={<Add />} />
                  <Route path='/List' element={<List />}/>
                  <Route path='/Orders' element={<Orders />} />
                </Routes>
              </div>
            </div> 
    </div>
      
      )
    
}

export default App