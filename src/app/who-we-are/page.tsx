'use client';

import { PageTemplate } from '@/components/templates/PageTemplate';
import Image from 'next/image';

export default function WhoWeArePage() {
  return (
    <PageTemplate>
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Left Column - Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-sm font-bold uppercase text-[#FF8800] tracking-widest mb-4">
                ABOUT LAMA GROUP
              </h3>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight max-w-2xl">
                Who We Are
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                LaMa Group is a leading convenience store and fuel retail company serving communities across Texas with dedication, innovation, and unwavering commitment to customer satisfaction.
              </p>
            </div>
            
            {/* Right Column - Logo */}
            <div className="flex-shrink-0 flex justify-center lg:justify-end">
              <div className="w-[400px] h-[400px] relative">
                <Image
                  src="/lamagrouplogo.svg"
                  alt="LaMa Group Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* New Responsive Layout - Three Sections */}
      <section className="bg-[#FF4500] py-0">
        {/* Desktop Layout - 1680px container with edge images */}
        <div className="hidden lg:block w-[1680px] pl-[360px] pr-[360px] mx-auto relative">
          
          {/* Section 1: Our Motto - Image Right Edge, Text Left */}
          <div className="relative min-h-[400px]">
            {/* Text Content - Left Side */}
            <div className="w-[600px] pt-20">
              <h3 className="text-3xl font-bold text-white mb-5">
                Our Motto: Your Stop for Everything
              </h3>
              <p className="text-lg text-white leading-relaxed">
                From snacks and drinks to everyday essentials, we&apos;ve got it all under one roof. Whether you&apos;re fueling up, grabbing a quick bite, or picking up last-minute items, we&apos;re here to make life easier—anytime you need us.
              </p>
            </div>
            
            {/* Image - Right Edge of Screen */}
            <div className="absolute right-[-360px] top-0 w-[600px] h-[400px] bg-gray-800 rounded-bl-[75px] overflow-hidden flex items-center justify-center text-white text-base text-center">
              <span>🏪 STORE FRONT</span>
            </div>
              </div>
              
          {/* Section 2: Our Philosophy - Image Left Edge, Text Right */}
          <div className="relative min-h-[400px]">
            {/* Image - Left Edge of Screen */}
            <div className="absolute left-[-360px] top-0 w-[600px] h-[400px] bg-gray-800 rounded-tr-[77px] rounded-br-[77px] overflow-hidden flex items-center justify-center text-white text-base text-center">
              <span>👥 BUSINESS MEETING</span>
            </div>

            {/* Text Content - Right Side */}
            <div className="ml-auto w-[600px] pt-20">
              <h3 className="text-3xl font-bold text-white mb-5">
                Our Philosophy
              </h3>
              <p className="text-lg text-white leading-relaxed">
                We believe our quickest path to success is by helping others achieve their goals. At Chargezoom, success is a collaborative effort, and by aiding our clients and employees to succeed, we create a community of thriving, innovative professionals.
                </p>
              </div>
            </div>

          {/* Section 3: Our Mission - Image Right Edge, Text Left */}
          <div className="relative min-h-[400px]">
            {/* Text Content - Left Side */}
            <div className="w-[600px] pt-20">
              <h3 className="text-3xl font-bold text-white mb-5">
                Our Mission
              </h3>
              <p className="text-lg text-white leading-relaxed">
                At LaMa Group, our mission is simple: to be the most trusted and convenient choice for communities across Texas. With over 100 stores serving neighborhoods big and small, we aim to deliver fast service, quality products, and a friendly smile—every single time. We&apos;re committed to keeping shelves stocked, prices fair, and doors open when our customers need us most. Our goal is to make every visit quick, easy, and worth coming back for.
              </p>
              </div>
              
            {/* Image - Right Edge of Screen */}
            <div className="absolute right-[-360px] bottom-0 w-[600px] h-[400px] bg-gray-800 rounded-tl-[75px] overflow-hidden flex items-center justify-center text-white text-base text-center">
              <span>🛒 STORE INTERIOR</span>
            </div>
          </div>
          
        </div>

        {/* Tablet Layout - Medium screens */}
        <div className="hidden md:block lg:hidden max-w-4xl mx-auto px-8">
          
          {/* Section 1: Our Motto */}
          <div className="flex flex-col items-center text-center py-16">
            <div className="w-full max-w-2xl mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Our Motto: Your Stop for Everything
              </h3>
              <p className="text-base text-white leading-relaxed">
                From snacks and drinks to everyday essentials, we&apos;ve got it all under one roof. Whether you&apos;re fueling up, grabbing a quick bite, or picking up last-minute items, we&apos;re here to make life easier—anytime you need us.
              </p>
            </div>
            <div className="w-full max-w-md h-64 bg-gray-800 rounded-2xl overflow-hidden flex items-center justify-center text-white text-base">
              <span>🏪 STORE FRONT</span>
            </div>
        </div>
        
          {/* Section 2: Our Philosophy */}
          <div className="flex flex-col items-center text-center py-16">
            <div className="w-full max-w-2xl mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Our Philosophy
              </h3>
              <p className="text-base text-white leading-relaxed">
                We believe our quickest path to success is by helping others achieve their goals. At Chargezoom, success is a collaborative effort, and by aiding our clients and employees to succeed, we create a community of thriving, innovative professionals.
              </p>
            </div>
            <div className="w-full max-w-md h-64 bg-gray-800 rounded-2xl overflow-hidden flex items-center justify-center text-white text-base">
              <span>👥 BUSINESS MEETING</span>
                </div>
              </div>
          
          {/* Section 3: Our Mission */}
          <div className="flex flex-col items-center text-center py-16">
            <div className="w-full max-w-2xl mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Our Mission
              </h3>
              <p className="text-base text-white leading-relaxed">
                At LaMa Group, our mission is simple: to be the most trusted and convenient choice for communities across Texas. With over 100 stores serving neighborhoods big and small, we aim to deliver fast service, quality products, and a friendly smile—every single time. We&apos;re committed to keeping shelves stocked, prices fair, and doors open when our customers need us most. Our goal is to make every visit quick, easy, and worth coming back for.
              </p>
            </div>
            <div className="w-full max-w-md h-64 bg-gray-800 rounded-2xl overflow-hidden flex items-center justify-center text-white text-base">
              <span>🛒 STORE INTERIOR</span>
            </div>
          </div>
          
        </div>

        {/* Mobile Layout - Small screens */}
        <div className="md:hidden px-6">
          
          {/* Section 1: Our Motto */}
          <div className="flex flex-col items-center text-center py-12">
            <div className="w-full mb-6">
              <h3 className="text-xl font-bold text-white mb-3">
                Our Motto: Your Stop for Everything
              </h3>
              <p className="text-sm text-white leading-relaxed">
                From snacks and drinks to everyday essentials, we&apos;ve got it all under one roof. Whether you&apos;re fueling up, grabbing a quick bite, or picking up last-minute items, we&apos;re here to make life easier—anytime you need us.
              </p>
            </div>
            <div className="w-full h-48 bg-gray-800 rounded-xl overflow-hidden flex items-center justify-center text-white text-sm">
              <span>🏪 STORE FRONT</span>
            </div>
        </div>
        
          {/* Section 2: Our Philosophy */}
          <div className="flex flex-col items-center text-center py-12">
            <div className="w-full mb-6">
              <h3 className="text-xl font-bold text-white mb-3">
                Our Philosophy
              </h3>
              <p className="text-sm text-white leading-relaxed">
                We believe our quickest path to success is by helping others achieve their goals. At Chargezoom, success is a collaborative effort, and by aiding our clients and employees to succeed, we create a community of thriving, innovative professionals.
              </p>
            </div>
            <div className="w-full h-48 bg-gray-800 rounded-xl overflow-hidden flex items-center justify-center text-white text-sm">
              <span>👥 BUSINESS MEETING</span>
                </div>
              </div>
          
          {/* Section 3: Our Mission */}
          <div className="flex flex-col items-center text-center py-12">
            <div className="w-full mb-6">
              <h3 className="text-xl font-bold text-white mb-3">
                Our Mission
              </h3>
              <p className="text-sm text-white leading-relaxed">
                At LaMa Group, our mission is simple: to be the most trusted and convenient choice for communities across Texas. With over 100 stores serving neighborhoods big and small, we aim to deliver fast service, quality products, and a friendly smile—every single time. We&apos;re committed to keeping shelves stocked, prices fair, and doors open when our customers need us most. Our goal is to make every visit quick, easy, and worth coming back for.
              </p>
            </div>
            <div className="w-full h-48 bg-gray-800 rounded-xl overflow-hidden flex items-center justify-center text-white text-sm">
              <span>🛒 STORE INTERIOR</span>
            </div>
          </div>
          
        </div>
      </section>

      {/* Why LaMa? Section */}
      <section className="py-16 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="relative overflow-hidden bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex flex-col md:flex-row items-center p-10">
            {/* Decorative skew block */}
            <div
              className="pointer-events-none absolute bottom-0 right-0 w-[300px] h-[200px] bg-[rgba(255,77,0,0.2)] -skew-x-12"
              aria-hidden="true"
            />

            {/* Content */}
            <div className="flex-1 max-w-[500px] z-[1] min-w-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1A1A1A]">Why LaMa?</h2>
              <p className="text-[16px] text-[#666666] mb-5 leading-relaxed">
                We're more than just a service provider — we&apos;re your complete convenience store and gas station partner, delivering end-to-end solutions that drive your business forward.
              </p>
              <ul className="list-disc pl-5 space-y-3 marker:text-[#FF4D00] text-[#1A1A1A]">
                <li>24/7 support and maintenance services</li>
                <li>Nationwide logistics and supply chain</li>
                <li>Trusted by 500+ stores across the country</li>
                <li>Proven track record of reducing operational costs</li>
                <li>One-stop solution for all your C-store needs</li>
              </ul>
            </div>

            {/* Visual */}
            <div className="flex-1 h-[300px] md:h-[400px] bg-gradient-to-br from-[#FF4D00] to-[#E04000] rounded-xl mt-8 md:mt-0 md:ml-[50px] w-full max-w-[600px] text-white font-semibold flex items-center justify-center text-center relative overflow-hidden">
              <div className="relative z-[1]">
                Team Photo Placeholder
                <div className="opacity-80 text-sm">(Replace with actual team photo)</div>
                <div className="opacity-60 text-sm">600 x 400px recommended</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </PageTemplate>
  );
} 