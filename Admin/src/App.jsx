import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Order from './pages/Order';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';


export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'
const App = () => {

  //when we're not authenticated then we'll displayed this login component
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <div className='bg-white min-h-screen'>
      {/* when this token will be available then this NavBar section will be displayed if then then login component will be displayed */}
      <ToastContainer
        position="top-right"
        toastClassName="!text-black !font-bold !rounded-none !bg-white !font-semibold !font-[Indie_Flower]"
        progressClassName="!bg-[#f76097] !rounded-none "
        icon={<span style={{ color: 'black' }}>⚠️</span>} // Black icon here
      />

      {token === "" ? <Login setToken={setToken} /> : <>
        <Navbar setToken={setToken} />
        <div className='flex w-full'>
          <Sidebar />
          <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-black text-base'>
            <Routes>
              <Route path="/" element={<List token={token} />} />   {/* Default page */}
              <Route path="/add" element={<Add token={token} />} />
              <Route path="/list" element={<List token={token} />} />
              <Route path="/orders" element={<Order token={token} />} />
            </Routes>
          </div>
        </div>
      </>}
    </div>
  )
}

export default App