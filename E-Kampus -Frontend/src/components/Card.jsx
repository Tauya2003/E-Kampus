import React from 'react'
import { assets } from '../assets/assets'
import './card.css'

const Card = () => {

    const acc = [
            { 
                id: 1,
                image: assets.MUSHA,
                name: "Musha",
                title: "MUSHA ESTATES",
                desc: "Limited Services ⏰🏡🫂 🏡Palaces for Kings👦😇 🏡Heaven for Angels👧😇 Secure an affordable home, Away from Home. ✨ Variety from walkable distances, drivable & available transport 📍 Mount Pleasant 📍 Groombridge 📍 Borrowdale 📍 Hatcliffe 📍 Avondale 📍 Emerald Hill Contact us 0778 292 321📲0716 063 531📲"
            },
            { 
                id: 2,
                image: assets.MONLY,
                name: "MenOnly",
                title: "MEN ONLY",
                desc: "Exclusive accommodation for male students with modern amenities and secure facilities."
            },
            
        ];

  return (
    <div className='flex flex-wrap gap-4 justify-center'>
        {acc.map((item)=>(
            <div key={item.id} className='card'>
                <img src={item.image} alt={item.name} className='card-image' />
                <h2 className='card-title'>{item.title}</h2>
                <p className='card-text'>{item.desc}</p>
            </div>
        ))}
    </div>
  );
}

export default Card