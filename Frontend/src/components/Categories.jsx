import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Categories = () => {
    const navigate = useNavigate();

    const categories = [
        { name: 'Women', image: assets.women, link: '/collection?category=women', reverse: false },
        { name: 'Men', image: assets.man, link: '/collection?category=men', reverse: true },
        { name: 'Kids', image: assets.kid, link: '/collection?category=kids', reverse: false },
    ];

    return (
        <div className="flex flex-col gap-24 mt-40 px-4 sm:px-12 lg:px-20 indie-font">
            {categories.map((cat, index) => (
                <div
                    key={index}
                    className={`flex flex-col md:flex-row ${cat.reverse ? 'md:flex-row-reverse' : ''
                        } items-center gap-10`}
                >
                    {/* Image */}
                    <div className="relative w-full md:w-1/2 group -mt-15 -mb-10 md:-mb-0 md:-mt-28">
                        <img
                            src={cat.image}
                            alt={`${cat.name} Category`}
                            className="w-full h-[250px] sm:h-[380px] md:h-[450px] lg:h-[350px] object-cover shadow-lg transform group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    </div>

                    {/* Text Section */}
                    <div
                        className={`flex flex-col items-start text-left w-full md:w-1/2 mt-6 md:-mt-28 px-1 sm:px-0`}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide">
                                {cat.name}
                            </p>
                            <span className="w-12 sm:w-16 lg:w-10 h-[2px] bg-[#f76097]"></span>
                        </div>

                        <p className="text-gray-900 text-sm sm:text-base md:text-lg mb-6 max-w-md">
                            Indulge in curated {cat.name.toLowerCase()} — grace & timeless appeal.
                        </p>

                        <button
                            onClick={() => navigate(cat.link)}
                            className="px-6 py-1.5 bg-black text-white text-sm sm:text-base shadow-md hover:bg-gray-800 transition w-fit"
                        >
                            Shop Now
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Categories;














// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import { assets } from '../assets/assets'

// const Categories = () => {
//   const navigate = useNavigate()

//   const categories = [
//     { name: 'Women', image: assets.women, link: '/collection?category=women' },
//     { name: 'Men', image: assets.man, link: '/collection?category=men' },
//     { name: 'Kids', image: assets.kid, link: '/collection?category=kids' },
//   ]

//  return (
//   <div className="flex flex-col mt-30 px-6 sm:px-12 lg:px-15 indie-font w-screen -ml-28">
//     <div className="flex flex-col sm:flex-row gap-6">
//       {categories.map((cat, index) => (
//         <div
//           key={index}
//           className="relative w-full sm:w-1/3 group overflow-hidden shadow-lg cursor-pointer"
//           onClick={() => navigate(cat.link)}
//         >
//           {/* Category Image */}
//           <img
//             src={cat.image}
//             alt={`${cat.name} Category`}
//             className="w-full h-[300px] sm:h-[400px] object-cover transform group-hover:scale-105 transition duration-500"
//           />

//           {/* Overlay */}
//           <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-500 flex flex-col justify-center items-center">
//             <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{cat.name}</h2>
//             <button className="px-6 py-2 sm:px-6 sm:py-2 bg-black text-white font-semibold shadow-md hover:scale-105 transition-transform duration-300">
//               Shop Now
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// )

// }

// export default Categories
