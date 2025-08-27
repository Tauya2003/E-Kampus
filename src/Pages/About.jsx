import React from 'react'
import Title from '../components/Title'

const About = () => {
  return (
    <div className='container-padding py-8'>
      <div className='text-2xl mb-8'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='max-w-4xl mx-auto'>
        <p className='text-gray-600 leading-relaxed'>
          Welcome to our college-focused e-commerce platform, designed specifically for university students.
          We offer a comprehensive range of products and services to meet all your student needs.
        </p>
      </div>
    </div>
  )
}

export default About
