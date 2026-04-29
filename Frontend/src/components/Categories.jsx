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
    <div className="flex flex-col w-screen -ml-28 mt-20">
      {categoryData.map((section) => (
        <div key={section.name} className="flex flex-col mb-20">
          
          {/* BANNER WITH CENTERED TEXT AND BUTTON */}
          <div
            className="w-full h-[600px] backdrop-grayscale relative cursor-pointer overflow-hidden group"
            onClick={() => navigate(section.link)}
          >
            <img
              src={section.bannerImage}
              alt={section.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100/20">
              <h2 className="text-white text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6 drop-shadow-lg">
                {section.name}
              </h2>
              <button className="bg-white text-black px-10 py-3 font-bold uppercase tracking-widest hover:bg-[#000000] hover:text-white transition-colors duration-300 shadow-xl">
                Shop Now
              </button>
            </div>
          </div>

          {/* SPACING & SECTION SUBTITLE (Optional) */}
          <div className="py-12 text-center">
            <p className="text-gray-500 tracking-[0.3em] uppercase text-sm">Featured {section.name}'s Collection</p>
          </div>

          {/* PRODUCT GRID */}
          <div className="px-6 sm:px-12 lg:px-20">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 gap-y-6">
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

              {/* VIEW ALL CARD */}
              <div
                className="min-h-[250px] border-2 border-dashed border-gray-400 flex flex-col items-center justify-center cursor-pointer hover:border-[#f76097] group/all transition-colors"
                onClick={() => navigate(section.link)}
              >
                <span className="text-3xl text-gray-400 group-hover/all:text-[#f76097] mb-2">+</span>
                <span className="font-bold text-gray-400 group-hover/all:text-[#f76097] text-xs tracking-widest">VIEW ALL</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Categories
