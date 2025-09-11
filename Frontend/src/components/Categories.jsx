import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import Title from './Title';

const Categories = () => {
    const navigate = useNavigate();

    const categories = [
        { name: 'Women', image: assets.women, link: '/collection?category=women', reverse: false },
        { name: 'Men', image: assets.man, link: '/collection?category=men', reverse: true },
        { name: 'Kids', image: assets.kid, link: '/collection?category=kids', reverse: false },
    ];

    return (
        <div className="flex flex-col gap-24 mt-15 px-4 sm:px-12 lg:px-20 indie-font">
            
            {/* Section Title */}
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3">
                    <Title text1={"OUR"} text2={'SECTIONS'} />
                </div>
                <p className="w-full sm:w-3/4 md:w-2/4 m-auto text-sm sm:text-base md:text-lg text-black mt-0">
                    Curated sections for every style and age group.
                </p>
            </div>

            {/* Categories */}
            {categories.map((cat, index) => (
                <div
                    key={index}
                    className={`flex flex-col md:flex-row ${cat.reverse ? 'md:flex-row-reverse' : ''
                        } items-center gap-10`}
                >
                    {/* Image */}
                    <div className="relative w-full md:w-1/2 group -mt-30 -mb-10 md:-mb-0 md:-mt-28">
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
