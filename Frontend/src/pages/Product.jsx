// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import RelatedProducts from '../components/RelatedProducts';

// const Product = () => {

//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState('')
//   const [size, setSize] = useState('')


//   const fetchProductData = async () => {
//     products.map((item) => {
//       if (item._id === productId) {
//         setProductData(item)
//         setImage(item.image[0])
//         console.log(item);
//         return null;
//       }
//     })
//   }

//   useEffect(() => {
//     fetchProductData();
//   }, [productId, products])


//   return productData ? (
//     <div className='border-t-1 border-[#ffd7d7] -mt-20 sm:-mt-28  pt-10 transition-opacity ease-in duration-500 opacity-100'>
//       {/* Product Data */}
//       <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
//         {/* Product Data */}
//         <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
//           <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
//             {
//               productData.image.map((item, index) => {
//                 return (
//                   <img
//                     onClick={() => setImage(item)}
//                     src={item}
//                     key={index}
//                     className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
//                     alt=""
//                   />
//                 );
//               })
//             }
//           </div>

//           <div className='w-full sm:w[80%]'>
//             <img className='w-full h-auto' src={image} alt="" />
//           </div>
//         </div>
//         {/*____ Product information___ */}
//         <div className='flex-1 '>
//           <h1 className='font-bold text-2xl mt-2'>{productData.name}</h1>
//           <div className='flex items-center gap-1 mt-2'>
//             <img src={assets.star_icon} className="w-3 5" />
//             <img src={assets.star_icon} className="w-3 5" />
//             <img src={assets.star_icon} className="w-3 5" />
//             <img src={assets.star_icon} className="w-3 5" />
//             <img src={assets.star_dull_icon} className="w-3 5" />
//             <p className='pl-2'>(122)</p>
//           </div>
//           <p className='mt-5 text-3xl font-semibold text-[#000000] '>{currency} {productData.price}</p>
//           <p className='mt-5 text-black md:w-4/5'>{productData.description}</p>
//           <div className='flex flex-col gap-4 my-8 mt-6'>
//             <p className='font-semibold '>Select Size :</p>
//             <div className='flex gap-2'>
//               {productData.sizes.map((item, index) => (
//                 <button onClick={() => setSize(item)} className={` border border-gray-300 py-2 px-4 text-[#000000] font-bold bg-gray-200 ${item === size ? 'border-pink-400' : ''}`} key={index}>{item}</button>
//               ))}
//             </div>
//           </div>
//           <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white font-bold px-9 py-3 -mt-190 text-sm active:bg-gray-700'>ADD TO CART</button>
//           <hr className='mt-4 sm:w-4/5 border-[#ffd7d7] ' />
//           <div className='text-sm text-black mt-2 flex flex-col gap-1 '>
//               <p>100% Original Product.</p>
//               <p>Cash on delivery is available on this product.</p>
//               <p>Easy return and exchange policy within 7 days.</p>
//           </div>
//         </div>
//       </div>

//       {/*__________ Description and review section __________  */}
//       <div className='mt-20'>
//         <div className='flex'>
//               <b className='border px-5 py-3 text-sm border-[#ffa1c4]'>Description</b>
//               <p className='border px-5 py-3 text-sm border-[#ffa1c4]'>Reviews(122)</p>
//         </div>
//         <div className='flex flex-col gap-4 border  border-[#ffa1c4] px-6 py-6 text-sm text-black'>
//           <p>
//           Elevate your everyday style with this effortlessly chic cotton tee, designed for comfort and versatility. Crafted from premium-quality, breathable fabric, it features a classic crew neckline and a flattering regular fit that complements all body types. Whether you're layering it under a jacket or wearing it solo, this tee is your go-to for a polished, casual look. Perfect for any season, any day.
//           </p>
//         </div>
//       </div>

//       {/* display related products */}
//       <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
//     </div>
//   ) : <div className='opacity-0'></div>
// }

// export default Product




import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [loading, setLoading] = useState(true);
  const [toastShown, setToastShown] = useState(false);

  const fetchProductData = () => {
    try {
      setLoading(true);
      const foundProduct = products.find(item => item._id === productId);
      
      if (!foundProduct && !toastShown) {
        setToastShown(true);
        throw new Error('Product not found');
      }

      setProductData(foundProduct);
      setImage(foundProduct?.image?.[0] || '');
      setSize(foundProduct?.sizes?.[0] || '');
    } catch (error) {
      console.error('Error fetching product:', error);
      if (!toastShown) {
        toast.error('Product not found');
        setToastShown(true);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (products.length > 0) {
      fetchProductData();
    }
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!size) {
      toast.error('Please select a size');
      return;
    }
    addToCart(productData._id, size, 1);
    // Removed toast.success here
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!productData) {
    return <div className="flex justify-center items-center h-64">Product not found</div>;
  }

  return (
    <div className='border-t-1 border-[#ffd7d7] -mt-20 sm:-mt-28 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image?.length > 0 ? (
              productData.image.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={index}
                  className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                  alt=""
                />
              ))
            ) : (
              <div className="w-full text-center py-4">No images available</div>
            )}
          </div>

          <div className='w-full sm:w[80%]'>
            {image ? (
              <img className='w-full h-auto' src={image} alt={productData.name} />
            ) : (
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                No image selected
              </div>
            )}
          </div>
        </div>

        {/* Product Information */}
        <div className='flex-1'>
          <h1 className='font-bold text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} className="w-3 5" alt="star" />
            <img src={assets.star_icon} className="w-3 5" alt="star" />
            <img src={assets.star_icon} className="w-3 5" alt="star" />
            <img src={assets.star_icon} className="w-3 5" alt="star" />
            <img src={assets.star_dull_icon} className="w-3 5" alt="star" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-semibold text-[#000000]'>{currency} {productData.price}</p>
          <p className='mt-5 text-black md:w-4/5'>{productData.description}</p>

          <div className='flex flex-col gap-4 my-8 mt-6'>
            <p className='font-semibold'>Select Size:</p>
            <div className='flex gap-2 flex-wrap'>
              {productData.sizes?.length > 0 ? (
                productData.sizes.map((item, index) => (
                  <button 
                    onClick={() => setSize(item)} 
                    className={`border border-gray-300 py-2 px-4 text-[#000000] font-bold bg-gray-200 ${
                      item === size ? 'border-pink-400' : ''
                    }`} 
                    key={index}
                  >
                    {item}
                  </button>
                ))
              ) : (
                <p className="text-gray-500">No sizes available</p>
              )}
            </div>
          </div>

          <button 
            onClick={handleAddToCart} 
            className='bg-black text-white font-bold px-9 py-3 -mt-190 text-sm active:bg-gray-700'
            disabled={!size}
          >
            ADD TO CART
          </button>

          <hr className='mt-4 sm:w-4/5 border-[#ffd7d7]' />
          <div className='text-sm text-black mt-2 flex flex-col gap-1'>
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description and review section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm border-[#ffa1c4]'>Description</b>
          <p className='border px-5 py-3 text-sm border-[#ffa1c4]'>Reviews(122)</p>
        </div>
        <div className='flex flex-col gap-4 border border-[#ffa1c4] px-6 py-6 text-sm text-black'>
          <p>
            Elevate your everyday style with this effortlessly chic cotton tee, designed for comfort and versatility. 
            Crafted from premium-quality, breathable fabric, it features a classic crew neckline and a flattering 
            regular fit that complements all body types. Whether you're layering it under a jacket or wearing it solo, 
            this tee is your go-to for a polished, casual look. Perfect for any season, any day.
          </p>
        </div>
      </div>

      {/* Display related products */}
      {productData.category && (
        <RelatedProducts 
          category={productData.category} 
          subCategory={productData.subCategory}
        />
      )}
    </div>
  );
}

export default Product;
