import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    getWishlistCount,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  useEffect(() => {
    let timer;
    if (showProfileMenu) {
      timer = setTimeout(() => setShowProfileMenu(false), 2000);
    }
    return () => clearTimeout(timer);
  }, [showProfileMenu]);

  const zigzagStyle = {
    WebkitMaskImage: `linear-gradient(to bottom, #000 calc(100% - 6px), transparent calc(100% - 6px)), 
                          conic-gradient(from -45deg at bottom, #000 90deg, transparent 0)`,
    WebkitMaskSize: `100% 100%, 15px 6px`,
    WebkitMaskRepeat: `no-repeat, repeat-x`,
    WebkitMaskPosition: `0 0, bottom left`,
    maskImage: `linear-gradient(to bottom, #000 calc(100% - 6px), transparent calc(100% - 6px)), 
                    conic-gradient(from -45deg at bottom, #000 90deg, transparent 0)`,
    maskSize: `100% 100%, 15px 6px`,
    maskRepeat: `no-repeat, repeat-x`,
    maskPosition: `0 0, bottom left`,
  };

  return (
    <div className="sticky top-0 z-50 w-screen sm:mb-15 mb-14 sm:-ml-27.5 -ml-4">
      {/* TOP BAR */}
      <div className="absolute top-0 left-0 right-0 bg-[#f76097] z-50">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-8 py-1">
          <p className="hidden sm:block text-xs sm:text-sm md:text-[16px] font-extrabold uppercase tracking-[0.3em] text-white ml-18">
            Your Style, Your Sale –{" "}
            <span className="font-bold">Uncover your next favorite!</span>
          </p>

          <p className="block sm:hidden text-sm text-white font-semibold text-center w-full">
            Uncover your next favorite!
          </p>

          <div className="flex items-center gap-3 text-white sm:mr-24 mr-2">
            {/* Profile */}
            <div className="relative">
              <svg
                onClick={() => setShowProfileMenu((prev) => !prev)}
                className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer"
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
                    <p
                      onClick={() => {
                        const token = localStorage.getItem("token");
                        if (token) {
                          toast("Hello There! You're already logged in");
                          navigate("/");
                        } else navigate("/login");
                        setShowProfileMenu(false);
                      }}
                      className="cursor-pointer hover:text-gray-700"
                    >
                      My Profile
                    </p>

                    <hr />

                    <p
                      onClick={() => {
                        navigate("/orders");
                        setShowProfileMenu(false);
                      }}
                      className="cursor-pointer hover:text-gray-700"
                    >
                      Orders
                    </p>

                    {localStorage.getItem("token") && (
                      <>
                        <hr />
                        <p
                          onClick={() => {
                            logout();
                            setShowProfileMenu(false);
                            toast("Logged out!");
                          }}
                          className="cursor-pointer hover:text-gray-700"
                        >
                          Logout
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M3 8.5C3 6 5 4 7.5 4C9.28 4 11 5.25 11.5 6.9C12 5.25 13.72 4 15.5 4C18 4 20 6 20 8.5C20 13 12 20 12 20C12 20 3 13 3 8.5Z" />
              </svg>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative mt-1.5">
              <svg
                className="w-7 h-7"
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

      {/* MAIN NAV */}
      <div style={zigzagStyle} className="bg-white">
        <div className="flex items-center justify-between px-4 sm:px-18 py-[0px] sm:py-2">
          {/* LEFT */}
          <div className="flex items-center gap-1 sm:gap-12 sm:-ml-15 sm:-mt-5 mt-5 sm:-mb-15">
            {/* MOBILE SEARCH (more compact) */}
            <input
              type="text"
              onFocus={() => {
                setShowSearch(true);
                if (!location.pathname.includes("/collection"))
                  navigate("/collection");
              }}
              placeholder="Search..."
              className="block sm:hidden w-28 border border-[#ffc6db] rounded-full px-2 py-[4px] text-[10px] mt-2.5"
            />

            {/* DESKTOP SEARCH (UNCHANGED) */}
            <input
              type="text"
              onFocus={() => {
                setShowSearch(true);
                if (!location.pathname.includes("/collection"))
                  navigate("/collection");
              }}
              placeholder="Search products..."
              className="hidden sm:block w-48 md:w-70 ml-30 border border-[#ffc6db] rounded-full px-4 py-1.5"
            />

            {/* LOGO (slightly smaller for tighter height) */}
            <Link to="/" className="ml-1 sm:ml-10 sm:mt-0 -mt-5">
              <img
                src={assets.logo}
                alt="logo"
                className="w-[150px] sm:w-[220px] sm:-mb-0 -mb-7"
              />
            </Link>
          </div>

          {/* NAV LINKS (DESKTOP) */}
          <ul className="hidden sm:flex gap-6 text-base font-semibold sm:-mt-20 sm:-mb-32 sm:mr-12">
            <NavLink to="/collection">COLLECTION</NavLink>
            <NavLink to="/about">ABOUT</NavLink>
            <NavLink to="/contact">CONTACT</NavLink>
          </ul>

          {/* MENU ICON */}
          <svg
            onClick={() => setVisible(true)}
            className="w-6 h-6 sm:hidden mt-7"
            fill="none"
            stroke="#212121"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </div>
      </div>

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 max-w-sm bg-white z-50 shadow-lg transform transition-transform duration-300 ${visible ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-8 text-2xl"
        >
          ✕
        </button>
        <div className="flex flex-col mt-12">
          <NavLink
            onClick={() => setVisible(false)}
            className="p-4 border-b border-pink-300"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="p-4 border-b border-pink-300"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="p-4 border-b border-pink-300"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;