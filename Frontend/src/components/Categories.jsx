import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductItem from "./ProductItem";
import { ShopContext } from "../context/ShopContext";

const PromoCountdownBanner = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 4);
    target.setHours(23, 59, 59, 999);

    const tick = () => {
      const diff = target.getTime() - Date.now();

      if (diff <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      setTimeLeft({
        days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(
          2,
          "0",
        ),
        minutes: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0"),
        seconds: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
      });
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const timerItems = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="mx-4 mt-4 mb-6 overflow-hidden border border-[#d9c9bc] bg-[linear-gradient(135deg,#f8f1e8_0%,#f3e2d5_45%,#e7d0c1_100%)] shadow-[0_18px_60px_rgba(88,54,39,0.12)] sm:mx-0 md:mt-12 md:mb-14 ">
      <div className="grid md:grid-cols-[1.2fr_0.9fr]">
        <div className="bg-[#8f6f61] px-6 py-8 text-white sm:px-8 md:px-12 md:py-12">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#f76097]">
            Private Sale
          </p>
          <h3 className="max-w-xl text-xl font-semibold uppercase tracking-[0.08em] text-white sm:text-3xl md:text-2xl">
            Limited-Time <span className="text-[#f76097]">30%</span> Discount
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
            Selected pieces are now available at special prices until the clock
            runs out.
          </p>
          <button
            type="button"
            onClick={() => navigate("/collection")}
            className="mt-6 border border-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-colors duration-300 hover:bg-white hover:text-[#8f6f61]"
          >
            Explore The Edit
          </button>
        </div>

        <div className="flex items-center px-6 py-8 sm:px-8 md:px-12 md:py-12">
          <div className="grid w-full grid-cols-4 gap-2 sm:grid-cols-4 md:gap-4">
            {timerItems.map((item) => (
              <div
                key={item.label}
                className="border border-[#2f2018]/10  border-2 bg-white/70 px-2 py-3 text-center backdrop-blur-sm sm:px-4 sm:py-5"
              >
                <p className="text-lg font-semibold text-[#2f2018] sm:text-4xl">
                  {item.value}
                </p>
                <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-[#8f6f61] sm:mt-2 sm:text-[10px] sm:tracking-[0.28em]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Categories = () => {
  const navigate = useNavigate();
  const { products } = useContext(ShopContext);

  const categoryData = useMemo(() => {
    const sections = [
      {
        name: "Women",
        bannerImage: assets.women,
        link: "/collection?category=women",
      },
      {
        name: "Men",
        bannerImage: assets.man,
        link: "/collection?category=men",
      },
      {
        name: "Kids",
        bannerImage: assets.kid,
        link: "/collection?category=kids",
      },
    ];

    return sections.map((section) => ({
      ...section,
      products: products
        .filter(
          (product) =>
            String(product.category || "").toLowerCase() ===
            section.name.toLowerCase(),
        )
        .slice(0, 5),
    }));
  }, [products]);

  return (
    <div className="flex flex-col w-screen md:-ml-28 mt-12 md:mt-20 -ml-4">
      {categoryData.map((section, index) => (
        <React.Fragment key={section.name}>
          <div
            className={`flex flex-col ${index === 0 ? "mb-0 md:mb-0" : "mb-14 md:mb-20"}`}
          >
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
                <button className="bg-[#9C7E63] border border-whi text-white px-6 py-2 md:px-10 md:py-3 text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-[#55493f] hover:text-white transition-colors duration-300 shadow-xl">
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
                  <span className="text-xl md:text-3xl text-gray-400 group-hover/all:text-[#f76097] mb-1">
                    +
                  </span>
                  <span className="font-bold text-gray-400 group-hover/all:text-[#f76097] text-[9px] md:text-xs tracking-widest">
                    VIEW ALL
                  </span>
                </div>
              </div>
            </div>
          </div>
          {index === 0 && <PromoCountdownBanner />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Categories;

// import React, { useContext, useEffect, useMemo, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { assets } from '../assets/assets'
// import ProductItem from './ProductItem'
// import { ShopContext } from '../context/ShopContext'

// const PromoCountdownBanner = () => {
//   const navigate = useNavigate()
//   const [timeLeft, setTimeLeft] = useState({
//     days: '00',
//     hours: '00',
//     minutes: '00',
//     seconds: '00',
//   })

//   useEffect(() => {
//     const target = new Date()
//     target.setDate(target.getDate() + 4)
//     target.setHours(23, 59, 59, 999)

//     const tick = () => {
//       const diff = target.getTime() - Date.now()

//       if (diff <= 0) {
//         setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' })
//         return
//       }

//       setTimeLeft({
//         days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0'),
//         hours: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
//         minutes: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0'),
//         seconds: String(Math.floor((diff / 1000) % 60)).padStart(2, '0'),
//       })
//     }

//     tick()
//     const id = setInterval(tick, 1000)
//     return () => clearInterval(id)
//   }, [])

//   return (
//     <section className="w-full mt-12 md:mt-20 py-12 md:py-20 bg-[#f8f5f2]">
//       <div className="max-w-[1400px] mx-auto px-6 md:px-16">

//         {/* LABEL */}
//         <p className="text-[10px] tracking-[0.4em] uppercase text-[#9b8b7a] mb-6">
//           Private Sale — Limited Access
//         </p>

//         <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">

//           {/* LEFT */}
//           <div className="max-w-xl">
//             <h2 className="text-3xl md:text-5xl font-medium text-[#1f1a17] leading-[1.2]">
//               30% Off Selected Pieces
//             </h2>

//             <p className="mt-4 text-sm md:text-base text-[#6b5e54] leading-relaxed">
//               A quiet edit of refined essentials. Available for a limited time only.
//             </p>

//             <button
//               onClick={() => navigate('/collection')}
//               className="mt-8 text-[11px] tracking-[0.3em] uppercase text-[#1f1a17] relative group"
//             >
//               Explore Collection
//               <span className="block h-[1px] bg-[#1f1a17] mt-2 w-0 group-hover:w-full transition-all duration-300"></span>
//             </button>
//           </div>

//           {/* TIMER */}
//           <div className="flex items-end gap-6 md:gap-10">
//             {[
//               { value: timeLeft.days, label: 'DAYS' },
//               { value: timeLeft.hours, label: 'HOURS' },
//               { value: timeLeft.minutes, label: 'MIN' },
//               { value: timeLeft.seconds, label: 'SEC' },
//             ].map((item, i) => (
//               <div key={i} className="text-left">
//                 <p className="text-3xl md:text-5xl font-light text-[#1f1a17] tracking-tight">
//                   {item.value}
//                 </p>
//                 <p className="text-[9px] tracking-[0.3em] text-[#8a7a6a] mt-2">
//                   {item.label}
//                 </p>
//               </div>
//             ))}
//           </div>

//         </div>

//         {/* THIN LINE */}
//         <div className="mt-10 md:mt-14 h-[1px] w-full bg-[#e7dfd7]" />
//       </div>
//     </section>
//   )
// }

// /* ================= CATEGORIES ================= */
// const Categories = () => {
//   const navigate = useNavigate()
//   const { products } = useContext(ShopContext)

//   const categoryData = useMemo(() => {
//     const sections = [
//       { name: 'Women', bannerImage: assets.women, link: '/collection?category=women' },
//       { name: 'Men', bannerImage: assets.man, link: '/collection?category=men' },
//       { name: 'Kids', bannerImage: assets.kid, link: '/collection?category=kids' },
//     ]

//     return sections.map((section) => ({
//       ...section,
//       products: products
//         .filter(
//           (product) =>
//             String(product.category || '').toLowerCase() === section.name.toLowerCase()
//         )
//         .slice(0, 5),
//     }))
//   }, [products])

//   return (
//     <div className="flex flex-col w-screen md:-ml-28 mt-12 md:mt-20 -ml-4">
//       {categoryData.map((section, index) => (
//         <React.Fragment key={section.name}>

//           <div className={`flex flex-col ${index === 0 ? 'mb-0' : 'mb-14 md:mb-20'}`}>

//             {/* BANNER */}
//             <div
//               className="w-full h-[300px] md:h-[600px] relative cursor-pointer overflow-hidden group"
//               onClick={() => navigate(section.link)}
//             >
//               <img
//                 src={section.bannerImage}
//                 alt={section.name}
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//               />

//               <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100/20 px-4 text-center">
//                 <h2 className="text-white text-3xl sm:text-4xl md:text-7xl font-bold uppercase mb-4 md:mb-6 drop-shadow-lg">
//                   {section.name}
//                 </h2>
//                 <button className="bg-[#9C7E63] text-white px-6 py-2 md:px-10 md:py-3 text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-[#55493f] transition-colors duration-300 shadow-xl">
//                   Shop Now
//                 </button>
//               </div>
//             </div>

//             {/* SUBTITLE */}
//             <div className="py-8 md:py-12 text-center">
//               <p className="text-gray-500 tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-sm">
//                 Featured {section.name}'s Collection
//               </p>
//             </div>

//             {/* PRODUCTS */}
//             <div className="px-4 sm:px-2 md:px-12 lg:px-20">
//               <div className="relative md:static left-[6px] md:left-0 scale-[0.96] md:scale-100 origin-left grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 gap-y-4 md:gap-y-6">

//                 {section.products.map((product) => (
//                   <ProductItem
//                     key={product._id}
//                     id={product._id}
//                     name={product.name}
//                     price={product.price}
//                     image={product.image}
//                     discount={product.discount}
//                   />
//                 ))}

//                 {/* VIEW ALL */}
//                 <div
//                   className="min-h-[150px] md:min-h-[250px] border-2 border-dashed border-gray-400 flex flex-col items-center justify-center cursor-pointer hover:border-[#f76097] group/all transition-colors"
//                   onClick={() => navigate(section.link)}
//                 >
//                   <span className="text-xl md:text-3xl text-gray-400 group-hover/all:text-[#f76097] mb-1">+</span>
//                   <span className="font-bold text-gray-400 group-hover/all:text-[#f76097] text-[9px] md:text-xs tracking-widest">
//                     VIEW ALL
//                   </span>
//                 </div>

//               </div>
//             </div>

//           </div>

//           {/* PROMO AFTER FIRST CATEGORY */}
//           {index === 0 && <PromoCountdownBanner />}

//         </React.Fragment>
//       ))}
//     </div>
//   )
// }

// export default Categories
