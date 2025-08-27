import React, { useContext, useEffect, useState, useCallback } from 'react'
import ShopContext from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { Card, Button, Badge } from '../components/ui'
import { BiFilter, BiX } from 'react-icons/bi'

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)

  const [showFilter, setShowFilter] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState(products || [])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  const categories = [
    { value: 'Men', label: 'Men\'s Items', icon: '👨' },
    { value: 'Women', label: 'Women\'s Items', icon: '👩' },
    { value: 'Electricals-Appliances', label: 'Electronics & Appliances', icon: '📱' },
    { value: 'Groceries', label: 'Groceries', icon: '🛒' }
  ]

  const subCategories = [
    { value: 'Clothes-Men', label: 'Men\'s Clothes', parent: 'Men' },
    { value: 'Clothes-Women', label: 'Women\'s Clothes', parent: 'Women' },
    { value: 'Shoes-Men', label: 'Men\'s Shoes', parent: 'Men' },
    { value: 'Shoes-Women', label: 'Women\'s Shoes', parent: 'Women' },
    { value: 'Appliances', label: 'Appliances', parent: 'Electricals-Appliances' },
    { value: 'Breakfasts', label: 'Breakfast Items', parent: 'Groceries' },
    { value: 'Drinks', label: 'Beverages', parent: 'Groceries' },
    { value: 'Snacks', label: 'Snacks', parent: 'Groceries' },
    { value: 'Fruits', label: 'Fresh Fruits', parent: 'Groceries' }
  ]

  const sortOptions = [
    { value: 'relevant', label: 'Most Relevant' },
    { value: 'Low-high', label: 'Price: Low to High' },
    { value: 'High-low', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' }
  ]

  const toggleCategory = (categoryValue) => {
    if (category.includes(categoryValue)) {
      setCategory(prev => prev.filter(item => item !== categoryValue))
    } else {
      setCategory(prev => [...prev, categoryValue])
    }
  }

  const toggleSubCategory = (subCategoryValue) => {
    if (subCategory.includes(subCategoryValue)) {
      setSubCategory(prev => prev.filter(item => item !== subCategoryValue))
    } else {
      setSubCategory(prev => [...prev, subCategoryValue])
    }
  }

  const clearAllFilters = () => {
    setCategory([])
    setSubCategory([])
    setSortType('relevant')
  }

  const filterApply = useCallback(() => {
    setIsLoading(true)

    let productsCopy = products.slice()

    // Apply search filter
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Apply category filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item =>
        category.includes(item.category)
      )
    }

    // Apply subcategory filter
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item =>
        subCategory.includes(item.subCategory)
      )
    }

    // Apply sorting
    switch (sortType) {
      case 'Low-high':
        productsCopy.sort((a, b) => a.price - b.price)
        break
      case 'High-low':
        productsCopy.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        // Assume products have a createdAt field
        productsCopy.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        break
      case 'popular':
        // Assume products have a popularity score
        productsCopy.sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        break
      default:
        // Keep original order for 'relevant'
        break
    }

    setFilteredProducts(productsCopy)
    setIsLoading(false)
  }, [products, showSearch, search, category, subCategory, sortType])

  useEffect(() => {
    filterApply()
  }, [filterApply])

  const activeFiltersCount = category.length + subCategory.length

  const FilterSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="skeleton h-8 w-full" />
      ))}
    </div>
  )

  const ProductSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="p-4">
          <div className="skeleton aspect-square w-full mb-4" />
          <div className="skeleton h-4 w-3/4 mb-2" />
          <div className="skeleton h-4 w-1/2" />
        </Card>
      ))}
    </div>
  )

  return (
    <div className="container-padding py-8">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Filters Sidebar */}
        <div className="lg:w-80 shrink-0">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              fullWidth
              onClick={() => setShowFilter(!showFilter)}
              icon={<BiFilter className="w-4 h-4" />}
              className="justify-between"
            >
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="primary" size="sm">
                  {activeFiltersCount}
                </Badge>
              )}
              <svg className={`w-4 h-4 transition-transform ${showFilter ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
          </div>

          {/* Filter Panel */}
          <div className={`${showFilter ? 'block' : 'hidden'} lg:block`}>
            <Card className="sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-neutral-900">Filters</h3>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-primary-600"
                  >
                    Clear All
                  </Button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-neutral-900 mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label
                      key={cat.value}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50 cursor-pointer transition-colors duration-200"
                    >
                      <input
                        type="checkbox"
                        checked={category.includes(cat.value)}
                        onChange={() => toggleCategory(cat.value)}
                        className="w-4 h-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-200"
                      />
                      <span className="text-lg">{cat.icon}</span>
                      <span className="text-sm text-neutral-700 flex-1">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Subcategories */}
              <div className="mb-6">
                <h4 className="font-medium text-neutral-900 mb-3">Types</h4>
                <div className="space-y-2">
                  {subCategories.map((subCat) => (
                    <label
                      key={subCat.value}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50 cursor-pointer transition-colors duration-200"
                    >
                      <input
                        type="checkbox"
                        checked={subCategory.includes(subCat.value)}
                        onChange={() => toggleSubCategory(subCat.value)}
                        className="w-4 h-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-200"
                      />
                      <span className="text-sm text-neutral-700 flex-1">{subCat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="border-t border-neutral-200 pt-4">
                  <h4 className="font-medium text-neutral-900 mb-3">Active Filters</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.map((cat) => (
                      <Badge
                        key={cat}
                        variant="primary"
                        className="cursor-pointer hover:bg-primary-200"
                        onClick={() => toggleCategory(cat)}
                      >
                        {categories.find(c => c.value === cat)?.label} ×
                      </Badge>
                    ))}
                    {subCategory.map((subCat) => (
                      <Badge
                        key={subCat}
                        variant="secondary"
                        className="cursor-pointer hover:bg-secondary-200"
                        onClick={() => toggleSubCategory(subCat)}
                      >
                        {subCategories.find(s => s.value === subCat)?.label} ×
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <Title text1={'ALL'} text2={'COLLECTIONS'} />
              <p className="text-neutral-600 mt-2">
                {isLoading ? 'Loading...' : `${filteredProducts.length} products found`}
                {search && ` for "${search}"`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center gap-1 p-1 bg-neutral-100 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-white shadow-sm text-primary-600'
                      : 'text-neutral-600 hover:text-primary-600'
                  }`}
                  aria-label="Grid view"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'list'
                      ? 'bg-white shadow-sm text-primary-600'
                      : 'text-neutral-600 hover:text-primary-600'
                  }`}
                  aria-label="List view"
                >
                  <BiList className="w-4 h-4" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="input-base py-2 px-3 text-sm min-w-0 w-auto"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <ProductSkeleton />
          ) : filteredProducts.length > 0 ? (
            <div className={`
              ${viewMode === 'grid'
                ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'
                : 'flex flex-col gap-4'
              }
            `}>
              {filteredProducts.map((item, index) => (
                <ProductItem
                  key={item._id || index}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  originalPrice={item.originalPrice}
                  category={item.category}
                />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                No products found
              </h3>
              <p className="text-neutral-600 mb-4">
                Try adjusting your filters or search terms
              </p>
              <Button variant="primary" onClick={clearAllFilters}>
                Clear All Filters
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collection
