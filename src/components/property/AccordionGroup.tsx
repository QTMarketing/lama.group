'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionGroupProps {
  details?: Array<{ heading: string; body: string }>;
  houseRules?: string[];
  faqs?: Array<{ q: string; a: string }>;
}

export function AccordionGroup({ details, houseRules, faqs }: AccordionGroupProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(sectionId)) {
      newOpenSections.delete(sectionId);
    } else {
      newOpenSections.add(sectionId);
    }
    setOpenSections(newOpenSections);
  };

  const isOpen = (sectionId: string) => openSections.has(sectionId);

  return (
    <div className="space-y-6">
      {/* Details Section */}
      {details && details.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleSection('details')}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-xl font-semibold text-gray-900">Details</h3>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform ${
                isOpen('details') ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          {isOpen('details') && (
            <div className="px-6 pb-4 border-t border-gray-100">
              <div className="space-y-4 pt-4">
                {details.map((detail, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-gray-900 mb-2">{detail.heading}</h4>
                    <p className="text-gray-600 leading-relaxed">{detail.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* House Rules Section */}
      {houseRules && houseRules.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleSection('rules')}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-xl font-semibold text-gray-900">House Rules</h3>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform ${
                isOpen('rules') ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          {isOpen('rules') && (
            <div className="px-6 pb-4 border-t border-gray-100">
              <ul className="space-y-2 pt-4">
                {houseRules.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#FF8800] mr-2 mt-1">•</span>
                    <span className="text-gray-600">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* FAQs Section */}
      {faqs && faqs.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleSection('faqs')}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h3>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform ${
                isOpen('faqs') ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          {isOpen('faqs') && (
            <div className="px-6 pb-4 border-t border-gray-100">
              <div className="space-y-4 pt-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                    <h4 className="font-medium text-gray-900 mb-2">{faq.q}</h4>
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 