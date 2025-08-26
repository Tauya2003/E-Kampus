import React, { createContext, useState } from 'react';
import { products } from '../assets/assets';
import { useEffect } from 'react';
import { toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import AxiosApiService from '../services/axiosApiService';



const ShopContextProvider = (props) => {
    const total = 10;
    const currency = '$';
    const deliveryFee = 1.50;
    const[search, setSearch] = useState('', false);
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState([])
    const [apiProducts, setApiProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // Fetch products from API
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
            // Fallback to static products if API fails
            setApiProducts(products)
        } finally {
            setLoading(false)
        }
    }

    // Use API products if available, otherwise fallback to static products
    const allProducts = apiProducts.length > 0 ? apiProducts : products

    useEffect(() => {
        fetchProducts()
    }, [])

    const addToCart = async (itemId,size) => {
      if (!size) {
        toast.error('Selct Product Size')
        return
      }

      let cartData = structuredClone(cartItems)

      if (cartData[itemId]) {
        if (cartData[itemId][size]) {
          cartData[itemId][size] += 1
        }
        else {
          cartData[itemId][size] = 1
        }
      }
      else {
        cartData[itemId] = {}
        cartData[itemId][size] = 1
      }
      setCartItems(cartData)
      
    }

    const getCartCount = () => {
      let totalCount = 0

      for (const items in cartItems) {
         for(const item in cartItems[items]) {
          try {
              if (cartItems[items][item] > 0 ) {
                totalCount += cartItems[items][item] 
              }
            
          } catch (error) {
            
          }
         } 
      }
      return totalCount
    }


    const updateQuantity = async (itemId,size, quantity) => {
      let cartData = structuredClone(cartItems)

      cartData[itemId][size] = quantity

      setCartItems(cartData)


    }

    const getCartAmount = () => {

      let totalAmount = 0;

      for(const items in cartItems) {

        let itemInfo = allProducts.find((product) => product._id === items)
        
        for (const item in cartItems[items]) {
          try {
              if (cartItems[items][item] > 0 ) {
                totalAmount += cartItems[items][item] * itemInfo.price
              }
          } catch (error) {
            
          }
        
        }
      }
      return totalAmount
    }

    const value = {
        products: allProducts, currency, deliveryFee,
        search, setSearch, showSearch, setShowSearch, cartItems, addToCart,
        getCartCount, updateQuantity, getCartAmount, navigate, loading, fetchProducts
    };
   
  return (
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
  );

};

export const ShopContext = createContext();
export default ShopContextProvider;
