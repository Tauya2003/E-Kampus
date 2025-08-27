import React from 'react'
import Title from '../components/Title'

const Orders = () => {
  return (
    <div className='container-padding py-8'>
      <div className='text-2xl mb-8'>
        <Title text1={'YOUR'} text2={'ORDERS'} />
      </div>
      <div className='text-gray-600'>
        <p>Your order history will appear here.</p>
      </div>
    </div>
  )
}

export default Orders
