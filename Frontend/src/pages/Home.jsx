import React, { useRef } from 'react';
import Hero from '../components/Hero';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsletterBox from '../components/NewsletterBox';
import LatestCollection from '../components/LatestCollection';

const Home = () => {
  const bestSellerRef = useRef(null);
  const latestCollectionRef = useRef(null);

  const scrollToBestSeller = () => {
    if (bestSellerRef.current) {
      bestSellerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToLatest = () => {
    if (latestCollectionRef.current) {
      latestCollectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Hero
        scrollToBestSeller={scrollToBestSeller}
        scrollToLatest={scrollToLatest}
      />

      {/* Latest Collection Section */}
      <div ref={latestCollectionRef}>
        <LatestCollection />
      </div>

      {/* Best Seller Section */}
      <div ref={bestSellerRef}>
        <BestSeller />
      </div>

      <OurPolicy />
      <NewsletterBox />
    </div>
  );
};

export default Home;
