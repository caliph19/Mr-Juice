import React from "react";

import HeroSection from "../components/home/HeroSectionHome.jsx";
import StoreHoursBanner from "../components/home/StoreHoursBanner.jsx";
import CategoryMarquee from "../components/home/CategoryMarquee.jsx";
import WhyUsSection from "../components/home/WhyUsSection.jsx";
import CtaSection from "../components/home/CtaSection.jsx";
import FeaturedSection from "../components/home/FeaturedSection.jsx";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StoreHoursBanner />
      <CategoryMarquee />
      <WhyUsSection />
      <FeaturedSection />
      <CtaSection />
    </div>
  );
}