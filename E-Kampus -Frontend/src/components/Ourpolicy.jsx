import React from 'react'
import { assets } from '../assets/assets'

const Ourpolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-xs text-xs sm:text-sm md-text-base text-gray-700'>
        <div>
            <img src={assets.exchange_icon} alt="" className='w-12 m-auto mb-5' />
            <p className='font-semibold'>Easy Exchange</p>
            <p className='text-gray-500'>We offer hasslefree exchange policy</p>
        </div>
        <div>
            <img src={assets.quality_icon} alt="" className='w-12 m-auto mb-5' />
            <p className='font-semibold'>4-Day return policy</p>
            <p className='text-gray-500'>We provide 4 days free return policy</p>
        </div>
        <div>
            <img src={assets.support_img} alt="" className='w-12 m-auto mb-5' />
            <p className='font-semibold'>Best Customer support</p>
            <p className='text-gray-500'>We provide 24/7 customer support</p>
        </div>
    </div>
  )
}

export default Ourpolicy