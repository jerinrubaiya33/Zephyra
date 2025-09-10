import React, { useContext } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({ id, image, name, price }) => {
  const { toggleWishlist, isInWishlist } = useContext(ShopContext);

  const handleWishlistToggle = (e) => {
    e.preventDefault(); // Prevent navigating to product page
    toggleWishlist(id);
  };

  return (
    <Link to={`/product/${id}`} className="relative text-black cursor-pointer group">
      {/* Wishlist Icon */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-2 right-2 z-10 bg-white p-1 rounded-full shadow-md"
        aria-label="Toggle Wishlist"
      >
        {isInWishlist(id) ? (
          <FaHeart className="text-[#f76097]" size={18} />
        ) : (
          <FaRegHeart className="text-gray-500" size={18} />
        )}
      </button>

      {/* Product Image */}
      <div className="overflow-hidden relative">
        <img
          src={image[0]}
          alt={name}
          className="hover:scale-110 transition duration-300 ease-in-out w-full"
        />
      </div>

      {/* Product Info */}
      <p className="pt-3 pb-1 text-medium font-bold text-black">{name}</p>
      <p className="text-medium font-bold text-[#f76097]">${price}</p>
    </Link>
  );
};

export default ProductItem;
