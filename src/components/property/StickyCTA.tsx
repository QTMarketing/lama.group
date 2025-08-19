'use client';

import { formatCurrency } from '@/lib/property';

interface StickyCTAProps {
  gated: boolean;
  price?: number;
}

export function StickyCTA({ gated, price }: StickyCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 lg:hidden">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {gated ? (
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-1">Price</div>
            <div className="text-lg font-semibold text-gray-900">Login to view</div>
          </div>
        ) : (
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-1">Price</div>
            <div className="text-xl font-bold text-gray-900">
              {formatCurrency(price)}
            </div>
          </div>
        )}
        
        <button className="bg-[#FF8800] hover:bg-[#FF6600] text-white px-6 py-3 rounded-xl font-semibold transition-colors">
          {gated ? 'Login to view price' : 'Contact'}
        </button>
      </div>
    </div>
  );
} 