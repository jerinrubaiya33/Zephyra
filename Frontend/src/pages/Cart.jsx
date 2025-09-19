import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, getCartCount } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [toastShown, setToastShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const productId in cartItems) {
      const sizes = cartItems[productId];
      for (const size in sizes) {
        if (sizes[size] > 0) {
          tempData.push({
            _id: productId,
            size: size,
            quantity: sizes[size]
          });
        }
      }
    }
    setCartData(tempData);
    setToastShown(false); // Reset toast state when cart changes
  }, [cartItems]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };
  const handleCheckout = () => {
    if (cartData.length === 0) {
      if (!toastShown) {
        toast('🛒 Your cart is empty, please add any product', {
          style: {
            backgroundColor: 'white',
            color: 'black',
            fontWeight: 'bold',
            borderRadius: '0px',
            fontFamily: '"Indie Flower", cursive',
          },
          progressStyle: {
            background: 'black',
          },
          autoClose: 5000, // 5 seconds
        });
        setToastShown(true);
      }
    } else {
      navigate('/place-order');
    }
  };

  return (
    <div className='pt-28 sm:pt-10 border-t border-[#ffd7d7] sm:-mt-20 -mt-16'>
      <div className='text-2xl mb-4 sm:mb-0 -mt-20 sm:-mt-2'>
        <Title text1={'YOUR'} text2={'CART'} />
        <hr className="border-[#ffd7d7] sm:border-[#ffd7d7] sm:p-2 mb-2" />
      </div>

      <div className="flex flex-col gap-4">
        {cartData.length > 0 ? (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            if (!productData) return null;

            return (
              <div
                key={index}
                className="
                  flex flex-row items-center gap-4 py-4 border-b-1 border-[#ffd7d7]
                  sm:grid sm:grid-cols-[4fr_2fr_0.5fr] sm:items-center sm:border-[#ffd7d7] sm:p-4 -mt-4
                "
              >
                {/* Product Info: image + product name & details */}
                <div className='flex items-start gap-4 flex-grow min-w-0'>
                  <img
                    className='w-20 sm:w-24 flex-shrink-0 cursor-pointer'
                    src={productData.image?.[0] || ''}
                    alt={productData.name}
                    onClick={() => handleProductClick(productData._id)}
                  />
                  <div className='flex flex-col min-w-0'>
                    <p
                      className='text-sm font-bold sm:text-lg break-normal whitespace-nowrap cursor-pointer'
                      style={{ wordBreak: 'break-word' }}
                      onClick={() => handleProductClick(productData._id)}
                    >
                      {productData.name}
                    </p>
                    <div className='flex gap-4 mt-2 items-center text-base'>
                      <p>{currency}{productData.price}</p>
                      <p className="inline-block px-1 py-1 border border-[#ffd7d7] whitespace-nowrap -ml-2">
                        Size: {item.size}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Spacer for mobile only */}
                <div className="flex-grow sm:hidden" />

                {/* Quantity Control */}
                <div className="flex items-center gap-2 w-auto sm:w-auto flex-shrink-0 mt-7 sm:mb-0">
                  <span className='text-base whitespace-nowrap ml-22'>Qty:</span>
                  <input
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value > 0) {
                        updateQuantity(item._id, item.size, value);
                      }
                    }}
                    className="border border-[#ffd7d7] w-14 px-2 py-1 text-base sm:w-20"
                  />
                </div>

                {/* Delete Button */}
                <div className='flex justify-center ml-4 sm:justify-center sm:ml-0 flex-shrink-0 -mt-3'>
                  <svg
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="w-6 h-6 cursor-pointer text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 6h18v2H3V6zm2 3h14v13a2 2 0 01-2 2H7a2 2 0 01-2-2V9zm5 2v9h2v-9H10zm4 0v9h2v-9h-2zM9 4V3a1 1 0 011-1h4a1 1 0 011 1v1h5v2H4V4h5z" />
                  </svg>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-10">
            <p className="text-lg">Oppsss! Your cart is empty ;</p>
            <button
              onClick={() => navigate('/collection')}
              className="mt-4 bg-black text-white px-6 py-2"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      {cartData.length > 0 && (
        <div className='flex justify-end my-10 sm:my-20'>
          <div className='w-full sm:w-[450px] px-2'>
            <CartTotal />
            <div className='w-full text-end'>
              <button
                onClick={handleCheckout}
                className={`text-medium px-6 my-6 py-2 ${getCartCount() === 0
                    ? 'bg-white border border-pink-400 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800 transition-colors'
                  }`}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;