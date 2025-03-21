import React, {useContext, useEffect, useState }from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'


const Collection = () => {

    const { products } = useContext(ShopContext)

    const [showFilter, setShowFilter] = useState(false)
    const [filteredProducts, setFilteredProducts] = useState(products || [])
    const [category,setCategory] = useState([])
    const [subCategory,setSubCategory] = useState([])
    const [sortType,setSortType] = useState('relevant')
    const [isLoading, setIsLoading] = useState(false)

    const toggleCategory = (e)=>{
        if(category.includes(e.target.value)){
            setCategory(prev=> prev.filter(item=> item !== e.target.value))
        }else{
            setCategory(prev=>[...prev,e.target.value])
        }
    }

    const toggleSubCategory = (e) =>
    {
        if(subCategory.includes(e.target.value)){
            setSubCategory(prev=> prev.filter(item=> item !== e.target.value))
        }else{
            setSubCategory(prev=>[...prev,e.target.value])
        }
    }

    const filterApply = () =>{
        setIsLoading(true)

        let productCopy = [...products];

        if (category.length > 0) {
            productCopy = productCopy.filter(item => category.includes(item.category));

        }

        if(subCategory.length > 0){
            productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
        }

        switch (sortType) { 
            case 'Low-high':
                productCopy = [...productCopy].sort((a, b) => a.price - b.price);
                break;

            case 'High-low':
                productCopy = [...productCopy].sort((a, b) => b.price - a.price);
                break;

            default:
                productCopy = [...products]; //Reset to default order
                break;
        }
        setFilteredProducts(productCopy)
        setIsLoading(false)
    }

   

        
      

    

    useEffect(()=>{
        filterApply()
        console.log("Selected Categories:", category);
        console.log("Selected SubCategories:", subCategory);
       },[category,subCategory, sortType]);

    return (
       <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
        
        {/* Filter */}
        <div className='min-w-60'>
            <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2' aria-label={showFilter ? 'Hide Filters' : 'Show Filters'} >FILTERS
                <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter ? 'rotate-180' : '' }`} />
            </p>
            
            {/* Filter by category */}
            <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                <p className='mb-3 text-sm font-medium'>CATERGORIES</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    <p className='flex gap-2'>
                        <label>
                        <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory} /> Men
                        </label>
                    </p>
                    <p className='flex gap-2'>
                       <label>
                        <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory} /> Women
                        </label>
                    </p>
                    <p className='flex gap-2'>
                        <label>
                        <input type="checkbox" className='w-3' value={'Electricals-Appliances'} onChange={toggleCategory}/> Electrical & Appliances
                        </label>
                    </p>
                    <p className='flex gap-2'>
                        <label>
                        <input type="checkbox" className='w-3' value={'Groceries'} onChange={toggleCategory} /> Groceries
                        </label>
                    </p>
                </div>
            </div>
            {/* SubCatergory Filter*/}
            <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                <p className='mb-3 text-sm font-medium'>TYPE</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    <p className='flex gap-2'>
                        <label>
                        <input type="checkbox" className='w-3' value={'Clothes-Men'} onChange={toggleSubCategory} /> Men's Clothes
                        </label>
                    </p>
                    <p className='flex gap-2'>
                        <label>
                        <input type="checkbox" className='w-3' value={'Clothes-Women'} onChange={toggleSubCategory} /> Women's Clothes
                        </label>
                    </p>
                    <p className='flex gap-2'>
                        <label>
                        <input type="checkbox" className='w-3' value={'Shoes-Men'} onChange={toggleSubCategory} /> Men's Shoes
                        </label>
                    </p>
                    <p className='flex gap-2'>
                        <label>
                        <input type="checkbox" className='w-3' value={'Shoes-Women'} onChange={toggleSubCategory} /> Women's Shoes
                        </label>
                    </p>
                    <p className='flex gap-2'>
                        <label>
                        <input type="checkbox" className='w-3' value={'Appliances'} onChange={toggleSubCategory} /> Appliances
                        </label>
                    </p>
                    <p className='flex gap-2'>
                        <label>
                        <input type="checkbox" className='w-3' value={'Breakfasts'} onChange={toggleSubCategory}/> Breakfasts
                        </label>
                    </p>
                    <p className='flex gap-2'>
                        <label>
                        <input type="checkbox" className='w-3' value={'Drinks'} onChange={toggleSubCategory} /> Beverages
                        </label>
                    </p>
                    <p className='flex gap-2'>
                        <label>
                        <input type="checkbox" className='w-3' value={'Snacks'} onChange={toggleSubCategory} /> Snacks
                        </label>
                    </p>
                    <p className='flex gap-2'>
                        <label>
                        <input type="checkbox" className='w-3' value={'Fruits'} onChange={toggleSubCategory} /> Fruits
                        </label>
                    </p>
                </div>
            </div>
        </div>
        {/* Right-Side */}
        <div className='flex-1'>
            <div className='flex justify-between text-base sm:text-2xl mb-4'>
                <Title text1={'ALL'} text2={'COLLECTIONS'}/>

                {/* Sort logic*/}
                <select onChange={(e)=>setSortType(e.target.value)}className='border-2 border-gray-300 text-sm px-2'>
                    <option value="relevant">Sort By: Relevant</option>
                    <option value="Low-high">Sort By: Low to High</option>
                    <option value="High-low">Sort By: High to Low</option>
                </select>
            </div>

            {/*Product mapping */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                { isLoading ? (
                    <p>Processing Filters....</p>
                ) : (
                    filteredProducts.length > 0 ? (
                        filteredProducts.map((item,index)=>(
                            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                        ))
                    ) : ( <p className='flex justify-between text-base sm:text-2xl mb-4'> No Products found matching your filters!</p>)
                )}     
            </div>
                
                    
        </div>
    </div>
  )
}

export default Collection