import React from 'react'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
    return (
        <div className='w-[18%] min-h-screen border-r-1 border-[#ffe0ec] '>
            <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
                <NavLink className='flex items-center gap-3 border border-[#ffc3d9] border-r-0 px-3 py-2' to="/add">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="black"
                        strokeWidth="1.5"
                    >
                        <circle cx="12" cy="12" r="9" stroke="black" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m4-4H8" />
                    </svg>
                    <p className='hidden md:block text-base font-bold'>Add Items</p>
                </NavLink>

                <NavLink className='flex items-center gap-3 border border-[#ffc3d9] border-r-0 px-3 py-2' to="/list">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="black"
                        strokeWidth="1.5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <p className='hidden md:block text-base font-bold'>List Items</p>
                </NavLink>

                <NavLink className='flex items-center gap-3 border border-[#fda7c6] border-r-0 px-3 py-2' to="/orders">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="black"
                        strokeWidth="1.5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5h6m-3 0v1m-6 4h12M9 13h6M9 17h6M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
                        />
                    </svg>
                    <p className='hidden md:block text-base font-bold'>Order Items</p>
                </NavLink>

            </div>
        </div>
    )
}

export default Sidebar