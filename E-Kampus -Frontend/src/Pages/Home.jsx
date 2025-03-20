import React from 'react'
import {Routes,Route } from 'react-router-dom'
import Hero from '../components/Hero'
import Latest from '../components/Latest'
import Bestseller from '../components/Bestseller'
import Footer from '../components/Footer'
import Ourpolicy from '../components/Ourpolicy'
import Newsletter from '../components/Newsletter'


const Home = () => {
  return (
    <div>
      <Hero />
      <Latest />
      <Bestseller />
      <Ourpolicy/>
      <Newsletter/>
      <Footer />
    </div>
  )
}

export default Home