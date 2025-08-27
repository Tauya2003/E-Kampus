import React, { useContext, useEffect, useState } from 'react'
import ShopContext from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';


const ElectricalAppliances = () => {
  const {products } = useContext(ShopContext)
  const [ appliance,setApplianceProd ] = useState([]);

  useEffect(()=>{
      if (products) {
        setApplianceProd(products.slice(60,63))  //Add filter rather than slice
      }
  },[products])

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={"ELECTRICAL "} text2={"& APPLIANCES"}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
             A Collection of products related to Electrical and Appliances.       
            </p>
        </div>

        {/* Rendering Products */}
         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5'>
            {
            appliance.map((item,index)=>(
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
              ))
            }
        </div> 
    </div>
     
  
  )
}

export default ElectricalAppliances