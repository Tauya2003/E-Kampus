import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'

const FoodSpecialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // 🔥 SUPER SIMPLE EDITING INSTRUCTIONS:
  // 1. To add a new special: Copy any object below and paste it in the array
  // 2. Change the title, description, discount, and image
  // 3. To change colors: Look for 'bg-' and 'text-' classes
  // 4. To change slide speed: Change the number in setInterval (currently 4000 = 4 seconds)

  const specials = [
    {
      id: 1,
      title: "Fresh Breakfast Combo",
      description: "Start your day right with cereals, milk, and fresh fruits",
      discount: "25% OFF",
      image: assets.p_img53, // Corn flakes image
      bgColor: "bg-gradient-to-r from-orange-400 to-red-500",
      textColor: "text-white"
    },
    {
      id: 2,
      title: "Late Night Snack Pack",
      description: "Perfect for those study sessions - chips, drinks, and more",
      discount: "30% OFF",
      image: assets.p_img54, // Peanut butter image
      bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      textColor: "text-white"
    },
    {
      id: 3,
      title: "Healthy Energy Boost",
      description: "Nutritious snacks and beverages to keep you energized",
      discount: "20% OFF",
      image: assets.p_img55, // Brown sugar image
      bgColor: "bg-gradient-to-r from-green-400 to-blue-500",
      textColor: "text-white"
    },
    {
      id: 4,
      title: "Weekend Grocery Bundle",
      description: "Stock up for the weekend with our mega grocery pack",
      discount: "35% OFF",
      image: assets.p_img56, // Cerevita image
      bgColor: "bg-gradient-to-r from-yellow-400 to-orange-500",
      textColor: "text-white"
    }
  ]

  // Auto-slide functionality
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % specials.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(slideInterval)
  }, [specials.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % specials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + specials.length) % specials.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className='relative w-full h-96 rounded-2xl overflow-hidden shadow-xl'>
      {/* Slides */}
      {specials.map((special, index) => (
        <div
          key={special.id}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          } ${special.bgColor}`}
        >
          <div className='flex h-full items-center justify-between px-8 sm:px-16'>
            {/* Left Content */}
            <div className={`flex-1 ${special.textColor}`}>
              <div className='mb-4'>
                <span className='bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium'>
                  🔥 SPECIAL OFFER
                </span>
              </div>
              <h2 className='text-3xl sm:text-5xl font-bold mb-4 leading-tight'>
                {special.title}
              </h2>
              <p className='text-lg sm:text-xl mb-6 opacity-90 max-w-md'>
                {special.description}
              </p>
              <div className='flex items-center gap-4'>
                <span className='bg-white text-gray-900 px-6 py-3 rounded-lg font-bold text-xl'>
                  {special.discount}
                </span>
                <button className='bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/30 transition-all'>
                  ORDER NOW
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className='sm:block flex-1 flex justify-center'>
              <div className='relative'>
                <div className='w-64 h-64 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center'>
                  <img 
                    src={special.image} 
                    alt={special.title}
                    className='w-48 h-48 object-cover rounded-full shadow-lg'
                  />
                </div>
                {/* Floating discount badge */}
                <div className='absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm animate-bounce'>
                  {special.discount}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all'
      >
        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 19l-7-7 7-7'></path>
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all'
      >
        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5l7 7-7 7'></path>
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
        {specials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className='absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm'>
        {currentSlide + 1} / {specials.length}
      </div>
    </div>
  )
}

export default FoodSpecialSlider