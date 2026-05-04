import React, { useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import ProductItem from './ProductItem'
import { ShopContext } from '../context/ShopContext'

const Categories = () => {
  const navigate = useNavigate()
  const { products } = useContext(ShopContext)

  const categoryData = useMemo(() => {
    const sections = [
      { name: 'Women', bannerImage: assets.women, link: '/collection?category=women' },
      { name: 'Men', bannerImage: assets.man, link: '/collection?category=men' },
      { name: 'Kids', bannerImage: assets.kid, link: '/collection?category=kids' },
    ]

    return sections.map((section) => ({
      ...section,
      products: products
        .filter(
          (product) =>
            String(product.category || '').toLowerCase() === section.name.toLowerCase()
        )
        .slice(0, 5),
    }))
  }, [products])

  return (
    <div className="flex flex-col w-screen md:-ml-28 mt-12 md:mt-20 -ml-4">
      {categoryData.map((section) => (
        <div key={section.name} className="flex flex-col mb-14 md:mb-20">

          {/* BANNER */}
          <div
            className="w-full h-[300px -ml-0 sm:ml-0 md:h-[600px] relative cursor-pointer overflow-hidden group"
            onClick={() => navigate(section.link)}
          >
            <img
              src={section.bannerImage}
              alt={section.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100/20 px-4 text-center">
              <h2 className="text-white text-3xl sm:text-4xl md:text-7xl font-bold tracking-tight uppercase mb-4 md:mb-6 drop-shadow-lg">
                {section.name}
              </h2>
              <button className="bg-[#9C7E63] text-white px-6 py-2 md:px-10 md:py-3 text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-[#55493f] hover:text-white transition-colors duration-300 shadow-xl">
                Shop Now
              </button>
            </div>
          </div>

          {/* SUBTITLE */}
          <div className="py-8 md:py-12 text-center">
            <p className="text-gray-500 tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-sm">
              Featured {section.name}'s Collection
            </p>
          </div>

          {/* PRODUCT GRID */}
          <div className="px-4 sm:px-2 md:px-12 lg:px-20">
            <div className="relative md:static left-[6px] md:left-0 scale-[0.96] md:scale-100 origin-left grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 gap-y-4 md:gap-y-6">

              {section.products.map((product) => (
                <ProductItem
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  discount={product.discount}
                />
              ))}

              {/* VIEW ALL */}
              <div
                className="min-h-[150px] md:min-h-[250px] border-2 border-dashed border-gray-400 flex flex-col items-center justify-center cursor-pointer hover:border-[#f76097] group/all transition-colors"
                onClick={() => navigate(section.link)}
              >
                <span className="text-xl md:text-3xl text-gray-400 group-hover/all:text-[#f76097] mb-1">+</span>
                <span className="font-bold text-gray-400 group-hover/all:text-[#f76097] text-[9px] md:text-xs tracking-widest">
                  VIEW ALL
                </span>
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Categories