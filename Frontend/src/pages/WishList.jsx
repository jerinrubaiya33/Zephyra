import React, { useContext } from 'react';
import ProductItem from '../components/ProductItem';
import { ShopContext } from '../context/ShopContext';

const Wishlist = () => {
  const { products, wishlistItems } = useContext(ShopContext);

  const filteredProducts = products.filter(product => wishlistItems.includes(product._id));

  return (
    <div className="p-4 md:px-8 lg:px-16 xl:px-32">
      <h1 className="text-3xl font-extrabold mb-6 text-black">Your Wishlist</h1>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {filteredProducts.map(product => (
            <ProductItem
              key={product._id}
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      ) : (
        <p className="text-black">Your wishlist is currently empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
