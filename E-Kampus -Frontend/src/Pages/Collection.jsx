import React, {useContext, useState }from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'


const Collection = () => {

    const { products } = useContext(ShopContext)
    const [showFilter, setShowFilter] = useState(false)

    return (
       <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
        
        {/* Filter */}
        <div className='min-w-60'>
            <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
                <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : '' }`} />
            </p>
            
            {/* Filter by category */}
            <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                <p className='mb-3 text-sm font-medium'>CATERGORIES</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Men'} /> Men
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Women'} /> Women
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Electrical & Appliances'} /> Electrical & Appliances
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Groceries'} /> Groceries
                    </p>
                </div>
            </div>
            {/* SubCatergory Filter*/}
            <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                <p className='mb-3 text-sm font-medium'>TYPE</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Clothes-Men'} /> Men's Clothes
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Clothes-Women'} /> Women's Clothes
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Shoes-Women'} /> Men's Shoes
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Shoes-Women'} /> Women's Shoes
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Appliances'} /> Appliances
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Groceries'} /> Breakfasts
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Groceries'} /> Beverages
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Groceries'} /> Snacks
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Groceries'} /> Fruits
                    </p>
                </div>
            </div>
        </div>
        {/* Right-Side */}
        <div className='flex-1'>
            <div className='flex justify-between text-base sm:text-2xl mb-4'>
                <Title text1={'ALL'} text2={'COLLECTIONS'}/>

            </div>
        </div>
    </div>
  )
}

export default Collection