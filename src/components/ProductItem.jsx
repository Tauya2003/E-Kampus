import React, { useContext, useState } from 'react'
import ShopContext from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { Card, Button, Badge } from './ui'
import { BiHeart, BiShoppingBag, BiShow } from 'react-icons/bi'

const ProductItem = ({ id, image, name, price, originalPrice, discount, category, inStock = true }) => {
  const { currency, addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useContext(ShopContext)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [addingToCart, setAddingToCart] = useState(false)

  const handleAddToCart = async (e) => {
    e.preventDefault() // Prevent navigation when clicking add to cart
    e.stopPropagation()

    setAddingToCart(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      if (addToCart) {
        addToCart(id, 'default')
      }
    } finally {
      setAddingToCart(false)
    }
  }

  const handleLikeToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (isInWishlist(id)) {
      removeFromWishlist(id)
    } else {
      addToWishlist(id)
    }
  }

  const isLiked = isInWishlist(id)

  const discountPercentage = originalPrice && price ?
    Math.round(((originalPrice - price) / originalPrice) * 100) : null

  return (
    <Link to={`/product/${id}`} className="block group">
      <Card
        interactive
        className="relative overflow-hidden group rounded-none"
        padding="none"
      >
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-square bg-gray-100">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 skeleton" />
          )}

          <img
            src={image?.[0] || '/placeholder-product.jpg'}
            alt={name}
            className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {!inStock && (
              <Badge variant="neutral" size="sm" className="bg-gray-800 text-white">
                Out of Stock
              </Badge>
            )}
            {discountPercentage && inStock && (
              <Badge variant="error" size="sm">
                -{discountPercentage}%
              </Badge>
            )}
            {category && (
              <Badge variant="campus" size="sm" className="capitalize">
                {category}
              </Badge>
            )}
          </div>

          {/* Action buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleLikeToggle}
              className={`p-2 rounded-full transition-all duration-200 ${
                isLiked
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
              }`}
              aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
            >
              <BiHeart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>

            <Link
              to={`/product/${id}`}
              className="p-2 rounded-full bg-white/90 text-gray-600 hover:bg-white hover:text-blue-500 transition-all duration-200"
              aria-label="View product details"
              onClick={(e) => e.stopPropagation()}
            >
              <BiShow className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick add to cart on hover */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <Button
              variant="campus"
              size="sm"
              fullWidth
              disabled={!inStock || addingToCart}
              loading={addingToCart}
              onClick={handleAddToCart}
              icon={<BiShoppingBag className="w-4 h-4" />}
              className="shadow-lg"
            >
              {addingToCart ? 'Adding...' : 'Add to Cart'}
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors duration-200">
            {name}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-blue-600">
                {currency}{price}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="text-xs text-gray-500 line-through">
                  {currency}{originalPrice}
                </span>
              )}
            </div>

            {!inStock && (
              <span className="text-xs text-red-500 font-medium">
                Unavailable
              </span>
            )}
          </div>

          {/* Rating placeholder - can be implemented later */}
          <div className="flex items-center gap-1 mt-2">
            <div className="flex text-yellow-400">
              {'★'.repeat(4)}{'☆'.repeat(1)}
            </div>
            <span className="text-xs text-gray-500">(4.0)</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default ProductItem
