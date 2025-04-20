import React, { useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../Components/Title'

const Add = () => {

  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

  const [name,setName] = useState("")
  const [descript,setDescript] = useState("")
  const [price,setPrice] = useState("")
  const [category,setCategory] = useState("Men")
  const [subcategory,setSubCategory] = useState("Shoes-Men")
  const [Bseller,setBestseller] = useState(false)
  const [sizes,setSizes] = useState([])


  return (
    <form className='flex flex-col w-full items-start gap-3'>
      <div>
      <div className='text-l'>
            <Title text1={'UPLOAD'} text2={'IMAGES (4)'}/>
        </div>
          

          <div className='flex gap-2'>
            <label htmlFor="image1">
              <img className=' cursor-pointer w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
              <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden/>
            </label>
            <label htmlFor="image2">
              <img className=' cursor-pointer w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
              <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden/>
            </label>
            <label htmlFor="image3">
              <img className=' cursor-pointer w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
              <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden/>
            </label>
            <label htmlFor="image4">
              <img className=' cursor-pointer w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
              <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden/>
            </label>
          </div>
      </div>

      <div className='w-full'>
      <div className='text-l'>
            <Title text1={'PRODUCT'} text2={'NAME'}/>
        </div>
          
        <input onChange={(e)=>setName(e.target.value)} value={name}  className='w-full max-w-[500px] py-2' type="text" placeholder='Product Name Here' required />
      </div>

      <div className=' w-full'>
      <div className='text-l'>
            <Title text1={'PRODUCT'} text2={'DESCRIPTION'}/>
        </div>
          
        <input onChange={(e)=>setDescript(e.target.value)} value={descript} className='w-full max-w-[500px] py-2' type="text" placeholder='Write content here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

        <div>
        <div className='text-l'>
            <Title text1={'PRODUCT'} text2={'CATERGORY'}/>
        </div>
          
          <select onChange={(e)=>setCategory(e.target.value)} className='cursor-pointer w-full px-3 py-2' >
            <option className='cursor-pointer' value="Men">Men</option>
            <option className='cursor-pointer' value="Women">Women</option>
            <option className='cursor-pointer' value="Electricals">Electrical & Appliances</option>
            <option className='cursor-pointer' value="Groceries">Groceries</option>
          </select>
        </div>

        <div>
        <div className='text-l'>
            <Title text1={'PRODUCT'} text2={'SUB-CATERGORY'}/>
        </div>
          
          <select onChange={(e)=>setSubCategory(e.target.value)} className=' cursor-pointer w-full px-3 py-2'>
            <option className='cursor-pointer' value="Shoes-Men">Men Shoes</option>
            <option className='cursor-pointer' value="Shoes-Women">Women Shoes</option>
            <option className='cursor-pointer' value="Clothes-Men">Men's Clothes</option>
            <option className='cursor-pointer' value="Clothes-Women">Women's Clothes</option>
            <option className='cursor-pointer' value="Breakfasts">Breakfasts</option>
            <option className='cursor-pointer'value="Drinks">Beverages</option>
            <option className='cursor-pointer'value="Snacks">Snacks</option>
            <option className='cursor-pointer'value="Fruits">Fruits</option>
            <option className='cursor-pointer' value="Electrical">Appliances</option>
          </select>
        </div>

        <div>
        <div className='text-l'>
            <Title text1={'PRODUCT'} text2={'PRICE'}/>
        </div>
          
         <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='25' min={0.5} required/>
        </div>
      </div>

      <div>
      <div className='text-l'>
            <Title text1={'PRODUCT'} text2={'SIZES'}/>
        </div>
          
        <div className='flex gap-3' required>
          <div>
            <p className='bg-slate-200 px-3 py-1 cursor-pointer'>S</p>
          </div>
          <div>
            <p className='bg-slate-200 px-3 py-1 cursor-pointer'>M</p>
          </div>
          <div>
            <p className='bg-slate-200 px-3 py-1 cursor-pointer'>L</p>
          </div>
          <div>
            <p className='bg-slate-200 px-3 py-1 cursor-pointer'>XL</p>
          </div>
          <div>
            <p className='bg-slate-200 px-3 py-1 cursor-pointer'>XXL</p>
          </div>
          <div>
            <p className='bg-slate-200 px-3 py-1 cursor-pointer'>500g</p>
          </div>
          <div>
            <p className='bg-slate-200 px-3 py-1 cursor-pointer'>1Kg</p>
          </div>
          <div>
            <p className='bg-slate-200 px-3 py-1 cursor-pointer'>2Kg</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input type="checkbox"  id="bestseller" />
        <label className='cursor-pointer' htmlFor="bestseller">Add to Bestseller</label>
      </div>

      <button type="submit" className='w-28 py-3 mt-4 cursor-pointer bg-black text-white active:bg-gray-700'>ADD</button>

    </form>
  )
}

export default Add