import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {
    return (
        <div className='flex items-center justify-between py-2 px-[4%] -mt-14 border-b  border-[#ffe0ec] '>
            {/* Logo on left */}
            <img
                className="w-[150px] sm:w-[100px] md:w-[200px] lg:w-[190px] -mb-12 -ml-6"
                src={assets.logo}
                alt="Logo"
            />
            {/* Button on right */}
            <button onClick={() => setToken('')} className='bg-[#000000] text-white px-5 py-2 sm:px-9 sm:py-2 text-xs sm:text-sm -mb-14 font-bold tracking-widest'>
                LogOut
            </button>
        </div>
    )
}

export default Navbar