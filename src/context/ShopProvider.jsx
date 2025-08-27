import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { products as staticProducts } from '../assets/assets'
import AxiosApiService from '../services/axiosApiService'
import ShopContext from './ShopContext'

const ShopProvider = (props) => {
    const currency = '$'
    const deliveryFee = 1.50
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [wishlistItems, setWishlistItems] = useState([])
    const [showWishlist, setShowWishlist] = useState(false)
    const [apiProducts, setApiProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const response = await AxiosApiService.getProducts()
            if (response && response.products) {
                setApiProducts(response.products)
            } else if (response && Array.isArray(response)) {
                setApiProducts(response)
            }
        } catch (error) {
            console.error('Failed to fetch products:', error)
            toast.error('Failed to load products')
            setApiProducts(staticProducts)
        } finally {
            setLoading(false)
        }
    }

    const allProducts = apiProducts.length > 0 ? apiProducts : staticProducts

    useEffect(() => {
        fetchProducts()
    }, [])

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size')
            return
        }
        const cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)
    }

    const getCartCount = () => {
        let totalCount = 0
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                const quantity = cartItems[items][item]
                if (quantity > 0) {
                    totalCount += quantity
                }
            }
        }
        return totalCount
    }

    const updateQuantity = async (itemId, size, quantity) => {
        const cartData = structuredClone(cartItems)
        cartData[itemId][size] = quantity
        setCartItems(cartData)
    }

    const getCartAmount = () => {
        let totalAmount = 0
        for (const items in cartItems) {
            const itemInfo = allProducts.find((product) => product._id === items)
            if (!itemInfo) continue
            for (const item in cartItems[items]) {
                const quantity = cartItems[items][item]
                if (quantity > 0) {
                    totalAmount += quantity * itemInfo.price
                }
            }
        }
        return totalAmount
    }

    const value = {
        products: allProducts,
        currency,
        deliveryFee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        loading,
        fetchProducts,
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopProvider
