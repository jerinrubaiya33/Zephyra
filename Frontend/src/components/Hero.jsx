import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import '../index.css';

const Hero = ({ scrollToBestSeller, scrollToLatest }) => {
    return (
        <div className='flex flex-col sm:flex-row border border-[#ffc6db] -mt-17'>

            {/* HERO LEFT SIDE */}
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
                <div className='text-black space-y-2'>

                    {/* OUR BESTSELLERS (scrolls to section) */}
                    <div onClick={scrollToBestSeller} className='flex items-center gap-2 cursor-pointer'>
                        <p className='w-8 md:w-11 h-[2px] bg-[#f76097]'></p>
                        <p className="font-semibold text-lg md:text-xl">OUR BESTSELLERS</p>
                    </div>

                    {/* Main Heading */}
                    <h1
                        onClick={scrollToLatest}
                        className='text-5xl lg:text-7xl leading-snug text-[#f76097] font-light cursor-pointer'
                    >
                        Latest Arrivals
                    </h1>


                    {/* SHOP NOW (navigates to /collection) */}
                    <Link to="/collection" className='flex items-center gap-2 cursor-pointer'>
                        <p className='font-semibold text-sm md:text-xl'>SHOP NOW</p>
                        <p className='w-8 md:w-11 h-[2px] bg-[#f76097]'></p>
                    </Link>

                </div>
            </div>

            {/* HERO RIGHT SIDE IMAGE */}
            <img className='w-full sm:w-1/2' src={assets.hero_img} alt="Hero" />
        </div>
    );
};

export default Hero;
