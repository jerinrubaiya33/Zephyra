import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const { setShowSearch, getCartCount, getWishlistCount, setToken, setCartItems } = useContext(ShopContext)

    const navigate = useNavigate()
    const location = useLocation()

    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    useEffect(() => {
        let timer
        if (showProfileMenu) {
            timer = setTimeout(() => setShowProfileMenu(false), 2000)
        }
        return () => clearTimeout(timer)
    }, [showProfileMenu])

    return (
        <div className="w-full">
            {/* TOP SALE BAR */}
            <div className="absolute top-0 left-0 right-0 bg-[#f76097] z-50">
                <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-1">
                    {/* Desktop text */}
                    <p className="hidden sm:block text-xs sm:text-sm md:text-[18px] font-extrabold uppercase tracking-[0.3em] text-white ml-18">
                        Your Style, Your Sale – <span className="font-bold">Uncover your next favorite!</span>
                    </p>

                    {/* Mobile text */}
                    <p className="block sm:hidden text-[18px] text-white font-semibold text-center w-full">
                        Uncover your next favorite!
                    </p>

                    {/* ICONS RIGHT */}
                    <div className="flex items-center gap-3 text-white sm:mr-24 mr-4">
                        {/* PROFILE ICON */}
                        <div className="relative">
                            <svg
                                onClick={() => setShowProfileMenu(prev => !prev)}
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-7 h-7 cursor-pointer"
                                fill="none"
                                stroke="white"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="12" cy="8" r="4" />
                                <path d="M4 20c0-4 8-4 8-4s8 0 8 4v0a4 4 0 01-4 4H8a4 4 0 01-4-4z" />
                            </svg>

                            {showProfileMenu && (
                                <div className="absolute right-0 mt-3 w-40 border border-pink-300 bg-white text-black z-50">
                                    <div className="flex flex-col gap-2 py-3 px-5">
                                        {/* My Profile */}
                                        <p
                                            onClick={() => {
                                                const token = localStorage.getItem("token")
                                                if (token) {
                                                    toast(" Hello There ! You're already logged in", {
                                                        position: "top-center",
                                                        autoClose: 2500,
                                                        hideProgressBar: false,
                                                        closeOnClick: false,
                                                        pauseOnHover: true,
                                                        draggable: true,
                                                        style: {
                                                            backgroundColor: "#ffff",
                                                            color: "#f76097",
                                                            fontWeight: "bolder",
                                                            borderRadius: "10px",
                                                            fontFamily: "Indie Flower, cursive",
                                                            letterSpacing: "0.1em",
                                                            width: "400px",
                                                            minWidth: "300px",
                                                            textAlign: "center",
                                                        },
                                                    })
                                                    navigate('/')   // or navigate('/profile')
                                                } else {
                                                    navigate('/login')
                                                }
                                                setShowProfileMenu(false)
                                            }}
                                            className="cursor-pointer hover:text-gray-700"
                                        >
                                            My Profile
                                        </p>
                                        <hr className="border-t border-pink-300 my-0" />

                                        {/* Orders (always shown) */}
                                        <p
                                            onClick={() => {
                                                navigate('/orders')
                                                setShowProfileMenu(false)
                                            }}
                                            className="cursor-pointer hover:text-gray-700"
                                        >
                                            Orders
                                        </p>
                                        <hr className="border-t border-pink-300 my-0" />

                                        {/* Logout (only when logged in) */}
                                        {localStorage.getItem("token") && (
                                            <p
                                                onClick={() => {
                                                    logout()
                                                    setShowProfileMenu(false)
                                                    toast(" ✔️ Successfully logged out!", {
                                                        position: "bottom-center",
                                                        autoClose: 4000,
                                                        hideProgressBar: false,
                                                        closeOnClick: false,
                                                        pauseOnHover: true,
                                                        draggable: true,
                                                        style: {
                                                            backgroundColor: "#f76097",
                                                            color: "#ffff",
                                                            fontWeight: "bolder",
                                                            borderRadius: "10px",
                                                            fontFamily: "Indie Flower, cursive",
                                                            letterSpacing: "0.05em",
                                                            width: "350px",
                                                            textAlign: "center",
                                                            fontSize: "22px",
                                                        },
                                                        progressStyle: {
                                                            background: "#FFFFFF",
                                                            height: "16px",
                                                            borderRadius: "0 0 10px 10px", // match toast rounded edges
                                                        },
                                                    })
                                                }}
                                                className="cursor-pointer hover:text-gray-700"
                                            >
                                                Logout
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* WISHLIST ICON */}
                        <Link to="/wishlist" className="relative mt-1.5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-7 h-7 cursor-pointer"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="white"
                                strokeWidth="1.5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 8.5C3 6 5 4 7.5 4C9.28 4 11 5.25 11.5 6.9C12 5.25 13.72 4 15.5 4C18 4 20 6 20 8.5C20 13 12 20 12 20C12 20 3 13 3 8.5Z"
                                />
                            </svg>
                            {getWishlistCount() > 0 && (
                                <span className="absolute -top-2 -right-2 min-w-[14px] h-4 px-[2px] bg-white text-black rounded-full text-[10px] flex items-center justify-center">
                                    {getWishlistCount()}
                                </span>
                            )}
                        </Link>

                        {/* CART ICON */}
                        <Link to="/cart" className="relative mt-1.5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-7 h-7 cursor-pointer"
                                fill="none"
                                stroke="white"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                            >
                                <path d="M3 3h2l.4 2M5.4 5l1.6 8h10l4-8H5.4z" />
                                <circle cx="9" cy="20" r="1.5" />
                                <circle cx="17" cy="20" r="1.5" />
                            </svg>
                            {getCartCount() > 0 && (
                                <span className="absolute -top-2 -right-2 min-w-[14px] h-4 px-[2px] bg-white text-black rounded-full text-[10px] flex items-center justify-center">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>

            {/* NAVBAR MAIN ROW */}
            <div className="relative max-w-7xl mx-auto flex items-center justify-between py-4 font-medium px-4 sm:px-8 -mt-4">
                {/* LEFT: SEARCH */}
                <div className="flex items-center gap-4 flex-1">
                    {/* Desktop search */}
                    <input
                        type="text"
                        onFocus={() => {
                            setShowSearch(true)
                            if (!location.pathname.includes('/collection')) {
                                navigate('/collection')
                            }
                        }}
                        placeholder="Search products..."
                        className="hidden sm:block w-48 md:w-64 border border-[#ffc6db] rounded-full px-4 py-1.5 focus:outline-none"
                    />

                    {/* Mobile search icon */}
                    <svg
                        onClick={() => {
                            setShowSearch(true)
                            if (!location.pathname.includes('/collection')) {
                                navigate('/collection')
                            }
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="sm:hidden w-6 h-6 cursor-pointer text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </div>

                {/* CENTER: LOGO */}
                <Link to="/" className="flex-shrink-0 mx-auto sm:mr-40">
                    <img src={assets.logo} alt="Logo" className="w-[180px] sm:w-[220px]" />
                </Link>

                {/* RIGHT: NAV LINKS */}
                <ul className="hidden sm:flex gap-6 text-base font-semibold ml-auto">
                    <NavLink
                        to="/collection"
                        className="relative after:content-[''] after:block after:h-[2px] after:w-0 after:bg-[#f76097] after:transition-all hover:after:w-full"
                    >
                        COLLECTION
                    </NavLink>
                    <NavLink
                        to="/about"
                        className="relative after:content-[''] after:block after:h-[2px] after:w-0 after:bg-[#f76097] after:transition-all hover:after:w-full"
                    >
                        ABOUT
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className="relative after:content-[''] after:block after:h-[2px] after:w-0 after:bg-[#f76097] after:transition-all hover:after:w-full"
                    >
                        CONTACT
                    </NavLink>
                </ul>

                {/* MOBILE MENU ICON */}
                <svg
                    onClick={() => setVisible(true)}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 text-black cursor-pointer sm:hidden ml-auto"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            </div>

            {/* MOBILE SIDEBAR */}
            <div
                className={`fixed top-0 right-0 h-full w-3/4 max-w-sm bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${visible ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Close button */}
                <button
                    onClick={() => setVisible(false)}
                    className="absolute top-4 right-4 text-black text-2xl"
                >
                    ✕
                </button>

                <div className="flex flex-col h-full mt-12">
                    {['/collection', '/about', '/contact'].map((path, idx) => {
                        const names = ['COLLECTION', 'ABOUT', 'CONTACT']
                        return (
                            <NavLink
                                key={path}
                                onClick={() => setVisible(false)}
                                className="py-2 px-4 text-lg font-semibold hover:bg-gray-100 border-b border-[#f76097]"
                                to={path}
                            >
                                {names[idx]}
                            </NavLink>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Navbar
