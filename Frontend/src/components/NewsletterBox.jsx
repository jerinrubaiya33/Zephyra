import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (even) => {
        even.preventDefault();
    }

    return (
        <div className='text-center mt-15'>
            <p className='text-3xl font-semibold text-black'>Subscribe now & get <span className='text-[#f76097]'>40%</span> off</p>
            <p className='text-black mt-3 text-1xl'>
                Join our newsletter today and unlock instant 40% savings on your next purchase.
            </p>
            <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
                <input className='w-full sm:flex-1 outline-none ' type="email" placeholder='Enter your email'  required />
                <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
            </form>
        </div>
    )
}

export default NewsletterBox