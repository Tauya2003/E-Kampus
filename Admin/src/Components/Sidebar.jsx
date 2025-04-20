import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

            <NavLink className='flex items-center gap-3 border-gray-300 px-3 py-2 rounded-l border-r-0' to="/Add">
            <img src={assets.add_icon} alt="" />
            <p className='hidden md:block'>Add Items</p>
            </NavLink>

            <NavLink className='flex items-center gap-3 border-gray-300 px-3 py-2 rounded-l border-r-0' to="/List">
            <img src={assets.order_icon} alt="" />
            <p className='hidden md:block'>List Items</p>
            </NavLink>

            <NavLink className='flex items-center gap-3 border-gray-300 px-3 py-2 rounded-l border-r-0' to="/Orders">
            <img src={assets.order_icon} alt="" />
            <p className='hidden md:block'>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar