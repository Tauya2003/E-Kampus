import React from 'react'

const Newsletter = () => {
 
    const onSubmitHandler = (e) =>{
        e.preventDefault();
    }
  return (
    <div className='text-center py-15'> 
        <p className='text-2xl font-medium text-gray-800'>Subscribe now to our Newsletter for more updates!</p>
        <p className='text-gray-400 mt-3'>
            Subcribe to our weekly Newsletter now!
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-0 border-0' type="email" placeholder='Enter your email' required />
            <button type='submit' className='bg-black text-white px-10 py-4 text-xs active:bg-gray-700 cursor-pointer'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default Newsletter