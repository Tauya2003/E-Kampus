import React, { useState, useEffect, useContext, useRef } from 'react'
import ShopContext from '../context/ShopContext'
import { useLocation } from 'react-router-dom'
import { Input, Button } from './ui'
import { BiX, BiFilter, BiSort } from 'react-icons/bi'

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch, navigate } = useContext(ShopContext)
  const [visible, setVisible] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const location = useLocation()
  const searchRef = useRef(null)

  // Sample search suggestions - in real app, this would come from API
  const sampleSuggestions = [
    'Corn flakes',
    'Peanut butter',
    'Brown sugar',
    'Cerevita',
    'Men\'s clothing',
    'Women\'s shoes',
    'Electronics',
    'Accommodation near campus',
    'Fast food delivery',
    'Study snacks'
  ]

  useEffect(() => {
    // Show search bar on Collection page or when explicitly shown
    if (location.pathname.includes('Collection') || location.pathname.includes('Food')) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [location])

  useEffect(() => {
    // Generate suggestions based on search input
    if (search && search.length > 1) {
      const filtered = sampleSuggestions.filter(item =>
        item.toLowerCase().includes(search.toLowerCase())
      )
      setSearchSuggestions(filtered.slice(0, 5)) // Limit to 5 suggestions
      setShowSuggestions(true)
    } else {
      setSearchSuggestions([])
      setShowSuggestions(false)
    }
  }, [search])

  useEffect(() => {
    // Focus search input when shown
    if (showSearch && searchRef.current) {
      searchRef.current.focus()
    }
  }, [showSearch])

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const handleClearSearch = () => {
    setSearch('')
    setShowSuggestions(false)
  }

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion)
    setShowSuggestions(false)
  }

  const handleCloseSearch = () => {
    setShowSearch(false)
    setSearch('')
    setShowSuggestions(false)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setShowSuggestions(false)
    // In a real app, this might trigger navigation or API call
  }

  // Handle click outside to close suggestions
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



  return (
    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-primary-100 py-6 animate-slide-up">
      <div className="container-padding">
        <div className="max-w-4xl mx-auto">

          {/* Search Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              Find What You're Looking For
            </h2>
            <p className="text-neutral-600">
              Search through thousands of products, food options, and accommodation
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative" ref={searchRef}>
            <div className="relative">
              <Input.Search
                value={search}
                onChange={handleSearchChange}
                onClear={handleClearSearch}
                placeholder="Search for products, food, accommodation..."
                className="text-lg py-4 px-6 shadow-soft hover:shadow-moderate focus:shadow-moderate"
                showClearButton={true}
              />

              {/* Search Button */}
              <Button
                type="submit"
                variant="primary"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                size="md"
              >
                Search
              </Button>
            </div>

            {/* Search Suggestions */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-moderate border border-neutral-200 z-50 max-h-64 overflow-y-auto">
                <div className="p-2">
                  <p className="text-xs text-neutral-500 px-3 py-2 font-medium">
                    Suggestions
                  </p>
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </form>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <span>Popular:</span>
              {['Snacks', 'Breakfast', 'Accommodation', 'Electronics'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearch(tag)}
                  className="px-3 py-1 bg-white rounded-full text-primary-600 hover:bg-primary-50 transition-colors duration-200 shadow-soft hover:shadow-moderate"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-primary-200">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                icon={<BiFilter className="w-4 h-4" />}
                className="text-neutral-600"
              >
                Filters
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={<BiSort className="w-4 h-4" />}
                className="text-neutral-600"
              >
                Sort
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleCloseSearch}
              icon={<BiX className="w-4 h-4" />}
              className="text-neutral-600"
            >
              Close Search
            </Button>
          </div>

          {/* Search Results Info */}
          {search && (
            <div className="mt-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30">
              <p className="text-sm text-neutral-600 text-center">
                Searching for "<span className="font-medium text-primary-600">{search}</span>"
                {location.pathname.includes('Collection') && ' in all products'}
                {location.pathname.includes('Food') && ' in food items'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchBar
