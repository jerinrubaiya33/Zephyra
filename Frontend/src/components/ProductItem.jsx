import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);
    return (
        <Link className='text-black cursor-pointer' to={`/product/${id}`}>
            <div className='overflow-hidden'>
                <img
                    className='hover:scale-110 transition duration-300 ease-in-out'
                    src={image[0]}
                    alt={name}
                />
            </div>
            <p className='pt-3 pb-1 text-medium font-bold text-black'>{name}</p>
            <p className='text-medium font-bold text-[#f76097] '>{currency}{price}</p>
        </Link>
    )
}

export default ProductItem