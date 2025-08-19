import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#ffffff] px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-md border border-[#ffc3d9]">
        <h1 className="text-2xl sm:text-4xl font-bold text-center text-[#f76097] mb-6">Admin Panel</h1>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          {errorMsg && (
            <p className="text-sm text-[#ff1269] font-semibold text-center">{errorMsg}</p>
          )}

          <div>
            <p className="text-sm font-bold text-black mb-1">Email Address</p>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-[#ffc3d9] focus:outline-none focus:ring-1 focus:ring-pink-300"
            />
          </div>

          <div>
            <p className="text-sm font-bold text-black mb-1">Password</p>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-[#ffc3d9] focus:outline-none focus:ring-1 focus:ring-pink-300"
            />
          </div>

          <button
            type="submit"
            className="w-3/4 mx-auto block bg-[#000000] hover:bg-[#2a2a2a] transition-colors text-white font-bold py-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
