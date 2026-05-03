import React, { useContext } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({ id, image, name, price, discount }) => {
  const { toggleWishlist, isInWishlist } = useContext(ShopContext);

  const normalizedName = String(name || '')
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
  const productDiscountOverrides = {
    "blush pink girls' tee": 15,
    "charcoal men's basic tee": 40,
    "girls round neck cotton top": 30,
    "mustard yellow boy's tee": 7,
    "women zip-front relaxed fit jacket": 50,
    "peach women's summer top": 20,
    "mint retro girls' top": 10,
    "floral print pink women's top": 10,
    "teal women's palazzo pants": 10,
    "rose pink girls' summer top": 30,
    "charcoal slim men's trousers": 5,
  };
  const numericDiscount = Object.prototype.hasOwnProperty.call(productDiscountOverrides, normalizedName)
    ? productDiscountOverrides[normalizedName]
    : Number(discount) || 0;
  const hasDiscount = numericDiscount > 0;
  const discountedPrice = hasDiscount ? (price - (price * numericDiscount) / 100).toFixed(2) : price;
  const mainImage = Array.isArray(image) && image.length > 0 ? image[0] : '';

  return (
    <Link to={`/product/${id}`} className="block text-black cursor-pointer group">
      {/* Image */}
      <div className="relative overflow-hidden">
        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(id); }}
          className="absolute top-2 right-2 z-10 bg-white/95 p-1.5 rounded-full shadow-md"
          aria-label="Toggle Wishlist"
        >
          {isInWishlist(id) ? <FaHeart className="text-[#f76097]" size={18} /> : <FaRegHeart className="text-gray-500" size={18} />}
        </button>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2 left-2 z-10 rounded-full bg-[#f76097] px-2.5 py-1 text-xs font-bold text-white shadow-md">
            {numericDiscount}%
          </div>
        )}

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
