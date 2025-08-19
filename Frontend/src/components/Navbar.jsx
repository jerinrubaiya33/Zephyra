import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { useEffect } from 'react';


const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const { setShowSearch, getCartCount, token, setToken, setCartItems } = useContext(ShopContext)

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    const location = useLocation()
    const navigate = useNavigate()

    // Auto-hide profile menu after 2 seconds
    useEffect(() => {
        let timer;
        if (showProfileMenu) {
            timer = setTimeout(() => {
                setShowProfileMenu(false);
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [showProfileMenu]);

    return (
        <div className="flex items-center justify-between py-5 font-medium relative">
            <Link to="/">
                <img
                    src={assets.logo}
                    alt="Logo"
                    className="w-[330px] -mt-20 sm:-mt-24 -ml-10"
                />
            </Link>
            {/* NAV LINKS */}
            <ul className="hidden sm:flex gap-5 text-base mr-30 font-semibold ">
                <NavLink to='/' className="flex flex-col items-center gap-1">
                    <p className="ml-auto -mt-14 text-black">HOME</p>
                    <hr className="w-3/4 border-none h-[1.5px] bg-[# ] hidden" />
                </NavLink>
                <NavLink to='/collection' className="flex flex-col items-center gap-1">
                    <p className="ml-auto -mt-14 text-black">COLLECTION</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-[#f76097] hidden" />
                </NavLink>
                <NavLink to='/about' className="flex flex-col items-center gap-1">
                    <p className="ml-auto -mt-14 text-black">ABOUT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-[#f76097] hidden" />
                </NavLink>
                <NavLink to='/contact' className="flex flex-col items-center gap-1">
                    <p className="ml-auto -mt-14 text-black">CONTACT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-[#f76097] hidden" />
                </NavLink>
            </ul>

            <div className='flex items-center gap-6'>

                {/* SEARCH ICON */}
                <svg
                    onClick={() => {
                        setShowSearch(true)
                        if (!location.pathname.includes('/collection')) {
                            navigate('/collection')
                        }
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 text-black cursor-pointer ml-[-26px] -mt-20 -sm:mt-290"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    viewBox="0 0 24 24"
                >
                    <circle cx="11" cy="11" r="7" />
                    <line x1="16.65" y1="16.65" x2="21" y2="21" />
                </svg>

                {/* PROFILE ICON */}
                <div className="relative">
                    <Link to='/login'>
                        <svg
                            onClick={() => setShowProfileMenu(prev => !prev)}
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7 -mt-14 text-black cursor-pointer -ml-3"
                            fill="none"
                            stroke="#000000"
                            strokeWidth="1"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20c0-4 8-4 8-4s8 0 8 4v0a4 4 0 01-4 4H8a4 4 0 01-4-4z" />
                        </svg>
                    </Link>

                    {/* DROPDOWN MENU (Toggle-based for mobile compatibility) */}
                    {showProfileMenu && (
                        <div className="absolute right-0 pt-4 z-50">
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 border border-pink-300 bg-white text-black rounded-none'>
                                <p className='cursor-pointer hover:text-gray-700'>My Profile</p>
                                <hr className='border-t border-pink-300 my-0' />
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-gray-700'>Orders</p>
                                <hr className='border-t border-pink-300 my-0' />
                                <p onClick={logout} className='cursor-pointer hover:text-gray-700'>Logout</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* CART ICON */}
                <Link to="/cart" className="relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 -mt-[62px] -ml-4 text-black cursor-pointer"
                        fill="none"
                        stroke="#000000"
                        strokeWidth="1"
                        viewBox="0 0 24 24"
                    >
                        <path d="M3 3h2l.4 2M5.4 5l1.6 8h10l4-8H5.4z" />
                        <path d="M7 13L5.5 20" />
                        <circle cx="9" cy="20" r="1.5" />
                        <circle cx="17" cy="20" r="1.5" />
                    </svg>
                    <p className="absolute right-[-6px] bottom-[18px] min-w-[16px] h-4 px-[2px] text-center bg-black text-white rounded-full text-[20px] flex items-center justify-center">
                        {getCartCount()}
                    </p>
                </Link>

                {/* MENU ICON (mobile) */}
                <svg
                    onClick={() => setVisible(true)}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 -mt-20 text-black cursor-pointer sm:hidden -ml-4"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1"
                    viewBox="0 0 24 24"
                >
                    <line x1="0" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="8" y1="18" x2="20" y2="18" />
                </svg>
            </div>

            {/* MOBILE SIDEBAR */}
            <div
                className={`fixed inset-0 z-50 bg-white transition-all duration-300 ease-in-out ${visible ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col text-black">
                    <div
                        onClick={() => setVisible(false)}
                        className="flex items-center gap-4 p-3 cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 text-black cursor-pointer"
                            fill="none"
                            stroke="#000000"
                            strokeWidth="1"
                            viewBox="0 0 24 24"
                        >
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                        <p className="mt-0 mr-11.5 text-[18px] font-semibold">Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-12 border font-semibold' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-12 border font-semibold' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-12 border font-semibold' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-12 border font-semibold' to='/contact'>CONTACT</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar