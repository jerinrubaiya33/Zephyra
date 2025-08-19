import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import ShopContextProvider from './context/ShopContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <ShopContextProvider>
      <App />
     </ShopContextProvider>
    </BrowserRouter>
  </StrictMode>
);