'use client';

import { ReactNode } from 'react';

interface FeatureChipsProps {
  items?: string[];
  icon?: ReactNode;
}

export function FeatureChips({ items, icon }: FeatureChipsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-[#FF8800] hover:shadow-md transition-all duration-200 group"
        >
          {icon && <span className="text-[#FF8800] group-hover:scale-110 transition-transform">{icon}</span>}
          <span className="truncate max-w-[200px]" title={item}>
            {item}
          </span>
        </div>
      ))}
    </div>
  );
} 