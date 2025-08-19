'use client';

import OceanWave from '@/components/OceanWave';
import { TopNavBar } from '@/components/navigation/TopNavBar';
import { QuickLinksBar } from '@/components/navigation/QuickLinksBar';
import { MainNavBar } from '@/components/navigation/MainNavBar';
import { Footer } from '@/components/navigation/Footer';
import { ServiceBlock } from '@/components/ServiceBlock';

export default function ServicesPage() {
  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      {/* Site Navigation */}
      <TopNavBar />
      <QuickLinksBar />
      <MainNavBar />

      {/* Hero Section */}
      <section id="hero" className="relative w-full bg-white min-h-[72vh] grid place-items-center overflow-hidden">
        <div className="relative mx-auto w-full max-w-[1860px] px-6 md:px-8 lg:px-10">
          {/* Wave - OceanWave component sized and positioned like the old wave.svg */}
          <div className="pointer-events-none absolute z-0 left-1/2 top-[52%] sm:top-[51%] lg:top-[50%] -translate-x-1/2 -translate-y-1/2 w-[140%] sm:w-[120%] h-[586.59px]">
            <OceanWave className="w-full h-full" />
          </div>

          {/* Soft halo behind text for extra readability */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[58%] w-[70%] md:w-[60%] lg:w-[50%] h-[140px] md:h-[160px] lg:h-[180px] rounded-[999px] bg-white/35 blur-2xl mix-blend-lighten z-[5]" />

          {/* Headline */}
          <div className="relative z-10 max-w-[900px] mx-auto text-center -translate-y-2 md:-translate-y-4">
            <h1
              className="font-extrabold text-[34px] sm:text-[48px] lg:text-[60px] leading-[1.1] tracking-[-0.02em]"
              style={{
                fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
                color: '#111111'
              }}
            >
              {`Explore our`}<br />
              <span style={{ color: '#FF4D00' }}>{`industry leading`}</span><br />
              {`services`}
            </h1>
          </div>
        </div>
      </section>

      {/* Body Services Section */}
      <section className="bg-white py-[120px]">
        <div className="space-y-[140px]">
          <ServiceBlock
            title="Store Leasing & Management"
            titleColor="orange"
            body="Comprehensive leasing and management solutions tailored for convenience stores and gas stations. We guide you through location strategy, tenant coordination, and long-term performance optimization."
            images={[
              { src: 'https://images.unsplash.com/photo-1564760290292-23341e4df6ec?q=80&w=1200&auto=format&fit=crop', alt: 'Convenience store exterior at dusk' },
              { src: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=1200&auto=format&fit=crop', alt: 'Retail shelves neatly organized' },
            ]}
          />

          <ServiceBlock
            title="Wholesale Distribution"
            titleColor="black"
            reverse
            body="Advanced wholesale distribution and supply chain services built to keep your operations fully stocked and on schedule. We bring reliability, data-driven planning, and responsive support."
            images={[
              { src: 'https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1200&auto=format&fit=crop', alt: 'Warehouse with stacked boxes' },
              { src: 'https://images.unsplash.com/photo-1503435824048-a799a3a84bf7?q=80&w=1200&auto=format&fit=crop', alt: 'Forklift inside warehouse' },
              { src: 'https://images.unsplash.com/photo-1515165562835-c3b8f0b78146?q=80&w=1200&auto=format&fit=crop', alt: 'Distribution center aisle' },
            ]}
          />

          <ServiceBlock
            title="Fuel Branding & Supply"
            titleColor="orange"
            body="Premium branding partnerships and dependable fuel supply programs that elevate your station’s presence and performance. We help you align with trusted brands and streamline logistics."
            images={[
              { src: 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1200&auto=format&fit=crop', alt: 'Fuel station canopy at night' },
              { src: 'https://images.unsplash.com/photo-1522403236043-562d8186e17e?q=80&w=1200&auto=format&fit=crop', alt: 'Gas station pumps' },
              { src: 'https://images.unsplash.com/photo-1599110903018-3df5f93a3b9f?q=80&w=1200&auto=format&fit=crop', alt: 'Fuel branding signage' },
            ]}
          />

          <ServiceBlock
            title="Maintenance & Support"
            titleColor="orange"
            body="Ongoing maintenance programs and responsive support to minimize downtime and keep your business operating smoothly. From preventative care to emergency response, we’ve got you covered."
            images={[
              { src: 'https://images.unsplash.com/photo-1581093448799-54ef01c3f034?q=80&w=1200&auto=format&fit=crop', alt: 'Technician with tools' },
              { src: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop', alt: 'Workshop equipment' },
            ]}
          />

          {/* Bottom CTA Pill */}
          <div className="w-full flex justify-center">
            <div className="w-[720px] max-w-[90%] h-[62px] rounded-full bg-[#FF4D00] shadow-[0_16px_36px_rgba(255,77,0,0.25),_0_8px_20px_rgba(0,0,0,0.08)] flex items-center justify-between px-5">
              <span className="text-white font-semibold text-[16px]">Ready to grow? Get in touch today.</span>
              <a
                href="/contact"
                className="ml-4 inline-flex items-center justify-center h-[42px] px-4 rounded-full text-white font-semibold bg-[#ff5e1a] hover:bg-[#ff6a2a] transition-colors focus:outline-none focus:ring-2 focus:ring-white/70"
              >
                Contact us →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
} 