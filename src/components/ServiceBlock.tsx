'use client';

import React from 'react';
import { ImageCard } from './ImageCard';

type ServiceBlockProps = {
  title: string;
  titleColor: 'orange' | 'black';
  body: string;
  images: { src: string; alt: string }[];
  reverse?: boolean; // if true, images left / text right
};

export function ServiceBlock({ title, titleColor, body, images, reverse = false }: ServiceBlockProps) {
  return (
    <section className="w-full">
      <div className={`grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start max-w-[1200px] mx-auto px-6 md:px-10`}>
        {/* Text */}
        <div className={`${reverse ? 'md:col-start-7 md:col-span-6' : 'md:col-span-6'}`}>
          <h3
            className={`text-[28px] md:text-[32px] font-extrabold leading-tight tracking-tight ${
              titleColor === 'orange' ? 'text-[#FF4D00]' : 'text-[#111111]'
            }`}
            style={{ fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial' }}
          >
            {title}
          </h3>
          <p className="mt-4 text-[16px] md:text-[17px] text-[#4B5563] leading-[1.65] max-w-[460px]">
            {body}
          </p>
        </div>

        {/* Images */}
        <div className={`${
          reverse ? 'md:col-start-1 md:col-span-6' : 'md:col-start-7 md:col-span-6'
        }`}>
          {/* Desktop: row with gap; Mobile: horizontal scroll */}
          <div className="flex gap-6 items-start overflow-x-auto md:overflow-visible snap-x snap-mandatory px-6 md:px-0 [-webkit-overflow-scrolling:touch] scrollbar-hide">
            {images.map((img, idx) => (
              <ImageCard key={`${img.src}-${idx}`} src={img.src} alt={img.alt} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

