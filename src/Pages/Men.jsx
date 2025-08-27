import React, { useContext, useEffect, useState } from 'react'
import ShopContext from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';


const Men = () => {
    const { products } = useContext(ShopContext)
    const [ men,setMen ] = useState([]);

    useEffect(()=>{
          if (products) {
            setMen(products.slice(10,12))  //Add filter Men clothing  rather than slice
          }
      },[products])
    
    

  return (
    <div className='container-padding py-8'>
       <div className='text-center py-8 text-3xl'>
            <Title text1={'MENS'} text2={'WEAR'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            A Collection of Mens-Wear. Style yourself with the best mens wear that the UZ shop can offer!
            </p>
        </div>

        {/* Rendering Products */}
         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5'>
            {
            men.map((item,index)=>(
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
              ))
            }
        </div> 
    </div>
     
  
  )
}


export default Men
