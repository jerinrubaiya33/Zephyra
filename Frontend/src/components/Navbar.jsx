import React, { useContext, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { Link as ScrollLink } from 'react-scroll'

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const { setShowSearch, getCartCount, token, setToken, setCartItems } = useContext(ShopContext)

    const location = useLocation()
    const navigate = useNavigate()

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    return (
        <div className='flex items-center justify-between px-6 py-4 shadow-md sticky top-0 bg-white z-50'>
            {/* LOGO */}
            <NavLink to='/' className="flex items-center gap-2">
                <img src="/logo.png" alt="logo" className="w-10 h-10 object-contain" />
                <h1 className="text-xl font-bold text-black">ShopEase</h1>
            </NavLink>

            {/* NAV LINKS */}
            <div className='hidden md:flex items-center gap-6'>
                <NavLink to='/' className={({ isActive }) => (isActive ? 'text-pink-500 font-semibold' : 'text-black')}>
                    Home
                </NavLink>

                <NavLink to='/collection' className={({ isActive }) => (isActive ? 'text-pink-500 font-semibold' : 'text-black')}>
                    Collection
                </NavLink>

                {/* SCROLL TO BESTSELLER */}
                <ScrollLink
                    to="BestSeller"
                    smooth={true}
                    duration={500}
                    offset={-100}
                    className="cursor-pointer text-black hover:text-pink-500"
                >
                    Best Sellers
                </ScrollLink>
            </div>

            {/* SEARCH + CART + PROFILE */}
            <div className="flex items-center gap-6">
                {/* SEARCH ICON */}
                <svg
                    onClick={() => {
                        setShowSearch(true)
                        if (!location.pathname.includes('/collection')) {
                            navigate('/collection')
                        }
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 text-black cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>

                {/* CART ICON */}
                <div className="relative">
                    <NavLink to="/cart">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7 text-black"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h14l1-5H6.4M7 13l-1.6 8H19m-7 0a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                        {getCartCount() > 0 && (
                            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-1.5 py-0.5">
                                {getCartCount()}
                            </span>
                        )}
                    </NavLink>
                </div>

                {/* PROFILE MENU */}
                <div className="relative">
                    <svg
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-7 h-7 text-black cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A9 9 0 1117.804 5.121 9 9 0 015.121 17.804z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>

                    {showProfileMenu && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                            {!token ? (
                                <NavLink to="/login" className="block px-4 py-2 text-black hover:bg-gray-100">
                                    Login
                                </NavLink>
                            ) : (
                                <button
                                    onClick={logout}
                                    className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
