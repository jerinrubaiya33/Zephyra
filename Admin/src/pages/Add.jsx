import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { Listbox } from '@headlessui/react';
import { ChevronDown, Check } from 'lucide-react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const categories = ['Men', 'Women', 'Kids'];
const subCategories = ['Topwear', 'Bottomwear', 'Winterwear'];

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [subCategory, setSubCategory] = useState(subCategories[0]);
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  

  const handleSizeClick = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleImageDrop = (e, index) => {
    e.preventDefault();
    setDragOverIndex(null);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestseller);
      images.forEach((image) => {
        formData.append("image", image);
      });

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success("Product added", { icon: false });
        setName('');
        setDescription('');
        setImages([null, null, null, null]);
        setPrice('');
        setCategory(categories[0]);
        setSubCategory(subCategories[0]);
        setBestseller(false);
        setSizes([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Form submit error:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Upload Section */}
      <div className="flex flex-col items-start gap-3 mb-6">
        <p className="mb-0 text-lg font-medium text-black">Upload Image</p>
        <div className="flex flex-wrap gap-3">
          {[0, 1, 2, 3].map((index) => (
            <label
              key={index}
              htmlFor={`image${index}`}
              className={`cursor-pointer border-1 ${dragOverIndex === index ? 'border-pink-400' : 'border-transparent'}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverIndex(index);
              }}
              onDragLeave={() => setDragOverIndex(null)}
              onDrop={(e) => handleImageDrop(e, index)}
            >
              <img
                className="w-[140px] h-[140px] object-cover hover:opacity-80 transition"
                src={
                  images[index]
                    ? URL.createObjectURL(images[index])
                    : assets.upload_area
                }
                alt={`upload ${index + 1}`}
              />
              <input
                onChange={(e) => {
                  const newImages = [...images];
                  newImages[index] = e.target.files[0];
                  setImages(newImages);
                }}
                type="file"
                id={`image${index}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="mb-5 mt-6">
        <p className="text-lg font-medium text-black">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full sm:w-2/4 px-4 py-2 border border-pink-300 focus:outline-none focus:ring-1 focus:ring-pink-300 text-black placeholder-gray-400 font-[Indie_Flower]"
          type="text"
          placeholder="Type Here"
          required
        />
      </div>

      {/* Product Description */}
      <div className="mb-5 mt-6">
        <p className="text-lg font-medium text-black">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full sm:w-2/4 px-4 py-2 border border-pink-300 focus:outline-none focus:ring-1 focus:ring-pink-300 text-black placeholder-gray-400 font-[Indie_Flower]"
          placeholder="Write content here"
          required
        />
      </div>

      {/* Categories & Price */}
      <div className="flex flex-wrap gap-x-4 gap-y-3 mb-4">
        {/* Category */}
        <div className="w-[180px]">
          <p className="text-base font-medium text-black">Product Category</p>
          <Listbox value={category} onChange={setCategory}>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-pointer border border-pink-300 bg-white py-2 pl-4 pr-10 text-left text-black font-[Indie_Flower] focus:outline-none focus:ring-1 focus:ring-pink-300">
                {category}
                <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-black" />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto border border-pink-300 bg-white shadow-md z-10">
                {categories.map((cat, idx) => (
                  <Listbox.Option
                    key={idx}
                    value={cat}
                    className={({ active }) =>
                      `cursor-pointer select-none py-2 px-4 font-[Indie_Flower] ${active ? 'bg-gray-50 text-pink-500' : 'text-black'}`
                    }
                  >
                    {({ selected }) => (
                      <span className="flex items-center justify-between border-b border-pink-300 pb-1">
                        {cat}
                        {selected && <Check className="w-4 h-4 text-pink-500" />}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>

        {/* Sub Category */}
        <div className="w-[180px]">
          <p className="text-base font-medium text-black">Sub Category</p>
          <Listbox value={subCategory} onChange={setSubCategory}>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-pointer border border-pink-300 bg-white py-2 pl-4 pr-10 text-left text-black font-[Indie_Flower] focus:outline-none focus:ring-1 focus:ring-pink-300">
                {subCategory}
                <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-black" />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto border border-pink-300 bg-white shadow-md z-10">
                {subCategories.map((cat, idx) => (
                  <Listbox.Option
                    key={idx}
                    value={cat}
                    className={({ active }) =>
                      `cursor-pointer select-none py-2 px-4 font-[Indie_Flower] ${active ? 'bg-gray-50 text-pink-500' : 'text-black'}`
                    }
                  >
                    {({ selected }) => (
                      <span className="flex items-center justify-between border-b border-pink-300 pb-1">
                        {cat}
                        {selected && <Check className="w-4 h-4 text-pink-500" />}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>

        {/* Price */}
        <div>
          <p className="mb-1 text-base font-medium text-black">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            placeholder="25"
            min="5"
            step="1"
            className="w-[180px] px-4 py-2 border border-pink-300 focus:outline-none focus:ring-1 focus:ring-pink-300 text-black placeholder-gray-400 font-[Indie_Flower]"
            required
          />
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-4">
        <p className="text-lg font-medium text-black">Product Sizes</p>
        <div className="flex flex-wrap gap-3">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => {
            const isSelected = sizes.includes(size);
            return (
              <div
                key={size}
                onClick={() => handleSizeClick(size)}
                className={`px-4 py-2 border font-[Indie_Flower] cursor-pointer transition ${isSelected
                  ? 'bg-gray-50 border-gray-500 text-pink-600'
                  : 'border-pink-300 hover:border-gray-500 text-black'
                  }`}
              >
                <p>{size}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex gap-2 mt-5 items-center">
        <label className="relative flex items-center cursor-pointer" htmlFor='bestseller'>
          <input
            type="checkbox"
            id="bestseller"
            className="absolute opacity-0 h-0 w-0 peer"
            checked={bestseller}
            onChange={() => setBestseller(prev => !prev)}
          />
          <span className="h-3 w-3 border border-[#ffa1c4] rounded-sm peer-checked:bg-[#ffa1c4] peer-checked:border-[#ffa1c4] transition-all duration-200 flex items-center justify-center">
            <svg
              className="w-2 h-2 hidden peer-checked:block text-white"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
            >
              <path d="M1 6.5L4.5 10L11 1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="ml-2 text-base">Add To BestSeller</span>
        </label>
      </div>

      {/* Submit */}
      <button type="submit" className="w-28 py-1 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;