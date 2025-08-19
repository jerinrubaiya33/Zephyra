import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { toast } from 'react-toastify'

const Orders = () => {
  const { products, currency, backendUrl } = useContext(ShopContext)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchOrders()
  }, [backendUrl])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${backendUrl}/api/order/userorders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({})
      })

      const data = await res.json()
      if (res.ok) {
        setOrders(data.orders)
      } else {
        toast.error(data.error || 'Failed to fetch orders')
      }
    } catch (err) {
      console.error('Fetch orders error:', err)
      toast.error('Something went wrong')
    }
  }

  const handleTrackOrder = async (orderId, currentStatus) => {
    const token = localStorage.getItem('token')
    const nextStatus =
      currentStatus === 'Pending' ? 'Ready to ship' : 'Shipped' // simple toggle logic

    try {
      const res = await fetch(`${backendUrl}/api/order/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ orderId, status: nextStatus })
      })

      const data = await res.json()

      if (res.ok) {
        toast('📦 You cannot track order before parcel out for  delivery!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            background: '#fff',
            color: '#000',
            fontFamily: '"Indie Flower", cursive',
            fontWeight: 'bold',
            fontSize: '18px', 
          },
        });

        fetchOrders()
      } else {
        toast.error(data.error || 'Failed to update status')
      }
    } catch (err) {
      console.error('Track order error:', err)
      toast.error('Error tracking order')
    }
  }

  return (
    <div className='mr-10 pt-5 border-t border-[#ffd7d7] -mt-20 sm:-mt-28 ml-5'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {orders.length === 0 ? (
          <p className='py-10 text-center text-gray-500'>No orders found.</p>
        ) : (
          orders.map((order, index) => {
            const product = products.find(p => p._id === order.items[0].productId)

            return (
              <div
                key={index}
                className='py-4 border-t border-b border-[#ffd7d7] text-black flex flex-col md:flex-row md:items-center md:justify-between gap-4'
              >
                <div className='flex items-start gap-6 text-sm'>
                  <img className='w-16 sm:w-20' src={product?.image[0]} alt='' />
                  <div>
                    <p className='sm:text-base font-bold'>{product?.name}</p>
                    <div className='flex items-center gap-3 mt-2 text-base text-black'>
                      <p className='text-lg font-medium'>
                        {currency}
                        {order.amount}
                      </p>
                      <p>
                        <span className='font-bold'>Quantity:</span>{' '}
                        <span className='text-black'>{order.items[0].quantity}</span>
                      </p>
                      <p>
                        <span className='font-bold'>Size:</span>{' '}
                        <span className='text-black'>{order.items[0].size}</span>
                      </p>
                    </div>
                    <p className='mt-2'>
                      <span className='font-bold'>Date:</span>{' '}
                      <span className='text-black'>
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                    </p>
                     <p className='mt-2'>
                      <span className='font-bold'>Payment Method:</span>{' '}
                      <span className='text-black'>
                        {(order.paymentMethod)}
                      </span>
                    </p>
                  </div>
                </div>
                <div className='md:w-1/2 flex justify-between'>
                  <div className='flex items-center gap-2'>
                    <p className='min-w-2 h-2 rounded-full bg-pink-400'></p>
                    <p className='text-base md:text-sm font-bold'>
                      {order.status || 'Pending'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleTrackOrder(order._id, order.status || 'Pending')}
                    className='border border-[#ffd7d7] px-4 py-2 text-sm font-bold'
                  >
                    Track Order
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default Orders