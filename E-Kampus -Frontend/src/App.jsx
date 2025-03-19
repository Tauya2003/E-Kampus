import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './Pages/Groceries'
import Product from './pages/Product'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Cart from './pages/Cart'
import About from './pages/About'
import Login from './pages/Login'
import Register from './Pages/Register'
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'
import Navbar from './components/Navbar'
import ClothingWomen from './Pages/Clothing-Women'
import ClothingMen from './Pages/Clothing-Men'
import ElectricalAppliances from './Pages/Electrical-Appliances'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Groceries' element={<Collection />} />
        <Route path='/ClothingMen' element={<ClothingMen />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='place-order' element={<PlaceOrder />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/ForgotPassword' element={<ForgotPassword />} />
        <Route path='/ResetPassword' element={<ResetPassword />} />
        <Route path='/ClothingWomen' element={<ClothingWomen/>} />
        <Route path='/ElectricalAppliances' element={<ElectricalAppliances />} />
      </Routes>
    </div>
  )
}

export default App