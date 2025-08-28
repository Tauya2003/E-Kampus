import React, { useState, useEffect, useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import ShopContext from '../context/ShopContext'
import { Input, Button } from './ui'
import { BiSearch, BiX, BiTrendingUp } from 'react-icons/bi'

const HeroWithSearch = () => {
  const { 
    search, 
    setSearch, 
    showSearch, 
    setShowSearch,
    products 
  } = useContext(ShopContext)
  
  const [searchSuggestions, setSearchSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const searchRef = useRef(null)

  // Enhanced search suggestions with categories
  const generateSuggestions = (query) => {
    if (!query || query.length < 2) return []
    
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.subCategory.toLowerCase().includes(query.toLowerCase())
    )
    
    return filtered.slice(0, 5).map(product => ({
      type: 'product',
      text: product.name,
      category: product.category,
      id: product._id
    }))
  }

  // Trending searches
  const trendingSearches = [
    'Latest Arrivals', 
    'Electronics', 
    'Corn Flakes', 
    'Men\'s Clothing',
    'Power Bank',
    'Accommodation',
    'Breakfast Items',
    'Women\'s Shoes'
  ]

  useEffect(() => {
    if (search && search.length > 1) {
      const suggestions = generateSuggestions(search)
      setSearchSuggestions(suggestions)
      setShowSuggestions(true)
    } else {
      setSearchSuggestions([])
      setShowSuggestions(false)
    }
  }, [search, products])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const handleClearSearch = () => {
    setSearch('')
    setShowSuggestions(false)
  }

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion.text)
    setShowSuggestions(false)
    setIsMobileSearchOpen(false)
  }

  const handleTrendingClick = (trending) => {
    setSearch(trending)
    setShowSuggestions(false)
    setIsMobileSearchOpen(false)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setShowSuggestions(false)
    setIsMobileSearchOpen(false)
    // Navigate to collection page with search
    if (search.trim()) {
      window.location.href = '/Collection'
    }
  }

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen)
    if (!isMobileSearchOpen) {
      setTimeout(() => {
        searchRef.current?.querySelector('input')?.focus()
      }, 100)
    }
  }

  return (
    <div className='relative min-h-[500px] flex flex-col sm:flex-row border border-gray-400 overflow-hidden'>
      {/* Hero Content */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 relative z-10'>
        <div className='text-[#414141] px-6'>
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>BESTSELLERS</p>
          </div>
          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
            <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className='w-full sm:w-1/2 relative'>
        <img className='w-full h-full object-cover' alt="Hero" src={assets.hero_img} />
        
        {/* Desktop Search Overlay */}
        <div className='hidden sm:block absolute inset-0 search-backdrop bg-black bg-opacity-20'>
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-6'>
            <div className='search-glass-effect rounded-2xl p-6 shadow-2xl'>
              <div className='text-center mb-4'>
                <h3 className='text-lg font-semibold text-gray-800 mb-1'>Find Anything</h3>
                <p className='text-sm text-gray-600'>Products, food, accommodation & more</p>
              </div>
              
              <form onSubmit={handleSearchSubmit} className='relative' ref={searchRef}>
                <div className='relative'>
                  <Input.Search
                    value={search}
                    onChange={handleSearchChange}
                    onClear={handleClearSearch}
                    placeholder="Search..."
                    className="text-base py-3 bg-white shadow-lg border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                    showClearButton={true}
                  />
                  
                  <Button
                    type="submit"
                    variant="primary"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2"
                    size="sm"
                  >
                    <BiSearch className="w-4 h-4" />
                  </Button>
                </div>

                {/* Desktop Search Suggestions */}
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 search-glass-effect rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                    <div className="p-2">
                      <p className="text-xs text-gray-500 px-3 py-2 font-medium">
                        Product Suggestions
                      </p>
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="suggestion-item w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 flex items-center justify-between"
                        >
                          <span>{suggestion.text}</span>
                          <span className="text-xs text-gray-400">{suggestion.category}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </form>

              {/* Trending searches */}
              <div className='mt-4'>
                <div className='flex items-center gap-2 mb-2'>
                  <BiTrendingUp className='w-4 h-4 text-gray-500' />
                  <span className='text-xs text-gray-500 font-medium'>Trending</span>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {trendingSearches.slice(0, 4).map((trending, index) => (
                    <button
                      key={index}
                      onClick={() => handleTrendingClick(trending)}
                      className='trending-tag px-3 py-1 bg-gray-100 hover:bg-blue-100 text-xs text-gray-600 hover:text-blue-600 rounded-full transition-all duration-200'
                    >
                      {trending}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Toggle Button */}
      <div className='sm:hidden absolute top-4 right-4 z-20'>
        <Button
          onClick={toggleMobileSearch}
          variant={isMobileSearchOpen ? "danger" : "primary"}
          size="sm"
          className="rounded-full shadow-lg backdrop-blur-sm bg-opacity-90"
        >
          {isMobileSearchOpen ? <BiX className="w-5 h-5" /> : <BiSearch className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Search Modal */}
      {isMobileSearchOpen && (
        <div className='sm:hidden absolute inset-0 search-backdrop bg-black bg-opacity-50 z-30 flex items-center justify-center p-4'>
          <div className='mobile-search-modal w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl'>
            <div className='text-center mb-4'>
              <h3 className='text-lg font-semibold text-gray-800 mb-1'>Search Everything</h3>
              <p className='text-sm text-gray-600'>Products, food, accommodation & more</p>
            </div>
            
            <form onSubmit={handleSearchSubmit} className='relative' ref={searchRef}>
              <div className='relative'>
                <Input.Search
                  value={search}
                  onChange={handleSearchChange}
                  onClear={handleClearSearch}
                  placeholder="Type to search..."
                  className="text-base py-3 mb-4"
                  showClearButton={true}
                />
              </div>

              {/* Mobile Search Suggestions */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="mb-4 bg-gray-50 rounded-xl p-2 max-h-40 overflow-y-auto">
                  <p className="text-xs text-gray-500 px-2 py-1 font-medium">
                    Suggestions
                  </p>
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-2 py-2 rounded-lg text-sm text-gray-700 hover:bg-white transition-colors duration-200 flex items-center justify-between"
                    >
                      <span>{suggestion.text}</span>
                      <span className="text-xs text-gray-400">{suggestion.category}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Mobile Trending */}
              <div className='mb-4'>
                <div className='flex items-center gap-2 mb-2'>
                  <BiTrendingUp className='w-4 h-4 text-gray-500' />
                  <span className='text-xs text-gray-500 font-medium'>Trending</span>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  {trendingSearches.slice(0, 6).map((trending, index) => (
                    <button
                      key={index}
                      onClick={() => handleTrendingClick(trending)}
                      className='trending-tag px-3 py-2 bg-gray-100 hover:bg-blue-100 text-xs text-gray-600 hover:text-blue-600 rounded-lg transition-all duration-200 text-center'
                    >
                      {trending}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                className="mb-2"
              >
                Search Now
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default HeroWithSearch
