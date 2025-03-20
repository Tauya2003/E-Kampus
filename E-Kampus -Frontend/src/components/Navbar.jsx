import React from 'react'
import {assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
    const [visible,setVisible] = useState(false);

  return (
    <div className='flex justify-between items-center py-4 font-medium'>
        
        <Link to='/' className='relative'>
        <img src={assets.E_logo} alt='logo' className='w-38 cursor-pointer' />
        </Link>

        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/Collection' className='flex flex-col items-center gap-1'>
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/Men' className='flex flex-col items-center gap-1 '>
                <p>MEN</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/Women' className='flex flex-col items-center gap-1'>
                <p>WOMEN</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/ElectricalAppliances' className='flex flex-col items-center gap-1'>
                <p>ELECTRICAL & APPLIANCES</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/Groceries' className='flex flex-col items-center gap-1 '>
                <p>GROCERIES</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/Services' className='flex flex-col items-center gap-1'>
                <p>SERVICES</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
        </ul>

        <div className='flex items-center gap-6'>
                <img src={assets.search_icon} alt="" className='w-5 cursor-pointer' />

                <div className="group relative">
                    <img src={assets.profile_icon} alt="profile-icon" className="w-5 cursor-pointer" />
                    <div className="hidden group-hover:block transition duration-200 ease-in-out absolute right-0 pt-4">
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                            <p className='cursor-pointer hover:text-black'>My Profile</p>
                            <p className='cursor-pointer hover:text-black'>Orders</p>
                            <p className='cursor-pointer hover:text-black'>Logout</p>
                        </div>
                    </div>
                </div>
                <Link to='/Cart' className='relative'>
                    <img src={assets.cart_icon} alt="cart-icon" className="w-5 min-w-5" />
                        <p className='absolute right-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]'>10</p>                
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="" className='w-5 cursor pointer sm:hidden' />
        </div>

        {/*Sibar Menu for small screens*/}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown_icon} alt="" className='h-4 rotate-180' />
                        <p>Back</p>
                    </div>

                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/Collection'>COLLECTION</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/ClothingMen'>MEN</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/ClothingWomen'>WOMEN</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/ElectricalAppliances'>ELECTRICAL & APPLIANCES</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/Groceries'>GROCERIES</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/Services'>SERVICES</NavLink>

                </div>
        </div>

    </div>
  )
}

export default Navbar