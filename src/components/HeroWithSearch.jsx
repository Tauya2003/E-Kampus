import React, { useState, useEffect, useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import ShopContext from '../context/ShopContext'
import { Input, Button } from './ui'
import { BiSearch, BiX, BiTrendingUp } from 'react-icons/bi'
import { useScrollAnimation } from '../hooks/useGSAP'

const HeroWithSearch = () => {
  const {
    search,
    setSearch,
    showSearch,
    setShowSearch,
    products,
    navigate
  } = useContext(ShopContext)
  
  const [searchSuggestions, setSearchSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const searchRef = useRef(null)

  // GSAP animations
  const heroRef = useScrollAnimation({
    from: { opacity: 0 },
    to: { opacity: 1 },
    duration: 1.2,
    ease: "power2.out"
  })

  const searchOverlayRef = useScrollAnimation({
    from: { opacity: 0, scale: 0.9, y: 30 },
    to: { opacity: 1, scale: 1, y: 0 },
    duration: 1,
    ease: "power2.out",
    delay: 0.3
  })

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
    <div ref={heroRef} className='relative h-[100vh] border  border-gray-400 overflow-hidden'>
      {/* Hero Image - Full Width */}
      <div className='w-full h-full relative'>
        <img className='w-full h-full object-cover' alt="Hero" src={assets.hero_img} />
        
        {/* Desktop Search Overlay */}
        <div className='hidden sm:block absolute inset-0 search-backdrop bg-opacity-20'>
          <div ref={searchOverlayRef} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-6'>
            <div className='search-glass-effect p-6 shadow-2xl'>
              <div className='text-center mb-4'>
                <h3 className='text-lg font-semibold text-gray-800 mb-1'>Find Anything</h3>
                <p className='text-sm text-gray-600'>Products, food, accommodation & more</p>
              </div>
              
              <form onSubmit={handleSearchSubmit} className='relative' ref={searchRef}>
                <div className='relative bg-red-500'>
                  <Input.Search
                    value={search}
                    onChange={handleSearchChange}
                    onClear={handleClearSearch}
                    placeholder="Search..."
                    className="text-base py-3 rounded-none bg-white shadow-lg border-gray-200 focus:border-0 border-none ring-0"
                    showClearButton={true}
                  />
                  
                  <Button
                    type="submit"
                    variant="black"
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
                          className="suggestion-item w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-black/10 hover:text-black transition-colors duration-200 flex items-center justify-between"
                        >
                          <span>{suggestion.text}</span>
                          <span className="text-xs text-gray-400">{suggestion.category}s</span>
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
                      className='trending-tag px-3 py-1 bg-gray-100 hover:bg-black/10 text-xs text-gray-600 hover:text-black rounded-full transition-all duration-200'
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
      <div className='sm:hidden absolute top-4 right-4 z-40'>
        <Button
          onClick={toggleMobileSearch}
          variant={isMobileSearchOpen ? "danger" : "black"}
          size="sm"
          className="rounded-full shadow-lg backdrop-blur-sm bg-opacity-90"
        >
          {isMobileSearchOpen ? <BiX className="w-5 h-5" /> : <BiSearch className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Search Modal */}
      {isMobileSearchOpen && (
        <div className='sm:hidden absolute inset-0 search-backdrop bg-opacity-50 z-30 flex items-center justify-center p-4'>
          <div className='mobile-search-modal w-full max-w-sm search-glass-effect p-6 shadow-2xl'>
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
                      className='trending-tag px-3 py-2 bg-gray-100 hover:bg-black/10 text-xs text-gray-600 hover:text-black rounded-lg transition-all duration-200 text-center'
                    >
                      {trending}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                variant="black"
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
