import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home';
import Collection from './Pages/Groceries'
import Product from './Pages/Product'
import Orders from './Pages/Orders'
import PlaceOrder from './Pages/PlaceOrder'
import Cart from './Pages/Cart'
import About from './Pages/About'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'
import Navbar from './components/Navbar'
import Women from './Pages/Women'
import Men from './Pages/Men'
import ElectricalAppliances from './Pages/Electrical-Appliances'
import Services from './Pages/Services'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Groceries' element={<Collection />} />
        <Route path='/Men' element={<Men />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='place-order' element={<PlaceOrder />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/ForgotPassword' element={<ForgotPassword />} />
        <Route path='/ResetPassword' element={<ResetPassword />} />
        <Route path='/Women' element={<Women/>} />
        <Route path='/ElectricalAppliances' element={<ElectricalAppliances />} />
        <Route path='/Services' element={<Services />} />
      </Routes>
    </div>
  )
}

export default App