'use client';

import Image from 'next/image';

export default function WhoWeArePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-12">
            
            {/* Left Column - Text Content */}
            <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
              <h3 className="text-xs sm:text-sm font-bold uppercase text-[#FF8800] tracking-widest mb-3 sm:mb-4">
                ABOUT LAMA GROUP
              </h3>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Who We Are
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                LaMa Group is a leading convenience store and fuel retail company serving communities across Texas with dedication, innovation, and unwavering commitment to customer satisfaction.
              </p>
            </div>
            
            {/* Right Column - Logo */}
            <div className="flex-shrink-0 flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] relative">
                <Image
                  src="/lamagrouplogo.svg"
                  alt="LaMa Group Logo"
                  fill
                  className="object-contain max-w-full h-auto"
                  priority
                />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* New Responsive Layout - Three Sections */}
      <section className="bg-[#FE6600] py-0">
        {/* Section 1: Our Motto */}
        <div className="bg-[#FE6600] py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
              
              {/* Text Column */}
              <div className="order-2 lg:order-1 max-w-prose">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Our Motto: Your Stop for Everything
                </h2>
                <p className="text-lg text-gray-100 leading-relaxed">
                  From snacks and drinks to everyday essentials, we&apos;ve got it all under one roof. Whether you&apos;re fueling up, grabbing a quick bite, or picking up last-minute items, we&apos;re here to make life easier—anytime you need us.
                </p>
              </div>

              {/* Image Column */}
              <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative w-full sm:w-[600px] sm:h-[400px] aspect-[3/2] overflow-hidden rounded-2xl">
                  <Image
                    src="/STORE FRONT.jpeg"
                    alt="LaMa storefront showing our motto in action"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Section 2: Our Philosophy */}
        <div className="bg-[#FE6600] py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
              
              {/* Image Column */}
              <div className="order-1 lg:order-1 flex justify-center">
                <div className="relative w-full sm:w-[600px] sm:h-[400px] aspect-[3/2] overflow-hidden rounded-2xl">
                  <Image
                    src="/BUSINESS MEETING.jpg"
                    alt="LaMa team meeting representing our philosophy"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text Column */}
              <div className="order-2 lg:order-2 max-w-prose">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Our Philosophy
                </h2>
                <p className="text-lg text-gray-100 leading-relaxed">
                  We believe our quickest path to success is by helping others achieve their goals. At Chargezoom, success is a collaborative effort, and by aiding our clients and employees to succeed, we create a community of thriving, innovative professionals.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Section 3: Our Mission */}
        <div className="bg-[#FE6600] py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
              
              {/* Text Column */}
              <div className="order-2 lg:order-1 max-w-prose">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-100 leading-relaxed">
                  At LaMa Group, our mission is simple: to be the most trusted and convenient choice for communities across Texas. With over 100 stores serving neighborhoods big and small, we aim to deliver fast service, quality products, and a friendly smile—every single time. We&apos;re committed to keeping shelves stocked, prices fair, and doors open when our customers need us most. Our goal is to make every visit quick, easy, and worth coming back for.
                </p>
              </div>

              {/* Image Column */}
              <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative w-full sm:w-[600px] sm:h-[400px] aspect-[3/2] overflow-hidden rounded-2xl">
                  <Image
                    src="/STORE INTERIOR.jpeg"
                    alt="LaMa store interior showcasing our mission"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* Why LaMa? Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="relative overflow-hidden bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex flex-col md:flex-row items-center p-6 sm:p-8 md:p-10">
            {/* Decorative skew block */}
            <div
              className="pointer-events-none absolute bottom-0 right-0 w-[200px] sm:w-[250px] md:w-[300px] h-[120px] sm:h-[150px] md:h-[200px] bg-[rgba(255,77,0,0.2)] -skew-x-12"
              aria-hidden="true"
            />

            {/* Content */}
            <div className="flex-1 max-w-[500px] z-[1] min-w-0 order-2 md:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#1A1A1A]">Why LaMa?</h2>
              <p className="text-sm sm:text-base text-[#666666] mb-4 sm:mb-5 leading-relaxed">
                We&apos;re more than just a service provider — we&apos;re your complete convenience store and gas station partner, delivering end-to-end solutions that drive your business forward.
              </p>
              <ul className="list-disc pl-4 sm:pl-5 space-y-2 sm:space-y-3 marker:text-[#FF4D00] text-sm sm:text-base text-[#1A1A1A]">
                <li>24/7 support and maintenance services</li>
                <li>Nationwide logistics and supply chain</li>
                <li>Trusted by 500+ stores across the country</li>
                <li>Proven track record of reducing operational costs</li>
                <li>One-stop solution for all your C-store needs</li>
              </ul>
            </div>

            {/* Visual */}
            <div className="flex-1 h-[250px] sm:h-[300px] md:h-[400px] bg-gradient-to-br from-[#FF4D00] to-[#E04000] rounded-xl mt-6 sm:mt-8 md:mt-0 md:ml-[30px] lg:ml-[50px] w-full max-w-[500px] sm:max-w-[600px] text-white font-semibold flex items-center justify-center text-center relative overflow-hidden order-1 md:order-2">
              <div className="relative z-[1] px-4">
                <div className="text-sm sm:text-base">Team Photo Placeholder</div>
                <div className="opacity-80 text-xs sm:text-sm mt-1">(Replace with actual team photo)</div>
                <div className="opacity-60 text-xs sm:text-sm">600 x 400px recommended</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 