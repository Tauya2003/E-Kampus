import React, { useContext, useEffect, useState } from 'react'
import ShopContext from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';


const Women = () => {
  
 const { products } = useContext(ShopContext)
  const [ women,setWomen ] = useState([]);

    useEffect(()=>{
          if (products) {
            setWomen(products.slice(24,27))  //Add filter Men clothing  rather than slice
          }
      },[products])
    
    

  return (
    <div className='my-10'>
       <div className='text-center py-8 text-3xl'>
            <Title text1={'WOMENS'} text2={'WEAR'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            A Collection of Womens-Wear. Style yourself with the best ladies wear that the UZ shop can offer!
            </p>
        </div>

        {/* Rendering Products */}
         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5'>
            {
            women.map((item,index)=>(
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
              ))
            }
        </div> 
    </div>
     
  
  )
}

export default Women