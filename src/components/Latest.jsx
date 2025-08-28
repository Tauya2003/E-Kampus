import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { Link } from 'react-router-dom';
import ShopContext from '../context/ShopContext';
import ProductItem from './ProductItem';
import { useSectionAnimation } from '../hooks/useGSAP';


const Latest = () => {

    const { products } = useContext(ShopContext)
    const [LatestProd,setLatestProducts] = useState([]);

    // GSAP animations
    const { sectionRef, titleRef, contentRef } = useSectionAnimation();
    
    
    useEffect(()=>{
            if (products) {
                setLatestProducts(products.slice(35,66));
            }
        }, [products]);

  return (
    <div ref={sectionRef} className='my-10'>
        <div ref={titleRef} className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'ARRIVALS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
             Latest Arrivals of our products. We are always updating our stock with the latest and greatest products to ensure you have the best shopping experience possible.
            </p>
        </div>

        {/* Rendering Products */}
         <div ref={contentRef} className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5'>
            {
            LatestProd.map((item,index)=>(
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
              ))
            }
        </div> 
    </div>
  )
}

export default Latest;
