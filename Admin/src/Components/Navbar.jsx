import React from 'react'
import {assets} from '../assets/assets'
import { useState } from 'react'

const Navbar = () => {
  return (
    <div className='flex items-center py-2 justify-between px-[4%] shadow-amber-400'>
        <img src={assets.e_logo} alt="" className=' cursor-pointer w-[max(10%,80px)]' />
        <button  className=' cursor-pointer active:bg-gray-700 bg-gray-600 text-white px-5 py-2 sm:py-2 rounded-full sm:px-7 text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar