import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import ShopContext from '../context/ShopContext'

const Footer = () => {
   const {navigate} = useContext(ShopContext)

  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

            <div>
                <img src={assets.E_logo} alt="" className='mb-5 w-38'/>
                <p className='w-full md:w-2/3 text-gray-600'>
                    E-Kampus is a platform that connects students with opportunities to learn, grow and earn.
                </p>
            </div>

            <div>
              <p className='text-xl font-medium mb-5'>E-KAMPUS</p>
              <ul className='flex flex-col gap-1 text-gray-600 cursor-pointer'>
                <li>Home </li>
                <li>Delivery </li>
                <li onClick={()=>navigate('/About')} >About Enactus UZ</li>
                <li>Privacy policy </li>
              </ul>
            </div> 

            <div>
              <p className='tex-xl font-medium'>Contact us</p>
              <ul className='flex flex-col gap-1 text-gray-600 cursor-pointer'>
                <li>contact@enactus.uz.ac.zw</li>
                <li>uz.ac.zw</li>
                <li>+263 78 296 5167</li>
              </ul>
            </div>

            
          </div>
        <div>
          <hr />
          <p className='py-5 text-sm text-center'>Copyright 2025@ EnactusUZ - All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer