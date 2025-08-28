import React from 'react'
import { useEffect, useContext, useState } from 'react';
import ShopContext from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { useSectionAnimation } from '../hooks/useGSAP';

const Bestseller = () => {
    const {products } = useContext(ShopContext)
    const [bestseller,setBestseller] = useState([]);

    // GSAP animations
    const { sectionRef, titleRef, contentRef } = useSectionAnimation();

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller));
        setBestseller(bestProduct.slice(3,13))
    },[products])

  return (
    <div ref={sectionRef} className='my-10'>
        <div ref={titleRef} className='text-center py-8 text-3xl'>
            <Title text1={'BEST'} text2={'SELLERS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
             Our Bestsellers for this week!
            </p>
        </div>

        <div ref={contentRef} className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-6'>
          {
            bestseller.map((item,index)=>(
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          }
        </div>
    </div>
  )
}

export default Bestseller
