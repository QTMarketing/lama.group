"use client";
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeroSection from './HeroSection';
import ServiceBar from './ServiceBar';
import WhyLama from './WhyLama';

export default function LaMaLanding() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1680px]">
          <HeroSection />
        </div>
      </section>

      {/* Services bar below the hero */}
      <ServiceBar />

      {/* Why LaMa Section */}
      <WhyLama />
    </>
  );
} 