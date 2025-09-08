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
  },
  {
    id: 2,
    title: "Wholesale Distribution",
    description: "Partner with Lama Wholesale to improve supply chains and inventory.",
    secondaryCTALabel: "Visit Wholesale Site",
    secondaryCTALink: "https://lamawholesale.com",
    image: "/Lama Wholesale.avif"
  },
  {
    id: 3,
    title: "Fuel Branding & Supply",
    description: "Reliable branded fuel and supply solutions with Quicktrack Fuel.",
    secondaryCTALabel: "Visit Fuel Site",
    secondaryCTALink: "https://quicktrackfuel.com",
    image: "/QuickTrackFuel.avif"
  },
  {
    id: 4,
    title: "Construction & Renovation",
    description: "Renovate or build with confidence using our professional construction team.",
    secondaryCTALabel: "View More",
    secondaryCTALink: "/construction-renovation",
    image: "/Construction & Renovation.jpg"
  },
  {
    id: 5,
    title: "Maintenance & Support",
    description: "Ongoing support and repairs to keep your operations smooth.",
    secondaryCTALabel: "Learn More",
    secondaryCTALink: "/maintenance-support",
    image: "/Maintenance & Support.jpg"
  }
];

export default function HeroSection() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsAutoPlaying(true);
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    } else if (event.key === 'ArrowRight') {
      nextSlide();
    } else if (event.key === 'Escape') {
      setIsAutoPlaying(false);
    }
  }, [nextSlide]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const getDesignatedEmail = (title: string): string => {
    switch (title) {
      case "Store Leasing & Management":
        return "Susanna@quicktrackinc.com";
      case "Fuel Branding & Supply":
        return "sandy.malla@quicktrackinc.com";
      case "Wholesale Distribution":
        return "shakil@quicktrackinc.com";
      case "Construction & Renovation":
        return "ram@quicktrackinc.com";
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label="Lama Group Services Slider"
    >
      {/* Main Slider Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative h-full w-full rounded-[14px] overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              role="group"
              aria-label={`Slide ${index + 1} of ${slides.length}: ${slide.title}`}
              aria-hidden={index !== currentSlide}
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

      {/* Left/Right Navigation Buttons */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-[90px] sm:px-4 z-20 pointer-events-none">
        <button
          type="button"
          onClick={prevSlide}
          className="pointer-events-auto inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/90 hover:bg-white text-gray-900 shadow-md hover:shadow-lg transition focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
          aria-label="Previous slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={nextSlide}
          className="pointer-events-auto inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/90 hover:bg-white text-gray-900 shadow-md hover:shadow-lg transition focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
          aria-label="Next slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/20 z-10">
        <div
          className="h-full bg-gradient-to-r from-white to-white/80 transition-all duration-1000 ease-linear shadow-sm"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`
          }}
          aria-label={`Slide ${currentSlide + 1} of ${slides.length}`}
        />
      </div>

      {/* Slide Counter for Screen Readers */}
      <div className="sr-only" aria-live="polite">
        Slide {currentSlide + 1} of {slides.length}: {slides[currentSlide]?.title}
      </div>
    </section>
  );
} 