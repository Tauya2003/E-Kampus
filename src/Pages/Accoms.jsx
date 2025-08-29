import React, { useState, useRef, useEffect } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import './AccommodationModal.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFadeInAnimation, useScrollAnimation, useSectionAnimation } from '../hooks/useGSAP'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const Accoms = () => {
  const [selectedAccommodation, setSelectedAccommodation] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({ rating: 5, text: '', name: '' })
  
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const accommodationCardsRef = useRef([])
  const { sectionRef, titleRef, contentRef } = useSectionAnimation()
  const onCampusRef = useScrollAnimation({
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0 },
    duration: 0.8
  })

  // Setup scroll-triggered card animations
  useEffect(() => {
    accommodationCardsRef.current.forEach((card, index) => {
      if (card) {
        // Set initial state
        gsap.set(card, {
          opacity: 0,
          y: 30,
          scale: 0.95
        })

        // Create scroll-triggered animation
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        })
      }
    })

    // Cleanup function to kill ScrollTriggers
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && accommodationCardsRef.current.includes(trigger.vars.trigger)) {
          trigger.kill()
        }
      })
    }
  }, [offCampusAccommodations])

  const offCampusAccommodations = [
    { 
      id: 1,
      images: [assets.MUSHA, assets.p_img1, assets.p_img2_1, assets.p_img3, assets.p_img4],
      name: "Musha Estates",
      title: "MUSHA ESTATES",
      location: "Mount Pleasant, Harare",
      price: "$80/month",
      rating: 4.5,
      amenities: ["WiFi", "Security", "Transport", "Furnished"],
      description: "Limited Services ⏰🏡🫂 🏡Palaces for Kings👦😇 🏡Heaven for Angels👧😇 Secure an affordable home, Away from Home.",
      contact: "0778 292 321 / 0716 063 531",
      email: "info@mushaestates.co.zw",
      whatsapp: "+263778292321",
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
      ],
      reviews: [
        { id: 1, name: "John Doe", rating: 5, text: "Excellent place to stay! Clean, safe and convenient.", date: "2024-01-15" },
        { id: 2, name: "Mary Smith", rating: 4, text: "Good location and friendly staff. Transport service is reliable.", date: "2024-01-10" },
        { id: 3, name: "Peter Jones", rating: 5, text: "Best accommodation I've stayed in. Highly recommend!", date: "2024-01-05" }
      ]
    },
    { 
      id: 2,
      images: [assets.MONLY, assets.p_img5, assets.p_img6, assets.p_img7, assets.p_img8],
      name: "Men Only Residence",
      title: "MEN ONLY",
      location: "Hatfield, Harare",
      price: "$60/month",
      rating: 4.2,
      amenities: ["WiFi", "Security", "Study Room", "Gym"],
      description: "Exclusive accommodation for male students with modern amenities and secure facilities.",
      contact: "0712 345 678",
      email: "bookings@menonly.co.zw",
      whatsapp: "+263712345678",
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
      ],
      reviews: [
        { id: 1, name: "David Wilson", rating: 4, text: "Great place for studying. Very quiet and peaceful.", date: "2024-01-20" },
        { id: 2, name: "Mike Brown", rating: 4, text: "Good facilities, especially the gym. Staff is helpful.", date: "2024-01-12" }
      ]
    },
    {
      id: 3,
      images: [assets.p_img9, assets.p_img10, assets.p_img11, assets.p_img12, assets.p_img13],
      name: "Elite Student Lodge",
      title: "ELITE STUDENT LODGE",
      location: "Belvedere, Harare",
      price: "$95/month",
      rating: 4.7,
      amenities: ["WiFi", "Security", "Pool", "Restaurant", "Laundry"],
      description: "Premium student accommodation with luxury amenities including swimming pool and on-site restaurant.",
      contact: "0771 123 456",
      email: "info@elitelodge.co.zw",
      whatsapp: "+263771123456",
      fullDescription: "Elite Student Lodge offers the pinnacle of student accommodation with luxury amenities and services. Perfect for students who want comfort and convenience during their studies.",
      features: [
        "Swimming pool access",
        "On-site restaurant",
        "Premium furnished rooms",
        "24/7 concierge service",
        "High-speed fiber internet",
        "Rooftop study areas",
        "Laundry and dry cleaning",
        "Shuttle service to universities"
      ],
      reviews: [
        { id: 1, name: "Sarah Johnson", rating: 5, text: "Amazing place! The pool and restaurant make it feel like a hotel.", date: "2024-01-25" },
        { id: 2, name: "Alex Chen", rating: 5, text: "Worth every penny. Best student accommodation in Harare!", date: "2024-01-18" },
        { id: 3, name: "Emma Davis", rating: 4, text: "Great facilities but a bit pricey. Still recommend it.", date: "2024-01-14" }
      ]
    },
    {
      id: 4,
      images: [assets.p_img14, assets.p_img15, assets.p_img16, assets.p_img17, assets.p_img18],
      name: "Campus View Apartments",
      title: "CAMPUS VIEW APARTMENTS",
      location: "Avondale, Harare",
      price: "$70/month",
      rating: 4.0,
      amenities: ["WiFi", "Security", "Kitchen", "Study Area"],
      description: "Affordable apartments with great views of the university campus. Perfect for budget-conscious students.",
      contact: "0773 987 654",
      email: "bookings@campusview.co.zw",
      whatsapp: "+263773987654",
      fullDescription: "Campus View Apartments offer affordable yet comfortable accommodation with stunning views of the university campus. Ideal for students who want independence with shared amenities.",
      features: [
        "Campus views from all rooms",
        "Shared kitchen facilities",
        "Individual study spaces",
        "Reliable security system",
        "Free WiFi throughout",
        "Nearby public transport",
        "24/7 electricity backup",
        "Affordable pricing"
      ],
      reviews: [
        { id: 1, name: "James Miller", rating: 4, text: "Great value for money. Love the campus views!", date: "2024-01-22" },
        { id: 2, name: "Lisa Taylor", rating: 4, text: "Good basic accommodation. Kitchen facilities are clean.", date: "2024-01-16" }
      ]
    },
    {
      id: 5,
      images: [assets.p_img19, assets.p_img20, assets.p_img21, assets.p_img22, assets.p_img23],
      name: "Garden City Residence",
      title: "GARDEN CITY RESIDENCE",
      location: "Borrowdale, Harare",
      price: "$85/month",
      rating: 4.4,
      amenities: ["WiFi", "Security", "Garden", "Library", "Cafeteria"],
      description: "Peaceful accommodation surrounded by beautiful gardens with a quiet library and cafeteria on-site.",
      contact: "0774 456 789",
      email: "info@gardencity.co.zw",
      whatsapp: "+263774456789",
      fullDescription: "Garden City Residence provides a serene living environment surrounded by lush gardens. Our facility combines nature with modern amenities to create the perfect study environment.",
      features: [
        "Beautiful garden settings",
        "Quiet library facilities",
        "On-site cafeteria",
        "Walking trails",
        "Outdoor study areas",
        "Modern security systems",
        "High-speed internet",
        "Regular gardening workshops"
      ],
      reviews: [
        { id: 1, name: "Rachel Green", rating: 5, text: "Beautiful place! The gardens are so peaceful for studying.", date: "2024-01-28" },
        { id: 2, name: "Tom Anderson", rating: 4, text: "Great environment for studies. Library is well-equipped.", date: "2024-01-21" },
        { id: 3, name: "Nina Patel", rating: 4, text: "Love the garden setting. Very relaxing after long study sessions.", date: "2024-01-17" }
      ]
    },
    {
      id: 6,
      images: [assets.p_img24, assets.p_img25, assets.p_img26, assets.p_img27, assets.p_img28],
      name: "Tech Hub Student Center",
      title: "TECH HUB STUDENT CENTER",
      location: "Milton Park, Harare",
      price: "$100/month",
      rating: 4.8,
      amenities: ["WiFi", "Security", "Tech Lab", "Co-working", "Gaming"],
      description: "Modern tech-focused accommodation with computer labs, co-working spaces, and gaming areas for tech students.",
      contact: "0775 111 222",
      email: "hello@techhub.co.zw",
      whatsapp: "+263775111222",
      fullDescription: "Tech Hub Student Center is designed specifically for technology and engineering students. With state-of-the-art computer labs, co-working spaces, and high-tech amenities throughout.",
      features: [
        "24/7 computer lab access",
        "Co-working spaces",
        "Gaming and recreation areas",
        "3D printing facilities",
        "High-speed fiber internet",
        "Tech workshops and seminars",
        "Modern security with key cards",
        "Collaboration spaces"
      ],
      reviews: [
        { id: 1, name: "Kevin Zhang", rating: 5, text: "Perfect for CS students! The tech facilities are incredible.", date: "2024-01-30" },
        { id: 2, name: "Priya Singh", rating: 5, text: "Amazing co-working spaces and the 3D printer is a bonus!", date: "2024-01-26" },
        { id: 3, name: "Marcus Johnson", rating: 4, text: "Great for group projects. Gaming area is fun for stress relief.", date: "2024-01-23" }
      ]
    }
  ]

  useEffect(() => {
    if (isModalOpen && modalRef.current && overlayRef.current) {
      // GSAP animation for modal open
      gsap.set(overlayRef.current, { opacity: 0 })
      gsap.set(modalRef.current, { scale: 0.7, opacity: 0, y: 100 })
      
      const tl = gsap.timeline()
      tl.to(overlayRef.current, { opacity: 1, duration: 0.3 })
        .to(modalRef.current, { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          ease: "back.out(1.7)" 
        }, "-=0.1")
    }
  }, [isModalOpen])

  const openModal = (accommodation) => {
    setSelectedAccommodation(accommodation)
    setSelectedImageIndex(0)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    if (modalRef.current && overlayRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsModalOpen(false)
          setSelectedAccommodation(null)
          setShowReviewForm(false)
          setNewReview({ rating: 5, text: '', name: '' })
          document.body.style.overflow = 'auto'
        }
      })
      
      tl.to(modalRef.current, { 
        scale: 0.7, 
        opacity: 0, 
        y: 100, 
        duration: 0.3, 
        ease: "back.in(1.7)" 
      })
        .to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.1")
    }
  }

  const handleContactNow = () => {
    if (selectedAccommodation) {
      const message = `Hi! I'm interested in ${selectedAccommodation.title} at ${selectedAccommodation.location}. Can you provide more information?`
      const whatsappUrl = `https://wa.me/${selectedAccommodation.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')
    }
  }

  const handleBookVisit = () => {
    if (selectedAccommodation) {
      const message = `Hi! I would like to book a visit to ${selectedAccommodation.title} at ${selectedAccommodation.location}. What times are available?`
      const whatsappUrl = `https://wa.me/${selectedAccommodation.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')
    }
  }

  const handleSubmitReview = () => {
    if (newReview.name && newReview.text && selectedAccommodation) {
      const review = {
        id: Date.now(),
        name: newReview.name,
        rating: newReview.rating,
        text: newReview.text,
        date: new Date().toISOString().split('T')[0]
      }
      
      // In a real app, this would be sent to a backend
      selectedAccommodation.reviews.unshift(review)
      setNewReview({ rating: 5, text: '', name: '' })
      setShowReviewForm(false)
      
      // Simple success animation
      gsap.fromTo('.review-success', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 })
    }
  }

  const renderStars = (rating, interactive = false, onRate = null) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`star ${index < rating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
        onClick={interactive ? () => onRate(index + 1) : undefined}
      >
        ★
      </span>
    ))
  }

  return (
    <div className='container-padding py-8 flex flex-col items-center'>
      <div ref={titleRef}>
        <Title text1={'CAMPUS'} text2={'ACCOMMODATION'}/>
      </div>
      
      {/* On-Campus Accommodation Section */}
      <div ref={onCampusRef} className='w-full max-w-4xl mx-auto mb-12'>
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
      <div ref={contentRef} className='w-full max-w-6xl mx-auto'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-8 text-center'>Off-Campus Accommodation</h2>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4'>
          {offCampusAccommodations.map((accommodation, index) => (
            <div 
              key={accommodation.id} 
              ref={el => accommodationCardsRef.current[index] = el}
              className='accommodation-card cursor-pointer'
              onClick={() => openModal(accommodation)}
            >
              <div className='accommodation-image-container'>
                <img 
                  src={accommodation.images[0]} 
                  alt={accommodation.name} 
                  className='accommodation-image' 
                />
                <div className='accommodation-rating'>
                  <span className='star'>★</span>
                  <span>{accommodation.rating}</span>
                </div>
                <div className='image-count'>
                  <span>{accommodation.images.length} photos</span>
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

      {/* Enhanced Modal for accommodation details */}
      {isModalOpen && selectedAccommodation && (
        <div ref={overlayRef} className='modal-overlay' onClick={closeModal}>
          <div ref={modalRef} className='modal-content' onClick={(e) => e.stopPropagation()}>
            <button className='modal-close' onClick={closeModal}>×</button>
            
            {/* Image Gallery */}
            <div className='modal-gallery'>
              <div className='main-image-container'>
                <img 
                  src={selectedAccommodation.images[selectedImageIndex]} 
                  alt={selectedAccommodation.name} 
                  className='main-modal-image'
                />
                <div className='gallery-controls'>
                  <button 
                    className='gallery-btn prev'
                    onClick={() => setSelectedImageIndex(prev => 
                      prev === 0 ? selectedAccommodation.images.length - 1 : prev - 1
                    )}
                  >
                    ‹
                  </button>
                  <button 
                    className='gallery-btn next'
                    onClick={() => setSelectedImageIndex(prev => 
                      prev === selectedAccommodation.images.length - 1 ? 0 : prev + 1
                    )}
                  >
                    ›
                  </button>
                </div>
                <div className='image-indicator'>
                  {selectedImageIndex + 1} / {selectedAccommodation.images.length}
                </div>
              </div>
              
              <div className='thumbnail-gallery'>
                {selectedAccommodation.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${selectedAccommodation.name} ${index + 1}`}
                    className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            </div>
            
            <div className='modal-body'>
              <div className='modal-title-section'>
                <h2 className='modal-title'>{selectedAccommodation.title}</h2>
                <div className='modal-rating'>
                  <span className='star'>★</span>
                  <span>{selectedAccommodation.rating}</span>
                  <span className='review-count'>({selectedAccommodation.reviews.length} reviews)</span>
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

              {/* Reviews Section */}
              <div className='modal-section'>
                <div className='reviews-header'>
                  <h3>Reviews ({selectedAccommodation.reviews.length})</h3>
                  <button 
                    className='add-review-btn'
                    onClick={() => setShowReviewForm(!showReviewForm)}
                  >
                    {showReviewForm ? 'Cancel' : 'Write Review'}
                  </button>
                </div>

                {/* Review Form */}
                {showReviewForm && (
                  <div className='review-form'>
                    <div className='rating-input'>
                      <label>Your Rating:</label>
                      <div className='star-rating'>
                        {renderStars(newReview.rating, true, (rating) => 
                          setNewReview(prev => ({ ...prev, rating }))
                        )}
                      </div>
                    </div>
                    
                    <input
                      type='text'
                      placeholder='Your name'
                      value={newReview.name}
                      onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                      className='review-input'
                    />
                    
                    <textarea
                      placeholder='Write your review...'
                      value={newReview.text}
                      onChange={(e) => setNewReview(prev => ({ ...prev, text: e.target.value }))}
                      className='review-textarea'
                      rows='4'
                    />
                    
                    <button 
                      className='submit-review-btn'
                      onClick={handleSubmitReview}
                      disabled={!newReview.name || !newReview.text}
                    >
                      Submit Review
                    </button>
                  </div>
                )}

                {/* Reviews List */}
                <div className='reviews-list'>
                  {selectedAccommodation.reviews.map(review => (
                    <div key={review.id} className='review-item'>
                      <div className='review-header'>
                        <div className='reviewer-info'>
                          <span className='reviewer-name'>{review.name}</span>
                          <span className='review-date'>{review.date}</span>
                        </div>
                        <div className='review-rating'>
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className='review-text'>{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className='modal-section'>
                <h3>Contact Information</h3>
                <div className='contact-info'>
                  <p className='modal-contact'>📞 {selectedAccommodation.contact}</p>
                  <p className='modal-contact'>📧 {selectedAccommodation.email}</p>
                  <p className='modal-contact'>💬 {selectedAccommodation.whatsapp}</p>
                </div>
              </div>
              
              <div className='modal-actions'>
                <button className='contact-button' onClick={handleContactNow}>
                  Contact Now
                </button>
                <button className='book-button' onClick={handleBookVisit}>
                  Book Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Accoms
