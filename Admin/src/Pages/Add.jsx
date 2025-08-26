import React, { useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../Components/Title'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try{

    const formData = new FormData()

    image1 && formData.append('image1', image1)
    image2 && formData.append('image2', image2)
    image3 && formData.append('image3', image3)
    image4 && formData.append('image4', image4)

    formData.append('name', name)
    formData.append('description', descript)
    formData.append('price', price)
    formData.append('category', category)
    formData.append('subcategory', subcategory)
    formData.append('bestseller', Bseller)
    formData.append('sizes',JSON.stringify(sizes))

    console.log(...formData)
    const response = await axios.post('https://towidhonza.softwarez.co.zw/api/add/', formData)
    console.log(response.data)
  } catch(error) {

    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
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
          
          <select onChange={(e)=>setCategory(e.target.value)} value={category} className='cursor-pointer w-full px-3 py-2' >
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
          
          <select onChange={(e)=>setSubCategory(e.target.value)} value={subcategory} className=' cursor-pointer w-full px-3 py-2'>
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
          <div onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter( item => item !== "S") : [...prev, "S"])} className='cursor-pointer'>
            <p className={`${sizes.includes("S") ? "bg-pink-100": "bg-slate-200" } px-3 py-1 cursor-pointer`}>S</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter( item => item !== "M") : [...prev, "M"])} >
            <p className={`${sizes.includes("M") ? "bg-pink-100": "bg-slate-200" } px-3 py-1 cursor-pointer`}>M</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter( item => item !== "L") : [...prev, "L"])} >
            <p className={`${sizes.includes("L") ? "bg-pink-100": "bg-slate-200" } px-3 py-1 cursor-pointer`}>L</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter( item => item !== "XL") : [...prev, "XL"])} >
            <p className={`${sizes.includes("XL") ? "bg-pink-100": "bg-slate-200" } px-3 py-1 cursor-pointer`}>XL</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("XXL") ? prev.filter( item => item !== "XXL") : [...prev, "XXL"])} >
            <p className={`${sizes.includes("XXL") ? "bg-pink-100": "bg-slate-200" } px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("500G") ? prev.filter( item => item !== "500G") : [...prev, "500G"])} >
            <p className={`${sizes.includes("500G") ? "bg-pink-300": "bg-slate-200" } px-3 py-1 cursor-pointer`}>500g</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("1KG") ? prev.filter( item => item !== "1KG") : [...prev, "1KG"])} >
            <p className={`${sizes.includes("1KG") ? "bg-pink-300": "bg-slate-200" } px-3 py-1 cursor-pointer`}>1Kg</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("2KG") ? prev.filter( item => item !== "2KG") : [...prev, "2KG"])} >
            <p className={`${sizes.includes("2KG") ? "bg-pink-300": "bg-slate-200" } px-3 py-1 cursor-pointer`}>2Kg</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input onClick={()=> setBestseller(prev => !prev)}  type="checkbox"  id="bestseller" />
        <label className='cursor-pointer' htmlFor="bestseller">Add to Bestseller</label>
      </div>

      <button type="submit" className='w-28 py-3 mt-4 cursor-pointer bg-black text-white active:bg-gray-700'>ADD</button>

    </form>
  )
}

export default Add