import React from 'react'
import Title from '../components/Title'
import { Link } from 'react-router-dom'
import Card from '../components/Card'

const Accoms = () => {
  return (
   <div className='flex flex-col items-center'>
        <Title text1={'CAMPUS'} text2={'ACCOMMODATION'}/>
        <div className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        <p>Offering the best accomodation for our Students!</p>
        <p>Visit the Students Affairs office for Accomodation for more information. </p>
        <p>Located at the Students affairs(1st floor, Office 234)</p>
        </div>
          <Card />
          
        
      </div>
      



  )
}

export default Accoms
