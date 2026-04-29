

import React, { useRef } from 'react';
import Hero from '../components/Hero';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsletterBox from '../components/NewsletterBox';
import LatestCollection from '../components/LatestCollection';
import Categories from '../components/Categories';
import Banner from '../components/Banner';
import Wallpaper from '../assets/Wallpaper.png';

const Home = () => {
  const bestSellerRef = useRef(null);
  const latestCollectionRef = useRef(null);
  const categoriesRef = useRef(null);

  const scrollToBestSeller = () => {
    bestSellerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLatest = () => {
    latestCollectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${Wallpaper})`,
      }}
    >
      <Hero
        scrollToBestSeller={scrollToBestSeller}
        scrollToLatest={scrollToLatest}
        scrollToCategories={scrollToCategories}
      />

      <div ref={latestCollectionRef}>
        <LatestCollection />
      </div>

      <div ref={categoriesRef}>
        <Categories />
      </div>

      <div ref={bestSellerRef}>
        <BestSeller />
      </div>

      <Banner />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
};

export default Home;
