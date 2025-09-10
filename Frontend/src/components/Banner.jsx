import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen -ml-27.5 h-[400px] sm:h-[500px] lg:h-[570px]">
      {/* Background Image */}
      <img
        src={assets.Banner}
        alt="Banner"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-40">
        <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          New Season Arrivals
        </h2>
        <button
          onClick={() => navigate('/collection?category=Winterwear')}
          className="px-6 py-3 bg-black text-white font-semibold shadow-md hover:bg-gray-800 transition"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Banner;








// import React from 'react';
// import { assets } from '../assets/assets';
// import { useNavigate } from 'react-router-dom';

// const Banner = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="relative w-screen h-[400px] sm:h-[500px] lg:h-[570px]">
//       {/* Background Image */}
//       <img
//         src={assets.Banner}
//         alt="Banner"
//         className="w-full h-full object-cover"
//       />

//       {/* Overlay */}
//       <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
//         <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
//           New Season Arrivals
//         </h2>
//         <button
//           onClick={() => navigate('/collection?category=Winterwear')}
//           className="px-6 py-3 bg-black text-white font-semibold shadow-md hover:bg-gray-800 transition"
//         >
//           Shop Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Banner;
