import React from 'react'
import ProductCarousel from '../components/carousel'

const Jojo = () => {
    //Jojo's food page, Collection of specials, promotions, and featured items(Make A carousel but use the placeholder images for now, Api integration later)
  return (
    <div className='container-padding py-8'>
      <div className='text-center text-2xl font-semibold mb-8'>JOJO'S STUFF HERE</div>
      <ProductCarousel />
    </div>
  )
}

export default Jojo
