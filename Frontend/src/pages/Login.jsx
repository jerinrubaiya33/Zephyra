import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl, setCartItems } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showToast = (message, type = 'default') => {
    toast(message, {
      type,
      position: "bottom-center",
      autoClose: 3000,
      theme: "light",
      style: {
        fontFamily: "Indie Flower",
        fontWeight: 'bolder',
        letterSpacing: "0.05em",
        width: "350px",
        textAlign: "center",
        fontSize: "22px",
        backgroundColor: "#ffffff",
        color: "#f76097",
      }
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const endpoint = currentState === 'Sign up' ? '/api/user/register' : '/api/user/login';
      const payload = currentState === 'Sign up' ? { name, email, password } : { email, password };
      const response = await axios.post(backendUrl + endpoint, payload);

      if (response.data.success) {
        const { token, cartData, userId } = response.data;

        if (token) {
          setToken(token);
          localStorage.setItem('token', token);

          if (userId) {
            localStorage.setItem('userId', userId);
          }

          if (cartData) {
            localStorage.setItem('cartData', JSON.stringify(cartData));
            setCartItems(cartData);
          }

          navigate('/');
          showToast("Logged in successfully!", 'success');
        } else {
          showToast("Registration successful. You can now log in.", 'success');
          setCurrentState('Login');
        }

        setName('');
        setEmail('');
        setPassword('');
      } else {
        showToast(response.data.message || 'Action failed.', 'error');
      }
    } catch (error) {
      console.error("Auth Error:", error);
      showToast(error.response?.data?.message || "Server error", 'error');
    }
  };

  useEffect(() => {
    if (token) navigate('/');
  }, [token]);

  return (
    <div className='pt-10 border-t border-[#ffd7d7] sm:-mt-20 -mt-16 -ml-2'>
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto -mt-10 gap-4 text-black'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-[#f76097]' />
        </div>

        {currentState === 'Login' ? null : (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full px-3 py-2 border border-[#f76097]"
            required
          />
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-3 py-2 border border-[#f76097]"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-3 py-2 border border-[#f76097]"
          required
        />

        <div className='w-full justify-between flex text-sm mt-[-8px]'>
          <p className='cursor-pointer ml-1 font-medium text-base'>Forgot your password</p>
          <p
            onClick={() => setCurrentState(currentState === 'Login' ? 'Sign up' : 'Login')}
            className='cursor-pointer font-medium text-base'
          >
            {currentState === 'Login' ? 'Create account' : 'Login here'}
          </p>
        </div>

        <button className='bg-black text-white font-light px-14 py-2 mt-4 hover:bg-gray-700 hover:text-white transition-colors duration-300'>
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>

      </form>
    </div>
  );
};

export default Login;
