import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const navigate = useNavigate()
  const { backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)

  const [method, setMethod] = useState('cod')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })
  const [touched, setTouched] = useState({})
  const [showWarning, setShowWarning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const validate = () => {
    const errors = {}
    if (!form.firstName.trim()) errors.firstName = 'First name is required'
    if (!form.email.trim()) errors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Email is invalid'
    if (!form.street.trim()) errors.street = 'Street is required'
    if (!form.city.trim()) errors.city = 'City is required'
    if (!form.country.trim()) errors.country = 'Country is required'
    if (!form.phone.trim()) errors.phone = 'Phone is required'
    else if (!/^\d+$/.test(form.phone)) errors.phone = 'Phone must be digits only'
    return errors
  }

  const errors = validate()
  const isValid = Object.keys(errors).length === 0

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      street: true,
      city: true,
      state: true,
      zipcode: true,
      country: true,
      phone: true,
    })

    if (!isValid) {
      setShowWarning(true)
      return
    }

    try {
      setIsSubmitting(true)

      // Build order items
      let orderItems = []
      for (const productId in cartItems) {
        const sizes = cartItems[productId]
        for (const size in sizes) {
          if (sizes[size] > 0) {
            const product = products.find(p => p._id === productId)
            if (product) {
              orderItems.push({
                productId,
                name: product.name,
                price: product.price,
                size,
                quantity: sizes[size],
                image: product.image[0]
              })
            }
          }
        }
      }

      const address = {
        street: form.street,
        city: form.city,
        state: form.state,
        zipcode: form.zipcode,
        country: form.country,
        phone: form.phone,
        email: form.email
      }

      const subtotal = getCartAmount()
      const total = subtotal + delivery_fee

      const orderData = {
        items: orderItems,
        amount: total,
        address,
        paymentMethod: method.toUpperCase(),
        email: form.email,
        customerName: `${form.firstName} ${form.lastName}`.trim()
      }

      //ensure token from localStorage
      const authToken = token || localStorage.getItem("token")

      const response = await fetch(`${backendUrl}/api/order/place`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(orderData)
      })

      const data = await response.json()

      if (response.ok) {
        toast('˚ ༘⋆🛍️｡˚ Order placed successfully!', {
          style: {
            background: '#ffffff',
            color: '#000000'
          }
        })
        setCartItems({})
        navigate('/orders')
      } else {
        throw new Error(data.message || 'Failed to place order')
      }
    } catch (error) {
      toast.error(error.message)
      console.error('Order placement error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col lg:flex-row gap-1 lg:gap-10 pt-10 border-t border-[#ffd7d7] sm:-mt-20 -mt-16 -ml-2'>
      {/* LEFT - Delivery Information */}
      <div className='flex flex-col gap-4 w-full lg:w-[50%] ml-2 sm:ml-7 -mt-2'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className='flex gap-3'>
          <div className='w-full'>
            <input
              className={`border py-1.5 px-3.5 w-full ${touched.firstName && errors.firstName ? 'border-red-500' : 'border-[#ffc6db]'}`}
              placeholder='First name'
              name='firstName'
              value={form.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.firstName && errors.firstName && <p className='text-red-500 text-xs mt-1'>{errors.firstName}</p>}
          </div>
          <div className='w-full'>
            <input
              className='border py-1.5 px-3.5 w-full border-[#ffc6db]'
              placeholder='Last name (optional)'
              name='lastName'
              value={form.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        </div>

        <input
          className={`border py-1.5 px-3.5 w-full ${touched.email && errors.email ? 'border-red-500' : 'border-[#ffc6db]'}`}
          placeholder='Email address'
          name='email'
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email && <p className='text-red-500 text-xs -mt-3'>{errors.email}</p>}

        <input
          className={`border py-1.5 px-3.5 w-full ${touched.street && errors.street ? 'border-red-500' : 'border-[#ffc6db]'}`}
          placeholder='Street'
          name='street'
          value={form.street}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.street && errors.street && <p className='text-red-500 text-xs -mt-3'>{errors.street}</p>}

        <div className='flex gap-3'>
          <div className='w-full'>
            <input
              className={`border py-1.5 px-3.5 w-full ${touched.city && errors.city ? 'border-red-500' : 'border-[#ffc6db]'}`}
              placeholder='City'
              name='city'
              value={form.city}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.city && errors.city && <p className='text-red-500 text-xs mt-1'>{errors.city}</p>}
          </div>
          <div className='w-full'>
            <input
              className='border py-1.5 px-3.5 w-full border-[#ffc6db]'
              placeholder='State (optional)'
              name='state'
              value={form.state}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        </div>

        <div className='flex gap-3'>
          <div className='w-full'>
            <input
              className='border py-1.5 px-3.5 w-full border-[#ffc6db]'
              placeholder='Zipcode (optional)'
              name='zipcode'
              value={form.zipcode}
              onChange={handleChange}
              onBlur={handleBlur}
              type='text'
            />
          </div>
          <div className='w-full'>
            <input
              className={`border py-1.5 px-3.5 w-full ${touched.country && errors.country ? 'border-red-500' : 'border-[#ffc6db]'}`}
              placeholder='Country'
              name='country'
              value={form.country}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.country && errors.country && <p className='text-red-500 text-xs mt-1'>{errors.country}</p>}
          </div>
        </div>

        <input
          className={`border py-1.5 px-3.5 w-full ${touched.phone && errors.phone ? 'border-red-500' : 'border-[#ffc6db]'}`}
          placeholder='Phone'
          name='phone'
          value={form.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          type='text'
        />
        {touched.phone && errors.phone && <p className='text-red-500 text-xs -mt-3'>{errors.phone}</p>}
      </div>

      {/* RIGHT - Order Summary and Payment */}
      <div className='mt-1 ml-0 lg:w-[50%] lg:ml-5'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <div className='inline-flex gap-1 sm:gap-2 items-center mb-2 sm:mb-3 -mt-2 sm:-mt-4'>
            <p className='text-black font-light text-2xl sm:text-2xl md:text-2xl'>
              PAYMENT <span className='text-[#f76097] font-medium'>METHOD</span>
            </p>
            <p className='w-6 sm:w-8 md:w-12 h-[1px] sm:h-[2px] md:h-[2px] bg-[#f76097]'></p>
          </div>
          <div className='flex flex-col lg:flex-row gap-3 mt-0 overflow-x-auto lg:overflow-visible font-bold'>
            {[
              { key: 'stripe', logo: assets.stripe_logo },
              { key: 'razorpay', logo: assets.razorpay_logo },
              { key: 'cod', text: 'CASH ON DELIVERY' },
            ].map(({ key, logo, text }, idx) => (
              <label
                key={idx}
                className={`flex items-center border px-3 py-3 cursor-pointer ${method === key ? 'border-[#ff92b8] shadow-sm' : 'border-[#ffc6db]'} transition gap-2 min-w-[170px]`}
              >
                <input
                  type='radio'
                  name='payment'
                  value={key}
                  checked={method === key}
                  onChange={() => setMethod(key)}
                  className='hidden peer'
                />
                <div className='h-3 w-3 border border-[#ffa1c4] rounded-sm peer-checked:bg-[#ffa1c4] peer-checked:border-[#ffa1c4] transition' />
                {logo ? (
                  <img className='h-7 w-20 object-contain ml-1' src={logo} alt='Payment Logo' />
                ) : (
                  <span className='text-sm font-bold text-black ml-1'>{text}</span>
                )}

              </label>
            ))}
          </div>

          {showWarning && (
            <div className='text-red-500 text-sm mt-2 font-medium'>
              Please fill all required fields before placing the order.
            </div>
          )}

          <div className='w-full text-end mt-3'>
            <button
              type='submit'
              disabled={isSubmitting}
              className={`px-16 py-2 text-medium font-bold -mr-0 sm:ml-16 ${isValid
                ? 'bg-black text-white hover:bg-gray-800'
                : 'border border-pink-300 px-8 py-2 font-bold cursor-not-allowed'
                } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'PLACING ORDER...' : 'PLACE ORDER'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder