import React, {useState, useEffect, useContext }from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)   
  

    return showSearch ? (
    <div className='border-x border-b border-amber-50 bg-gray-50 text-center'>
        <div className='inline-flex items-center border border-gray-300 px-4 py-4 my-8 mx-3 rounded-full w-3/4 sm:w-1/2'>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search' />
            <img src={assets.search_icon} alt="" className='w-4' />
        </div>
        <img onClick={()=>setShowSearch(false)} src={assets.cross_icon} alt="" className='inline w-4 cursor-pointer'/>
    </div>
  ) : null
}

export default SearchBar