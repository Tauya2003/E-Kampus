import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';


const Men = () => {
  const {products } = useContext(ShopContext)
  const [ menProd,setMenProd ] = useState([]);

  useEffect(()=>{
      if (products) {
        setMenProd(products.slice(52,56)) //Add filter rather than slice
      }
  },[])

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={"MEN'S"} text2={"PRODUCTS"}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
             A Collection of products related to Men encompassing all categories for the Male fashion sense.       
            </p>
        </div>

        {/* Rendering Products */}
         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5'>
            {
            menProd.map((item,index)=>(
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
              ))
            }
        </div> 
    </div>
     
  
  )
}


export default Men