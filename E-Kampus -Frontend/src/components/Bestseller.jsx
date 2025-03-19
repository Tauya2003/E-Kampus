import React from 'react'
import { useEffect, useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
const Bestseller = () => {
    const {products } = useContext(ShopContext)
    const [bestseller,setBestseller] = useState([]);

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller));
        setBestseller(bestProduct.slice(0,5))
    },[])
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'BEST'} text2={'SELLERS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
             @Enactus Aquaflora @Enactus Greens and Grocer
            </p>
        </div>
    </div>
  )
}

export default Bestseller