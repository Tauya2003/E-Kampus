import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useLocation } from 'react-router-dom'
import ShopContext from '../context/ShopContext'
import { Badge, Button, Input } from './ui'
import { BiUser, BiShoppingBag, BiMenu, BiX, BiHeart } from 'react-icons/bi'
import { FaAppleAlt, FaBed, FaShoppingBag, FaHome } from 'react-icons/fa'

const Navbar = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)
  const { search, setSearch, getCartCount, navigate, setShowWishlist, getWishlistCount } = useContext(ShopContext)
  const location = useLocation()

  const navigationItems = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/Food', label: 'Food', icon: <FaAppleAlt /> },
    { path: '/Accoms', label: 'Accommodation', icon: <FaBed /> },
    { path: '/Collection', label: 'UZ Marketplace', icon: <FaShoppingBag /> }
  ]

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible)
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSearchClear = () => {
    setSearch('')
  }

  const handleFavouritesClick = () => {
    setShowWishlist(true)
  }

  const cartCount = getCartCount()

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200 shadow-soft">
        <div className="container-padding">
          <div className="flex justify-between items-center py-4">

            {/* Logo */}
            <Link to="/" className="flex items-center hover-lift">
              <img
                src={assets.E_logo}
                alt="E-Kampus Logo"
                className="h-8 md:h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8" role="navigation">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    relative flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all duration-200
                    ${isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50'
                    }
                  `}
                >
                  <span className="flex items-center gap-2 font-medium text-sm">
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </span>
                  <hr className="w-6 border-none h-0.5 bg-primary-500 opacity-0 transition-opacity duration-200" />
                </NavLink>
              ))}
            </nav>

            {/* Desktop Search Box */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <Input.Search
                value={search}
                onChange={handleSearchChange}
                onClear={handleSearchClear}
                placeholder="Search products, food, accommodation..."
                className="text-sm"
                showClearButton={true}
              />
            </div>

            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center gap-4">

              {/* Favourites Button */}
              <button
                onClick={handleFavouritesClick}
                className="relative p-2 rounded-xl text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
                aria-label={`Favourites with ${getWishlistCount()} items`}
              >
                <BiHeart className="w-5 h-5" />
                <Badge.Cart count={getWishlistCount()} />
              </button>

              {/* Profile Dropdown */}
              <div className="group relative">
                <Link
                  to="/Login"
                  className="p-2 rounded-xl text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 flex items-center"
                  aria-label="User profile"
                >
                  <BiUser className="w-5 h-5" />
                </Link>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white rounded-xl shadow-moderate border border-neutral-200 py-2 w-48 animate-fade-in">
                    <button
                      onClick={() => navigate('/Login')}
                      className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => navigate('/orders')}
                      className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                    >
                      Orders
                    </button>
                    <hr className="my-1 border-neutral-200" />
                    <button
                      onClick={() => navigate('/')}
                      className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>

              {/* Cart Button */}
              <Link
                to="/Cart"
                className="relative p-2 rounded-xl text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
                aria-label={`Shopping cart with ${cartCount} items`}
              >
                <BiShoppingBag className="w-5 h-5" />
                <Badge.Cart count={cartCount} />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="sm:hidden p-2 rounded-xl text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuVisible}
            >
              {mobileMenuVisible ? <BiX className="w-6 h-6" /> : <BiMenu className="w-6 h-6" />}
            </button>

            {/* Mobile Actions (Favourites & Cart) */}
            <div className="flex sm:hidden items-center gap-2 ml-2">
              <button
                onClick={handleFavouritesClick}
                className="relative p-2 rounded-xl text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
                aria-label={`Favourites with ${getWishlistCount()} items`}
              >
                <BiHeart className="w-5 h-5" />
                <Badge.Cart count={getWishlistCount()} />
              </button>

              <Link
                to="/Cart"
                className="relative p-2 rounded-xl text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
                aria-label={`Shopping cart with ${cartCount} items`}
              >
                <BiShoppingBag className="w-5 h-5" />
                <Badge.Cart count={cartCount} />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuVisible && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={toggleMobileMenu}
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        </div>
      )}

      {/* Mobile Menu */}
      <div className={`
        fixed top-0 right-0 z-50 h-full w-80 max-w-full bg-white shadow-strong transform transition-transform duration-300 lg:hidden
        ${mobileMenuVisible ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">

          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200">
            <h2 className="text-lg font-semibold text-neutral-900">Menu</h2>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-xl text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
              aria-label="Close menu"
            >
              <BiX className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Search */}
          <div className="px-6 py-4 border-b border-neutral-200 lg:hidden">
            <Input.Search
              value={search}
              onChange={handleSearchChange}
              onClear={handleSearchClear}
              placeholder="Search products, food, accommodation..."
              className="text-sm"
              showClearButton={true}
            />
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 py-4" role="navigation">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={toggleMobileMenu}
                className={({ isActive }) => `
                  flex items-center gap-3 px-6 py-4 text-base border-b border-neutral-100 transition-all duration-200
                  ${isActive
                    ? 'bg-primary-50 text-primary-600 border-l-4 border-l-primary-500'
                    : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-600'
                  }
                `}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Footer */}
          <div className="border-t border-neutral-200 p-4 space-y-2">
            <Button
              variant="outline"
              fullWidth
              onClick={() => {
                navigate('/Login')
                toggleMobileMenu()
              }}
              icon={<BiUser className="w-4 h-4" />}
            >
              My Profile
            </Button>
            <Button
              variant="ghost"
              fullWidth
              onClick={() => {
                navigate('/orders')
                toggleMobileMenu()
              }}
            >
              Orders
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
