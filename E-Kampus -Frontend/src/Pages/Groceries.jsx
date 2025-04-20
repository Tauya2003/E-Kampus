import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';

const Groceries = () => {
  const { products } = useContext(ShopContext)
  const [ groceries,setOurGroceries ] = useState([]);



  {/* const filterGroceries = () => {

    let ProductCopy = products.slice();
    let filterGroceries = []

      if (ProductCopy) {

        filterGroceries = ProductCopy.filter(item => products.category === 'Groceries')//Add filter rather than slice
        setOurGroceries(filterGroceries)//Add filter rather than slice
      }
  }
  */}

  useEffect(()=>{
      if (products) {
        setOurGroceries(products.slice(53,56))  //Add filter rather than slice
      }
  },[])

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'OUR'} text2={'GROCERIES'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            A Collection of Grocery products. Best greens that the UZ farm can offer!
            </p>
        </div>

        {/* Rendering Products */}
         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5'>
            {
            groceries.map((item,index)=>(
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
              ))
            }
        </div> 
    </div>
     
  
  )
}

export default Groceries