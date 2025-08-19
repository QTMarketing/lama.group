'use client';

import React from 'react';

type ImageCardProps = {
  src: string;
  alt: string;
};

export function ImageCard({ src, alt }: ImageCardProps) {
  return (
    <div className="w-[345.5px] h-[455px] rounded-[10px] overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.08)] shrink-0 snap-start">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}

