'use client';

import { Share2, Bookmark } from 'lucide-react';
import { PropertyType } from '@/types/property';

interface PropertyHeroProps {
  title: string;
  locationLine?: string;
  status?: string;
  heroImage?: string;
  type: PropertyType;
}

export function PropertyHero({ title, locationLine, status, heroImage, type }: PropertyHeroProps) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500 text-white';
      case 'sold':
        return 'bg-red-500 text-white';
      case 'under-offer':
        return 'bg-yellow-500 text-black';
      case 'coming-soon':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden">
      {/* Background Image */}
      {heroImage ? (
        <img
          src={heroImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600" />
      )}
      
      {/* Dark Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      
      {/* Top Right Icons */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
        <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
        {/* Breadcrumb */}
        <div className="text-sm text-white/80 mb-2">
          Leasing / {locationLine?.split(',')[0] || 'Location'}
        </div>
        
        {/* Title */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
          {title}
        </h1>
        
        {/* Location and Status */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {locationLine && (
            <div className="text-lg text-white/90">
              📍 {locationLine}
            </div>
          )}
          
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
              {type === 'lease' ? 'For Lease' : 'For Sale'}
            </span>
            {status && status !== 'available' && (
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            )}
          </div>
        </div>
        
        {/* CTA Button */}
        <button className="bg-[#FF8800] hover:bg-[#FF6600] text-white px-6 py-3 rounded-xl font-semibold transition-colors">
          Login to view price
        </button>
      </div>
    </div>
  );
} 