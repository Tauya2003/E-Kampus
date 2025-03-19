import React from 'react'
import {Routes,Route } from 'react-router-dom'
import Hero from '../components/Hero'
import Latest from '../components/Latest'
import Bestseller from '../components/Bestseller'


const Home = () => {
  return (
    <div>
      <Hero />
      <Latest />
      <Bestseller/>
    </div>
  )
}

export default Home