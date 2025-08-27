import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import ShopContext from '../context/ShopContext'
import { Button } from './ui'
import { BiEnvelope, BiPhone, BiGlobe, BiMap, BiHeart } from 'react-icons/bi'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  const { navigate } = useContext(ShopContext)

  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'Home', path: '/', icon: '🏠' },
    { label: 'Food & Snacks', path: '/Food', icon: '🍔' },
    { label: 'Accommodation', path: '/Accoms', icon: '🏠' },
    { label: 'Marketplace', path: '/Collection', icon: '🛍️' },
    { label: 'About Us', path: '/About', icon: 'ℹ️' }
  ]

  const studentServices = [
    { label: 'Campus Delivery', description: 'Free delivery on campus' },
    { label: 'Study Snacks', description: 'Late-night fuel for your studies' },
    { label: 'Student Discounts', description: 'Exclusive student pricing' },
    { label: 'Accommodation Search', description: 'Find your perfect home away from home' },
    { label: 'Marketplace', description: 'Buy & sell with fellow students' }
  ]

  const socialLinks = [
    { icon: FaFacebook, label: 'Facebook', href: '#', color: 'hover:text-blue-600' },
    { icon: FaInstagram, label: 'Instagram', href: '#', color: 'hover:text-pink-600' },
    { icon: FaTwitter, label: 'Twitter', href: '#', color: 'hover:text-blue-400' },
    { icon: FaLinkedin, label: 'LinkedIn', href: '#', color: 'hover:text-blue-700' },
    { icon: FaWhatsapp, label: 'WhatsApp', href: '#', color: 'hover:text-green-600' }
  ]

  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white mt-20">
      {/* Main Footer Content */}
      <div className="container-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6 hover-lift">
              <img
                src={assets.E_logo}
                alt="E-Kampus Logo"
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>

            <h3 className="text-xl font-bold mb-4 text-gradient bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Your Campus Marketplace
            </h3>

            <p className="text-neutral-300 mb-6 leading-relaxed">
              E-Kampus connects university students with everything they need - from late-night snacks to accommodation,
              all designed to make student life easier and more affordable.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:contact@enactus.uz.ac.zw"
                className="flex items-center gap-3 text-neutral-300 hover:text-primary-400 transition-colors duration-200 group"
              >
                <BiEnvelope className="w-5 h-5 text-primary-500 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-sm">contact@enactus.uz.ac.zw</span>
              </a>

              <a
                href="tel:+263782965167"
                className="flex items-center gap-3 text-neutral-300 hover:text-primary-400 transition-colors duration-200 group"
              >
                <BiPhone className="w-5 h-5 text-primary-500 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-sm">+263 78 296 5167</span>
              </a>

              <a
                href="https://uz.ac.zw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-neutral-300 hover:text-primary-400 transition-colors duration-200 group"
              >
                <BiGlobe className="w-5 h-5 text-primary-500 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-sm">uz.ac.zw</span>
              </a>

              <div className="flex items-center gap-3 text-neutral-300">
                <BiMap className="w-5 h-5 text-primary-500" />
                <span className="text-sm">University of Zimbabwe Campus</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <nav>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="flex items-center gap-3 text-neutral-300 hover:text-primary-400 transition-colors duration-200 group"
                    >
                      <span className="text-base group-hover:scale-110 transition-transform duration-200">
                        {link.icon}
                      </span>
                      <span className="text-sm">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Student Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Student Services</h4>
            <ul className="space-y-4">
              {studentServices.map((service, index) => (
                <li key={index} className="group">
                  <h5 className="text-sm font-medium text-primary-400 mb-1 group-hover:text-primary-300 transition-colors duration-200">
                    {service.label}
                  </h5>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {service.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Stay Connected</h4>

            <p className="text-neutral-300 text-sm mb-4">
              Get updates on new products, special offers, and campus events.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your student email"
                  className="flex-1 px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                />
                <Button variant="primary" size="sm">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-neutral-400 mt-2">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>

            {/* Social Media */}
            <div>
              <h5 className="text-sm font-medium text-white mb-3">Follow Us</h5>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className={`p-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-all duration-200 hover-lift ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-700 bg-neutral-800/50">
        <div className="container-padding py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Copyright */}
            <div className="flex items-center gap-2 text-neutral-400 text-sm">
              <span>© {currentYear} EnactusUZ. All rights reserved.</span>
              <BiHeart className="w-4 h-4 text-red-500 animate-pulse-soft" />
              <span>Made for students, by students</span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm">
              <button
                onClick={() => navigate('/privacy')}
                className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => navigate('/terms')}
                className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
              >
                Terms of Service
              </button>
              <button
                onClick={() => navigate('/support')}
                className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
              >
                Support
              </button>
            </div>
          </div>

          {/* Student-Friendly Message */}
          <div className="mt-4 pt-4 border-t border-neutral-700/50 text-center">
            <p className="text-neutral-400 text-xs">
              🎓 Supporting university students across Zimbabwe with affordable, convenient solutions 🎓
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
