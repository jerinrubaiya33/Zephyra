import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {

    const {currency, delivery_fee, getCartAmount} = useContext(ShopContext)

  return (
    <div className='w-full'>
        {/* <div className='text-2xl'>
            <Title text1={'CART'} text2={'TOTALS'} />
        </div> */}
         <div className='inline-flex gap-1 sm:gap-2 items-center mb-2 sm:mb-3 -mt-2 sm:-mt-6'>
            <p className='text-black font-light text-2xl sm:text-2xl md:text-3xl'>
              CART <span className='text-[#f76097] font-medium'>TOTALS</span>
            </p>
            <p className='w-6 sm:w-8 md:w-12 h-[1px] sm:h-[2px] md:h-[2px] bg-[#f76097]'></p>
          </div>
        <div className='flex flex-col gap-2 text-lg'>
            <div className='flex justify-between'>
                <p>Subtotal</p>
                <p className=' mr-5'>{currency} {getCartAmount()}.00</p>
            </div>
            <hr className='border border-[#ffc6db]'/>
            <div className='flex justify-between'>
                <p>Shipping fee</p>
                <p className='mr-5'>{currency} {delivery_fee}.00</p>
            </div>
            <hr className='border border-[#ffc6db]'/>
            <div className='flex justify-between'>
                <b>Total</b>
                <b className='mr-5'>{currency} {getCartAmount() === 0 ? 0: getCartAmount() + delivery_fee}.00</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal