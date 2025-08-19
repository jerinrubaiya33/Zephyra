import React from 'react'

const Title = ({ text1, text2 }) => {
    return (
        <div className='inline-flex gap-1 sm:gap-2 items-center mb-2 sm:mb-3 -mt-2 sm:-mt-4 '>
          <p className='text-black font-light text-2xl sm:text-2xl md:text-3xl'>
            {text1} <span className='text-[#f76097] font-medium'>{text2}</span>
          </p>
          <p className='w-6 sm:w-8 md:w-12 h-[1px] sm:h-[2px] md:h-[2px]  bg-[#f76097]'></p>
        </div>
      )
  }  

export default Title
