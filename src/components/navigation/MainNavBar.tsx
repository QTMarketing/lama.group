'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

// LaMa Logo Component
const LaMaLogo = () => (
  <svg className="w-64 h-10 sm:w-72 sm:h-12 md:w-80 md:h-14" viewBox="0 0 320 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="28" fontFamily="'Mont Book Regular', sans-serif" fontWeight="normal" fontSize="32" fill="#FF8800">LaMa</text>
    <text x="120" y="28" fontFamily="'Mont Book Regular', sans-serif" fontWeight="normal" fontSize="32" fill="#111">Group</text>
  </svg>
);

export function MainNavBar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Who We Are', href: '/who-we-are' },
    { name: 'Services', href: '/services' },
    { name: 'Store Leasing', href: '/store-leasing' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <LaMaLogo />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || 
                (link.href !== '/' && pathname?.startsWith(link.href)) ||
                (link.href === '/' && pathname === '/');
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-gray-700 hover:text-[#FF8800] transition-colors duration-200 font-medium py-2 ${
                    isActive ? 'text-[#FF8800]' : ''
                  }`}
                >
                  {link.name}
                  {/* Active Page Underline */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF8800] transform translate-y-1"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-[#FF8800] transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Call Us Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                const confirmed = window.confirm('Call LaMa Group at +1 (817) 545-9191?');
                if (confirmed) {
                  window.location.href = 'tel:+18175459191';
                }
              }}
              className="bg-[#FF6600] hover:bg-orange-700 text-white font-semibold rounded-full px-4 sm:px-6 py-2 shadow-md text-sm sm:text-base"
            >
              Call Us
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || 
                (link.href !== '/' && pathname?.startsWith(link.href)) ||
                (link.href === '/' && pathname === '/');
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-lg font-medium py-3 px-4 rounded-lg transition-colors ${
                    isActive 
                      ? 'text-[#FF8800] bg-orange-50 border-l-4 border-[#FF8800]' 
                      : 'text-gray-700 hover:text-[#FF8800] hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            {/* Mobile Call Us Button */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  const confirmed = window.confirm('Call LaMa Group at +1 (817) 545-9191?');
                  if (confirmed) {
                    window.location.href = 'tel:+18175459191';
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-[#FF6600] hover:bg-orange-700 text-white font-semibold rounded-lg px-6 py-3 shadow-md transition-colors"
              >
                Call Us
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 