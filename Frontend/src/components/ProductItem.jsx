import React, { useContext } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({ id, image, name, price, discount }) => {
  const { toggleWishlist, isInWishlist } = useContext(ShopContext);

  const hasDiscount = discount && discount > 0;
  const discountedPrice = hasDiscount ? (price - (price * discount) / 100).toFixed(2) : price;
  const mainImage = Array.isArray(image) && image.length > 0 ? image[0] : '';

  return (
    <Link to={`/product/${id}`} className="relative text-black cursor-pointer group">
      {/* Wishlist */}
      <button
        onClick={(e) => { e.preventDefault(); toggleWishlist(id); }}
        className="absolute top-2 right-2 z-10 bg-white p-1 rounded-full shadow-md"
        aria-label="Toggle Wishlist"
      >
        {isInWishlist(id) ? <FaHeart className="text-[#f76097]" size={18} /> : <FaRegHeart className="text-gray-500" size={18} />}
      </button>

      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-0 left-0 z-10 bg-[#f76097] text-white text-xs font-bold px-2 py-1">
          {discount}% OFF
        </div>
      )}
      {/* 
      {hasDiscount && (
        <div className="absolute top-2 left-2 z-10 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
          {discount}% OFF
        </div>
      )} */}

      {/* Image */}
      <div className="overflow-hidden relative">
        {mainImage ? (
          <img src={mainImage} alt={name} className="hover:scale-110 transition duration-300 ease-in-out w-full" />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>

      {/* Info */}
      <p className="pt-3 pb-1 text-medium font-bold text-black">{name}</p>
      <div className="flex items-center gap-2">
        {hasDiscount ? (
          <>
            <p className="text-medium font-bold text-[#f76097]">${discountedPrice}</p>
            <p className="text-sm line-through text-gray-400">${price}</p>
          </>
        ) : (
          <p className="text-medium font-bold text-[#f76097]">${price}</p>
        )}
      </div>
    </Link>
  );
};

export default ProductItem;
