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
import LoginNew from './Pages/LoginNew'
import Register from './Pages/Register'
import ForgotPassword from './Pages/ForgotPassword'
import ForgotPasswordNew from './Pages/ForgotPasswordNew'
import ResetPassword from './Pages/ResetPassword'
import AuthDemo from './Pages/AuthDemo'
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
import CookieConsent from './components/CookieConsent'
import PageTransition from './components/PageTransition'
import { AuthProvider } from './context/AuthContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <div className="min-h-screen bg-neutral-50 flex flex-col">
        {/* Enhanced Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="shadow-lg border border-gray-200 rounded-lg"
          bodyClassName="text-sm font-medium"
          progressClassName="bg-gradient-to-r from-blue-500 to-purple-500"
          closeButton={false}
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
            {/* Authentication Routes - New Modern Components */}
            <Route path="/login" element={<LoginNew />} />
            <Route path="/Login" element={<LoginNew />} />
            <Route path="/forgot-password" element={<ForgotPasswordNew />} />
            <Route path="/ForgotPassword" element={<ForgotPasswordNew />} />
            <Route path="/auth-demo" element={<AuthDemo />} />
            {/* Legacy Routes for backward compatibility */}
            <Route path="/login-legacy" element={<Login />} />
            <Route path="/forgot-password-legacy" element={<ForgotPassword />} />
            <Route path="/Jojo" element={<Jojo />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/Women" element={<Women />} />
            <Route path="/ElectricalAppliances" element={<ElectricalAppliances />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/About" element={<About />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Cookie Consent Banner */}
        <CookieConsent />
        </div>
      </FavoritesProvider>
    </AuthProvider>
  )
}

export default App
