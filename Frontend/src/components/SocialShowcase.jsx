// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import womenTop from '../assets/social_left.png';
// import womenMood from '../assets/social_right.png';

// const SocialShowcase = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="w-full px-3 py-8 sm:w-screen sm:-ml-27.5 sm:px-0 sm:py-14">
//       <div className="mx-auto max-w-7xl">
//         <div className="mb-6 border-y border-[#f7609765] px-3 py-4 text-center sm:mb-12 sm:px-8">
//           <p className="mx-auto max-w-6xl text-sm leading-relaxed text-[#766a5f] sm:text-xl">
//             Zephyra brings premium fashion and contemporary styling together with versatile designs, elevated comfort, and a polished everyday aesthetic for modern wardrobes.
//           </p>
//         </div>

//         <div className="mx-auto grid max-w-5xl gap-4 sm:gap-6 lg:grid-cols-2">
          
//           {/* FIRST CARD */}
//           <button
//             type="button"
//             onClick={() => navigate('/collection?category=women')}
//             className="group relative overflow-hidden text-left"
//           >
//             <img
//               src={womenMood}
//               alt="Style story"
//               className="h-[280px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[520px]"
//             />

//             <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

//             <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white sm:bottom-5 sm:left-5 sm:gap-3">
//               <div className="flex items-center gap-2 rounded-full px-2 py-1 sm:px-3 sm:py-2 text-[#1f1f1f] shadow-lg">
//                 <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] sm:h-9 sm:w-9 sm:rounded-[9px]">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="white"
//                     strokeWidth="2"
//                     className="h-4 w-4 sm:h-7 sm:w-7"
//                     aria-hidden="true"
//                   >
//                     <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
//                     <circle cx="12" cy="12" r="3.5" />
//                     <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
//                   </svg>
//                 </div>
//               </div>

//               <p className="max-w-[180px] text-xs font-medium leading-snug sm:max-w-[220px] sm:text-base">
//                 Follow our everyday edits and discover fresh styling inspiration.
//               </p>
//             </div>
//           </button>

//           {/* SECOND CARD */}
//           <button
//             type="button"
//             onClick={() => navigate('/collection?category=women&subCategory=Topwear')}
//             className="group relative overflow-hidden text-left"
//           >
//             <img
//               src={womenTop}
//               alt="Latest videos"
//               className="h-[280px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[520px]"
//             />

//             <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

//             <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white sm:bottom-5 sm:left-5 sm:gap-3">
//               <div className="flex items-center gap-2 rounded-full text-[#1f1f1f] shadow-lg">
//                 <div className="flex h-6 w-9 items-center justify-center rounded-full bg-[#ff0000] sm:h-7 sm:w-10">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="white"
//                     className="ml-0.5 h-4 w-4 sm:h-7 sm:w-7"
//                     aria-hidden="true"
//                   >
//                     <path d="M9 8.2v7.6L15.5 12 9 8.2Z" />
//                   </svg>
//                 </div>
//               </div>

//               <p className="max-w-[180px] text-xs font-medium leading-snug sm:max-w-[220px] sm:text-base">
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
// import { useNavigate } from 'react-router-dom';
// import womenTop from '../assets/social_left.png';
// import womenMood from '../assets/social_right.png';

// const SocialShowcase = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="w-full px-2 py-8 sm:w-screen sm:-ml-27.5 sm:px-0 sm:py-14">
//       <div className="mx-auto max-w-7xl">
        
//         <div className="mb-6 border-y border-[#f7609765] px-3 py-4 text-center sm:mb-12 sm:px-8">
//           <p className="mx-auto max-w-6xl text-xs leading-relaxed text-[#766a5f] sm:text-xl">
//             Zephyra brings premium fashion and contemporary styling together with versatile designs, elevated comfort, and a polished everyday aesthetic for modern wardrobes.
//           </p>
//         </div>

//         {/* ALWAYS 2 COL */}
//         <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-2">

//           {/* CARD 1 */}
//           <button
//             onClick={() => navigate('/collection?category=women')}
//             className="group relative overflow-hidden text-left"
//           >
//             <img
//               src={womenMood}
//               alt="Style story"
//               className="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[520px]"
//             />

//             <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

//             <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white sm:bottom-5 sm:left-5 sm:gap-3">
              
//               <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] sm:h-9 sm:w-9">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="white"
//                   strokeWidth="2"
//                   className="h-3 w-3 sm:h-7 sm:w-7"
//                 >
//                   <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
//                   <circle cx="12" cy="12" r="3.5" />
//                   <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
//                 </svg>
//               </div>

//               <p className="max-w-[100px] text-[10px] leading-tight sm:max-w-[220px] sm:text-base">
//                 Follow our edits
//               </p>
//             </div>
//           </button>

//           {/* CARD 2 */}
//           <button
//             onClick={() => navigate('/collection?category=women&subCategory=Topwear')}
//             className="group relative overflow-hidden text-left "
//           >
//             <img
//               src={womenTop}
//               alt="Latest videos"
//               className="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[520px]"
//             />

//             <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

//             <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white sm:bottom-5 sm:left-5 sm:gap-3">
              
//               <div className="flex h-5 w-7 items-center justify-center rounded-full bg-[#ff0000] sm:h-7 sm:w-10">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="white"
//                   className="h-3 w-3 sm:h-7 sm:w-7"
//                 >
//                   <path d="M9 8.2v7.6L15.5 12 9 8.2Z" />
//                 </svg>
//               </div>

//               <p className="max-w-[100px] text-[10px] leading-tight sm:max-w-[220px] sm:text-base">
//                 Watch latest looks
//               </p>
//             </div>
//           </button>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default SocialShowcase;