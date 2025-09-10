import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestseller);
        setBestSeller(bestProduct.slice(0, 6));
    }, [products]);

    return (
        <section id="BestSeller" className='my-10 px-4 md:px-0'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className='w-full sm:w-3/4 md:w-2/4 m-auto text-sm sm:text-base md:text-lg text-black'>
                    Crafted for distinction. These best sellers blend refined design with elevated comfort — timeless pieces made for those who move with quiet confidence.
                </p>
            </div>

            {/*____ DISPLAY PRODUCTS ___*/}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 gap-y-5 mx-0 md:-ml-16 md:-mr-12'>
                {
                    bestSeller.map((item, index) => (
                        <ProductItem
                            key={index}
                            id={item._id}
                            name={item.name}
                            image={item.image}
                            price={item.price}
                        />
                    ))
                }
            </div>
        </section>
    )
}

export default BestSeller