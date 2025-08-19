import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { Listbox } from '@headlessui/react';
import { ChevronDown, Check } from 'lucide-react';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortOption, setSortOption] = useState('relevant');

  const toggleCategory = (e) => {
    const { value } = e.target;
    setCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const { value } = e.target;
    setSubCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    // Check if products is a truthy value and an array before spreading
    let filtered = (products && Array.isArray(products)) ? [...products] : [];

    if (showSearch && search) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter(item => subCategory.includes(item.subCategory));
    }


    if (sortOption === 'low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'high-low') {
      filtered.sort((a, b) => b.price - a.price);
    } else {
      filtered.sort((a, b) => b.date - a.date);
    }

    setFilterProducts(filtered);
  }, [category, subCategory, sortOption, products, search, showSearch]);

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-[#ffd7d7] -mt-20 sm:-mt-28 -ml-2'>
      <div className='min-w-60 -ml-3 sm:mt-0 -mt-8 z-30 relative'>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setShowFilter(!showFilter);
          }}
          className='my-2 text-2xl flex items-center cursor-pointer gap-2 font-bold ml-5 z-40 relative'
        >
          FILTERS
          <svg
            className={`h-8 w-8 -ml-1 sm:hidden transition-transform duration-200 ${showFilter ? 'rotate-90' : ''}`}
            fill="black"
            viewBox="0 0 320 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M96 96l128 128-128 128V96z" />
          </svg>
        </button>

        <div className={`border border-[#ffa1c4] ml-5 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-md font-bold'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-black'>
            {['Men', 'Women', 'Kids'].map(cat => (
              <label key={cat} className='flex gap-2 items-center cursor-pointer'>
                <input
                  type="checkbox"
                  value={cat}
                  onChange={toggleCategory}
                  className="hidden peer"
                />
                <div className="h-3 w-3 border-1 border-[#ffa1c4] rounded-sm peer-checked:bg-[#ffa1c4] peer-checked:border-[#ffa1c4] transition" />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={`border border-[#ffa1c4] ml-5 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-md font-bold'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-black'>
            {['Topwear', 'Bottomwear', 'Winterwear'].map(sub => (
              <label key={sub} className='flex gap-2 items-center cursor-pointer'>
                <input
                  type="checkbox"
                  value={sub}
                  onChange={toggleSubCategory}
                  className="hidden peer"
                />
                <div className="h-3 w-3 border-1 border-[#ffa1c4] rounded-sm peer-checked:bg-[#ffa1c4] peer-checked:border-[#ffa1c4] transition" />
                <span>{sub}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className='flex-1 mt-5 ml-2'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <div className='inline-flex gap-1 sm:gap-2 items-center mb-2 sm:mb-3 -mt-2 sm:-mt-4'>
            <p className='text-black font-bold text-1xl sm:text-2xl md:text-3xl'>
              ALL <span className='text-[#f76097] font-bold text-1xl'>COLLECTION</span>
            </p>
            <p className='w-6 -ml-1 sm:ml-0 sm:w-8 md:w-12 h-[1px] sm:h-[2px] md:h-[2px] bg-[#f76097]'></p>
          </div>

          <Listbox value={sortOption} onChange={setSortOption}>
            <div className="relative z-40 w-[180px] text-sm -mt-4">
              <Listbox.Button className="relative w-full cursor-pointer border border-pink-300 bg-white py-2 pl-4 pr-10 text-left text-black font-[Indie_Flower] focus:outline-none focus:ring-1 focus:ring-pink-300">
                Sort by: {sortOption === 'relevant' ? 'Relevant' : sortOption}
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-pink-400" />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto border border-pink-300 bg-white shadow-md z-10 focus:outline-none">
                {[
                  { label: 'Relevant', value: 'relevant' },
                  { label: 'Low-High', value: 'low-high' },
                  { label: 'High-Low', value: 'high-low' },
                ].map(({ label, value }, idx) => (
                  <Listbox.Option
                    key={idx}
                    value={value}
                    className={({ active }) =>
                      `cursor-pointer select-none py-2 px-4 font-[Indie_Flower] ${active ? 'bg-gray-50 text-pink-500' : 'text-black'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <span
                        className={`flex items-center justify-between pb-1 ${selected ? 'border-b-2 border-pink-400' : 'border-b border-pink-200'
                          }`}
                      >
                        {label}
                        {selected && <Check className="w-4 h-4 text-pink-500" />}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>

            </div>
          </Listbox>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;