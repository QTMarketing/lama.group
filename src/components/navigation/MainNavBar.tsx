'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

// LaMa Logo Component
const LaMaLogo = () => (
  <svg className="w-32 h-8 sm:w-40 sm:h-10 md:w-48 md:h-12 lg:w-64 lg:h-14" viewBox="0 0 320 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="28" fontFamily="'Mont Book Regular', sans-serif" fontWeight="normal" fontSize="32" fill="#FF8800">LaMa</text>
    <text x="100" y="28" fontFamily="'Mont Book Regular', sans-serif" fontWeight="normal" fontSize="32" fill="#111">Group</text>
  </svg>
);

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Who We Are', href: '/who-we-are' },
  { name: 'Store Leasing', href: '/store-leasing' },
  { name: 'Contact', href: '/contact' },
];

export function MainNavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCallClick = () => {
    const confirmed = window.confirm('Book a strategy session with LaMa Group?');
    if (confirmed) {
      window.location.href = '/contact';
    }
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <nav className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <div className="w-32 h-8 bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="hidden lg:flex gap-8">
              {navLinks.map((link) => (
                <div key={link.name} className="w-20 h-6 bg-gray-200 animate-pulse rounded"></div>
              ))}
            </div>
            <div className="w-24 h-10 bg-gray-200 animate-pulse rounded-full"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <div>
      <nav className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <LaMaLogo />
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || 
                  (link.href !== '/' && pathname?.startsWith(link.href)) ||
                  (link.href === '/' && pathname === '/');
                
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-gray-700 hover:text-[#111] transition-colors duration-200 font-medium py-2 ${
                      isActive ? 'text-[#111]' : ''
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-[#111] transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Book A Session Button */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={handleCallClick}
                className="rounded-full px-5 py-2 text-sm font-semibold text-white bg-[#FF8800] hover:bg-[#FF9900] transition-colors"
              >
                Book A Session
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || 
                (link.href !== '/' && pathname?.startsWith(link.href)) ||
                (link.href === '/' && pathname === '/');
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-base font-medium py-3 px-2 rounded-md transition-colors ${
                    isActive 
                      ? 'text-[#111] bg-gray-50' 
                      : 'text-gray-700 hover:text-[#111] hover:bg-gray-50'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              );
            })}
            {/* Mobile Book A Session Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  handleCallClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full rounded-full px-5 py-3 text-sm font-semibold text-white bg-[#FF8800] hover:bg-[#FF9900] transition-colors"
              >
                Book A Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 