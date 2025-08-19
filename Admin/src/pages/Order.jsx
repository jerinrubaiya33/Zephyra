import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Order = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )

      console.log("API Response:", response.data)

      if (response.data.orders) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message || 'No orders returned')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  // Handle order status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast.success(response.data.message || 'Order status updated')
      fetchAllOrders()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="p-4 -mt-8">
      <h2 className="text-2xl text-[#f76097] font-bold mb-4 font-indie-flower">
        All Orders
      </h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={order._id || index}
              className="flex flex-col md:flex-row md:items-center border border-pink-300 p-4 shadow gap-4"
            >
              {/* Parcel Icon */}
              <div className="flex justify-center md:w-[8%]">
                <img src={assets.parcel_icon} alt="parcel" className="w-12 h-12" />
              </div>

              {/* Customer Info */}
              <div className="text-sm md:w-[25%]">
                <p><strong>Email:</strong> {order.address?.email}</p>
                <p><strong>Address:</strong> {order.address?.street}, {order.address?.city}, {order.address?.country}</p>
                <p><strong>Phone:</strong> {order.address?.phone}</p>
              </div>

              {/* Order Details */}
              <div className="text-sm md:w-[30%]">
                <p><strong>Items:</strong></p>
                <ul className="list-disc ml-4">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} x {item.quantity} ({item.size})
                    </li>
                  ))}
                </ul>
                <p><strong>Method:</strong> {order.paymentMethod}</p>
                <p><strong>Payment:</strong> {order.payment ? "Paid" : "Pending"}</p>
                <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
              </div>

              {/* Price */}
              <div className="text-sm font-semibold md:w-[15%]">
                {order.amount} BDT
              </div>

              {/* Status Dropdown */}
              <div className="md:w-[20%]">
                <select
                  value={order.status || "Order Placed"}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="border border-pink-300 p-2 text-sm w-full"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Parcel Packing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Order Cancel">Order Cancel</option>
                  <option value="Delivered">Parcel Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Order
