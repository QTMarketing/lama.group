import React from "react";

export default function HeroSection() {
  return (
    <section
      className="w-full max-w-[1680px] h-[760px] mx-auto py-10 px-4 flex flex-col md:flex-row items-center justify-center relative overflow-hidden"
      style={{ 
        minHeight: '420px',
        backgroundImage: 'url(/lamagroup.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40 pointer-events-none" />
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full h-full">
        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col items-start justify-center max-w-lg w-full mb-10 md:mb-0 md:mr-12 text-white ml-6">
          <h1
            className="mb-5 text-white"
            style={{
              fontFamily: 'OldschoolGrotesk-CondensedBold',
              fontSize: '60px',
              lineHeight: '72px',
              fontWeight: 700,
              letterSpacing: '1px',
            }}
          >
            All-in-One C-Store & Gas Station Solutions
          </h1>
          <p
            className="mb-7 text-white/90"
            style={{
              fontWeight: 400,
              fontSize: '22px',
              lineHeight: '32px',
              letterSpacing: '0.5px',
              color: 'rgba(255,255,255,0.9)'
            }}
          >
            We provide end to end business solutions for convenience stores and gas stations across Texas
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <a
              href="#contact"
              className="inline-block px-10 py-4 rounded-full bg-orange-500 text-white font-semibold text-lg shadow-lg transition-all duration-200 hover:bg-orange-600 focus:bg-orange-700 focus:outline-none text-center"
              style={{ fontSize: '18px' }}
            >
              Contact Us
            </a>
            <a
              href="#services"
              className="inline-block px-10 py-4 rounded-full border-2 border-white text-white font-semibold text-lg bg-transparent shadow-lg transition-all duration-200 hover:bg-white/10 hover:border-white/80 focus:border-white/60 focus:outline-none text-center"
              style={{ fontSize: '18px' }}
            >
              Explore Services
            </a>
          </div>
        </div>
        {/* Right: Empty space for visual balance */}
        <div className="flex-1 flex items-center justify-center w-full max-w-xl">
          {/* This space is intentionally left empty for visual balance */}
        </div>
      </div>
    </section>
  );
} 