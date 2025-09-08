"use client";

import React, { useRef, KeyboardEvent } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type SegmentEl = HTMLAnchorElement;

export default function ServicesCTAPillBar() {
  const segmentRefs = useRef<Array<SegmentEl | null>>([]);

  const handleKeyDown = (e: KeyboardEvent<SegmentEl>, index: number) => {
    let targetIndex = index;
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        targetIndex = index > 0 ? index - 1 : segmentRefs.current.length - 1;
        break;
      case 'ArrowRight':
        e.preventDefault();
        targetIndex = index < segmentRefs.current.length - 1 ? index + 1 : 0;
        break;
      case 'Home':
        e.preventDefault();
        targetIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        targetIndex = segmentRefs.current.length - 1;
        break;
      default:
        return;
    }
    segmentRefs.current[targetIndex]?.focus();
  };

  const handleBookingClick = (e: React.MouseEvent<HTMLAnchorElement>, service: string) => {
    if (typeof window !== 'undefined' && (window as any).bookService) {
      e.preventDefault();
      (window as any).bookService(service);
      return;
    }
    if (typeof window !== 'undefined' && (window as any).openBookingModal) {
      e.preventDefault();
      (window as any).openBookingModal(service);
      return;
    }
    if (process.env.NODE_ENV === 'development') {
      e.preventDefault();
      // eslint-disable-next-line no-alert
      alert(`Booking service: ${service.replace('-', ' ').toUpperCase()}`);
    }
  };

  const services = [
    { label: 'Store Leasing', href: '/store-leasing', external: false, ariaLabel: 'Store Leasing, go to Store Leasing page' },
    { label: 'Fuel Branding & Supply', href: 'https://quicktrackfuel.com/', external: true, ariaLabel: 'Fuel Branding & Supply, opens in new tab' },
    { label: 'Wholesale Distribution', href: 'https://lamawholesle.com/', external: true, ariaLabel: 'Wholesale Distribution, opens in new tab' },
    { label: 'Construction & Renovation', href: '/book?service=construction-renovation', external: false, booking: true, service: 'construction-renovation', ariaLabel: 'Construction & Renovation, book a strategy session' },
    { label: 'Maintenance & Support', href: '/book?service=maintenance-support', external: false, booking: true, service: 'maintenance-support', ariaLabel: 'Maintenance & Support, book a strategy session' },
  ] as const;

  const baseSegmentClasses = [
    'flex items-center justify-center gap-2',
    'px-6 py-5',
    'font-bold text-lg text-white',
    'transition-all duration-200 ease-out',
    'cursor-pointer',
    'hover:bg-white/10 active:bg-black/10',
    'focus-visible:outline-white focus-visible:outline-2 focus-visible:outline-offset-2',
    'focus-visible:rounded',
    'group',
  ].join(' ');

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <nav aria-label="Services" className="w-full">
        <div className="bg-[#FF832F] rounded-[80px] overflow-hidden">
          {/* Desktop Grid Layout */}
          <div className="hidden md:grid md:grid-cols-5">
            {services.map((service, index) => {
              const SegmentContent = (
                <>
                  <span className="whitespace-nowrap text-center">{service.label}</span>
                  <ChevronRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 flex-shrink-0" aria-hidden="true" />
                </>
              );

              const commonProps = {
                ref: (el: SegmentEl | null) => (segmentRefs.current[index] = el),
                className: `${baseSegmentClasses} ${index > 0 ? 'border-l border-white/40' : ''}`,
                'aria-label': service.ariaLabel,
                onKeyDown: (e: KeyboardEvent<SegmentEl>) => handleKeyDown(e, index),
              } as any;

              if ((service as any).booking && (service as any).service) {
                (commonProps as any).onClick = (e: React.MouseEvent<HTMLAnchorElement>) =>
                  handleBookingClick(e, (service as any).service);
                (commonProps as any)["data-action"] = 'book-service';
                (commonProps as any)["data-service"] = (service as any).service;
              }

              return service.external ? (
                <a key={service.label} href={service.href} target="_blank" rel="noopener noreferrer" {...commonProps}>
                  {SegmentContent}
                </a>
              ) : (
                <Link key={service.label} href={service.href} {...commonProps}>
                  {SegmentContent}
                </Link>
              );
            })}
          </div>

          {/* Mobile Horizontal Scroll Layout */}
          <div className="md:hidden overflow-x-auto scrollbar-hide">
            <div className="inline-grid grid-flow-col auto-cols-[160px] min-w-full snap-x snap-mandatory">
              {services.map((service, index) => {
                const SegmentContent = (
                  <>
                    <span className="whitespace-nowrap text-center text-sm">{service.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 flex-shrink-0" aria-hidden="true" />
                  </>
                );

                const mobileClasses = [
                  'flex items-center justify-center gap-1.5',
                  'px-4 py-4 min-w-[160px]',
                  'font-bold text-sm text-white',
                  'transition-all duration-200 ease-out',
                  'cursor-pointer',
                  'hover:bg-white/10 active:bg-black/10',
                  'focus-visible:outline-white focus-visible:outline-2 focus-visible:outline-offset-2',
                  'focus-visible:rounded',
                  'snap-start group',
                  index > 0 ? 'border-l border-white/40' : '',
                ].join(' ');

                const commonProps = {
                  ref: (el: SegmentEl | null) => (segmentRefs.current[index] = el),
                  className: mobileClasses,
                  'aria-label': service.ariaLabel,
                  onKeyDown: (e: KeyboardEvent<SegmentEl>) => handleKeyDown(e, index),
                } as any;

                if ((service as any).booking && (service as any).service) {
                  (commonProps as any).onClick = (e: React.MouseEvent<HTMLAnchorElement>) =>
                    handleBookingClick(e, (service as any).service);
                  (commonProps as any)["data-action"] = 'book-service';
                  (commonProps as any)["data-service"] = (service as any).service;
                }

                return service.external ? (
                  <a key={service.label} href={service.href} target="_blank" rel="noopener noreferrer" {...commonProps}>
                    {SegmentContent}
                  </a>
                ) : (
                  <Link key={service.label} href={service.href} {...commonProps}>
                    {SegmentContent}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}


