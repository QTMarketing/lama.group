"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import PartnershipDealerFormCTA from "./PartnershipDealerFormCTA";

interface SlideData {
  id: number;
  title: string;
  description: string;
  secondaryCTALabel: string;
  secondaryCTALink: string;
  image: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    title: "Store Leasing & Management",
    description: "Smart leasing strategies and retail property solutions customized for you.",
    secondaryCTALabel: "Visit Store Leasing",
    secondaryCTALink: "/store-leasing",
    image: "/gas-station_8k (1).jpg"
  }
];

export default function HeroSection() {
  const router = useRouter();

  const getDesignatedEmail = (title: string): string => {
    switch (title) {
      case "Store Leasing & Management":
        return "Susanna@quicktrackinc.com";
      default:
        return "info@lamagroup.com";
    }
  };

  return (
    <section 
      className="w-full relative overflow-hidden rounded-[14px] shadow-xl"
      style={{ 
        height: '680px'
      }}
      role="region"
      aria-label="Lama Group Services"
    >
      {/* Main Slider Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative h-full w-full rounded-[14px] overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="absolute inset-0 opacity-100"
              role="group"
              aria-label={`${slide.title}`}
            >
              {/* Full background image for the entire hero section */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url("${slide.image}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
                role="img"
                aria-label={`Visual representation of ${slide.title}`}
              />
              
              {/* Soft gradient overlay for text readability (15% opacity) */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-black/10 to-transparent" />

              {/* Content Container - Text aligned to left */}
              <div className="relative z-10 h-full w-full px-[90px] py-6">
                <div className="h-full flex items-center">
                  {/* Left-aligned text content */}
                  <div className="w-full max-w-2xl">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4 drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-base md:text-lg text-white/90 max-w-xl leading-relaxed mb-[110px] drop-shadow-lg">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {slide.title === "Store Leasing & Management" ? (
                        <PartnershipDealerFormCTA
                          className="group inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-blue-600 text-white font-semibold text-base sm:text-lg shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:ring-2 hover:ring-blue-400"
                          label="Partnership Dealer Opportunities Form"
                          sourceUrl="/for-lease"
                          formSelector="#partnership-dealer-opportunities-form"
                          title="Partnership Dealer Opportunities Form"
                        />
                      ) : (
                        <button
                          onClick={() => {
                            const email = getDesignatedEmail(slide.title);
                            router.push(`/book?service=${encodeURIComponent(slide.title)}&email=${encodeURIComponent(email)}`);
                          }}
                          className="group inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-blue-600 text-white font-semibold text-base sm:text-lg shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:ring-2 hover:ring-blue-400"
                          aria-label="Book a Strategy Session with Lama Group"
                        >
                          <span className="mr-2">Book a Strategy Session</span>
                          <svg className="w-4 sm:w-5 h-4 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      )}
                      <a
                        href={slide.secondaryCTALink}
                        className="group inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-white text-white font-semibold text-base sm:text-lg bg-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/30 hover:border-white/80 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white/50 shadow-lg hover:shadow-xl"
                        aria-label={`${slide.secondaryCTALabel} for ${slide.title}`}
                      >
                        <span className="mr-2">{slide.secondaryCTALabel}</span>
                        <svg className="w-4 sm:w-5 h-4 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
} 