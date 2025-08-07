"use client";
import React from "react";
import { Button } from "./ui/button";
// import AnimatedContent from "./AnimatedContent";
// import ClientOnly from "./ClientOnly";
import { useInView } from "../hooks/useInView";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import StoreLocator from "./StoreLocator";
import Footer from "./Footer";
import HeroSection from "./HeroSection";

// Simple LaMa Group Logo as SVG, with enough spacing for one line
const LaMaLogo = () => (
  <svg className="w-64 h-10 sm:w-72 sm:h-12 md:w-80 md:h-14" viewBox="0 0 320 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="28" fontFamily="'Mont Book Regular', sans-serif" fontWeight="normal" fontSize="32" fill="#FF8800">QuickTrack</text>
    <text x="180" y="28" fontFamily="'Mont Book Regular', sans-serif" fontWeight="normal" fontSize="32" fill="#111">Inc</text>
  </svg>
);

const navLinks = [
  { label: "About", href: "#" },
  { label: "Who We Are", href: "#", dropdown: ["Leadership", "Mission", "History"] },
  { label: "Sustainability", href: "#", dropdown: ["Environment", "Community"] },
  { label: "Supplier Partners", href: "#" },
  { label: "Debt Investors", href: "#" },
  { label: "Contact Us", href: "#" },
];

const topLinks = [
  { label: "QuickTrack Inc", href: "https://quicktrackinc.com/" },
  { label: "LaMa Wholesale", href: "https://www.lamawholesale.com/" },
  { label: "QuickTrack Fuel", href: "https://www.quicktrackfuel.com/" },
];

export default function LaMaLanding() {
  const [navRef, navInView] = useInView({ threshold: 0.1 }, false) as [React.RefObject<HTMLDivElement>, boolean];
  const [quoteRef, quoteInView] = useInView({ threshold: 0.1 }, false) as [React.RefObject<HTMLDivElement>, boolean];

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Announcement Bar */}
      <div className="w-full bg-black text-white text-xs sm:text-sm text-center py-2 px-2 sm:px-4">
        Join LaMa Group in Supporting Children's Miracle Network Hospitals
      </div>

      {/* Top Navigation Links */}
      <div className="w-full bg-white border-b flex flex-col sm:flex-row justify-between items-center px-2 sm:px-4 md:px-12 py-2 gap-y-2 top-nav">
        <div className="flex flex-wrap gap-x-4 sm:gap-x-6 text-black text-sm font-medium justify-center">
          {topLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="w-full bg-white flex flex-col md:flex-row items-center justify-between px-2 sm:px-4 md:px-12 py-4 shadow-sm z-10 main-nav">
        <div className="flex items-center gap-2 sm:gap-4 md:gap-8 px-0 md:px-0">
          <LaMaLogo />
        </div>
        <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-center mt-2 md:mt-0">
          <ul className="flex flex-col md:flex-row gap-y-2 md:gap-y-0 md:space-x-6 items-center">
            {navLinks.map((link) => (
              <li key={link.label} className="relative group">
                <a href={link.href} className="font-semibold text-black px-2 py-1 hover:text-orange-500 transition-colors flex items-center">
                  {link.label}
                  {link.dropdown && (
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  )}
                </a>
                {/* Dropdown */}
                {link.dropdown && (
                  <ul className="absolute left-0 top-full mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-20">
                    {link.dropdown.map((item) => (
                      <li key={item}>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{item}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-2 md:mt-0">
          <Button className="bg-[#FF6600] hover:bg-orange-700 text-white font-semibold rounded-full px-4 sm:px-6 py-2 shadow-md text-sm sm:text-base">Call Us</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <section className="bg-white text-black py-20">
        <div className="max-w-[1200px] mx-auto px-6 aos-init aos-animate" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Store Leasing & Management */}
            <div className="mx-4 my-6 w-[380px] md:w-[400px] h-[500px] md:h-[520px] bg-gray-200 rounded-xl p-8 flex flex-col items-center justify-between">
              <div className="w-full h-[180px] bg-gray-300 rounded-lg flex items-center justify-center mb-6">
                <span className="text-gray-600 text-lg font-medium">Store Leasing & Management Image</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Store Leasing & Management</h3>
              <p className="text-gray-700 mb-6 leading-relaxed text-center">
                Comprehensive store leasing and management solutions for convenience stores and gas stations. 
                Expert guidance through every step of the process.
              </p>
              <div className="flex w-full justify-center mt-6">
                <a href="#" className="inline-block bg-[#FF6600] text-white font-medium text-base px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">Learn More</a>
              </div>
            </div>

            {/* Wholesale Distribution */}
            <div className="mx-4 my-6 w-[380px] md:w-[400px] h-[500px] md:h-[520px] bg-gray-200 rounded-xl p-8 flex flex-col items-center justify-between">
              <div className="w-full h-[180px] bg-gray-300 rounded-lg flex items-center justify-center mb-6">
                <span className="text-gray-600 text-lg font-medium">Wholesale Distribution Image</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Wholesale Distribution</h3>
              <p className="text-gray-700 mb-6 leading-relaxed text-center">
                Advanced wholesale distribution and supply chain solutions that power our network and beyond. 
                Secure, reliable, and innovative solutions for business partners.
              </p>
              <div className="flex w-full justify-center mt-6">
                <a href="#" className="inline-block bg-[#FF6600] text-white font-medium text-base px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">Learn More</a>
              </div>
            </div>

            {/* Fuel Branding & Supply */}
            <div className="mx-4 my-6 w-[380px] md:w-[400px] h-[500px] md:h-[520px] bg-gray-200 rounded-xl p-8 flex flex-col items-center justify-between">
              <div className="w-full h-[180px] bg-gray-300 rounded-lg flex items-center justify-center mb-6">
                <span className="text-gray-600 text-lg font-medium">Fuel Branding & Supply Image</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Fuel Branding & Supply</h3>
              <p className="text-gray-700 mb-6 leading-relaxed text-center">
                Premium fuel branding and supply solutions. Partner with trusted brands and ensure reliable 
                fuel supply for your convenience store operations.
              </p>
              <div className="flex w-full justify-center mt-6">
                <a href="#" className="inline-block bg-[#FF6600] text-white font-medium text-base px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">Learn More</a>
              </div>
            </div>

            {/* Construction & Renovation */}
            <div className="mx-4 my-6 w-[380px] md:w-[400px] h-[500px] md:h-[520px] bg-gray-200 rounded-xl p-8 flex flex-col items-center justify-between">
              <div className="w-full h-[180px] bg-gray-300 rounded-lg flex items-center justify-center mb-6">
                <span className="text-gray-600 text-lg font-medium">Construction & Renovation Image</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Construction & Renovation</h3>
              <p className="text-gray-700 mb-6 leading-relaxed text-center">
                Professional construction and renovation services for convenience stores and gas stations. 
                From concept to completion, we handle every detail.
              </p>
              <div className="flex w-full justify-center mt-6">
                <a href="#" className="inline-block bg-[#FF6600] text-white font-medium text-base px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">Learn More</a>
              </div>
            </div>

            {/* Maintenance & Support */}
            <div className="mx-4 my-6 w-[380px] md:w-[400px] h-[500px] md:h-[520px] bg-gray-200 rounded-xl p-8 flex flex-col items-center justify-between">
              <div className="w-full h-[180px] bg-gray-300 rounded-lg flex items-center justify-center mb-6">
                <span className="text-gray-600 text-lg font-medium">Maintenance & Support Image</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Maintenance & Support</h3>
              <p className="text-gray-700 mb-6 leading-relaxed text-center">
                Comprehensive maintenance and support services to keep your operations running smoothly. 
                24/7 technical support and preventive maintenance programs.
              </p>
              <div className="flex w-full justify-center mt-6">
                <a href="#" className="inline-block bg-[#FF6600] text-white font-medium text-base px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Presence Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center aos-init aos-animate" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8">International Presence</h2>
          <div className="w-full h-96 bg-gray-800 rounded-lg mb-8 flex items-center justify-center">
            <div className="text-center">
              <div className="w-64 h-32 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-lg font-medium">World Map</span>
              </div>
              <p className="text-gray-400 text-lg">Expanding our presence across multiple regions</p>
            </div>
          </div>
          <div className="btn-container w-full flex justify-center">
            <a href="#" className="inline-block bg-[#FF6600] text-white font-medium text-lg px-8 py-4 rounded-full hover:bg-orange-500 transition-colors">Learn More</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#FF6600] via-[#FF832F] to-[#FF6600] h-4"></footer>

      {/* Contact Us Section */}
      <section className="bg-[#F4F4F4] text-black pt-[90px] pb-[90px] w-full min-w-0 min-h-0 lg:min-w-[1680px] lg:min-h-[536.19px] flex justify-center items-center">
        <div className="max-w-[1200px] w-full mx-auto px-6 flex flex-col items-center aos-init aos-animate" data-aos="fade-up">
          <h2 className="text-[48px] font-extrabold mb-12 text-center">Contact Us</h2>
          <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12 w-full">
            {/* For Fuel Card */}
            <div className="w-full max-w-[480px] h-[160px] bg-white rounded-[20px] p-5 flex flex-col justify-center shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-[20px] lg:text-[28px] font-bold text-gray-900 mb-4 text-left">For Fuel</h2>
              <div className="text-left">
                <p className="text-[14px] lg:text-[18px] text-gray-700 mb-1">Email us:</p>
                <a href="mailto:info@quicktrackfuel.com" className="text-[14px] lg:text-[18px] text-[#FF6600] hover:underline break-all">info@quicktrackfuel.com</a>
              </div>
            </div>

            {/* For LaMa Wholesale Card */}
            <div className="w-full max-w-[480px] h-[160px] bg-white rounded-[20px] p-5 flex flex-col justify-center shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-[20px] lg:text-[28px] font-bold text-gray-900 mb-4 text-left">For LaMa Wholesale</h2>
              <div className="text-left">
                <p className="text-[14px] lg:text-[18px] text-gray-700 mb-1">Email us:</p>
                <a href="mailto:info@lamawholesale.com" className="text-[14px] lg:text-[18px] text-[#FF6600] hover:underline break-all">info@lamawholesale.com</a>
              </div>
            </div>

            {/* For LaMa Foundation Card */}
            <div className="w-full max-w-[480px] h-[160px] bg-white rounded-[20px] p-5 flex flex-col justify-center shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-[20px] lg:text-[28px] font-bold text-gray-900 mb-4 text-left">For LaMa Foundation</h2>
              <div className="text-left">
                <p className="text-[14px] lg:text-[18px] text-gray-700 mb-1">Email us:</p>
                <a href="mailto:info@lamafoundation.com" className="text-[14px] lg:text-[18px] text-[#FF6600] hover:underline break-all">info@lamafoundation.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Find a Store Section */}
      <section className="w-full flex justify-center items-center overflow-hidden">
        <StoreLocator />
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
} 