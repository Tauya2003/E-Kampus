import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod')
    const {navigate} = useContext(ShopContext)



  return (
    <div>
      {/*------------Left side-------------*/}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'> 
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>

        <div className='flex gap-3'>
          <input type="text" placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input type="text" placeholder='Last Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input type="password" placeholder='Reg Number' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input type="email" placeholder='Email address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <div className='flex gap-3'>
          <input type="number" placeholder='Phone Number' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input type="text" placeholder='Campus Location' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>

      </div>
        {/*----Right Side */}
         <div className='mt-8'>

            <div className='mt-8 min-w-80'>
              <CartTotal/>
            </div>

            <div className='mt-12 '>
              <Title text1={'PAYMENT'} text2={'METHOD'}/>
              {/*-----Select payment ----- */}
              <div onClick={()=>setMethod('ecocash')} className='flex gap-5 flex-col lg:flex-row'>
                  <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                    <p className={`min-w-3.5 border rounded-full ${ method === 'ecocash' ? 'bg-green-400' : ''}`}></p>
                    <img className='h-4 mx-4' src={assets.econet} alt="Econet Logo Here" /> 
                  </div>
                  <div onClick={()=>setMethod('innbucks')}className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                    <p className={`min-w-3.5 border rounded-full ${ method === 'innbucks' ? 'bg-green-400' : ''}`}></p>
                    <img className='h-4 mx-4' src={assets.innbucks} alt="InnBucks Logo Here" /> 
                  </div>
                  <div onClick={()=>setMethod('cod')}className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                    <p className={`min-w-3.5 border rounded-full ${ method === 'cod' ? 'bg-green-400' : ''}`}></p>
                    <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                  </div>
              </div>
            </div>
              <div>
                  <button onClick={()=>navigate('/orders')}className='bg-black text-white py-16 py-3 text-sm'type="submit">PLACE ORDER</button>
              </div>

         </div>
    </div>
  )
}

export default PlaceOrder