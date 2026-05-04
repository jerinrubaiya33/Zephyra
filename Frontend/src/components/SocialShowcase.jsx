// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import womenTop from '../assets/social_left.png';
// import womenMood from '../assets/social_right.png';

// const SocialShowcase = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="w-screen -ml-27.5 px-4 py-10 sm:px-0 sm:py-14">
//       <div className="mx-auto max-w-7xl">
//         <div className="mb-8 border-y border-[#f7609765] px-4 py-5 text-center sm:mb-12 sm:px-8">
//           <p className="mx-auto max-w-6xl text-base leading-relaxed text-[#766a5f] sm:text-xl">
//             Zephyra brings premium fashion and contemporary styling together with versatile designs, elevated comfort, and a polished everyday aesthetic for modern wardrobes.
//           </p>
//         </div>

//         <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
//           <button
//             type="button"
//             onClick={() => navigate('/collection?category=women')}
//             className="group relative overflow-hidden text-left"
//           >
//             <img
//               src={womenMood}
//               alt="Style story"
//               className="h-[420px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[520px]"
//             />

//             <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

//             <div className="absolute bottom-5 left-5 flex items-center gap-3 text-white">
//               <div className="flex items-center gap-2 rounded-full px-3 py-2 text-[#1f1f1f] shadow-lg">
//                 <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="white"
//                     strokeWidth="2"
//                     className="h-7 w-7"
//                     aria-hidden="true"
//                   >
//                     <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
//                     <circle cx="12" cy="12" r="3.5" />
//                     <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
//                   </svg>
//                 </div>
//               </div>

//               <p className="max-w-[220px] text-sm font-medium -ml-2 leading-snug sm:text-base">
//                 Follow our everyday edits and discover fresh styling inspiration.
//               </p>
//             </div>
//           </button>

//           <button
//             type="button"
//             onClick={() => navigate('/collection?category=women&subCategory=Topwear')}
//             className="group relative overflow-hidden text-left"
//           >
//             <img
//               src={womenTop}
//               alt="Latest videos"
//               className="h-[420px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[520px]"
//             />

//             <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

//             <div className="absolute bottom-5 left-5 flex items-center gap-3 text-white">
//               <div className="flex items-center gap-2 rounded-full text-[#1f1f1f] shadow-lg">
//                 <div className="flex h-7 w-10 items-center justify-center rounded-full bg-[#ff0000]">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="white"
//                     className="ml-0.5 h-7 w-7"
//                     aria-hidden="true"
//                   >
//                     <path d="M9 8.2v7.6L15.5 12 9 8.2Z" />
//                   </svg>
//                 </div>
//               </div>

//               <p className="max-w-[220px] text-sm font-medium leading-snug sm:text-base">
//                 Watch the latest looks and explore standout pieces from the collection.
//               </p>
//             </div>
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SocialShowcase;














import React from 'react';
import { useNavigate } from 'react-router-dom';
import womenTop from '../assets/social_left.png';
import womenMood from '../assets/social_right.png';

const SocialShowcase = () => {
  const navigate = useNavigate();

  return (
    <section className="w-screen -ml-27.5 px-4 py-10 sm:px-0 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 border-y border-[#f7609765] px-4 py-5 text-center sm:mb-12 sm:px-8">
          <p className="mx-auto max-w-6xl text-base leading-relaxed text-[#766a5f] sm:text-xl">
            Zephyra brings premium fashion and contemporary styling together with versatile designs, elevated comfort, and a polished everyday aesthetic for modern wardrobes.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <button
            type="button"
            onClick={() => navigate('/collection?category=women')}
            className="group relative overflow-hidden text-left"
          >
            <img
              src={womenMood}
              alt="Style story"
              className="h-[420px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[520px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 flex items-center gap-3 text-white">
              <div className="flex items-center gap-2 rounded-full px-3 py-2 text-[#1f1f1f] shadow-lg">
                <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    className="h-7 w-7"
                    aria-hidden="true"
                  >
                    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                    <circle cx="12" cy="12" r="3.5" />
                    <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
                  </svg>
                </div>
              </div>

              <p className="max-w-[220px] text-sm font-medium -ml-2 leading-snug sm:text-base">
                Follow our everyday edits and discover fresh styling inspiration.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigate('/collection?category=women&subCategory=Topwear')}
            className="group relative overflow-hidden text-left"
          >
            <img
              src={womenTop}
              alt="Latest videos"
              className="h-[420px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[520px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

            <div className="absolute bottom-5 left-5 flex items-center gap-3 text-white">
              <div className="flex items-center gap-2 rounded-full text-[#1f1f1f] shadow-lg">
                <div className="flex h-7 w-10 items-center justify-center rounded-full bg-[#ff0000]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="ml-0.5 h-7 w-7"
                    aria-hidden="true"
                  >
                    <path d="M9 8.2v7.6L15.5 12 9 8.2Z" />
                  </svg>
                </div>
              </div>

              <p className="max-w-[220px] text-sm font-medium leading-snug sm:text-base">
                Watch the latest looks and explore standout pieces from the collection.
              </p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SocialShowcase;
