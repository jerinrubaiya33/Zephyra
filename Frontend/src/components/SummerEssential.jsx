import React from 'react';
import { useNavigate } from 'react-router-dom';
import Title from './Title';
import Shirt from '../assets/man_shirt.png';
import Trouser from '../assets/Trouser.png';
import Kid from '../assets/kid_summer.png';
import Top from '../assets/women_top.png';

const summerEssentials = [
  {
    title: 'Weekend Shirts',
    image: Shirt,
    link: '/collection?category=men&subCategory=Topwear',
  },
  {
    title: 'Comfort Trousers',
    image: Trouser,
    link: '/collection?category=men&subCategory=Bottomwear',
  },
  {
    title: 'Chic Tops for Her',
    image: Top,
    link: '/collection?category=women&subCategory=Topwear',
  },
  {
    title: 'Mini Chic',
    image: Kid,
    link: '/collection?category=kids&subCategory=Topwear',
  },
];

const SummerEssential = () => {
  const navigate = useNavigate();

  return (
    <section className="w-screen sm:-ml-27.5 -ml-4 -mb-12 sm:mb-5 sm:mt-10 mt-5  px-0 sm:px-4 lg:px-6 py-12 sm:py-16 overflow-x-hidden">
      <div className="mx-auto w-full max-w-[1900px]">
        <div className="mb-8 text-center sm:mb-10">
          <div className="text-xl">
            <Title text1={"SUMMER"} text2={'ESSENTIAL'} />
          </div>

          <p className="mx-auto max-w-2xl text-sm text-black sm:text-base">
            Explore light, versatile picks made for sunny days and effortless everyday styling.
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto px-4 pb-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0 sm:pb-0 lg:grid-cols-4">
          {summerEssentials.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={() => navigate(item.link)}
              className="group relative w-[74vw] min-w-[74vw] shrink-0 overflow-hidden bg-[#f5f1eb] text-left shadow-sm transition-transform duration-300 hover:-translate-y-1 sm:w-auto sm:min-w-0"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-[320px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[320px] lg:h-[380px]"
              />

              <div className="pointer-events-none absolute inset-x-4 bottom-5 bg-white/95 border border-[#9C7E63] px-4 py-3 text-center shadow-md">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#2c2c2c] sm:text-base">
                  {item.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SummerEssential;
