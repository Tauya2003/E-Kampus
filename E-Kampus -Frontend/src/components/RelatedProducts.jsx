import React, { useEffect, useContext, useState } from 'react'
import ShopContext from '../context/ShopContext'
import ProductItem from './ProductItem'
import Title from './Title'


const RelatedProducts = ({category, subCategory}) => {
  
  const { products } = useContext(ShopContext)
  const [related,setRelated] = useState([])


  useEffect(() => {

      if (products.length > 0) {
        
          let productsCopy = products.slice();

          productsCopy = productsCopy.filter((item) => category === item.category && subCategory === item.subCategory)
          
          setRelated(productsCopy.slice())
      }

  }, [products, category, subCategory])
  
   
    return (
    <div className='my-25'>
      <div className=' text-center text-3xl py-2'>
      <Title text1={'RELATED'} text2={'PRODUCTS'}/>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          { related.length === 0 ? <p className='text-center text-gray-500'>No related products</p> 
            : (
          related.map((item,index) => (
              <ProductItem key={index} id={item._id} name={item.name} image={item.image} />
            ))
          )}
      </div>
    </div>
  )
}

export default RelatedProducts