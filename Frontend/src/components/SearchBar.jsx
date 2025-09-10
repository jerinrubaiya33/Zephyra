import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const SearchBar = () => {
  const context = useContext(ShopContext);
  console.log('ShopContext values:', context);
  const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(location.pathname.includes('collection'));
  }, [location]);

  // return showSearch && visible ? (
  //   <div className='border-t border-b text-center -mt-22 mb-20 relative z-40 border-[#fff2f8] bg-white'>
  //     <div className='bg-white inline-flex items-center justify-between border border-[#ffa1c4] px-5 py-2 my-2 mx-3 rounded-full w-3/4 sm:w-1/2 shadow-sm focus-within:shadow-md transition-shadow'>
  //       <input
  //         value={search}
  //         onChange={(e) => setSearch(e.target.value)}
  //         className='flex-1 outline-none bg-inherit text-sm sm:text-base placeholder-black text-black'
  //         type='text'
  //         placeholder='Search'
  //       />
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         className="w-4 sm:w-5 ml-2 text-black"
  //         viewBox="0 0 24 24"
  //         fill="none"
  //         stroke="currentColor"
  //         strokeWidth="2"
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //       >
  //         <circle cx="11" cy="11" r="8" />
  //         <line x1="21" y1="21" x2="16.65" y2="16.65" />
  //       </svg>
  //     </div>
  //     <div
  //       onClick={() => setShowSearch(false)}
  //       className='mt-2 inline-block cursor-pointer p-2 bg-white rounded-full z-50 relative'
  //     >
  //       <svg
  //         className="w-6 h-6 -mb-4 text-black"
  //         xmlns="http://www.w3.org/2000/svg"
  //         viewBox="0 0 32 32"
  //         fill="none"
  //         stroke="currentColor"
  //         strokeWidth="2"
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //       >
  //         <path d="M8 8L24 24" />
  //         <path d="M24 8L8 24" />
  //       </svg>
  //     </div>
  //   </div>
  // ) : null;
};

export default SearchBar;