import React, { useContext } from 'react'
import ShopContext from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { BiX, BiShoppingBag, BiHeart } from 'react-icons/bi'
import { Button, Card, Badge } from './ui'

const WishlistModal = () => {
  const { 
    products, 
    currency, 
    wishlistItems, 
    showWishlist, 
    setShowWishlist, 
    removeFromWishlist,
    addToCart
  } = useContext(ShopContext)

  const wishlistProducts = products.filter(product => 
    wishlistItems.includes(product._id)
  )

  const handleAddToCart = (productId) => {
    addToCart(productId, 'default')
    removeFromWishlist(productId)
  }

  const handleClose = () => {
    setShowWishlist(false)
  }

  if (!showWishlist) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-strong max-w-2xl w-full max-h-[80vh] overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <BiHeart className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                My Wishlist
              </h2>
              <Badge variant="primary" size="sm">
                {wishlistItems.length}
              </Badge>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
              aria-label="Close wishlist"
            >
              <BiX className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(80vh-120px)]">
            {wishlistProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-6">
                <div className="text-6xl mb-4">💝</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Your wishlist is empty
                </h3>
                <p className="text-gray-500 text-center mb-6">
                  Start adding items you love to your wishlist by clicking the heart icon on products!
                </p>
                <Button 
                  variant="primary" 
                  onClick={handleClose}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {wishlistProducts.map((product) => (
                  <Card key={product._id} className="p-4">
                    <div className="flex gap-4">
                      
                      {/* Product Image */}
                      <Link 
                        to={`/product/${product._id}`}
                        onClick={handleClose}
                        className="flex-shrink-0"
                      >
                        <img
                          src={product.image?.[0] || '/placeholder-product.jpg'}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-lg hover:scale-105 transition-transform duration-200"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link 
                          to={`/product/${product._id}`}
                          onClick={handleClose}
                          className="block"
                        >
                          <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-bold text-blue-600">
                            {currency}{product.price}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              {currency}{product.originalPrice}
                            </span>
                          )}
                        </div>

                        {product.category && (
                          <Badge variant="campus" size="sm" className="mt-2 capitalize">
                            {product.category}
                          </Badge>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleAddToCart(product._id)}
                          icon={<BiShoppingBag className="w-4 h-4" />}
                          className="whitespace-nowrap"
                        >
                          Add to Cart
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromWishlist(product._id)}
                          icon={<BiX className="w-4 h-4" />}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="border-t border-gray-200 p-6">
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={handleClose}
                >
                  Continue Shopping
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    wishlistProducts.forEach(product => {
                      addToCart(product._id, 'default')
                      removeFromWishlist(product._id)
                    })
                    handleClose()
                  }}
                  icon={<BiShoppingBag className="w-4 h-4" />}
                >
                  Add All to Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default WishlistModal
