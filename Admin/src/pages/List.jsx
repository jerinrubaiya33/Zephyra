import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([])

  // Fetch all products
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // Remove product by ID
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // Load products on mount
  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className="mb-2 text-2xl font-medium">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* Table Header (Desktop only) */}
        <div className="hidden md:grid grid-cols-[80px_3fr_1.5fr_1fr_80px] items-center py-2 px-5 border border-pink-200 bg-gray-50 text-sm font-semibold">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product Rows */}
        {list.map((item, index) => (
          <div
            key={index}
            className="
              flex md:grid
              md:grid-cols-[80px_3fr_1.5fr_1fr_80px]
              items-center
              justify-between
              gap-2
              md:gap-0
              py-2 px-3
              border border-pink-200
              text-sm
              hover:bg-gray-50
            "
          >
            {/* Image */}
            <img
              src={item.image[0]}
              alt=""
              className="w-16 h-16 object-cover flex-shrink-0"
            />

            {/* Name, Category, Price */}
            <div className="flex flex-col md:flex md:flex-col flex-1">
              <p className="font-medium">{item.name}</p>
              {/* Show category and price stacked on mobile */}
              <div className="flex md:hidden gap-2 text-gray-500 text-sm">
                <span>{item.category}</span>
                <span>
                  {currency}
                  {item.price}
                </span>
              </div>
            </div>

            {/* Mobile Delete button */}
            <button
              onClick={() => removeProduct(item._id)}
              className="text-pink-400 font-bold md:hidden"
            >
              X
            </button>

            {/* Desktop-only Category */}
            <p className="hidden md:block">{item.category}</p>

            {/* Desktop-only Price */}
            <p className="hidden md:block">
              {currency}
              {item.price}
            </p>

            {/* Desktop-only Delete */}
            <button
              onClick={() => removeProduct(item._id)}
              className="hidden md:block text-pink-400 font-bold text-center"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default List