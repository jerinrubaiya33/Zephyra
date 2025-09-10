import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [products]);

    return (
        <div className='my-10 px-4 md:px-0'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={"LATEST"} text2={'COLLECTIONS'} />
                <p className='w-full sm:w-3/4 md:w-2/4 m-auto text-sm sm:text-base md:text-lg text-black'>
                    New drops alert! Our latest collections are here to refresh your wardrobe with trendy, must-have pieces.
                </p>
            </div>

            {/* Product Grid */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 gap-y-6 mx-0 md:-ml-16 md:-mr-14'>
                {
                    latestProducts.map((item, index) => (
                        <ProductItem
                            key={index}
                            id={item._id}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default LatestCollection;
