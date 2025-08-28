import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Groceries from './Pages/Groceries'
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
import Footer from './components/Footer'
import Women from './Pages/Women'
import Men from './Pages/Men'
import Jojo from './Pages/Jojo'
import Accoms from './Pages/Accoms'
import ElectricalAppliances from './Pages/Electrical-Appliances'
import Services from './Pages/Services'
import Collection from './Pages/Collection'
import Food from './Pages/Food'
import WishlistModal from './components/WishlistModal'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="shadow-moderate"
      />

      {/* Navigation */}
      <Navbar />

      {/* Modals */}
      <WishlistModal />

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Food" element={<Food />} />
          <Route path="/Accoms" element={<Accoms />} />
          <Route path="/Groceries" element={<Groceries />} />
          <Route path="/Men" element={<Men />} />
          <Route path="/Collection" element={<Collection />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Jojo" element={<Jojo />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/Women" element={<Women />} />
          <Route path="/ElectricalAppliances" element={<ElectricalAppliances />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
