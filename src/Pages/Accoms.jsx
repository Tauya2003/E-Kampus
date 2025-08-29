import React, { useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import './AccommodationModal.css'

const Accoms = () => {
  const [selectedAccommodation, setSelectedAccommodation] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const offCampusAccommodations = [
    { 
      id: 1,
      image: assets.MUSHA,
      name: "Musha Estates",
      title: "MUSHA ESTATES",
      location: "Mount Pleasant, Harare",
      price: "$80/month",
      rating: 4.5,
      amenities: ["WiFi", "Security", "Transport", "Furnished"],
      description: "Limited Services ⏰🏡🫂 🏡Palaces for Kings👦😇 🏡Heaven for Angels👧😇 Secure an affordable home, Away from Home. ✨ Variety from walkable distances, drivable & available transport 📍 Mount Pleasant 📍 Groombridge 📍 Borrowdale 📍 Hatcliffe 📍 Avondale 📍 Emerald Hill",
      contact: "0778 292 321 / 0716 063 531",
      fullDescription: "Experience luxury living at Musha Estates, offering premium accommodation for students. Our properties feature modern amenities, 24/7 security, and convenient transport links to major universities. Located in prime areas including Mount Pleasant, Groombridge, Borrowdale, Hatcliffe, Avondale, and Emerald Hill.",
      features: [
        "Fully furnished rooms",
        "24/7 security surveillance", 
        "High-speed WiFi internet",
        "Regular transport to universities",
        "Nearby shopping centers",
        "Laundry facilities",
        "Study areas",
        "Parking space"
      ]
    },
    { 
      id: 2,
      image: assets.MONLY,
      name: "Men Only Residence",
      title: "MEN ONLY",
      location: "Hatfield, Harare",
      price: "$60/month",
      rating: 4.2,
      amenities: ["WiFi", "Security", "Study Room", "Gym"],
      description: "Exclusive accommodation for male students with modern amenities and secure facilities.",
      contact: "0712 345 678",
      fullDescription: "Men Only Residence provides a focused living environment specifically designed for male students. Our facility offers a quiet, study-conducive atmosphere with modern amenities and excellent security measures.",
      features: [
        "Male-only accommodation",
        "Quiet study environment",
        "Modern gym facilities",
        "24/7 security",
        "High-speed internet",
        "Common study areas",
        "Kitchen facilities",
        "Regular cleaning services"
      ]
    }
  ]

  const openModal = (accommodation) => {
    setSelectedAccommodation(accommodation)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedAccommodation(null)
  }

  return (
    <div className='container-padding py-8 flex flex-col items-center'>
      <Title text1={'CAMPUS'} text2={'ACCOMMODATION'}/>
      
      {/* On-Campus Accommodation Section */}
      <div className='w-full max-w-4xl mx-auto mb-12'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>On-Campus Accommodation</h2>
        <div className='bg-blue-50 border-l-4 border-blue-500 p-6 mx-4'>
          <div className='flex items-start'>
            <div className='flex-shrink-0'>
              <svg className='w-6 h-6 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
              </svg>
            </div>
            <div className='ml-3'>
              <p className='text-sm text-blue-700 font-medium'>
                Offering the best accommodation for our Students! Visit the Students Affairs office for accommodation for more information. Located at the Students Affairs (1st floor, Office 234).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Off-Campus Accommodation Section */}
      <div className='w-full max-w-6xl mx-auto'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-8 text-center'>Off-Campus Accommodation</h2>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 px-4'>
          {offCampusAccommodations.map((accommodation) => (
            <div 
              key={accommodation.id} 
              className='accommodation-card cursor-pointer'
              onClick={() => openModal(accommodation)}
            >
              <div className='accommodation-image-container'>
                <img 
                  src={accommodation.image} 
                  alt={accommodation.name} 
                  className='accommodation-image' 
                />
                <div className='accommodation-rating'>
                  <span className='star'>★</span>
                  <span>{accommodation.rating}</span>
                </div>
              </div>
              
              <div className='accommodation-content'>
                <div className='accommodation-header'>
                  <h3 className='accommodation-title'>{accommodation.title}</h3>
                  <p className='accommodation-location'>{accommodation.location}</p>
                </div>
                
                <div className='accommodation-amenities'>
                  {accommodation.amenities.slice(0, 3).map((amenity, index) => (
                    <span key={index} className='accommodation-amenity'>{amenity}</span>
                  ))}
                  {accommodation.amenities.length > 3 && (
                    <span className='accommodation-amenity'>+{accommodation.amenities.length - 3} more</span>
                  )}
                </div>
                
                <p className='accommodation-description'>
                  {accommodation.description.substring(0, 100)}...
                </p>
                
                <div className='accommodation-footer'>
                  <span className='accommodation-price'>{accommodation.price}</span>
                  <button className='accommodation-button'>View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for accommodation details */}
      {isModalOpen && selectedAccommodation && (
        <div className='modal-overlay' onClick={closeModal}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <button className='modal-close' onClick={closeModal}>×</button>
            
            <div className='modal-header'>
              <img 
                src={selectedAccommodation.image} 
                alt={selectedAccommodation.name} 
                className='modal-image'
              />
            </div>
            
            <div className='modal-body'>
              <div className='modal-title-section'>
                <h2 className='modal-title'>{selectedAccommodation.title}</h2>
                <div className='modal-rating'>
                  <span className='star'>★</span>
                  <span>{selectedAccommodation.rating}</span>
                </div>
              </div>
              
              <p className='modal-location'>{selectedAccommodation.location}</p>
              <p className='modal-price'>{selectedAccommodation.price}</p>
              
              <div className='modal-section'>
                <h3>About this place</h3>
                <p>{selectedAccommodation.fullDescription}</p>
              </div>
              
              <div className='modal-section'>
                <h3>Amenities & Features</h3>
                <div className='modal-features'>
                  {selectedAccommodation.features.map((feature, index) => (
                    <div key={index} className='modal-feature'>
                      <span className='feature-icon'>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className='modal-section'>
                <h3>Contact Information</h3>
                <p className='modal-contact'>{selectedAccommodation.contact}</p>
              </div>
              
              <div className='modal-actions'>
                <button className='contact-button'>Contact Now</button>
                <button className='book-button'>Book Visit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Accoms
