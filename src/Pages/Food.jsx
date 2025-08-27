import React, { useContext, useEffect, useState } from 'react'
import ShopContext from '../context/ShopContext'
import { Link } from 'react-router-dom'
import ProductItem from '../components/ProductItem'
import Title from '../components/Title'
import FoodSpecialSlider from '../components/FoodSpecialSlider'

const Food = () => {
  const { products, loading } = useContext(ShopContext)
  const [foodProducts, setFoodProducts] = useState([])
  

  useEffect(() => {
    if (products) {
      // Filter food products from groceries category
      const foodItems = products.filter(item => 
        item.category === 'Groceries' || 
        item.subCategory === 'Breakfasts' || 
        item.subCategory === 'Drinks' ||
        item.subCategory === 'Snacks' ||
        item.subCategory === 'Fruits'
      )
      setFoodProducts(foodItems)
    }
  }, [products])

  return (
    <div className='container-padding py-8'>
      {/* Food Specials Slider */}
      <FoodSpecialSlider /> 
      
      {/* Food Section Header */}
      <div className='text-center py-8 text-3xl mt-16'>
        <Title text1={'CAMPUS'} text2={'FOOD'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Fresh food and groceries delivered right to your dorm. From breakfast essentials to late-night snacks!
        </p>
      </div>

      {/* Food Products Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5'>
        {foodProducts.map((item, index) => (
          <ProductItem 
            key={index} 
            id={item._id} 
            image={item.image} 
            name={item.name} 
            price={item.price} 
          />
        ))}
      </div>

      {/* Call to Action */}
      <div className='text-center mt-16 py-8 bg-gray-50 rounded-lg'>
        <h3 className='text-2xl font-medium text-gray-800 mb-4'>Hungry? We've Got You Covered!</h3>
        <p className='text-gray-600 mb-6 max-w-2xl mx-auto'>
          Order now and get fresh food delivered to your location on campus. Fast, fresh, and affordable!
        </p>
        <ul className='py-20'>
          <p>Enjoy food from Jojo's restaurant. Located at the heart of campus, Students Union Basement.</p>
          <p>Order now and get it delivered to your location! Contact: 071 326 2810 </p>
        </ul>
        <Link to='/Jojo'>
        <button className={`bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer ${
            loading ? 'opacity-50 cursor-not-allowed' : 'active:bg-gray-700'
          }`} disabled={loading}>
          ORDER NOW
        </button>
        </Link>
      </div>
    </div>
  )
}

export default Food
