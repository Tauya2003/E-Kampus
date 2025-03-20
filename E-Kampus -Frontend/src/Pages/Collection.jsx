import React, {useContext, useEffect, useState }from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import { use } from 'react'
import ProductItem from '../components/ProductItem'


const Collection = () => {

    const { products } = useContext(ShopContext)
    const [showFilter, setShowFilter] = useState(false)
    const [filteredProducts, setFilteredProducts] = useState([])
    const [catergory,setCatergory] = useState([])
    const [subCatergory,setSubCatergory] = useState([])

    const togglesCatergory = (e)=>{
        if(catergory.includes(e.target.value)){
            setCatergory(prev=> prev.filter(item=> item !== e.target.value))
        }else{
            setCatergory(prev=>[...prev,e.target.value])
        }
    }

    const toggleSubCategory = (e) =>
    {
        if(subCatergory.includes(e.target.value)){
            setSubCatergory(prev=> prev.filter(item=> item !== e.target.value))
        }else{
            setSubCatergory(prev=>[...prev,e.target.value])
        }
    }

    const filterApply = () =>{

        let productCopy = products.slice();

        if (catergory.length > 0) {
            productCopy = productCopy.filter(item => catergory.includes(item.catergory));

        }

        setFilteredProducts(productCopy)
    }

    useEffect(()=>{
        filterApply()
       },[catergory,subCatergory])

    useEffect(()=>{
        setFilteredProducts(products)
   },[])

   



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
                        <input type="checkbox" className='w-3' value={'Men'} onChange={togglesCatergory} /> Men
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Women'} onChange={togglesCatergory} /> Women
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Electrical & Appliances'} onChange={togglesCatergory}/> Electrical & Appliances
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Groceries'} onChange={togglesCatergory} /> Groceries
                    </p>
                </div>
            </div>
            {/* SubCatergory Filter*/}
            <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                <p className='mb-3 text-sm font-medium'>TYPE</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Clothes-Men'} onChange={toggleSubCategory} /> Men's Clothes
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Clothes-Women'} onChange={toggleSubCategory} /> Women's Clothes
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Shoes-Women'} onChange={toggleSubCategory} /> Men's Shoes
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Shoes-Women'} onChange={toggleSubCategory} /> Women's Shoes
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Appliances'} onChange={toggleSubCategory} /> Appliances
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Groceries'} onChange={toggleSubCategory}/> Breakfasts
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Groceries'} onChange={toggleSubCategory} /> Beverages
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Groceries'} onChange={toggleSubCategory} /> Snacks
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" className='w-3' value={'Groceries'} onChange={toggleSubCategory} /> Fruits
                    </p>
                </div>
            </div>
        </div>
        {/* Right-Side */}
        <div className='flex-1'>
            <div className='flex justify-between text-base sm:text-2xl mb-4'>
                <Title text1={'ALL'} text2={'COLLECTIONS'}/>

                {/* Sort logic*/}
                <select className='border-2 border-gray-300 text-sm px-2'>
                    <option value="relevant">Sort By: Relevant</option>
                    <option value="Low-high">Sort By: Low to High</option>
                    <option value="High-low">Sort By: Hight to Low</option>
                </select>
            </div>

            {/*Product mapping */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                {
                    filteredProducts.map((item,index)=>(
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }       
            </div>
                
                    
        </div>
    </div>
  )
}

export default Collection