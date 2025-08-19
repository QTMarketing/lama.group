'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

interface GalleryProps {
  images?: string[];
}

export function Gallery({ images }: GalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [emblaRef] = useEmblaCarousel({ loop: true });

  if (!images || images.length === 0) {
    return (
      <div className="space-y-4">
        <div className="w-full h-64 md:h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl" />
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else if (e.key === 'ArrowRight') {
      setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    } else if (e.key === 'Escape') {
      // Dialog will close automatically
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Carousel */}
      <div className="relative">
        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div key={index} className="flex-[0_0_100%]">
                <img
                  src={image}
                  alt={`Property image ${index + 1}`}
                  className="w-full h-64 md:h-96 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {selectedImageIndex + 1} / {images.length}
        </div>
      </div>
      
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <button
                onClick={() => setSelectedImageIndex(index)}
                className="relative group overflow-hidden rounded-lg"
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-24 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </button>
            </DialogTrigger>
            
            <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
              <div className="relative">
                {/* Close Button */}
                <button className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors">
                  <X className="w-6 h-6" />
                </button>
                
                {/* Main Image */}
                <img
                  src={images[selectedImageIndex]}
                  alt={`Property image ${selectedImageIndex + 1}`}
                  className="w-full h-auto max-h-[80vh] object-contain"
                  onKeyDown={handleKeyDown}
                  tabIndex={0}
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                
                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
                  {selectedImageIndex + 1} / {images.length}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
} 