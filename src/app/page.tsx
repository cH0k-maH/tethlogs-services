import React from "react";
import HeroSection from "@/components/home/HeroSection";
import QuickServicesSection from "@/components/home/QuickServicesSection";
import RicohSolutionsSection from "@/components/home/RicohSolutionsSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import HomeServiceTeaser from "@/components/home/HomeServiceTeaser";
import AboutStorySection from "@/components/home/AboutStorySection";

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Core Service Cards Immediately Underneath */}
      <QuickServicesSection />

      {/* 3. Ricoh Printing Solutions Showcase */}
      <RicohSolutionsSection />

      {/* 4. Why Choose Tethlogs - Substantiated Pillars */}
      <WhyChooseSection />

      {/* 5. Industries We Serve (B2B Focus) */}
      <IndustriesSection />

      {/* 6. Interactive Request a Service Engine */}
      <HomeServiceTeaser />

      {/* 7. The Teth Story & Technical Ethos */}
      <AboutStorySection />
    </main>
  );
}