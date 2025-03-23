import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Product = () => {
  const { productId } = useParams()
  const {products} = useContext(ShopContext)
  const [ productData, setProductData ] = useState(false)
  const [image, setImage] = useState("")

  const fetchPData = async () => {

    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        console.log(item)
        return null
      }
    })
  }

  useEffect(() => {
    fetchPData();
  }, [productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity duration-500 opacity-100'>
        {/*Prod-Data*/}
        <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

          {/*Prod-images*/}
          <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            <div className='sm:flex-col flex overflow-y-auto sm:overflow-x-scroll justify-between sm:justify-normal sm:w-[18.75%] w-full'>
              {
                productData.image.map((item,index)=> (
                  <img src={item} key={index} alt="" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
                ))
              }
            </div>
          </div>
        </div>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product