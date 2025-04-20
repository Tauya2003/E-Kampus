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

const App = () => {

  const [token, setToken ] = useState(localStorage.getItem('token')?localStorage.getItem('token'): '1')
  

  useEffect(()=>{
      localStorage.setItem('token', token)
  }, [token])

  
  return (


    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
        {token === ""
          ? <Login setToken={setToken} />
          : <> 
          <Navbar setToken={setToken} />
          <hr />
            <div className='flex w-full'>
              <Sidebar/>
              <div className='mx-auto my-8 ml-[max[5vw,25px]] text-gray-600 text-base w-[70%]'>
                <Routes>
                  <Route path='/Add'  element={<Add token={token} />} />
                  <Route path='/List' element={<List token={token} />} />
                  <Route path='/Orders' element={<Orders token={token} />} />
                </Routes>
              </div>
            </div>
          </>
        }
    </div>
  )
}

export default App