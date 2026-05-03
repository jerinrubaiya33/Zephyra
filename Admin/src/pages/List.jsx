import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [discountValues, setDiscountValues] = useState({})

  // Fetch all products
  // const fetchList = async () => {
  //   try {
  //     const response = await axios.get(backendUrl + '/api/product/list')
  //     if (response.data.success) {
  //       setList(response.data.products)
  //     } else {
  //       toast.error(response.data.message)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     toast.error(error.message)
  //   }
  // }
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        // Add finalPrice to each product
        const productsWithFinalPrice = response.data.products.map(p => ({
          ...p,
          finalPrice: p.price - (p.price * (p.discount || 0) / 100),
        }));
        setList(productsWithFinalPrice)
        setDiscountValues(
          productsWithFinalPrice.reduce((acc, product) => {
            acc[product._id] = String(product.discount || 0)
            return acc
          }, {})
        )
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

  const updateDiscount = async (id) => {
    try {
      const discount = Number(discountValues[id] || 0)

      if (discount !== 0 && (discount < 15 || discount > 40)) {
        toast.error('Discount must be 0 or between 15% and 40%')
        return
      }

      const response = await axios.post(
        backendUrl + '/api/product/update-discount',
        { id, discount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.data.success) {
        toast.success('Discount updated')
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
        <div className="hidden md:grid grid-cols-[80px_2.2fr_1.2fr_1fr_1.4fr_80px] items-center py-2 px-5 border border-pink-200 bg-gray-50 text-sm font-semibold">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Discount</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product Rows */}
        {list.map((item, index) => (
          <div
            key={index}
            className="
              flex md:grid
              md:grid-cols-[80px_2.2fr_1.2fr_1fr_1.4fr_80px]
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
                  {currency}{item.finalPrice}
                  {item.discount > 0 && (
                    <span className="line-through text-gray-400 ml-2">{currency}{item.price}</span>
                  )}
                </span>
              </div>
              <div className="mt-2 flex md:hidden items-center gap-2">
                <select
                  value={discountValues[item._id] ?? '0'}
                  onChange={(e) =>
                    setDiscountValues((prev) => ({ ...prev, [item._id]: e.target.value }))
                  }
                  className="border border-pink-300 px-2 py-1 text-sm"
                >
                  <option value="0">No discount</option>
                  <option value="15">15%</option>
                  <option value="20">20%</option>
                  <option value="25">25%</option>
                  <option value="30">30%</option>
                  <option value="35">35%</option>
                  <option value="40">40%</option>
                </select>
                <button
                  onClick={() => updateDiscount(item._id)}
                  className="border border-pink-300 px-3 py-1 text-xs font-semibold text-pink-500"
                >
                  Save
                </button>
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

            <div className="hidden md:flex items-center gap-2">
              <select
                value={discountValues[item._id] ?? '0'}
                onChange={(e) =>
                  setDiscountValues((prev) => ({ ...prev, [item._id]: e.target.value }))
                }
                className="border border-pink-300 px-2 py-1 text-sm"
              >
                <option value="0">No discount</option>
                <option value="15">15%</option>
                <option value="20">20%</option>
                <option value="25">25%</option>
                <option value="30">30%</option>
                <option value="35">35%</option>
                <option value="40">40%</option>
              </select>
              <button
                onClick={() => updateDiscount(item._id)}
                className="border border-pink-300 px-3 py-1 text-xs font-semibold text-pink-500"
              >
                Save
              </button>
            </div>

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
