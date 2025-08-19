'use client';

import { Copy, Mail, Phone } from 'lucide-react';
import { formatCurrency } from '@/lib/property';

interface QuickFactsCardProps {
  facts: Array<{ label: string; value: string }>;
  gated: boolean;
  price?: number;
  priceNote?: string;
  contact?: { email?: string; phone?: string };
}

export function QuickFactsCard({ facts, gated, price, priceNote, contact }: QuickFactsCardProps) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="sticky top-6 space-y-6">
      {/* Key Details Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Details</h3>
        
        <div className="space-y-4">
          {facts?.map((fact, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
              <span className="text-gray-600 font-medium">{fact.label}</span>
              <span className="text-gray-900 font-semibold">{fact.value}</span>
            </div>
          ))}
          
          {/* Price Section */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 font-medium">Price</span>
              {gated ? (
                <div className="relative">
                  <div className="blur-sm">
                    <span className="text-gray-900 font-semibold">$—</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-[#FF8800] hover:bg-[#FF6600] text-white px-4 py-1 rounded-lg text-sm font-medium transition-colors">
                      Login to view
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(price)}
                  </div>
                  {priceNote && (
                    <div className="text-sm text-gray-600">{priceNote}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact</h3>
        
        {gated ? (
          <div className="relative">
            <div className="blur-sm space-y-3">
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span>contact@example.com</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-[#FF8800] hover:bg-[#FF6600] text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Login to view contact
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {contact?.email && (
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{contact.email}</span>
                </div>
                <button
                  onClick={() => handleCopy(contact.email!)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            )}
            
            {contact?.phone && (
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{contact.phone}</span>
                </div>
                <button
                  onClick={() => handleCopy(contact.phone!)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            )}
            
            {!contact?.email && !contact?.phone && (
              <div className="text-gray-500 text-sm">
                Contact information not available
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 