import React from 'react'
import {Routes,Route } from 'react-router-dom'
import HeroWithSearch from '../components/HeroWithSearch'
import ProductCarousel from '../components/carousel'
import Latest from '../components/Latest'
import Bestseller from '../components/Bestseller'
import Footer from '../components/Footer'
import Ourpolicy from '../components/Ourpolicy'
import Newsletter from '../components/Newsletter'
import BLUR from  '../components/BLUR'

const Home = () => {
  return (
    <div className='min-h-screen'>
      {/*<BLUR />*/}
      <HeroWithSearch />
      <div className='container-padding py-8'>
        <ProductCarousel />
        <Latest />
        <Bestseller />
        <Ourpolicy/>
        <Newsletter/>
      </div>
    </div>
  )
}

export default Home
