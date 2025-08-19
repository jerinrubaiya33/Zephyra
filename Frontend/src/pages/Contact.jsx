import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox  from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div>
        <div className='pt-10 border-t border-[#ffd7d7] -mt-20 sm:-mt-28 -ml-2 text-center text-2xl'>
        <Title text1="GET IN" text2="TOUCH" />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-black'>Out Store</p>
          <p>54709 Willms Station <br/>Suite 350, Washington, USA</p>
          <p>Tel: (415) 555-0132 <br/>zephyra@gamil.com</p>
          <p className='font-semibold text-xl text-black'>Careers at Zephyra</p>
          <p>Learn more about our teams and job openings.</p>
          <button className='border border-pink-300 px-8 py-2 text-sm hover:bg-black hover:text-white transition-all duration-500 font-bold'>Explore Job</button>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contact
